"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ContactForm = dynamic(() => import("@/components/ui/ContactForm"), { ssr: false });

const SOCIALS = [
  {
    label: "Email",
    value: "kahfiyanurgunami@gmail.com",
    href: "mailto:kahfiyanurgunami@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/kahfiya",
    href: "https://github.com/kahfiya",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kahfiya-nur-gunami",
    href: "https://www.linkedin.com/in/kahfiya-nur-gunami/",
  },
];

const NAV_LINKS_STATIC = [
  { href: "/",        key: null,          fallback: "Home" },
  { href: "/about",   key: "nav.about",   fallback: "About" },
  { href: "/work",    key: "nav.project", fallback: "Project" },
  { href: "/contact", key: "nav.contact", fallback: "Contact" },
];

const MARQUEE_WORDS = ["STUDENT", "OPEN TO COLLABORATE", "LET'S BUILD TOGETHER", "BASED IN INDONESIA"];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const navLinks = NAV_LINKS_STATIC.map((l) => ({
    href: l.href,
    label: l.key ? t(l.key) : l.fallback,
  }));

  const MarqueeSegment = () => (
    <span className="font-sans font-black tracking-[0.25em] text-xs text-neutral-300 uppercase pr-8 inline-flex items-center gap-0">
      {MARQUEE_WORDS.map((word, i) => (
        <span key={i} className="inline-flex items-center">
          {word}
          <motion.span
            className="inline-block mx-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.span>
        </span>
      ))}
    </span>
  );

  return (
    <footer ref={ref} className="relative bg-[var(--color-bg-primary)] overflow-hidden border-t border-[var(--color-border)]">

      {/* ── Marquee strip ── */}
      <div className="border-b border-[var(--color-border)] py-4 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          {[...Array(4)].map((_, i) => (
            <MarqueeSegment key={i} />
          ))}
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <div className="px-md tablet:px-2xl desktop:px-3xl pt-3xl pb-2xl max-w-[1280px] mx-auto">

        {/* Big heading */}
        <div className="mb-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs tracking-[0.25em] uppercase text-accent-500 mb-4"
          >
            — {t("contact.subtitle")}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-black leading-[0.9] text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
            >
              {t("contact.heading1")}
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-black leading-[0.9] text-accent-500"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
            >
              {t("contact.heading2")}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-sans text-[var(--color-text-secondary)] mt-xl max-w-md leading-relaxed"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
          >
            {t("contact.intro")}
          </motion.p>
        </div>

        {/* Grid: socials left, form right */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3xl mb-3xl">

          {/* Left: socials + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-2xl"
          >
            <div>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-secondary)] mb-lg">
                {t("contact.socials.label")}
              </p>
              <div className="flex flex-col gap-md">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="group flex items-center justify-between py-3 border-b border-[var(--color-border)] hover:border-accent-500/40 transition-colors duration-300"
                  >
                    <div className="flex flex-col">
                      <span className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-secondary)]">{s.label}</span>
                      <span className="font-sans text-sm text-[var(--color-text-primary)] group-hover:text-accent-500 transition-colors duration-200 mt-0.5">{s.value}</span>
                    </div>
                    <span className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] group-hover:border-accent-500 group-hover:text-accent-500 group-hover:translate-x-1 transition-all duration-300 text-xs">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status badge */}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-md py-3xl" aria-live="polite">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)" }}>
                  <svg viewBox="0 0 52 52" className="w-8 h-8" fill="none">
                    <motion.path d="M14 27 l9 9 l16-18" stroke="#f97316" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }} />
                  </svg>
                </div>
                <p className="font-serif text-xl text-[var(--color-text-primary)] text-center">{t("form.success.heading")}</p>
                <p className="font-sans text-[var(--color-text-secondary)] text-sm text-center">{t("form.success.body")}</p>
              </div>
            ) : (
              <div className="rounded-2xl p-5" style={{ background: "#ebebeb" }}>
                <ContactForm onSuccess={() => setSubmitted(true)} />
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-[var(--color-border)] pt-xl flex flex-col tablet:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center">
              <span className="font-serif font-black text-white text-[10px] leading-none">KNG</span>
            </div>
            <p className="font-sans text-xs text-[var(--color-text-secondary)]">
              © {new Date().getFullYear()} Kahfiya Nur Gunami. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center gap-xl" aria-label="Footer navigation">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className="font-sans text-xs text-[var(--color-text-secondary)] hover:text-accent-500 transition-colors duration-200">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
