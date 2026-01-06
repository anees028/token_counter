"use client";
import { useState } from "react";
import { useChat } from "@/context/ChatContext";
import { calculateTokens } from "@/utils/token";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, addMessage, deleteMessage, totalUsed } = useChat();

  // Token Rule Constants from requirements
  const MESSAGE_LIMIT = 100;
  const GLOBAL_LIMIT = 1000;

  const currentTokens = calculateTokens(input);
  const isTooLong = currentTokens > MESSAGE_LIMIT; //
  const willExceedGlobal = totalUsed + currentTokens > GLOBAL_LIMIT; //

  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="ml-64 p-8 bg-slate-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl flex-1 flex flex-col">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Chat Session</h2>
          <p className="text-sm text-slate-500">
            Messages are tracked in real-time for token usage.
          </p>
        </div>

        {/* Message List  */}
        <div className="flex-1 space-y-6 mb-8 overflow-y-auto pr-2 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
              <span className="text-4xl mb-2">💬</span>
              <p className="font-medium">
                No messages sent yet. Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((m: any, index: number) => {
              const currentDate = formatDate(m.createdAt);
              const previousDate =
                index > 0 ? formatDate(messages[index - 1].createdAt) : null;
              const showDateHeader = currentDate !== previousDate;

              return (
                <div
                  key={m.id}
                  className="animate-in fade-in slide-in-from-bottom-3 duration-300"
                >
                  {showDateHeader && (
                    <div className="flex items-center gap-4 my-8">
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                        {currentDate}
                      </span>
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                    </div>
                  )}

                  {/* Message and Avatar Wrapper */}
                  <div className="flex justify-end items-start gap-3 group">
                    <div className="flex flex-col items-end max-w-[80%]">
                      <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-sm border border-slate-200 relative">
                        <p className="text-slate-800 leading-relaxed">
                          {m.text}
                        </p>

                        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                          {/* Left Side: Token Count */}
                          <span>{m.tokens} Tokens</span>

                          {/* Right Side: Time and Delete Button Container */}
                          <div className="relative group/btn h-4 flex items-center min-w-[50px] justify-end">
                            {/* Time (Visible by default) */}
                            <p className="opacity-100 group-hover/btn:opacity-0 transition-opacity duration-200">
                              {formatTime(m.createdAt)}
                            </p>

                            {/* Delete Button (Visible on hover) */}
                            <button
                              onClick={() => deleteMessage(m.id)}
                              className="absolute right-0 text-red-500 font-black opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 hover:scale-110"
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Avatar Icon */}
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-100 border-2 border-white shrink-0">
                      <span className="text-xs font-bold">ME</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Area [cite: 11] */}
        <div className="sticky bottom-8 w-full bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-200 ring-4 ring-slate-50">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full resize-none outline-none text-slate-700 h-24 placeholder:text-slate-300 font-medium"
            placeholder="What's on your mind?..."
          />
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
            {/* Live Token Counter [cite: 12] */}
            <div className="flex flex-col">
              <span
                className={`text-[11px] font-black uppercase tracking-tighter ${
                  isTooLong || willExceedGlobal
                    ? "text-red-500"
                    : "text-slate-400"
                }`}
              >
                Usage: {currentTokens} / {MESSAGE_LIMIT} Tokens
              </span>
              {willExceedGlobal && !isTooLong && (
                <span className="text-[10px] text-red-500 font-bold italic animate-pulse">
                  Insufficient Global Balance!
                </span>
              )}
            </div>

            <button
              disabled={isTooLong || willExceedGlobal || !input.trim()}
              onClick={() => {
                addMessage(input);
                setInput("");
              }}
              className="bg-blue-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none transition-all duration-200"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
