"use server"

import { NotionAPILoader } from "@langchain/community/document_loaders/web/notionapi"
import { convertToCoreMessages, generateObject, Message } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

interface GetContextSupportProps {
    notion_url: string;
    query?: string;
}

/**
 * Get the context support from the knowledge base.
 * If a query is provided, it will search for the query in the knowledge base and return the relevant context.
 * Else, it will return the entire context of the knowledge base.
 * 
 * TODO(mj): Implement context cacheing for large queries
 */
export async function getContextSupport({ notion_url, query }: GetContextSupportProps): Promise<string> {
  let contextSupport = "";
  try {
    // Extract the page ID using regex
    const match = notion_url.match(/(?<!=)[0-9a-f]{32}/);
    const id = match ? match[0] : null;

    if (!id) {
      console.error('Invalid Notion URL: Unable to extract page ID');
      return "";
    }

    const pageLoader = new NotionAPILoader({
      clientOptions: {
        auth: process.env.NOTION_INTEGRATION_TOKEN,
      },
      id,
      type: "page",
    });

    const pageDocs = await pageLoader.load();
    if (query) {
      // TODO(mj): Context search for the answer in supporting context
      contextSupport = pageDocs[0].pageContent
    } else {
      contextSupport = pageDocs[0].pageContent
    }
    console.log("Fetched Context from Notion");
  } catch (error) {
      console.error('Failed to fetch from Notion, using fallback', error);
  }
  return contextSupport;
}


export async function getSpectrumPosition(chatMessages: Message[]) {
  const result = await generateObject({
    model: google('gemini-1.5-flash-002'),
    schema: z.object({
      position: z.number().describe("A number between -1 and 1, where -1 is the furthest left (democrat/Harris agreement) and 1 is the furthest right (republican/Trump agreement) 0 is neutral or if you dont have enough information to make a determination.")
    }),
    messages: convertToCoreMessages(chatMessages)
  })
  return result.object.position;
}