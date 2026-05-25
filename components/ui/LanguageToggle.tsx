"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/translations";

// ─── Inline SVG flags — no external requests ──────────────────────────────────

function FlagGB({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="60" height="36" fill="#012169"/>
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="7.2"/>
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="4.8"/>
      <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="12"/>
      <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="7.2"/>
    </svg>
  );
}

function FlagID({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="3" height="1" fill="#CE1126"/>
      <rect y="1" width="3" height="1" fill="#fff"/>
    </svg>
  );
}

function FlagMY({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="28" height="14" fill="#fff"/>
      {[0,2,4,6,8,10,12].map(y => <rect key={y} y={y} width="28" height="1" fill="#CC0001"/>)}
      <rect width="14" height="7" fill="#006847"/>
      <circle cx="6" cy="3.5" r="2.2" fill="#FFD100"/>
      <circle cx="6.8" cy="3.5" r="1.7" fill="#006847"/>
      <polygon points="9.5,3.5 8.8,2.2 10.2,2.2 9.5,1 10.9,1.8 10.5,0.3 11.5,1.4 11.5,0 12.5,1.4 12.5,0.3 13.5,1.8 12.1,1 13.5,2.2 11.8,2.2" fill="#FFD100"/>
    </svg>
  );
}

function FlagRU({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="3" height="0.667" fill="#fff"/>
      <rect y="0.667" width="3" height="0.667" fill="#0039A6"/>
      <rect y="1.333" width="3" height="0.667" fill="#D52B1E"/>
    </svg>
  );
}

function FlagJP({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="3" height="2" fill="#fff"/>
      <circle cx="1.5" cy="1" r="0.6" fill="#BC002D"/>
    </svg>
  );
}

function FlagCN({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="30" height="20" fill="#DE2910"/>
      <polygon points="5,2 6.18,5.09 9.51,5.09 6.9,7.01 7.94,10.18 5,8.5 2.06,10.18 3.1,7.01 0.49,5.09 3.82,5.09" fill="#FFDE00"/>
      <polygon points="11,1 11.59,2.81 13.49,2.81 12,3.88 12.55,5.69 11,4.7 9.45,5.69 10,3.88 8.51,2.81 10.41,2.81" fill="#FFDE00" transform="scale(0.5) translate(12,2)"/>
      <polygon points="11,1 11.59,2.81 13.49,2.81 12,3.88 12.55,5.69 11,4.7 9.45,5.69 10,3.88 8.51,2.81 10.41,2.81" fill="#FFDE00" transform="scale(0.5) translate(16,5)"/>
      <polygon points="11,1 11.59,2.81 13.49,2.81 12,3.88 12.55,5.69 11,4.7 9.45,5.69 10,3.88 8.51,2.81 10.41,2.81" fill="#FFDE00" transform="scale(0.5) translate(16,10)"/>
      <polygon points="11,1 11.59,2.81 13.49,2.81 12,3.88 12.55,5.69 11,4.7 9.45,5.69 10,3.88 8.51,2.81 10.41,2.81" fill="#FFDE00" transform="scale(0.5) translate(12,14)"/>
    </svg>
  );
}

function FlagKR({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="30" height="20" fill="#fff"/>
      <circle cx="15" cy="10" r="5" fill="#CD2E3A"/>
      <path d="M15,5 A5,5 0 0,1 15,15 Z" fill="#003478"/>
      <line x1="4" y1="4" x2="8" y2="8" stroke="#000" strokeWidth="1.2"/>
      <line x1="3" y1="6" x2="7" y2="10" stroke="#000" strokeWidth="1.2"/>
      <line x1="2" y1="8" x2="6" y2="12" stroke="#000" strokeWidth="1.2"/>
      <line x1="22" y1="8" x2="26" y2="4" stroke="#000" strokeWidth="1.2"/>
      <line x1="23" y1="10" x2="27" y2="6" stroke="#000" strokeWidth="1.2"/>
      <line x1="24" y1="12" x2="28" y2="8" stroke="#000" strokeWidth="1.2"/>
    </svg>
  );
}

function FlagIN({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="3" height="0.667" fill="#FF9933"/>
      <rect y="0.667" width="3" height="0.667" fill="#fff"/>
      <rect y="1.333" width="3" height="0.667" fill="#138808"/>
      <circle cx="1.5" cy="1" r="0.2" fill="none" stroke="#000080" strokeWidth="0.04"/>
      <circle cx="1.5" cy="1" r="0.04" fill="#000080"/>
    </svg>
  );
}

const FLAG_COMPONENTS: Record<Language, React.FC<{ size: number }>> = {
  en: FlagGB,
  id: FlagID,
  ms: FlagMY,
  ru: FlagRU,
  ja: FlagJP,
  zh: FlagCN,
  ko: FlagKR,
  hi: FlagIN,
};

const LANGUAGES: { code: Language; native: string }[] = [
  { code: "en", native: "English"   },
  { code: "id", native: "Indonesia" },
  { code: "ms", native: "Melayu"    },
  { code: "ru", native: "Русский"   },
  { code: "ja", native: "日本語"     },
  { code: "zh", native: "中文"       },
  { code: "ko", native: "한국어"     },
  { code: "hi", native: "हिन्दी"     },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
  const CurrentFlag = FLAG_COMPONENTS[language];

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.native}`}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-all duration-150 select-none"
        style={{
          background: open ? "rgba(249,115,22,0.1)" : "transparent",
          border: `1px solid ${open ? "rgba(249,115,22,0.3)" : "transparent"}`,
          color: "inherit",
        }}
      >
        <CurrentFlag size={20} />
        <span className="tracking-wide uppercase">{language}</span>
        <motion.svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="opacity-40"
        >
          <path d="M2 3.5 L5 6.5 L8 3.5" />
        </motion.svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {mounted && open && (
          <motion.ul
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-1 w-48 rounded-xl overflow-hidden shadow-xl z-[200]"
            style={{
              background: "rgba(255,255,255,0.98)",
              border: "1px solid rgba(0,0,0,0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === language;
              const LangFlag = FLAG_COMPONENTS[lang.code];
              return (
                <li key={lang.code} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => { setLanguage(lang.code); setOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-100"
                    style={{
                      background: isActive ? "rgba(249,115,22,0.08)" : "transparent",
                      color: isActive ? "#ea580c" : "#404040",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }}
                  >
                    <LangFlag size={24} />
                    <span className="font-sans text-sm font-medium flex-1 leading-none">
                      {lang.native}
                    </span>
                    {isActive && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        stroke="#ea580c" strokeWidth="2" strokeLinecap="round">
                        <path d="M2 6 L5 9 L10 3" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
