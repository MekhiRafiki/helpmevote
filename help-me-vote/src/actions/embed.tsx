"use server"

import { google } from "@ai-sdk/google";
import { createEmbeddingsInDatabase, createResourceInDatabase } from "./resources";
import { EmbeddingPackage } from "@/types";
import { cosineDistance, desc, eq, gt, sql, and } from 'drizzle-orm';
import { embeddings } from "@/lib/db/schema/embeddings";
import { db } from "@/lib/db";
import { getNotionPageId } from "./notion";

const generateChunks = (input: string, maxChunkSize: number = 1000): string[] => {
  // Split by sentence boundaries while preserving the periods
  const sentences = input
    .trim()
    .split(/(?<=\.|\?|\!)\s+/)
    .filter(sentence => sentence.trim().length > 0);

  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    // If adding this sentence would exceed maxChunkSize, start a new chunk
    if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
    }
    currentChunk += (currentChunk ? ' ' : '') + sentence;
  }

  // Add the last chunk if there's anything left
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}


async function generateEmbeddings(doc: string): Promise<EmbeddingPackage[]> {
  const splitDocs = generateChunks(doc);
  const embeddingModel = google.textEmbeddingModel('text-embedding-004'); // 768 dim embeddings
  
  // Process in batches of 100
  const batchSize = 100;
  const allEmbeddings: EmbeddingPackage[] = [];
  
  for (let i = 0; i < splitDocs.length; i += batchSize) {
    const batch = splitDocs.slice(i, i + batchSize);
    const { embeddings } = await embeddingModel.doEmbed({
      values: batch,
    });
    
    // Map the batch results and add to accumulated results
    const batchResults = embeddings.map((e, idx) => ({
      content: batch[idx],
      embedding: e
    }));
    allEmbeddings.push(...batchResults);
  }

  return allEmbeddings;
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
  return similarGuides;
};


export async function addResourceToKnowledgeBase({url, preferredTitle, kb_id, rawContent}: {url?: string, preferredTitle?: string, kb_id?: number, rawContent?: string}) {
  try {
    let namedTitle
    let content
    if (rawContent) {
      content = rawContent
      namedTitle = preferredTitle ?? undefined
    } else {
      if (url && url.includes('notion.site')) {
        const page = await getNotionPageId(url);
        content = page;
      } else {
        console.log("Unsupported URL type");
        // const response = await fetch(url);
        // content = await response.text();
      }
      namedTitle = preferredTitle ?? undefined;
    }

    if (!content || !namedTitle) {
      return null;
    }

    // Create the resource in the database
    const resource = await createResourceInDatabase(
      namedTitle,
      url ?? "",
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