"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SOCIALS = [
  {
    label: "Email",
    href: "mailto:kahfiyanurgunami@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/kahfiya",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kahfiya-nur-gunami/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const NAV_LINKS_STATIC = [
  { href: "/",        key: null,          fallback: "Home" },
  { href: "/about",   key: "nav.about",   fallback: "About" },
  { href: "/work",    key: "nav.project", fallback: "Project" },
  { href: "/contact", key: "nav.contact", fallback: "Contact" },
];

// ─── Scrolling name watermark ─────────────────────────────────────────────────
function NameMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: "-50%",
        ease: "none",
        duration: 28,
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => x % (track.scrollWidth / 2)),
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const segment = (
    <span
      className="inline-flex items-center gap-8 pr-8 font-serif font-black uppercase whitespace-nowrap select-none"
      style={{ fontSize: "clamp(5rem, 12vw, 11rem)", color: "rgba(0,0,0,0.05)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
    >
      KAHFIYA NUR GUNAMI
      <motion.span
        style={{ color: "rgba(249,115,22,0.08)", display: "inline-block" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >✦</motion.span>
    </span>
  );

  return (
    <div className="absolute inset-x-0 overflow-visible pointer-events-none" aria-hidden="true" style={{ top: "calc(50% + 24px)", transform: "translateY(-50%)", height: "clamp(6.5rem, 15vw, 14rem)" }}>
      <div ref={trackRef} className="flex w-max">
        {segment}{segment}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const { t } = useLanguage();

  const navLinks = NAV_LINKS_STATIC.map((l) => ({
    href: l.href,
    label: l.key ? t(l.key) : l.fallback,
  }));

  return (
    <footer
      ref={ref}
      className="relative border-t border-[var(--color-border)]"
      style={{ background: "transparent" }}
    >
      {/* Scrolling name watermark */}
      <NameMarquee />

      {/* Main content */}
      <div className="relative z-10 px-md tablet:px-2xl desktop:px-3xl pt-3xl pb-2xl max-w-[1280px] mx-auto">

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

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-black leading-[1.05] text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            {t("contact.heading1")}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-black leading-[1.05] text-accent-500"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            {t("contact.heading2")}
          </motion.h2>

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

        {/* Socials + contact */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-2xl mb-3xl"
        >
            {/* Socials — icon only */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-secondary)] mb-lg">
                {t("contact.socials.label")}
              </p>
              <div className="flex items-center gap-md">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-accent-500 hover:text-accent-500 transition-all duration-200"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact email */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-secondary)] mb-sm">
                CONTACT
              </p>
              <a
                href="mailto:kahfiyanurgunami@gmail.com"
                className="font-sans text-sm text-[var(--color-text-primary)] hover:text-accent-500 transition-colors duration-200"
              >
                kahfiyanurgunami@gmail.com
              </a>
            </div>
          </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--color-border)] pt-xl flex flex-col tablet:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} Kahfiya Nur Gunami.
          </p>
          <nav className="flex items-center gap-xl" aria-label="Footer navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-xs text-[var(--color-text-secondary)] hover:text-accent-500 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
