import { serial, text, vector } from "drizzle-orm/pg-core";

import { pgTable } from "drizzle-orm/pg-core";
import { resources } from "./resources";
import { knowledge_bases } from "./knowledge_bases";

export const embeddings = pgTable('embeddings', {
    id: serial('id').primaryKey(),
    kb_id: text('kb_id').references(() => knowledge_bases.id),
    resource_id: text('resource_id').references(() => resources.id),
    content: text('content'),
    embedding: vector('embedding', { dimensions: 768 }),
});