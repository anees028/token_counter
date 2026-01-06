"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Message } from "@/interface/MessageInterface";

export const TOKEN_RATE = 4;
export const MESSAGE_LIMIT = 100;
export const GLOBAL_LIMIT = 1000;

export const calculateTokens = (text: string) =>
  Math.ceil(text.length / TOKEN_RATE);


const ChatContext = createContext<any>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("token_chat_history");
    if (saved) setMessages(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever messages change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("token_chat_history", JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  const totalUsed = messages.reduce((sum, msg) => sum + msg.tokens, 0);

  const addMessage = (text: string) => {
    const tokens = calculateTokens(text);
    if (tokens <= MESSAGE_LIMIT && totalUsed + tokens <= GLOBAL_LIMIT) {
      const newMessage = { id: crypto.randomUUID(), text, tokens };
      setMessages((prev) => [...prev, newMessage]);
      return true;
    }
    return false;
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <ChatContext.Provider
      value={{ messages, addMessage, deleteMessage, totalUsed, isLoaded }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
