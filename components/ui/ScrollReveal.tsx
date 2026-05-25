"use client";

/**
 * ScrollReveal — GSAP scrub-based reveal (upgraded from Framer useInView)
 *
 * Uses the same ScrollScrub engine under the hood.
 * Direction-aware: up / down / left / right / none
 * Hand-controlled: scrub = 1 means the user's scroll drives the animation.
 */

import { useLayoutEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Variants } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  distance = 48,
  scrub = 1,
  start = "top 90%",
  end = "top 30%",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getFrom = () => {
      switch (direction) {
        case "up":    return { opacity: 0, y: distance,  scale: 0.95 };
        case "down":  return { opacity: 0, y: -distance, scale: 0.95 };
        case "left":  return { opacity: 0, x: distance,  scale: 0.97 };
        case "right": return { opacity: 0, x: -distance, scale: 0.97 };
        case "none":  return { opacity: 0 };
      }
    };

    const ctx = gsap.context(() => {
      gsap.set(el, { willChange: "transform, opacity" });

      gsap.fromTo(
        el,
        getFrom(),
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          ease: "expo.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
          },
          onComplete: () => { gsap.set(el, { willChange: "auto" }); },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, delay, distance, scrub, start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ── ScrollStagger — multiple children with stagger ────────────────────────────

interface ScrollStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  distance?: number;
}

export function ScrollStagger({
  children,
  className = "",
  staggerDelay = 0.08,
  scrub = 1,
  start = "top 90%",
  end = "top 25%",
  distance = 40,
}: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = Array.from(el.children) as HTMLElement[];
      if (!items.length) return;

      gsap.set(items, { willChange: "transform, opacity" });

      gsap.fromTo(
        items,
        { opacity: 0, y: distance, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "expo.out",
          stagger: staggerDelay,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
          },
          onComplete: () => { gsap.set(items, { willChange: "auto" }); },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [staggerDelay, scrub, start, end, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Keep Framer Motion variant export for backward compat (used in work/page.tsx AnimatePresence)
export const scrollItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
