"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useClickSound } from "@/hooks/useClickSound";
import type { Language } from "@/lib/i18n/translations";
import {
  FlagComponents,
  LANGUAGES,
} from "@/components/ui/LanguageToggle";

import Magnetic from "@/components/ui/Magnetic";

type SoundType = "nav" | "lang-en" | "lang-id";

interface NavLink {
  label: string;
  href: string;
  translationKey: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "About",   href: "/about",   translationKey: "nav.about" },
  { label: "Project", href: "/work",    translationKey: "nav.project" },
  { label: "Contact", href: "/contact", translationKey: "nav.contact" },
];

// ─── Hamburger icon ───────────────────────────────────────────────────────────

function HamburgerIcon({ isOpen, color }: { isOpen: boolean; color: string }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between" aria-hidden="true">
      <motion.span className="block h-[1.75px] rounded-full origin-center" style={{ background: color }}
        animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }} />
      <motion.span className="block h-[1.75px] rounded-full" style={{ background: color }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }} />
      <motion.span className="block h-[1.75px] rounded-full origin-center" style={{ background: color }}
        animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }} />
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  isOpen, links, pathname, onClose, t, playSound,
}: {
  isOpen: boolean;
  links: NavLink[];
  pathname: string;
  onClose: () => void;
  t: (key: string) => string;
  playSound: (type: SoundType) => void;
}) {
  const { language, setLanguage } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col overflow-y-auto"
            style={{ width: "min(340px, 88vw)", background: "#111111", willChange: "transform" }}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Top accent */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent-500 to-transparent shrink-0" />

            {/* Header row */}
            <div className="flex items-center justify-between px-6 pt-5 pb-2 shrink-0">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/25">
                Kahfiya Nur Gunami
              </span>
              <button onClick={onClose} aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="2" y1="2" x2="14" y2="14" /><line x1="14" y1="2" x2="2" y2="14" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 pt-4 pb-2 shrink-0" aria-label="Mobile navigation">
              {links.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href}
                    initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, delay: 0.05 + i * 0.06, ease: "easeOut" }}>
                    <Link href={link.href}
                      onClick={() => { playSound("nav"); onClose(); }}
                      className="flex items-center gap-4 py-4 group">
                      <span className="font-sans text-[10px] tracking-widest w-5 shrink-0"
                        style={{ color: isActive ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.2)" }}>
                        0{i + 1}
                      </span>
                      <span className="font-serif leading-none"
                        style={{ fontSize: "clamp(1.6rem, 6.5vw, 2.4rem)", color: isActive ? "#f97316" : "rgba(255,255,255,0.88)" }}>
                        {t(link.translationKey)}
                      </span>
                      {isActive && <span className="ml-auto text-accent-500">→</span>}
                    </Link>
                    {i < links.length - 1 && <div className="h-px bg-white/[0.06]" />}
                  </motion.div>
                );
              })}
            </nav>

            {/* ── Language section ── */}
            <motion.div
              className="px-6 pt-4 pb-6 shrink-0"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.28, duration: 0.3 }}
            >
              <div className="border-t border-white/[0.08] pt-5">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">
                  Language
                </p>

                {/* 2-column grid of language buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((lang) => {
                    const isActive = lang.code === language;
                    const LangFlag = FlagComponents[lang.code];
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setLanguage(lang.code)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 active:scale-95"
                        style={{
                          background: isActive ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${isActive ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.08)"}`,
                        }}
                      >
                        <LangFlag size={26} />
                        <span className="font-sans text-sm font-medium leading-none"
                          style={{ color: isActive ? "#f97316" : "rgba(255,255,255,0.75)" }}>
                          {lang.native}
                        </span>
                        {isActive && (
                          <svg className="ml-auto shrink-0" width="12" height="12" viewBox="0 0 12 12"
                            fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round">
                            <path d="M2 6 L5 9 L10 3" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar({ links = DEFAULT_LINKS }: { links?: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen]     = useState(false);
  const pathname  = usePathname();
  const { t }     = useLanguage();
  const playSound = useClickSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isHome      = pathname === "/";
  const transparent = isHome && !scrolled;
  const iconColor   = isOpen ? "#ffffff" : transparent ? "#ffffff" : "#171717";

  return (
    <>
      <style>{`
        .nav-desktop { display: none; }
        .nav-mobile  { display: flex; }
        @media (min-width: 1024px) {
          .nav-desktop { display: flex; }
          .nav-mobile  { display: none; }
        }
      `}</style>

      <header className={["sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "backdrop-blur-md bg-neutral-50/80 border-b border-neutral-200" : "bg-transparent"].join(" ")}>
        <div className="max-w-screen-desktop-lg mx-auto px-md flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" aria-label="K.N.G — home" className="group flex items-center gap-2">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="shrink-0">
              <path d="M2 2 H34 V28 L28 34 H2 Z" fill={transparent ? "white" : "#171717"} className="transition-all duration-300 group-hover:fill-accent-500" />
              <path d="M7 10 L7 26 M7 18 L13 10 M7 18 L13 26" stroke={transparent ? "#171717" : "white"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 26 L16 10 L22 26 L22 10" stroke={transparent ? "#171717" : "white"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M30 13 C28.5 10.5 25 10 23.5 12.5 C22 15 22 21 23.5 23.5 C25 26 29 26 30 24 L30 19 L27.5 19" stroke={transparent ? "#171717" : "white"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M28 34 L34 28" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="nav-desktop items-center gap-xs">
            {links.map((link) => (
              <Magnetic key={link.href} strength={0.3}>
                <Link href={link.href} onClick={() => playSound("nav")}
                  className={["relative px-4 py-2 font-sans text-sm transition-colors duration-200",
                    pathname === link.href
                      ? transparent ? "text-white font-medium" : "text-neutral-900 font-medium"
                      : transparent ? "text-white/70 hover:text-white font-normal" : "text-neutral-500 hover:text-neutral-900 font-normal",
                  ].join(" ")}>
                  {t(link.translationKey)}
                  {pathname === link.href && (
                    <motion.span layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-px bg-accent-500"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                </Link>
              </Magnetic>
            ))}
            <div className={`w-px h-4 mx-2 ${transparent ? "bg-white/30" : "bg-neutral-200"}`} />
            <LanguageToggle />
          </nav>

          {/* Mobile hamburger */}
          <div className="nav-mobile items-center gap-2">
            <button type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((p) => !p)}
              className="relative flex items-center justify-center w-11 h-11 rounded-xl transition-colors z-[60]">
              <HamburgerIcon isOpen={isOpen} color={iconColor} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} links={links} pathname={pathname}
        onClose={() => setIsOpen(false)} t={t} playSound={playSound} />
    </>
  );
}
