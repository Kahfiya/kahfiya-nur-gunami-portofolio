"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Velocity-based skew on scroll
    let lastScrollY = 0;
    let skewSetter: ((v: number) => void) | null = null;
    let proxy = { skew: 0 };

    const skewTarget = wrapperRef.current;
    if (skewTarget) {
      skewSetter = gsap.quickSetter(skewTarget, "skewY", "deg") as (v: number) => void;
      const clamp = gsap.utils.clamp(-6, 6);

      lenis.on("scroll", ({ velocity }: { velocity: number }) => {
        const skew = clamp(velocity * 0.04);
        gsap.to(proxy, {
          skew,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
          onUpdate: () => skewSetter!(proxy.skew),
        });
        lastScrollY = velocity;
      });
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
