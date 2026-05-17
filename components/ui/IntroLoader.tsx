"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

interface IntroLoaderProps {
  onComplete: () => void;
}

// Animated counter hook
function useCounter(from: number, to: number, duration: number, delay: number) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v));
  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(count, to, { duration, ease: "easeInOut" });
      return controls.stop;
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, []);
  return rounded;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<"loading" | "reveal" | "exit">("loading");
  const counter = useCounter(0, 100, 1.8, 0.3);

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase("reveal"), 2300);  // show name
    const t2 = setTimeout(() => setPhase("exit"), 3400);    // start exit
    const t3 = setTimeout(() => onComplete(), 4200);        // done
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const words = ["Kahfiya", "Nur", "Gunami"];

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="intro"
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ zIndex: 99999, backgroundColor: "#080808" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ── Subtle grid background ── */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* ── Radial glow center ── */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 600,
              height: 600,
              background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* ── Main content ── */}
          <div className="relative flex flex-col items-center gap-8 px-6">

            {/* Signature line — draws in from left */}
            <motion.svg
              width="48"
              height="2"
              viewBox="0 0 48 2"
              fill="none"
              className="mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.line
                x1="0" y1="1" x2="48" y2="1"
                stroke="#f97316"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
              />
            </motion.svg>

            {/* Name — word by word slide up */}
            <div className="flex flex-wrap justify-center gap-x-[0.3em] overflow-hidden">
              {words.map((word, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.span
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontWeight: 700,
                      fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
                      display: "inline-block",
                      color: i === 2 ? "#f97316" : "#fafafa",
                      letterSpacing: "-0.02em",
                    }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.5 + i * 0.15,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                color: "#525252",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                fontSize: "0.65rem",
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              Fullstack Developer &amp; Designer
            </motion.p>

            {/* Progress track */}
            <motion.div
              style={{ width: 160, height: "1px", backgroundColor: "#1a1a1a", borderRadius: 9999, overflow: "hidden" }}
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <motion.div
                style={{
                  height: "100%",
                  backgroundColor: "#f97316",
                  transformOrigin: "left",
                  borderRadius: 9999,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
              />
            </motion.div>

            {/* Counter */}
            <motion.div
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.7rem",
                color: "#404040",
                letterSpacing: "0.1em",
                fontVariantNumeric: "tabular-nums",
                marginTop: -16,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.span>{counter}</motion.span>
              <span>%</span>
            </motion.div>
          </div>

          {/* ── Corner decorations ── */}
          {[
            { top: 24, left: 24 },
            { top: 24, right: 24 },
            { bottom: 24, left: 24 },
            { bottom: 24, right: 24 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ ...pos, width: 20, height: 20 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.25, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d={
                    i === 0 ? "M0 10 L0 0 L10 0" :
                    i === 1 ? "M10 0 L20 0 L20 10" :
                    i === 2 ? "M0 10 L0 20 L10 20" :
                              "M10 20 L20 20 L20 10"
                  }
                  stroke="#f97316"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </motion.div>
          ))}

          {/* ── Exit curtains (split top/bottom) ── */}
          <AnimatePresence>
            {phase === "reveal" && (
              <>
                <motion.div
                  key="curtain-top"
                  className="absolute inset-x-0 top-0"
                  style={{ height: "50%", backgroundColor: "#080808", originY: 0 }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 0 }}
                  exit={{ scaleY: 1 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.div
                  key="curtain-bottom"
                  className="absolute inset-x-0 bottom-0"
                  style={{ height: "50%", backgroundColor: "#080808", originY: 1 }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 0 }}
                  exit={{ scaleY: 1 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
