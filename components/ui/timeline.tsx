"use client";

/**
 * Timeline — Light theme, scroll-scrubbed vertical timeline
 *
 * - Follows site's light theme (white bg, dark text, orange accent)
 * - Vertical accent line scrubbed 1:1 by scroll (hand-controlled, no autoplay)
 * - Clean numbered index badge instead of ugly circle dot
 */

import { useScroll, useTransform, motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface TimelineEntry {
  title: string;
  subtitle?: string;
  period: string;
  description: string;
  tags?: string[];
  achievements?: string[];
}

// ─── Single Item ──────────────────────────────────────────────────────────────

function TimelineItem({ item, index }: { item: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <div ref={ref} className="relative pl-16 tablet:pl-24 py-6 last:pb-0">

      {/* ── Index badge ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute left-0 top-7 w-8 h-8 flex items-center justify-center
                   bg-accent-500 rounded-sm z-10 shadow-sm"
        aria-hidden="true"
      >
        <span className="font-serif font-black text-white text-[11px] leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      {/* ── Horizontal connector tick ── */}
      <div
        className="absolute left-8 top-[44px] w-8 h-px bg-accent-500/30"
        aria-hidden="true"
      />

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]
                   p-6 tablet:p-8 shadow-sm hover:shadow-md transition-shadow duration-300
                   hover:border-accent-500/30"
      >
        {/* Period */}
        <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-accent-500 mb-2">
          {item.period}
        </p>

        {/* Title */}
        <h3
          className="font-serif font-black text-[var(--color-text-primary)] leading-tight mb-1"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)" }}
        >
          {item.title}
        </h3>

        {/* Subtitle */}
        {item.subtitle && (
          <p className="font-sans text-sm text-[var(--color-text-secondary)] italic mb-4">
            {item.subtitle}
          </p>
        )}

        {/* Divider */}
        <div className="h-px bg-[var(--color-border)] my-4" />

        {/* Description */}
        <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5 max-w-2xl">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] tracking-widest uppercase px-3 py-1
                           rounded-sm border border-[var(--color-border)]
                           text-[var(--color-text-secondary)]
                           bg-[var(--color-bg-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Achievements */}
        {item.achievements && item.achievements.length > 0 && (
          <ul className="flex flex-col gap-2">
            {item.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2.5">
                <span
                  className="mt-[6px] w-1.5 h-1.5 rounded-full bg-accent-500/50 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="font-sans text-xs text-[var(--color-text-secondary)] leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TimelineSection({ data }: { data: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scrub: fill line is driven 1:1 by scroll — hand-controlled, no autoplay
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative px-md tablet:px-2xl desktop:px-3xl py-2xl">

      {/* Rail: faint background line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-[var(--color-border)]"
        style={{ left: "calc(var(--spacing-md, 1rem) + 2rem)" }}
        aria-hidden="true"
      />

      {/* Scrubbed fill line — orange, hand-controlled */}
      <motion.div
        className="absolute top-0 w-px origin-top"
        style={{
          left: "calc(var(--spacing-md, 1rem) + 2rem)",
          scaleY: lineScaleY,
          height: "100%",
          background: "linear-gradient(to bottom, #f97316 0%, rgba(249,115,22,0.25) 100%)",
        }}
        aria-hidden="true"
      />

      {data.map((item, index) => (
        <TimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}

export const Timeline = TimelineSection;
