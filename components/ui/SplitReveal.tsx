"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitRevealProps {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  /** "words" | "chars" */
  split?: "words" | "chars";
  trigger?: "scroll" | "immediate";
  style?: React.CSSProperties;
}

export default function SplitReveal({
  children,
  as: Tag = "h2",
  className = "",
  style,
  delay = 0,
  split = "words",
  trigger = "scroll",
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Manual split — no SplitText plugin needed (free tier)
    const text = el.textContent || "";
    const units = split === "chars" ? text.split("") : text.split(" ");

    el.innerHTML = units
      .map((u) => `<span class="split-unit" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="split-inner" style="display:inline-block">${u === " " ? "&nbsp;" : u}</span></span>`)
      .join(split === "words" ? " " : "");

    const inners = el.querySelectorAll<HTMLElement>(".split-inner");

    const ctx = gsap.context(() => {
      const anim = gsap.fromTo(
        inners,
        { y: "110%", opacity: 0, rotateX: -40 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          stagger: split === "chars" ? 0.025 : 0.07,
          delay,
          paused: trigger === "scroll",
        }
      );

      if (trigger === "scroll") {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => anim.play(),
        });
      }
    }, el);

    return () => ctx.revert();
  }, [children, delay, split, trigger]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={{ perspective: "600px", ...style }}>
      {children}
    </Tag>
  );
}
