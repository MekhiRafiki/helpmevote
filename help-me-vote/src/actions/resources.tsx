"use server"
import { EmbeddingPackage } from "@/types";
import { db } from "@vercel/postgres";

export async function createResourceInDatabase(content: string) {
    const client = await db.connect();
    const { rows } = await client.sql`INSERT INTO resources (content) VALUES (${content}) RETURNING *`;
    return rows[0];
}
  
// ts-ignore
export async function createEmbeddingsInDatabase(resource_id: string, embeddings: EmbeddingPackage[]) {
    const client = await db.connect();
    for (const embedding of embeddings) {
      await client.sql`
        INSERT INTO embeddings (resource_id, content, embedding) 
        VALUES (${resource_id}, ${embedding.content}, ${JSON.stringify(embedding.embedding)}::vector)
      `;
    }
    return true;
  }
  