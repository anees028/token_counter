"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { locale, toggleLocale, t } = useLocale();

  const links = [
    { name: t.nav.chat, href: "/", icon: "💬" },
    { name: t.nav.stats, href: "/stats", icon: "📊" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-8">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter italic">
          TOKEN.APP
        </h1>
      </div>
      
      {/* Navigation Links  */}
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Language Switcher & Footer */}
      <div className="p-6 border-t border-slate-100 space-y-4">
        <button 
          onClick={toggleLocale}
          className="w-full flex items-center justify-between px-4 py-2 bg-slate-200 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
        >
          <span className="text-slate-500 uppercase tracking-widest">
            {locale === 'en' ? 'Language' : 'Sprache'}
          </span>
          <span>{locale === 'en' ? '🇩🇪 DE' : '🇺🇸 EN'}</span>
        </button>

        <div className="bg-slate-50 p-4 rounded-xl text-[10px] text-slate-400 font-semibold uppercase tracking-widest text-center">
          {locale === 'en' ? 'Desktop Only Mode' : 'Nur Desktop-Modus'} 
        </div>
      </div>
    </aside>
  );
}