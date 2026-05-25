"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname   = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const prevPath   = useRef(pathname);
  const isFirst    = useRef(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const hide = (curtain: HTMLDivElement) => {
    gsap.set(curtain, { display: "none" });
  };

  const runExit = (curtain: HTMLDivElement) => {
    const content = curtain.querySelector<HTMLElement>(".ct-content");
    gsap.timeline()
      .to(content, { opacity: 0, y: -16, duration: 0.4, ease: "power3.in" })
      .to(curtain, {
        yPercent: -100, duration: 0.65, ease: "expo.inOut",
        onComplete() { hide(curtain); },
      }, "-=0.1");
  };

  const runEnter = (curtain: HTMLDivElement) => {
    const content = curtain.querySelector<HTMLElement>(".ct-content");
    gsap.set(curtain, { display: "flex", yPercent: 100 });
    gsap.set(content, { opacity: 0, y: 24 });

    gsap.timeline()
      .to(curtain,  { yPercent: 0, duration: 0.55, ease: "expo.inOut" })
      .to(content,  { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, "-=0.2")
      .call(() => runExit(curtain), [], "+=0.9");
  };

  // Initial load — only show if landing directly on /about or /work
  useEffect(() => {
    if (!mounted) return;
    const curtain = curtainRef.current;
    if (!curtain || !isFirst.current) return;
    isFirst.current = false;

    const shouldShow = pathname === "/about" || pathname === "/work";
    if (!shouldShow) return;

    const content = curtain.querySelector<HTMLElement>(".ct-content");
    gsap.set(curtain, { display: "flex", yPercent: 0 });
    gsap.set(content, { opacity: 0, y: 24 });

    gsap.timeline({ delay: 0.05 })
      .to(content, { opacity: 1, y: 0, duration: 0.55, ease: "expo.out" })
      .call(() => runExit(curtain), [], "+=0.85");
  }, [mounted]);

  // Route change
  useEffect(() => {
    if (!mounted) return;
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    const curtain = curtainRef.current;
    if (!curtain) return;

    // Only show curtain when navigating TO /about or /work
    const shouldShow = pathname === "/about" || pathname === "/work";
    if (!shouldShow) return;

    runEnter(curtain);
  }, [pathname, mounted]);

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden="true"
        suppressHydrationWarning
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          display: "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        {/* Radial glow */}
        <div style={{
          position: "absolute",
          width: 500, height: 500,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div className="ct-content" style={{ textAlign: "center", opacity: 0 }}>

          {/* Accent line */}
          <div style={{
            width: 40, height: 1.5,
            background: "#f97316",
            borderRadius: 9999,
            margin: "0 auto 1.75rem",
          }} />

          {/* Name */}
          <p style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>
            Kahfiya Nur{" "}
            <span style={{ color: "#f97316" }}>Gunami</span>
          </p>

          {/* Subtitle */}
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#525252",
            marginTop: "1rem",
          }}>
            Student &nbsp;·&nbsp; Creative Developer
          </p>
        </div>
      </div>

      {children}
    </>
  );
}
