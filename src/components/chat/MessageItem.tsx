"use client";
import { Message } from "@/types";

interface Props {
  message: Message;
  onDelete: (id: string) => void;
}

export default function MessageItem({ message, onDelete }: Props) {
  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex justify-end items-start gap-3 group animate-in fade-in slide-in-from-bottom-2 mt-4">
      <div className="flex flex-col items-end max-w-[85%]">
        <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-sm border border-slate-200 w-full">
          <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{message.text}</p>
          
          <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold tracking-widest min-w-[200px]">
            <span>{message.tokens} Tokens</span>
            
            <div className="relative group/btn h-4 flex items-center justify-end min-w-[60px]">
              <p className="opacity-100 group-hover/btn:opacity-0 transition-opacity duration-200">
                {formatTime(message.createdAt)}
              </p>
              <button
                onClick={() => onDelete(message.id)}
                className="absolute right-0 text-red-500 font-black opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 hover:scale-110"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Avatar Icon */}
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md border-2 border-white shrink-0">
        <span className="text-[10px] font-black tracking-tighter">ME</span>
      </div>
    </div>
  );
}