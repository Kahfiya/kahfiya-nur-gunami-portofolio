"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ScrollScrub from "@/components/ui/ScrollScrub";

function useCounter(target: number, duration = 1.4, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / (duration * 1000), 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function Stat({ value, suffix = "", label, sub, delay, inView }: {
  value: number; suffix?: string; label: string; sub: string; delay: number; inView: boolean;
}) {
  const count = useCounter(value, 1.2, inView);
  return (
    <div
      className="relative flex flex-col items-center text-center gap-2 px-xl py-3xl group"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at center, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
      <span
        className="font-serif font-black text-[var(--color-text-primary)] leading-none tabular-nums"
        style={{ fontSize: "clamp(2.8rem, 5vw, 4rem)" }}
      >
        {count}{suffix}
      </span>
      <span className="font-sans text-sm font-semibold text-[var(--color-text-primary)]">{label}</span>
      <span className="font-sans text-xs text-[var(--color-text-secondary)]">{sub}</span>
    </div>
  );
}

export default function HomeStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="home-stats-section px-md tablet:px-2xl py-2xl max-w-7xl mx-auto w-full">
      <ScrollScrub stagger={0.05} start="top 90%" end="top 60%"
        className="grid grid-cols-1 tablet:grid-cols-3 divide-y tablet:divide-y-0 tablet:divide-x divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] overflow-hidden shadow-sm">
        <Stat value={4}   suffix="+" label={t("stats.projects.label")} sub={t("stats.projects.sub")}  delay={0}   inView={inView} />
        <Stat value={10}  suffix="+" label={t("stats.stack.label")}    sub={t("stats.stack.sub")}     delay={0.1} inView={inView} />
        <Stat value={100} suffix="%" label={t("stats.passion.label")}  sub={t("stats.passion.sub")}   delay={0.2} inView={inView} />
      </ScrollScrub>
    </section>
  );
}
