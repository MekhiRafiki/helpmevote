export interface Topic {
  id: string;
  title: string;
  category?: string;
  children?: Topic[];
  agenda?: ConversationAgenda;
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
}

export interface ConversationAgenda {
    id: string;
    title: string;
    plan: {
      nodes: Array<ConversationAgendaNode>;
    };
  }