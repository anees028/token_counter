"use client";
import { useChat } from "@/context/ChatContext";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  const { messages, addMessage, deleteMessage, totalUsed } = useChat();

  return (
    <div className="flex flex-col h-screen py-10 max-w-4xl mx-auto">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">CHAT INTERFACE</h2>
        <p className="text-slate-400 text-sm font-medium">Real-time token tracking & group messaging [cite: 8, 20]</p>
      </header>

      <MessageList messages={messages} onDelete={deleteMessage} />

      <ChatInput onSend={addMessage} totalUsed={totalUsed} />
    </div>
  );
}