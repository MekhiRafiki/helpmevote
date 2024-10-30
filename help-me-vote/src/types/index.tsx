export interface Topic {
  id: string;
  title: string;
  category?: string;
  agenda?: ConversationAgenda;
  knowledge_base_id?: string;
  children?: Topic[];
};

export enum Sender {
    USER = "user",
    AI = "ai"
}

export interface Message {
    content: string
    sender: Sender
}

export interface AIPrompt {
    key: string;
    guide: string;
    notion_url?: string;
    context_support_url?: string;
}

export interface ConversationAgendaNode {
    id: string;
    title: string;
    description: string;
    ai_prompt: AIPrompt;
    canPlotSpectrum?: boolean;
}

export interface ConversationAgenda {
    id: string;
    title: string;
    plan: {
      nodes: Array<ConversationAgendaNode>;
    };
}

// For embedding resources
export interface Resource {
  id: string;
  content: string;
}

export interface EmbeddingPackage {
  content: string;
  embedding: number[];
}

export interface KnowledgeBase {
  id?: number | string;
  name?: string;
  description?: string;
}