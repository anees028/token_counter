"use client";
import { useChat, GLOBAL_LIMIT } from "@/context/ChatContext";

export default function StatsPage() {
  const { totalUsed, messages } = useChat();
  
  // Calculate remaining tokens based on the 1,000 global limit [cite: 18, 21]
  const remaining = GLOBAL_LIMIT - totalUsed;
  const usagePercentage = (totalUsed / GLOBAL_LIMIT) * 100;

  return (
    <div className="flex flex-col h-screen py-8">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Usage Statistics</h2>
        <p className="text-slate-500">Monitor your global token consumption and limits.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Used Card [cite: 17] */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 ring-1 ring-slate-100 transition-hover hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg text-xl">📤</span>
            <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Tokens Used</h3>
          </div>
          <p className="text-6xl font-black text-slate-900 tracking-tighter">
            {totalUsed.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-slate-400 font-medium">Across {messages.length} messages</p>
        </div>

        {/* Remaining Tokens Card [cite: 18] */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 ring-1 ring-slate-100 transition-hover hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg text-xl">🔋</span>
            <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Remaining Tokens</h3>
          </div>
          <p className="text-6xl font-black text-emerald-500 tracking-tighter">
            {Math.max(0, remaining).toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-slate-400 font-medium">Limit: {GLOBAL_LIMIT.toLocaleString()}</p>
        </div>
      </div>

      {/* Visual Usage Progress Bar */}
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 ring-1 ring-slate-100">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Global Limit Utilization</h3>
            <p className="text-sm text-slate-500">Your current consumption vs. the {GLOBAL_LIMIT} token cap.</p>
          </div>
          <span className={`text-xl font-black ${usagePercentage > 90 ? 'text-red-500' : 'text-blue-600'}`}>
            {usagePercentage.toFixed(1)}%
          </span>
        </div>

        {/* The Progress Bar */}
        <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden p-1 shadow-inner">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              usagePercentage > 90 ? 'bg-red-500' : 'bg-blue-600'
            }`} 
            style={{ width: `${Math.min(100, usagePercentage)}%` }}
          />
        </div>

        <div className="mt-6 flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>0 Tokens</span>
          <span>500 Tokens</span>
          <span>1,000 Tokens</span>
        </div>
      </div>

      {/* Quick Insight Footer */}
      <footer className="mt-auto py-6 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400 italic">
          Data is automatically persisted to your browser session. [cite: 5]
        </p>
      </footer>
    </div>
  );
}