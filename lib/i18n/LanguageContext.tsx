"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translationsEN, translationsID, Language } from "./translations";

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
      const saved = localStorage.getItem("kng_language");
      if (saved === "en" || saved === "id") {
        // Valid stored value — apply it
        setLanguageState(saved);
      } else if (saved !== null) {
        // Invalid stored value — overwrite with default "en"
        localStorage.setItem("kng_language", "en");
        // State already defaults to "en", no change needed
      }
      // null means nothing stored — keep default "en" state, no action needed
    } catch {
      // localStorage unavailable — keep default language "en"
    }
  }, []);

  const setLanguage = (lang: Language) => {
    if (lang !== "en" && lang !== "id") return;
    setLanguageState(lang);
    try {
      localStorage.setItem("kng_language", lang);
    } catch {
      // localStorage unavailable — language state still updated
    }
  };

  // Translation function — returns translated string or key as fallback
  const t = (key: string): string => {
    if (key === "") return "";
    const dict = language === "en" ? translationsEN : translationsID;
    const val = dict[key];
    if (!val || !val.trim()) return key;
    return val;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
