import { getContextSupport } from '@/app/actions/context';
import { Sender } from '@/types';
import { google } from '@ai-sdk/google'
import { streamText, convertToCoreMessages } from 'ai'
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, currentGoal, notion_url, forceContext } = await req.json()

  if (forceContext && notion_url) {
    const contextSupport = await getContextSupport({ notion_url });
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender !== Sender.AI) {
      messages[messages.length - 1] = {
        content: `Context: ${contextSupport}\n\n 
        DO NOT TALK ABOUT RECEIVING THE CONTEXT IN YOUR RESPONSE. Dont end your response with links tor suggestions for external sources outside of this conversatoin. Resources will be provided in app. use the information as context to answer the user's question: ${lastMessage.content}`,
        role: lastMessage.role
      };
    }
  }

  const result = await streamText({
    system: `You are a non-partisan civic engagement specialist designed to help users become more informed about political topics and electoral processes. Your role is to:

    1. Provide accurate, unbiased information on ${currentGoal}.
    2. Encourage critical thinking and fact-checking.
    3. Explain complex political concepts in simple terms.
    4. Offer balanced perspectives on issues, presenting multiple viewpoints when appropriate.
    5. Guide users to reliable sources for further research.
    6. Promote active citizenship and democratic participation.
    7. Avoid endorsing specific candidates or parties.
    8. Clarify voting procedures and rights.
    9. Address common misconceptions about the political process.
    10. Encourage respectful dialogue and understanding of diverse opinions.
    
    Tailor your responses to help the user achieve their current goal: ${currentGoal}. Ask probing questions to understand their needs better and provide relevant, actionable information to enhance their civic knowledge and engagement.`,
    model: google('gemini-1.5-flash-002'),
    messages: convertToCoreMessages(messages),
    tools : {
      getContext: {
        description: "Retrieve information from a knowledge base to help the user and the AI have a more informed discussion. Provide a query to search for specific information, else return the entire context.",
        parameters: z.object({
          query: z.string().optional()
        }),
        execute: async ({ query }: { query?: string }) => {
          const contextSupport = await getContextSupport({ notion_url, query });
          return contextSupport;
        }
      },
      displayCandidateSpectrum: {
        description: "Display where the user falls on a spectrum of between Kamala Harris and Donald Trump on their stances on the issues/platforms. Provide a positon number between -1 and 1, where -1 is the furthest left (democrat/Harris agreement) and 1 is the furthest right (republican/Trump agreement). You, the AI assistant are to come up with the position based on the conversation.",
        parameters: z.object({
          position: z.number()
        }),
        execute: async ({ position }: { position: number }) => {
          return { position }
        }
      }
    }
  });

  return result.toDataStreamResponse();
}