
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const knowledge_bases = pgTable('knowledge_bases', {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
});