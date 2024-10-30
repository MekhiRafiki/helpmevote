import { drizzle } from 'drizzle-orm/vercel-postgres';
import { db as vercelDb } from '@vercel/postgres';

export const db = drizzle(vercelDb);