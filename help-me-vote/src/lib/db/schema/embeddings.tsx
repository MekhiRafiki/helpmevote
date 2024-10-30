import { serial, text, vector } from "drizzle-orm/pg-core";

import { pgTable } from "drizzle-orm/pg-core";
import { resources } from "./resources";

export const embeddings = pgTable('embeddings', {
    id: serial('id').primaryKey(),
    resource_id: text('resource_id').references(() => resources.id),
    content: text('content'),
    embedding: vector('embedding', { dimensions: 768 }),
});