CREATE TABLE resources (
    id VARCHAR(191) PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- First ensure the vector extension is enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the embeddings table
CREATE TABLE embeddings (
    id VARCHAR(191) PRIMARY KEY,
    resource_id VARCHAR(191) REFERENCES resources(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1536) NOT NULL
);

-- Create the HNSW index for vector similarity search
CREATE INDEX embeddingIndex ON embeddings 
USING hnsw (embedding vector_cosine_ops);