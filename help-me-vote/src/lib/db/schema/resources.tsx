import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { knowledge_bases } from "./knowledge_bases";

export const resources = pgTable('resources', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    webUrl: text('web_url').notNull(),
    content: text('content').notNull(),
    kb_id: integer('kb_id').references(() => knowledge_bases.id),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
});