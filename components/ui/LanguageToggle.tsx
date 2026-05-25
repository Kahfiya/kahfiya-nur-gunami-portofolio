"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/translations";

// ─── Inline SVG flags — no external requests ──────────────────────────────────

function FlagGB({ size }: { size: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/Flag Language/English.png" alt="English" width={size} height={Math.round(size * 0.67)}
      style={{ width: size, height: Math.round(size * 0.67), objectFit: "cover", borderRadius: 2, flexShrink: 0, display: "block" }} />
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
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/Flag Language/Malaysia.png" alt="Malaysia" width={size} height={Math.round(size * 0.67)}
      style={{ width: size, height: Math.round(size * 0.67), objectFit: "cover", borderRadius: 2, flexShrink: 0, display: "block" }} />
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
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/Flag Language/Japan.png" alt="Japan" width={size} height={Math.round(size * 0.67)}
      style={{ width: size, height: Math.round(size * 0.67), objectFit: "cover", borderRadius: 2, flexShrink: 0, display: "block" }} />
  );
}

function FlagCN({ size }: { size: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/Flag Language/China.png" alt="China" width={size} height={Math.round(size * 0.67)}
      style={{ width: size, height: Math.round(size * 0.67), objectFit: "cover", borderRadius: 2, flexShrink: 0, display: "block" }} />
  );
}

function FlagKR({ size }: { size: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/Flag Language/Korea.png" alt="Korea" width={size} height={Math.round(size * 0.67)}
      style={{ width: size, height: Math.round(size * 0.67), objectFit: "cover", borderRadius: 2, flexShrink: 0, display: "block" }} />
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

export const FlagComponents: Record<Language, React.FC<{ size: number }>> = {
  en: FlagGB,
  id: FlagID,
  my: FlagMY,
  ru: FlagRU,
  jp: FlagJP,
  cn: FlagCN,
  kr: FlagKR,
  hi: FlagIN,
};

export const LANGUAGES: { code: Language; native: string }[] = [
  { code: "en", native: "English"   },
  { code: "id", native: "Indonesia" },
  { code: "my", native: "Malaysia"  },
  { code: "ru", native: "Русский"   },
  { code: "jp", native: "日本語"     },
  { code: "cn", native: "中文"       },
  { code: "kr", native: "한국어"     },
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
  const CurrentFlag = FlagComponents[language];

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
              const LangFlag = FlagComponents[lang.code];
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
