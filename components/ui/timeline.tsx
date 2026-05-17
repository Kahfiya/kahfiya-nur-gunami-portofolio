"use client";

import { useScroll, motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface TimelineEntry {
  title: string;
  subtitle?: string;
  period: string;
  description: string;
  tags?: string[];
  achievements?: string[];
}

export function TimelineSection({ data }: { data: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative bg-[var(--color-bg-primary)]">
      {/* Center vertical line — subtle */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--color-border)]" />

      {/* Animated fill line — accent orange */}
      <motion.div
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-accent-500 via-accent-400 to-transparent"
        style={{ scaleY: scrollYProgress, height: "100%" }}
      />

      {data.map((item, index) => (
        <TimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}

function TimelineItem({ item, index }: { item: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative min-h-[80vh] flex items-center py-2xl">
      {/* Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-3 h-3 rounded-full bg-[var(--color-bg-primary)] border-2 border-accent-500 shadow-[0_0_10px_rgba(249,115,22,0.35)]"
        />
      </div>

      <div className="w-full grid grid-cols-2">
        {/* Left side */}
        <div className={`px-8 tablet:px-16 desktop:px-20 flex ${isLeft ? "justify-end" : "justify-start"}`}>
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-sm text-right"
            >
              <p className="text-accent-500 font-sans text-xs mb-3 tracking-widest uppercase font-medium">
                {item.period}
              </p>
              <h2 className="text-[var(--color-text-primary)] font-serif text-3xl tablet:text-4xl font-bold leading-tight mb-2">
                {item.title}
              </h2>
              {item.subtitle && (
                <p className="text-[var(--color-text-secondary)] font-sans text-sm mb-4 italic">{item.subtitle}</p>
              )}
              <p className="text-[var(--color-text-secondary)] font-sans text-sm leading-relaxed mb-5">
                {item.description}
              </p>
              {item.tags && (
                <div className="flex flex-wrap gap-2 justify-end mb-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-[var(--color-border)] font-sans">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {item.achievements && (
                <div className="flex flex-col gap-1 items-end">
                  {item.achievements.map((a) => (
                    <p key={a} className="text-xs text-[var(--color-text-secondary)] font-sans">{a}</p>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Right side */}
        <div className={`px-8 tablet:px-16 desktop:px-20 flex ${isLeft ? "justify-start" : "justify-end"}`}>
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-sm text-left"
            >
              <p className="text-accent-500 font-sans text-xs mb-3 tracking-widest uppercase font-medium">
                {item.period}
              </p>
              <h2 className="text-[var(--color-text-primary)] font-serif text-3xl tablet:text-4xl font-bold leading-tight mb-2">
                {item.title}
              </h2>
              {item.subtitle && (
                <p className="text-[var(--color-text-secondary)] font-sans text-sm mb-4 italic">{item.subtitle}</p>
              )}
              <p className="text-[var(--color-text-secondary)] font-sans text-sm leading-relaxed mb-5">
                {item.description}
              </p>
              {item.tags && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-[var(--color-border)] font-sans">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {item.achievements && (
                <div className="flex flex-col gap-1">
                  {item.achievements.map((a) => (
                    <p key={a} className="text-xs text-[var(--color-text-secondary)] font-sans">{a}</p>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export const Timeline = TimelineSection;
