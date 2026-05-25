"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  translationsEN, translationsID, translationsRU,
  translationsJA, translationsZH, translationsKO,
  translationsHI, translationsMS, Language,
} from "./translations";

const DICTS: Record<Language, Record<string, string>> = {
  en: translationsEN,
  id: translationsID,
  ru: translationsRU,
  jp: translationsJA,
  cn: translationsZH,
  kr: translationsKO,
  hi: translationsHI,
  my: translationsMS,
};

const VALID: Language[] = ["en", "id", "ru", "jp", "cn", "kr", "hi", "my"];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kng_language") as Language | null;
      if (saved && VALID.includes(saved)) setLanguageState(saved);
    } catch { /* localStorage unavailable */ }
  }, []);

  const setLanguage = (lang: Language) => {
    if (!VALID.includes(lang)) return;
    setLanguageState(lang);
    try { localStorage.setItem("kng_language", lang); } catch { /* ignore */ }
  };

  const t = (key: string): string => {
    if (!key) return "";
    const val = DICTS[language]?.[key] || DICTS["en"]?.[key];
    return val?.trim() ? val : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
