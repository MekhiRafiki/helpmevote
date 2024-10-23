import { AIPrompt } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NotionAPILoader } from "@langchain/community/document_loaders/web/notionapi"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getAIPrompt(aiPrompt: AIPrompt): Promise<string> {
  try {
    if (aiPrompt.notion_page_id) {
      const pageLoader = new NotionAPILoader({
        clientOptions: {
          auth: process.env.NOTION_INTEGRATION_TOKEN,
        },
        id: aiPrompt.notion_page_id,
        type: "page",
      });

      const pageDocs = await pageLoader.load();
      const contextSupportContent = pageDocs[0].pageContent;
      return `CONTEXT SUPPORT:\n${contextSupportContent}\n\n INSTRUCTIONS:\n${aiPrompt.guide}`;
    }
    return aiPrompt.guide;
  } catch (error) {
      console.error('Failed to fetch from Notion, using fallback', error);
      return aiPrompt.guide;
  }
}

// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// const splitter = new RecursiveCharacterTextSplitter();