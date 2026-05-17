"use client";

import { useEffect, useState, useRef } from "react";
import { motion, animate } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [num, setNum] = useState(0);
  const [phase, setPhase] = useState<"count" | "reveal" | "exit">("count");
  const started = useRef(false);
  const completed = useRef(false);

  useEffect(() => {
    // Guard against Strict Mode double-invoke
    if (started.current) return;
    started.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    animate(0, 100, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setNum(Math.round(v)),
      onComplete: () => {
        setNum(100);
        setPhase("reveal");
        setTimeout(() => setPhase("exit"), 900);
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const padded = String(num).padStart(3, "0");

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col overflow-hidden"
      style={{ background: "#0a0a0a" }}
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === "exit" && !completed.current) {
          completed.current = true;
          onComplete();
        }
      }}
    >
      {/* Top progress line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
        <div className="h-full transition-none" style={{ background: "#f97316", width: `${num}%` }} />
      </div>

      {/* Grid lines */}
      {[33, 66].map((p) => (
        <motion.div
          key={p}
          className="absolute left-0 right-0 h-px bg-white/[0.04]"
          style={{ top: `${p}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Counter */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Ghost */}
        <div
          className="absolute select-none pointer-events-none"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(160px, 28vw, 300px)",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.05)",
            letterSpacing: "-0.05em",
          }}
        >
          {padded}
        </div>

        {/* Main number */}
        <motion.div
          className="relative z-10 flex items-end gap-1"
          animate={phase === "reveal" ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(80px, 16vw, 180px)",
              lineHeight: 1,
              color: "#fff",
              letterSpacing: "-0.04em",
            }}
          >
            {padded}
          </span>
          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: "clamp(24px, 4vw, 48px)", color: "#f97316", paddingBottom: "0.4em" }}>
            %
          </span>
        </motion.div>

        {/* Name reveal */}
        <motion.div
          className="absolute"
          style={{ bottom: "-4rem" }}
          initial={{ opacity: 0, y: 16 }}
          animate={phase === "reveal" ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(13px, 1.8vw, 18px)",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
          }}>
            Kahfiya Nur Gunami
          </span>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-8 pb-8 pt-4 z-10">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-sm" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontFamily: "var(--font-inter)", fontWeight: 800, fontSize: 10, color: "#fff", letterSpacing: "-0.02em" }}>KNG</span>
          </div>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Portfolio
          </span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          {phase === "reveal" ? "Ready" : "Loading"}
        </motion.span>
      </div>
    </motion.div>
  );
}
