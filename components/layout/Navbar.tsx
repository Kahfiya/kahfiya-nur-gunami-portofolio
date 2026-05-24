"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useClickSound } from "@/hooks/useClickSound";

// ─── Types ────────────────────────────────────────────────────────────────────

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

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar({ links = DEFAULT_LINKS }: { links?: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pathname = usePathname();
  const { t } = useLanguage();
  const playSound = useClickSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { if (isDesktop) setIsOpen(false); }, [isDesktop]);
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-neutral-50/80 border-b border-neutral-200"
          : isHome ? "bg-transparent" : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-screen-desktop-lg mx-auto px-md flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" aria-label="K.N.G — home" className="group flex items-center gap-2">
          {/* Monogram mark */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            {/* Outer square with clipped corner */}
            <path
              d="M2 2 H34 V28 L28 34 H2 Z"
              fill={transparent ? "white" : "#171717"}
              className="transition-all duration-300 group-hover:fill-accent-500"
            />
            {/* K */}
            <path
              d="M7 10 L7 26 M7 18 L13 10 M7 18 L13 26"
              stroke={transparent ? "#171717" : "white"}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* N */}
            <path
              d="M16 26 L16 10 L22 26 L22 10"
              stroke={transparent ? "#171717" : "white"}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* G */}
            <path
              d="M30 13 C28.5 10.5 25 10 23.5 12.5 C22 15 22 21 23.5 23.5 C25 26 29 26 30 24 L30 19 L27.5 19"
              stroke={transparent ? "#171717" : "white"}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Clipped corner accent */}
            <path
              d="M28 34 L34 28"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>


        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-xs">
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

        {/* Hamburger (mobile) */}
        <div className="flex lg:hidden items-center gap-sm">
            <LanguageToggle />
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((p) => !p)}
              className={`flex items-center justify-center w-11 h-11 rounded transition-colors text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100`}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                {isOpen ? (
                  <><line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" /></>
                ) : (
                  <><line x1="3" y1="6" x2="17" y2="6" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="14" x2="17" y2="14" /></>
                )}
              </svg>
            </button>
          </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main navigation"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-t border-neutral-200 bg-neutral-50/95 backdrop-blur-md px-md py-sm"
          >
            <ul role="list" className="flex flex-col gap-xs">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "block py-3 px-md text-base font-sans transition-colors rounded",
                      pathname === link.href
                        ? "text-neutral-900 font-medium bg-neutral-100"
                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100",
                    ].join(" ")}
                  >
                    {t(link.translationKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
