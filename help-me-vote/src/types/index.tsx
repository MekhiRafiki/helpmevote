export interface Topic {
    id: string
    title: string
}

export enum Sender {
    USER = "user",
    AI = "ai"
}

export interface Message {
    content: string
    sender: Sender
  }