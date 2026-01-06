export interface Message {
  id: string;
  text: string;
  tokens: number;
  createdAt: string;
}

export interface ChatContextType {
  messages: Message[];
  totalUsed: number;
  addMessage: (text: string) => void;
  deleteMessage: (id: string) => void;
}