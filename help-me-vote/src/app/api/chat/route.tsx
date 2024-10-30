import { getNotionContext } from '@/actions/context';
import { findRelevantContent } from '@/actions/embed';
import { google } from '@ai-sdk/google'
import { streamText, convertToCoreMessages } from 'ai'
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, currentGoal, notion_url, forceContext, filterKnowledgeBaseId } = await req.json()

  const lastMessage = messages[messages.length - 1];
  let contextSupport = "";
  if (forceContext && notion_url) {
    // Static context
    contextSupport = await getNotionContext({ notion_url });
  } else {
    // RAG based on the last query
    const kb_id = filterKnowledgeBaseId === "home" ? undefined : filterKnowledgeBaseId
    const relevantContent = await findRelevantContent(
      lastMessage.content, 
      kb_id
    );
    if (relevantContent.length > 0) {
      contextSupport = relevantContent.map(c => c.content).join("\n\n");
    }
  }

  if (contextSupport) {
    messages[messages.length - 1] = {
      content: `Here's some relevant context to help you answer the user's question: ${contextSupport}\n\n 
      DO NOT TALK ABOUT RECEIVING THE CONTEXT IN YOUR RESPONSE. Dont end your response with links tor suggestions for external sources outside of this conversation.\n\n
      Use the context to answer the user's question: ${lastMessage.content}`,
      role: lastMessage.role
    };
  }

  const result = await streamText({
    system: `You are a non-partisan civic engagement specialist designed to help users become more informed about political topics and electoral processes. Your role is to:
      Check your knowledge base for context before responding. Only respond to questions using information from tool calls.
      If no relevant information is provided via the context, make it clear in your response that you don't have the information handy, but still offer relevant answers or where to find more information.

      You may have a current goal to help the user achieve: ${currentGoal}.

    1. Provide accurate, unbiased information on .
    2. Encourage critical thinking and fact-checking.
    3. Explain complex political concepts in simple terms.
    4. Offer balanced perspectives on issues, presenting multiple viewpoints when appropriate.
    5. Guide users to reliable sources for further research.
    6. Promote active citizenship and democratic participation.
    7. Avoid endorsing specific candidates or parties.
    8. Clarify voting procedures and rights.
    9. Address common misconceptions about the political process.
    10. Encourage respectful dialogue and understanding of diverse opinions.
    
    Ask probing questions to understand their needs better and provide relevant, actionable information to enhance their civic knowledge and engagement.
    Be brief and semi-casual in your responses, this should feel like a thread with an informed political expert.
    Proactively move the conversation along. 
    If you have enough information in the current topic, or if the user says they'd like to move on, or begins to change topics, move onto the next goal using the markGoalAsComplete tool.  
    `,
    model: google('gemini-1.5-flash-002'),
    messages: convertToCoreMessages(messages),
    maxTokens: 300,
    tools : {
      displayCandidateSpectrum: {
        description: "Display where the user falls on a spectrum of between Kamala Harris and Donald Trump on their stances on the issues/platforms. Provide a positon number between -1 and 1, where -1 is the furthest left (democrat/Harris agreement) and 1 is the furthest right (republican/Trump agreement). You, the AI assistant are to come up with the position based on the conversation.",
        parameters: z.object({
          position: z.number()
        }),
        execute: async ({ position }: { position: number }) => {
          return { position }
        }
      },
      markGoalAsComplete: {
        description: "Mark this current part of the conversation as complete. Lets move to next topic",
        parameters: z.object({
          topic: z.string().optional().describe("The previous topic that the user was discussing")
        }),
      },
      // findRelevantContent: {
      //   description: "Find relevant content from the knowledge base to help the user and the AI have a more informed discussion. Provide a query to search for specific information..",
      //   parameters: z.object({
      //     query: z.string()
      //   }),
      //   execute: async ({ query }: { query: string }) => {
      //     const contextSupport = await findRelevantContent(query);
      //     return contextSupport;
      //   }
      // }
    }
  });

  return result.toDataStreamResponse();
}