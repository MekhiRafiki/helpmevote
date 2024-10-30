"use server"

import { NotionAPILoader } from "@langchain/community/document_loaders/web/notionapi";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { google } from "@ai-sdk/google";
import { createEmbeddingsInDatabase, createResourceInDatabase } from "./resources";
import { EmbeddingPackage } from "@/types";
import { cosineDistance, desc, eq, gt, sql, and } from 'drizzle-orm';
import { embeddings } from "@/lib/db/schema/embeddings";
import { db } from "@/lib/db";

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

export const findRelevantContent = async (userQuery: string, kb_id?: number) => {
  const userQueryEmbedded = (await generateEmbeddings(userQuery))[0].embedding;
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded,
  )})`;
  
  const similarGuides = await db
    .select({ content: embeddings.content, similarity })
    .from(embeddings)
    .where(
      kb_id 
        ? and(gt(similarity, 0.5), eq(embeddings.kb_id, kb_id))
        : gt(similarity, 0.5)
    )
    .orderBy(desc(similarity))
    .limit(4);
  console.log("RAG on KB ID", kb_id, similarGuides);
  return similarGuides;
};


export async function addResourceToKnowledgeBase(url: string, kb_id?: number) {
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

    // Create the resource in the database
    const title = docs[0].metadata.title;
    const resource = await createResourceInDatabase(
      title,
      url,
      content,
      kb_id
    );
  
    // Generate the embeddings
    const embeddings = await generateEmbeddings(content);
    
    // Create the embeddings in the database
    await createEmbeddingsInDatabase(resource.id.toString(), embeddings, kb_id);
    return resource
  } catch (error) {
    console.error("Error adding resource to knowledge base", error);
    return null;
  }
}