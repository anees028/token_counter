"use client";
import { useChat } from "@/context/ChatContext";
import { GLOBAL_LIMIT } from "@/utils/token-logic"; // 
import StatsCard from "@/components/stats/StatsCard";
import { useLocale } from "@/context/LocaleContext";

export default function StatsPage() {
  const { totalUsed, messages } = useChat();
  const { locale, toggleLocale, t } = useLocale();
  
  // Calculate logic for remaining tokens 
  const remaining = GLOBAL_LIMIT - totalUsed;
  const usagePercentage = (totalUsed / GLOBAL_LIMIT) * 100;

  return (
    <div className="flex flex-col h-screen py-8">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t.stats.header}</h2>
        <p className="text-slate-500">{t.stats.subheader}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Used Card  */}
        <StatsCard
          title={t.stats.used}
          value={totalUsed.toLocaleString()}
          subtext={`${t.stats.across} ${messages.length} ${t.stats.messages}`}
          icon="📤"
          iconBgColor="bg-blue-50 text-blue-600"
        />

        {/* Remaining Tokens Card  */}
        <StatsCard
          title={t.stats.remaining}
          value={Math.max(0, remaining).toLocaleString()}
          subtext={`${t.stats.limit} ${GLOBAL_LIMIT.toLocaleString()}`} // 
          icon="🔋"
          iconBgColor="bg-emerald-50 text-emerald-600"
          valueColor="text-emerald-500"
        />
      </div>

      {/* Utilization Progress Bar */}
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 ring-1 ring-slate-100">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t.stats.utilization}</h3>
            <p className="text-sm text-slate-500">{GLOBAL_LIMIT} token cap </p>
          </div>
          <span className={`text-xl font-black ${usagePercentage > 90 ? 'text-red-500' : 'text-blue-600'}`}>
            {usagePercentage.toFixed(1)}%
          </span>
        </div>

        <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden p-1 shadow-inner">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              usagePercentage > 90 ? 'bg-red-500' : 'bg-blue-600'
            }`} 
            style={{ width: `${Math.min(100, usagePercentage)}%` }}
          />
        </div>
      </div>
    </div>
  );
}