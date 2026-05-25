"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    // Fast dot follows cursor exactly
    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    // State: hover link/button
    const onEnterLink = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.dataset.cursor || "";
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: "back.out(2)" });
      gsap.to(dot,  { scale: 0,   duration: 0.2 });
      if (text) {
        label.textContent = text;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    const onLeaveLink = () => {
      gsap.to(ring,  { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" });
      gsap.to(dot,   { scale: 1, duration: 0.3 });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.15 });
    };

    // State: hover image/card
    const onEnterCard = () => {
      gsap.to(ring, { scale: 3, borderColor: "#f97316", opacity: 0.4, duration: 0.4, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);

    const links = document.querySelectorAll("a, button, [data-cursor]");
    const cards = document.querySelectorAll("[data-cursor-card]");

    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });
    cards.forEach((el) => {
      el.addEventListener("mouseenter", onEnterCard);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    // Hide on leave window
    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
      cards.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterCard);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} aria-hidden="true" className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", transform: "translate(-50%,-50%)" }} />
      {/* Ring */}
      <div ref={ringRef} aria-hidden="true" className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center"
        style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #f97316", transform: "translate(-50%,-50%)", mixBlendMode: "difference" }}>
        <span ref={labelRef} className="font-sans text-[8px] font-bold text-white uppercase tracking-wider"
          style={{ opacity: 0, transform: "scale(0.8)", whiteSpace: "nowrap" }} />
      </div>
    </>
  );
}
