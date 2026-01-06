"use client";
import { Message } from "@/types";
import MessageItem from "./MessageItem";

interface Props {
  messages: Message[];
  onDelete: (id: string) => void;
}

export default function MessageList({ messages, onDelete }: Props) {
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  return (
    <div className="flex-1 overflow-y-auto space-y-6 px-4 mb-6 custom-scrollbar">
      {messages.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
          <span className="text-4xl mb-2">💬</span>
          <p className="font-medium text-slate-500">No messages yet. Start typing!</p>
        </div>
      ) : (
        messages.map((m, index) => {
          const currentDate = formatDate(m.createdAt);
          const previousDate = index > 0 ? formatDate(messages[index - 1].createdAt) : null;
          const showDateHeader = currentDate !== previousDate;

          return (
            <div key={m.id}>
              {showDateHeader && (
                <div className="flex items-center gap-4 my-8">
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                    {currentDate}
                  </span>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
                </div>
              )}
              
              <MessageItem message={m} onDelete={onDelete} />
            </div>
          );
        })
      )}
    </div>
  );
}