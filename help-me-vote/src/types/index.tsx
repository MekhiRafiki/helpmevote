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
    context_support_url?: string;
    notion_page_id?: string;
}

export interface ConversationAgenda {
    id: string;
    title: string;
    plan: {
      nodes: Array<{
        id: string;
        title: string;
        description: string;
        ai_prompt: AIPrompt;
      }>;
      edges: Array<{
        from: string;
        to: string;
        condition?: string;
      }>;
    };
  }