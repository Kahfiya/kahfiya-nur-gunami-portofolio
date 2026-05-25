"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ContactForm = dynamic(() => import("@/components/ui/ContactForm"), { ssr: false });

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const SOCIALS = [
    {
      label: "Email",
      value: "kahfiyanurgunami@gmail.com",
      href: "mailto:kahfiyanurgunami@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-accent-500">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/Kahfiya Nur Gunami",
      href: "https://github.com/kahfiya",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0 text-accent-500">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/Kahfiya Nur Gunami",
      href: "https://www.linkedin.com/in/kahfiya-nur-gunami/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0 text-accent-500">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* ── Heading ── */}
      <div className="px-md tablet:px-2xl desktop:px-3xl pt-3xl pb-2xl max-w-[1280px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-[var(--color-text-secondary)] text-sm tracking-widest uppercase mb-4"
        >
          {t("contact.subtitle")}
        </motion.p>

        <div className="overflow-hidden pb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif leading-none text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            {t("contact.heading1")}
          </motion.h1>
        </div>
        <div className="overflow-hidden pb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif leading-none text-accent-500"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            {t("contact.heading2")}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-[var(--color-text-secondary)] text-base tablet:text-lg mt-xl max-w-lg leading-relaxed"
        >
          {t("contact.intro")}
        </motion.p>
      </div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="h-px bg-[var(--color-border)] mx-md tablet:mx-2xl desktop:mx-3xl origin-left"
      />

      {/* ── Content ── */}
      <div className="px-md tablet:px-2xl desktop:px-3xl py-2xl max-w-[1280px] mx-auto grid grid-cols-1 tablet:grid-cols-2 gap-3xl">

        {/* Socials */}
        <div className="flex flex-col gap-xl">
          <p className="font-sans text-[var(--color-text-secondary)] text-xs tracking-widest uppercase">
            {t("contact.socials.label")}
          </p>
          <div className="flex flex-col gap-lg">
            {SOCIALS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <p className="font-sans text-[var(--color-text-secondary)] text-xs mb-1">{s.label}</p>
                <Link
                  href={s.href}
                  className="font-sans text-[var(--color-text-primary)] text-base hover:text-accent-500 transition-colors duration-200 group flex items-center gap-2"
                >
                  {s.icon}
                  {s.value}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-500">→</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {!showForm && !submitted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              onClick={() => setShowForm(true)}
              className="mt-xl self-start px-xl py-md bg-accent-500 text-white font-sans font-bold text-sm rounded-full hover:bg-accent-600 transition-colors"
            >
              {t("contact.cta")}
            </motion.button>
          )}
        </div>

        {/* Form / Success */}
        <div>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-md py-2xl"
              aria-live="polite"
            >
              <div className="w-20 h-20 rounded-full bg-accent-500/20 flex items-center justify-center">
                <svg viewBox="0 0 52 52" className="w-10 h-10" fill="none">
                  <motion.path
                    d="M14 27 l9 9 l16-18"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </div>
              <p className="font-serif text-2xl text-[var(--color-text-primary)] text-center">{t("form.success.heading")}</p>
              <p className="font-sans text-[var(--color-text-secondary)] text-sm text-center">{t("form.success.body")}</p>
            </motion.div>
          ) : showForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ContactForm onSuccess={() => setSubmitted(true)} />
            </motion.div>
          ) : (
            <div className="hidden tablet:block" />
          )}
        </div>
      </div>
    </main>
  );
}
