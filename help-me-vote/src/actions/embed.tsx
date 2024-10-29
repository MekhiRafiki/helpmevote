"use server"

import { NotionAPILoader } from "@langchain/community/document_loaders/web/notionapi";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { google } from "@ai-sdk/google";
import { createEmbeddingsInDatabase, createResourceInDatabase } from "./resources";
import { EmbeddingPackage } from "@/types";

async function getNotionPageLoader(url: string): Promise<NotionAPILoader> {
  const match = url.match(/(?<!=)[0-9a-f]{32}/);
  const id = match ? match[0] : null;

  if (!id) {
    throw new Error('Invalid Notion URL: Unable to extract page ID');
  }

  const pageLoader = new NotionAPILoader({
    clientOptions: {
      auth: process.env.NOTION_INTEGRATION_TOKEN,
    },
    id,
    type: "page",
  });

  return pageLoader;
}


async function generateEmbeddings(doc: string): Promise<EmbeddingPackage[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await splitter.splitText(doc);
  
  const embeddingModel = google.textEmbeddingModel('text-embedding-004'); // 768 dim embeddings
  const { embeddings } = await embeddingModel.doEmbed({
    values: splitDocs,
  });

  return embeddings.map((e, i) => ({ content: splitDocs[i], embedding: e }));

} 


export async function addResourceToKnowledgeBase(url: string) {
  try {
    // Fetch the resource content
    console.log("fetching resource content", url);
    
    let loader
    if (url.includes('notion.site')) {
      loader = await getNotionPageLoader(url);
    } else {
      console.log("Unsupported URL type");
      return false;
      // const response = await fetch(url);
      // content = await response.text();
    }
    const docs = await loader.load();
    const content = docs[0].pageContent;
    console.log("content", content);

    // Create the resource in the database
    const resource = await createResourceInDatabase(content);
    console.log("resource", resource);
  
    // Generate the embeddings
    const embeddings = await generateEmbeddings(content);
    console.log("embeddings", embeddings);
    
    // Create the embeddings in the database
    await createEmbeddingsInDatabase(resource.id, embeddings);
  } catch (error) {
    console.error("Error adding resource to knowledge base", error);
    return false;
  }
  return true;
}