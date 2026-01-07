"use client";
import React, { useState } from "react";
import { calculateTokens, MESSAGE_LIMIT, GLOBAL_LIMIT } from "@/utils/token-logic";
import { useLocale } from "@/context/LocaleContext";

interface Props {
  onSend: (text: string) => void;
  totalUsed: number;
}

export default function ChatInput({ onSend, totalUsed }: Props) {
  const [input, setInput] = useState("");
  const {locale, toggleLocale, t} = useLocale();
  
  const currentTokens = calculateTokens(input);
  const isTooLong = currentTokens > MESSAGE_LIMIT; 
  const willExceedGlobal = (totalUsed + currentTokens) > GLOBAL_LIMIT; 

  const handleSend = () => {
    if (input.trim() && !isTooLong && !willExceedGlobal) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents a new line from being added
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-8 w-full bg-white p-6 rounded-3xl shadow-2xl border border-slate-200 ring-4 ring-slate-50/50">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // Trigger send on Enter
        className="w-full h-24 resize-none outline-none text-slate-700 font-medium placeholder:text-slate-300"
        placeholder={t.chat.placeholder}
      />
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
        <div className="flex flex-col">
          <span className={`text-[11px] font-black uppercase tracking-tighter ${
            isTooLong || willExceedGlobal ? 'text-red-500' : 'text-slate-400'
          }`}>
            {t.chat.usage}: {currentTokens} / {MESSAGE_LIMIT} {t.chat.tokens}
          </span>
          {willExceedGlobal && !isTooLong && (
            <span className="text-[9px] text-red-500 font-bold italic">
              {t.chat.limitReached}
            </span>
          )}
        </div>
        
        <button
          disabled={!input.trim() || isTooLong || willExceedGlobal}
          onClick={handleSend}
          className="bg-blue-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all"
        >
          {t.chat.send}
        </button>
      </div>
    </div>
  );
}