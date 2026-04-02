export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  title: string;
  rawText: string;
  summary: string | null;
  insights: string | null;
  tags: string | null;
  aiSource: string;
  userId: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthPayload {
  userId: string;
  email: string;
}
