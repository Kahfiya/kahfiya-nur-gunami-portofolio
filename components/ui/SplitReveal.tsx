"use client";

/**
 * SplitReveal — GSAP scrub per-character / per-word reveal
 *
 * Upgraded from onEnter play() to full scrub — the user's hand controls
 * how fast each character/word appears. Feels tactile and premium.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  split?: "words" | "chars";
  trigger?: "scroll" | "immediate";
  scrub?: number | boolean;
  start?: string;
  end?: string;
}

export default function SplitReveal({
  children,
  as: Tag = "h2",
  className = "",
  style,
  delay = 0,
  split = "words",
  trigger = "scroll",
  scrub = 1,
  start = "top 88%",
  end = "top 40%",
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text  = el.textContent || "";
    const units = split === "chars" ? text.split("") : text.split(" ");

    // Build DOM — each unit wrapped in overflow:hidden + inner span
    el.innerHTML = units
      .map(
        (u) =>
          `<span class="split-unit" style="display:inline-block;overflow:hidden;vertical-align:bottom">` +
          `<span class="split-inner" style="display:inline-block;will-change:transform">${
            u === " " ? "&nbsp;" : u
          }</span></span>`
      )
      .join(split === "words" ? " " : "");

    const inners = el.querySelectorAll<HTMLElement>(".split-inner");

    const ctx = gsap.context(() => {
      if (trigger === "immediate") {
        // Hero — plays on mount with spring-like ease
        gsap.fromTo(
          inners,
          { y: "110%", opacity: 0, rotateX: -30 },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            duration: 0.85,
            ease: "back.out(1.2)",
            stagger: split === "chars" ? 0.022 : 0.065,
            delay,
          }
        );
      } else {
        // Scroll — fully scrub-driven, hand controls the reveal
        gsap.fromTo(
          inners,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            ease: "expo.out",
            stagger: split === "chars" ? 0.018 : 0.055,
            delay,
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
    }, el);

    return () => ctx.revert();
  }, [children, delay, split, trigger, scrub, start, end]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{ perspective: "600px", ...style }}
    >
      {children}
    </Tag>
  );
}
