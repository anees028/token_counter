"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: string;
  iconBgColor: string;
  valueColor?: string;
}

export default function StatsCard({
  title,
  value,
  subtext,
  icon,
  iconBgColor,
  valueColor = "text-slate-900",
}: StatsCardProps) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 ring-1 ring-slate-100 transition-hover hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <span className={`p-2 ${iconBgColor} rounded-lg text-xl`}>{icon}</span>
        <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">
          {title}
        </h3>
      </div>
      <p className={`text-6xl font-black tracking-tighter ${valueColor}`}>
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-400 font-medium">
        {subtext}
      </p>
    </div>
  );
}