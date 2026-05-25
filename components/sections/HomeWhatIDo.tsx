"use client";

/**
 * HomeWhatIDo — High-end GSAP scrub with staggered card reveals
 * Each card slides in from below with scale + rotation for depth.
 * Heading uses clip-path wipe per word.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    titleKey: "whatido.frontend.title",
    descKey: "whatido.frontend.desc",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    accent: "#3b82f6",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    titleKey: "whatido.design.title",
    descKey: "whatido.design.desc",
    tags: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    accent: "#a855f7",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    titleKey: "whatido.creative.title",
    descKey: "whatido.creative.desc",
    tags: ["Framer Motion", "GSAP", "Blender", "3D"],
    accent: "#f97316",
  },
];

export default function HomeWhatIDo() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Label + heading clip wipe ──────────────────────────────────────────
      const headingWords = section.querySelectorAll<HTMLElement>(".whatido-word");
      gsap.fromTo(headingWords,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)", opacity: 1,
          ease: "expo.out", stagger: 0.06,
          scrollTrigger: {
            trigger: section.querySelector(".whatido-heading"),
            start: "top 88%", end: "top 45%",
            scrub: 1.2, invalidateOnRefresh: true,
          },
        }
      );

      // ── Cards — dramatic stagger with rotation ─────────────────────────────
      const cards = section.querySelectorAll<HTMLElement>(".service-card");
      gsap.fromTo(cards,
        { opacity: 0, y: 80, scale: 0.88, rotateX: 8, transformOrigin: "center bottom" },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          ease: "expo.out", stagger: 0.15,
          scrollTrigger: {
            trigger: section.querySelector(".service-grid"),
            start: "top 85%", end: "top 15%",
            scrub: 1.5, invalidateOnRefresh: true,
          },
        }
      );

      // ── Accent line on each card — draws in on scroll ──────────────────────
      const lines = section.querySelectorAll<HTMLElement>(".card-accent-line");
      gsap.fromTo(lines,
        { scaleX: 0 },
        {
          scaleX: 1, ease: "expo.out", stagger: 0.15,
          scrollTrigger: {
            trigger: section.querySelector(".service-grid"),
            start: "top 80%", end: "top 20%",
            scrub: 1.5, invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full" style={{ perspective: "1000px" }}>

      {/* Heading */}
      <div className="whatido-heading mb-2xl">
        <p className="whatido-word font-sans text-xs tracking-[0.2em] uppercase text-accent-500 mb-3 inline-block">
          — Services
        </p>
        <h2 className="font-serif font-bold text-[var(--color-text-primary)] flex flex-wrap gap-x-[0.25em]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          {t("whatido.title").split(" ").map((w, i) => (
            <span key={i} className="whatido-word inline-block">{w}</span>
          ))}
        </h2>
        <p className="whatido-word font-sans text-[var(--color-text-secondary)] mt-3 max-w-xl inline-block"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}>
          {t("whatido.subtitle")}
        </p>
      </div>

      {/* Cards */}
      <div className="service-grid grid grid-cols-1 tablet:grid-cols-3 gap-lg">
        {SERVICES.map((svc) => (
          <div
            key={svc.titleKey}
            className="service-card group relative flex flex-col gap-md p-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            style={{ willChange: "transform" }}
          >
            {/* Accent line — drawn by scrub */}
            <div
              className="card-accent-line absolute top-0 left-0 right-0 h-[2px] origin-left"
              style={{ background: `linear-gradient(90deg, ${svc.accent}, transparent)` }}
            />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at top left, ${svc.accent}10 0%, transparent 60%)` }} />

            <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${svc.accent}15`, color: svc.accent }}>
              {svc.icon}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[var(--color-text-primary)] mb-2">{t(svc.titleKey)}</h3>
              <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed">{t(svc.descKey)}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {svc.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] font-sans">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
