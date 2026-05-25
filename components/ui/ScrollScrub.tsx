"use client";

/**
 * ScrollScrub — High-end GSAP ScrollTrigger scrub engine
 *
 * Modes:
 * - "reveal"   : staggered opacity + y + scale reveal, hand-scrubbed (default)
 * - "clip"     : clipPath wipe from left — cinematic heading reveal
 * - "parallax" : depth parallax on single child
 * - "chars"    : per-character stagger (wrap children text in spans first)
 *
 * All modes use scrub so the user's hand controls the animation.
 * invalidateOnRefresh: true — recalculates on resize, no broken layouts.
 * will-change: transform — GPU compositing hint for buttery performance.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollScrubProps {
  children: React.ReactNode;
  className?: string;
  mode?: "reveal" | "clip" | "parallax" | "fade";
  /** parallax shift in px (mode: parallax) */
  parallax?: number;
  /** stagger delay between direct children */
  stagger?: number;
  /** scrub smoothing: 1 = 1s lag, true = instant 1:1 */
  scrub?: number | boolean;
  /** start trigger e.g. "top 90%" */
  start?: string;
  /** end trigger e.g. "top 30%" */
  end?: string;
  /** y distance for reveal (px) */
  distance?: number;
}

export default function ScrollScrub({
  children,
  className = "",
  mode = "reveal",
  parallax = 0,
  stagger = 0.06,
  scrub = 1,
  start = "top 90%",
  end = "top 25%",
  distance = 50,
}: ScrollScrubProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = Array.from(el.children) as HTMLElement[];
      if (!items.length) return;

      // GPU hint
      gsap.set(items, { willChange: "transform, opacity" });

      if (mode === "parallax" || parallax) {
        // ── Depth parallax ──────────────────────────────────────────────────
        gsap.fromTo(
          items[0],
          { y: parallax || distance },
          {
            y: -(parallax || distance),
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

      } else if (mode === "clip") {
        // ── Clip-path cinematic wipe ─────────────────────────────────────────
        gsap.fromTo(
          items,
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            ease: "expo.out",
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub,
              invalidateOnRefresh: true,
            },
          }
        );

      } else if (mode === "fade") {
        // ── Pure opacity fade ────────────────────────────────────────────────
        gsap.fromTo(
          items,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub,
              invalidateOnRefresh: true,
            },
          }
        );

      } else {
        // ── Default: staggered reveal (opacity + y + scale) ──────────────────
        // High-end: scale from 0.92 + y shift + opacity — feels premium
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: distance,
            scale: 0.94,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "expo.out",
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Clean up will-change after animation completes
      ScrollTrigger.create({
        trigger: el,
        start,
        onLeave: () => gsap.set(items, { willChange: "auto" }),
      });
    }, el);

    return () => ctx.revert();
  }, [mode, parallax, stagger, scrub, start, end, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
