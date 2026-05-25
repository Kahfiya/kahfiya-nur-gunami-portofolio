"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollScrubProps {
  children: React.ReactNode;
  className?: string;
  /** parallax shift in px — positive = moves up on scroll */
  parallax?: number;
  /** stagger delay between direct children */
  stagger?: number;
  /** scrub smoothing: 1 = 1s lag, true = instant */
  scrub?: number | boolean;
  /** start trigger e.g. "top 90%" */
  start?: string;
  /** end trigger e.g. "top 30%" */
  end?: string;
}

export default function ScrollScrub({
  children,
  className = "",
  parallax = 0,
  stagger = 0.05,
  scrub = 1,
  start = "top 88%",
  end = "top 30%",
}: ScrollScrubProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = Array.from(el.children) as HTMLElement[];

      if (parallax && items.length === 1) {
        // Single element parallax
        gsap.fromTo(
          items[0],
          { y: parallax },
          {
            y: -parallax,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      } else {
        // Staggered reveal synced to scroll
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [parallax, stagger, scrub, start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
