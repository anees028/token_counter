"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/locales/en';
import { de } from '@/locales/de';

const translations = { en, de };

const LocaleContext = createContext<any>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'de'>('en');

  // Persist language choice
  useEffect(() => {
    const saved = localStorage.getItem('app_locale') as 'en' | 'de';
    if (saved) setLocale(saved);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'de' : 'en';
    setLocale(newLocale);
    localStorage.setItem('app_locale', newLocale);
  };

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);