"use client";
import { useChat } from "@/context/ChatContext";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import { useLocale } from "@/context/LocaleContext";

export default function ChatPage() {
  const { messages, addMessage, deleteMessage, totalUsed } = useChat();
  const { locale, toggleLocale, t } = useLocale();

  return (
    <div className="flex flex-col h-screen py-10 max-w-4xl mx-auto">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">{t.nav.chat}</h2>
        <p className="text-slate-400 text-sm font-medium">{t.nav.realtimetracking}</p>
      </header>

      <MessageList messages={messages} onDelete={deleteMessage} />

      <ChatInput onSend={addMessage} totalUsed={totalUsed} />
    </div>
  );
}