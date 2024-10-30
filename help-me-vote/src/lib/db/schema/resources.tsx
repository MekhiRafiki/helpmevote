import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const resources = pgTable('resources', {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
});