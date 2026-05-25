"use client";

/**
 * SectionHeading — GSAP scrub clip-path reveal per word
 *
 * Each word wipes in from left via clipPath — cinematic, hand-controlled.
 * Subtitle fades in with slight y offset after words complete.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const words = title.trim().split(/\s+/);
  const alignClass = align === "center" ? "text-center" : "text-left";

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const wordEls = el.querySelectorAll<HTMLElement>(".sh-word");
      const subEl   = el.querySelector<HTMLElement>(".sh-sub");

      // Per-word clip wipe — cinematic
      gsap.fromTo(
        wordEls,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 45%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Subtitle fade-up after words
      if (subEl) {
        gsap.fromTo(
          subEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 35%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [title, subtitle]);

  return (
    <div ref={ref} className={`mb-md tablet:mb-2xl ${alignClass}`}>
      <Tag
        style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
        className="font-serif font-bold text-[var(--color-text-primary)] flex flex-wrap gap-x-[0.25em]"
      >
        {words.map((word, i) => (
          <span key={i} className="sh-word inline-block" style={{ display: "inline-block" }}>
            {word}
          </span>
        ))}
      </Tag>

      {subtitle && (
        <p className="sh-sub mt-md text-[var(--color-text-secondary)] text-base tablet:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
