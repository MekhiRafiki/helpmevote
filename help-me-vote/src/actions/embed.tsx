"use server"

import { Resource } from "@/types";
import { createClient } from "@vercel/postgres";

const client = createClient();

export async function embedResource(resource: Resource) {
  const result = await client.sql`INSERT INTO resources (content) VALUES (${resource.content})`;
  return result.rows[0];
}

export async function splitEmbedStore(content: string) {
    return true
//   const result = await client.sql`INSERT INTO embeddings (resource_id, content) VALUES (${resource.id}, ${content})`;
//   return result.rows[0];
}