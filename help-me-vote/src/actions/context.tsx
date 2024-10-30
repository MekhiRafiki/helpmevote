"use server"
import { convertToCoreMessages, generateObject, Message } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { getNotionPageId } from "./notion";

interface getNotionContextProps {
    notion_url: string;
}

/**
 * Get the context support from the knowledge base.
 * If a query is provided, it will search for the query in the knowledge base and return the relevant context.
 * Else, it will return the entire context of the knowledge base.
 * 
 * TODO(mj): Implement context cacheing for large queries
 */
export async function getNotionContext({ notion_url }: getNotionContextProps): Promise<string> {
  let contextSupport = "";
  try {
    // Extract the page ID using regex
    const match = notion_url.match(/(?<!=)[0-9a-f]{32}/);
    const id = match ? match[0] : null;

    if (!id) {
      console.error('Invalid Notion URL: Unable to extract page ID');
      return "";
    }

    const pageContent = await getNotionPageId(notion_url);
    contextSupport = pageContent ?? "";
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