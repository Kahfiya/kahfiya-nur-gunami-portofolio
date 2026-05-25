"use client";

/**
 * HomeStats — scrub-driven counter + reveal
 * Counter value is driven by scroll position (not time-based autoplay).
 * The user's hand literally counts the numbers up.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface StatData {
  value: number;
  suffix: string;
  labelKey: string;
  subKey: string;
}

const STATS: StatData[] = [
  { value: 4,   suffix: "+", labelKey: "stats.projects.label", subKey: "stats.projects.sub" },
  { value: 10,  suffix: "+", labelKey: "stats.stack.label",    subKey: "stats.stack.sub"    },
  { value: 100, suffix: "%", labelKey: "stats.passion.label",  subKey: "stats.passion.sub"  },
];

export default function HomeStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Scrub-driven counter — the number follows your scroll ──────────────
      STATS.forEach((stat, i) => {
        const numEl = section.querySelector<HTMLElement>(`[data-stat="${i}"]`);
        if (!numEl) return;

        const proxy = { val: 0 };
        gsap.fromTo(
          proxy,
          { val: 0 },
          {
            val: stat.value,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
            onUpdate() {
              numEl.textContent = Math.round(proxy.val) + stat.suffix;
            },
          }
        );
      });

      // ── Staggered card reveal ──────────────────────────────────────────────
      const cards = section.querySelectorAll<HTMLElement>(".stat-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-stats-section px-md tablet:px-2xl py-2xl max-w-7xl mx-auto w-full"
    >
      <div className="grid grid-cols-1 tablet:grid-cols-3 divide-y tablet:divide-y-0 tablet:divide-x
                      divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)]
                      bg-[var(--color-bg-primary)] overflow-hidden shadow-sm">
        {STATS.map((stat, i) => (
          <div
            key={stat.labelKey}
            className="stat-card relative flex flex-col items-center text-center gap-2 px-xl py-3xl group"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(249,115,22,0.07) 0%, transparent 70%)" }}
            />
            {/* Number — driven by scrub */}
            <span
              data-stat={i}
              className="font-serif font-black text-[var(--color-text-primary)] leading-none tabular-nums"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4rem)" }}
            >
              0{stat.suffix}
            </span>
            <span className="font-sans text-sm font-semibold text-[var(--color-text-primary)]">
              {t(stat.labelKey)}
            </span>
            <span className="font-sans text-xs text-[var(--color-text-secondary)]">
              {t(stat.subKey)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
