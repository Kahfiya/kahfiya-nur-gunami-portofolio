"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Parallax hero video on scroll
export function useHeroParallax(selector: string) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(selector, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: selector,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [selector]);
}

// Reveal elements from below with stagger
export function useRevealOnScroll(containerSelector: string, childSelector: string, stagger = 0.12) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `${containerSelector} ${childSelector}`,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerSelector,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [containerSelector, childSelector, stagger]);
}

// Horizontal marquee text (infinite scroll text)
export function useMarqueeScroll(selector: string) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (!el) return;
      const width = el.scrollWidth / 2;
      gsap.to(selector, {
        x: -width,
        ease: "none",
        duration: 20,
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => parseFloat(x) % width),
        },
      });
    });
    return () => ctx.revert();
  }, [selector]);
}

// Pinned section with scrub counter (stats)
export function useStatsScrub(sectionSelector: string, numberSelectors: string[], targets: number[]) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      numberSelectors.forEach((sel, i) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el) return;
        const target = targets[i];
        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: target,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionSelector,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            onUpdate() {
              el.textContent = Math.round(obj.val) + (el.dataset.suffix ?? "");
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [sectionSelector, numberSelectors, targets]);
}

// Clip-path reveal for section headings
export function useClipReveal(selector: string) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: selector,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [selector]);
}

// Horizontal scroll for project cards
export function useHorizontalScroll(sectionSelector: string, trackSelector: string) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = document.querySelector(sectionSelector) as HTMLElement | null;
      const track = document.querySelector(trackSelector) as HTMLElement | null;
      if (!section || !track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.kill();
    });
    return () => ctx.revert();
  }, [sectionSelector, trackSelector]);
}
