"use server"

import { NotionAPILoader } from "@langchain/community/document_loaders/web/notionapi"

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

// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// const splitter = new RecursiveCharacterTextSplitter();