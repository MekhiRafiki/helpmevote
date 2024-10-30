"use server"
import { knowledge_bases } from "@/lib/db/schema/knowledge_bases";
import { embeddings } from "@/lib/db/schema/embeddings";
import { EmbeddingPackage } from "@/types";
import { db } from "@/lib/db";
import { resources } from "@/lib/db/schema/resources";
import { eq } from "drizzle-orm";
export async function createResourceInDatabase(content: string) {
    const [resource] = await db.insert(resources).values({ content }).returning();
    return resource;
}
  

export async function createEmbeddingsInDatabase(resource_id: string, embedingPackage: EmbeddingPackage[]) {
  for (const embedding of embedingPackage) {
    await db.insert(embeddings).values({ resource_id, content: embedding.content, embedding: embedding.embedding });
  }
  return true;
}

export async function createKnowledgeBase(name: string, description: string) {
  const [kb] = await db.insert(knowledge_bases).values({ name, description }).returning();
  return kb;
}

export async function fetchKnowledgeBaseById(id: number) {
  return await db.select().from(knowledge_bases).where(eq(knowledge_bases.id, id));
}

export async function fetchAllKnowledgeBases() {
  return await db.select().from(knowledge_bases);
}