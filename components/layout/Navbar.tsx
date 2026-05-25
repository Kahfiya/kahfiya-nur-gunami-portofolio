"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, type Variants } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useClickSound } from "@/hooks/useClickSound";

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

// ─── Animated Hamburger Icon ──────────────────────────────────────────────────

function HamburgerIcon({ isOpen, transparent }: { isOpen: boolean; transparent: boolean }) {
  const color = transparent ? "#ffffff" : "#171717";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Top bar */}
      <motion.line
        x1="3" y1="6" x2="21" y2="6"
        stroke={color} strokeWidth="1.75" strokeLinecap="round"
        animate={isOpen ? { x1: 4, y1: 4, x2: 20, y2: 20 } : { x1: 3, y1: 6, x2: 21, y2: 6 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Middle bar */}
      <motion.line
        x1="3" y1="12" x2="21" y2="12"
        stroke={color} strokeWidth="1.75" strokeLinecap="round"
        animate={isOpen ? { opacity: 0, x1: 12, x2: 12 } : { opacity: 1, x1: 3, x2: 21 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      {/* Bottom bar */}
      <motion.line
        x1="3" y1="18" x2="21" y2="18"
        stroke={color} strokeWidth="1.75" strokeLinecap="round"
        animate={isOpen ? { x1: 4, y1: 20, x2: 20, y2: 4 } : { x1: 3, y1: 18, x2: 21, y2: 18 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      />
    </svg>
  );
}

// ─── Mobile Menu Overlay ──────────────────────────────────────────────────────

function MobileMenu({
  isOpen,
  links,
  pathname,
  onClose,
  t,
  playSound,
}: {
  isOpen: boolean;
  links: NavLink[];
  pathname: string;
  onClose: () => void;
  t: (key: string) => string;
  playSound: (type: string) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [0, 1], ["0%", "4%"]);
  const bgY = useTransform(mouseY, [0, 1], ["0%", "4%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ backdropFilter: "blur(0px)" }}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Panel — slides in from right */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col overflow-hidden"
            style={{ width: "min(360px, 100vw)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            onMouseMove={handleMouseMove}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #1a0a00 100%)",
                x: bgX,
                y: bgY,
                scale: 1.08,
              }}
            />

            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Accent glow */}
            <motion.div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }}
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full px-8 pt-20 pb-10">

              {/* Nav links */}
              <nav className="flex flex-col gap-1 flex-1 justify-center" aria-label="Mobile navigation">
                {links.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: 40, filter: "blur(4px)" }}
                      transition={{
                        duration: 0.45,
                        delay: isOpen ? 0.15 + i * 0.08 : i * 0.04,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => { playSound("nav"); onClose(); }}
                        className="group relative flex items-center gap-4 py-4 overflow-hidden"
                      >
                        {/* Index number */}
                        <motion.span
                          className="font-sans text-[10px] tracking-[0.2em] text-white/20 w-5 shrink-0"
                          animate={isActive ? { color: "rgba(249,115,22,0.6)" } : {}}
                        >
                          0{i + 1}
                        </motion.span>

                        {/* Link text */}
                        <span
                          className="font-serif leading-none transition-colors duration-300"
                          style={{
                            fontSize: "clamp(2rem, 8vw, 2.75rem)",
                            color: isActive ? "#f97316" : "rgba(255,255,255,0.85)",
                          }}
                        >
                          {t(link.translationKey)}
                        </span>

                        {/* Hover underline */}
                        <motion.span
                          className="absolute bottom-3 left-9 h-px bg-accent-500 origin-left"
                          initial={{ scaleX: isActive ? 1 : 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          style={{ width: "calc(100% - 2.25rem)" }}
                        />

                        {/* Arrow */}
                        <motion.span
                          className="ml-auto text-white/20 text-lg"
                          initial={{ x: -8, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.span>
                      </Link>

                      {/* Divider */}
                      {i < links.length - 1 && (
                        <motion.div
                          className="h-px bg-white/5"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer */}
              <motion.div
                className="flex items-center justify-between pt-6 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/25">
                  KNG · Portfolio
                </span>
                <LanguageToggle />
              </motion.div>
            </div>

            {/* Left border accent */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(249,115,22,0.4), transparent)" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
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

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isHome      = pathname === "/";
  const transparent = isHome && !scrolled;

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

      <header
        className={[
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-neutral-50/80 border-b border-neutral-200"
            : "bg-transparent",
        ].join(" ")}
      >
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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => playSound("nav")}
                className={[
                  "relative px-4 py-2 font-sans text-sm transition-colors duration-200",
                  pathname === link.href
                    ? transparent ? "text-white font-medium" : "text-neutral-900 font-medium"
                    : transparent ? "text-white/70 hover:text-white font-normal" : "text-neutral-500 hover:text-neutral-900 font-normal",
                ].join(" ")}
              >
                {t(link.translationKey)}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-px bg-accent-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <div className={`w-px h-4 mx-2 ${transparent ? "bg-white/30" : "bg-neutral-200"}`} />
            <LanguageToggle />
          </nav>

          {/* Mobile hamburger */}
          <div className="nav-mobile items-center gap-sm">
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((p) => !p)}
              className={[
                "relative flex items-center justify-center w-11 h-11 rounded-xl transition-colors z-[60]",
                isOpen
                  ? "text-white"
                  : transparent
                    ? "text-white hover:bg-white/10"
                    : "text-neutral-700 hover:bg-neutral-100",
              ].join(" ")}
            >
              <HamburgerIcon isOpen={isOpen} transparent={transparent || isOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <MobileMenu
        isOpen={isOpen}
        links={links}
        pathname={pathname}
        onClose={() => setIsOpen(false)}
        t={t}
        playSound={playSound}
      />
    </>
  );
}
