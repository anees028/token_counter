"use client";
import { useState } from "react";
import { calculateTokens, MESSAGE_LIMIT, GLOBAL_LIMIT } from "@/utils/token-logic";

interface Props {
  onSend: (text: string) => void;
  totalUsed: number;
}

export default function ChatInput({ onSend, totalUsed }: Props) {
  const [input, setInput] = useState("");
  
  const currentTokens = calculateTokens(input);
  const isTooLong = currentTokens > MESSAGE_LIMIT; // [cite: 21, 23]
  const willExceedGlobal = (totalUsed + currentTokens) > GLOBAL_LIMIT;

  const handleSend = () => {
    if (input.trim() && !isTooLong && !willExceedGlobal) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="sticky bottom-8 w-full bg-white p-6 rounded-3xl shadow-2xl border border-slate-200 ring-4 ring-slate-50/50">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 resize-none outline-none text-slate-700 font-medium placeholder:text-slate-300"
        placeholder="Type a message..."
      />
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
        <div className="flex flex-col">
          {/* Live counter [cite: 8, 12] */}
          <span className={`text-[11px] font-black uppercase tracking-tighter ${isTooLong || willExceedGlobal ? 'text-red-500' : 'text-slate-400'}`}>
            Usage: {currentTokens} / {MESSAGE_LIMIT} Tokens
          </span>
          {willExceedGlobal && !isTooLong && (
            <span className="text-[9px] text-red-500 font-bold italic">Global Limit Reached</span>
          )}
        </div>
        
        <button
          disabled={!input.trim() || isTooLong || willExceedGlobal} // [cite: 23]
          onClick={handleSend}
          className="bg-blue-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}