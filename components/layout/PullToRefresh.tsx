"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

type RefreshState = "idle" | "pulling" | "ready" | "refreshing" | "complete";

const PULL_THRESHOLD = 80;
const PULL_MAX = 140;

function haptic(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

// ─── Spinner Icon ─────────────────────────────────────────────────────────────
function Spinner({ spin }: { spin: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className="w-8 h-8"
      animate={spin ? { rotate: 360 } : {}}
      transition={spin ? { duration: 0.8, repeat: Infinity, ease: "linear" } : {}}
    >
      <circle
        cx="20" cy="20" r="16"
        fill="none"
        stroke="#FF6B35"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="60 40"
      />
    </motion.svg>
  );
}

// ─── Checkmark Icon ───────────────────────────────────────────────────────────
function Checkmark() {
  return (
    <motion.svg viewBox="0 0 40 40" className="w-8 h-8">
      <motion.circle
        cx="20" cy="20" r="16"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M12 20 L18 26 L28 14"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
    </motion.svg>
  );
}

// ─── Arrow Icon ───────────────────────────────────────────────────────────────
function Arrow({ ready }: { ready: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className="w-8 h-8"
      animate={ready ? { y: [0, -4, 0] } : {}}
      transition={ready ? { duration: 0.5, repeat: Infinity } : {}}
    >
      <motion.path
        d="M20 8 L20 28 M12 20 L20 28 L28 20"
        fill="none"
        stroke="#FF6B35"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={ready ? { rotate: 180 } : { rotate: 0 }}
        style={{ originX: "20px", originY: "18px" }}
        transition={{ duration: 0.3 }}
      />
    </motion.svg>
  );
}

// ─── Dot Ellipsis ─────────────────────────────────────────────────────────────
function Dots() {
  return (
    <span className="inline-flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 rounded-full bg-[#FF6B35] inline-block"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

// ─── PullToRefresh ────────────────────────────────────────────────────────────
interface PullToRefreshProps {
  onRefresh?: () => Promise<void>;
  children: React.ReactNode;
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [state, setState] = useState<RefreshState>("idle");
  const pullY = useMotionValue(0);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derived values
  const indicatorY = useTransform(pullY, [0, PULL_MAX], [0, PULL_MAX]);
  const contentY = useTransform(pullY, [0, PULL_MAX], [0, PULL_MAX * 0.6]);
  const opacity = useTransform(pullY, [0, PULL_THRESHOLD * 0.5], [0, 1]);
  const scale = useTransform(pullY, [0, PULL_THRESHOLD], [0.5, 1]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const el = containerRef.current;
    if (!el || el.scrollTop > 0) return;
    // Don't intercept taps on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest("a, button, [role='button'], input, select, textarea")) return;
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current || state === "refreshing") return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta <= 0) return;
      const resistance = delta > PULL_THRESHOLD ? PULL_THRESHOLD + (delta - PULL_THRESHOLD) * 0.3 : delta;
      const clamped = Math.min(resistance, PULL_MAX);
      pullY.set(clamped);

      // Only prevent default scroll when actively pulling down
      if (clamped > 5) e.preventDefault();

      if (clamped >= PULL_THRESHOLD && state !== "ready") {
        setState("ready");
        haptic(30);
      } else if (clamped < PULL_THRESHOLD && state === "ready") {
        setState("pulling");
      } else if (clamped > 0 && state === "idle") {
        setState("pulling");
      }
    },
    [state, pullY]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (state === "ready") {
      setState("refreshing");
      haptic([50, 30, 50]);
      pullY.set(PULL_THRESHOLD + 20);

      try {
        await (onRefresh?.() ?? new Promise((r) => setTimeout(r, 1500)));
      } finally {
        setState("complete");
        haptic(60);
        setTimeout(() => {
          pullY.set(0);
          setState("idle");
        }, 1200);
      }
    } else {
      pullY.set(0);
      setState("idle");
    }
  }, [state, pullY, onRefresh]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const label =
    state === "pulling" ? "Pull to refresh" :
    state === "ready" ? "Release to refresh" :
    state === "refreshing" ? "Refreshing" :
    state === "complete" ? "Updated!" : "";

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Indicator */}
      <AnimatePresence>
        {state !== "idle" && (
          <motion.div
            className="absolute top-0 left-0 right-0 z-50 flex flex-col items-center justify-end pb-3 pointer-events-none"
            style={{ y: indicatorY, opacity }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Glow bg */}
            {(state === "ready" || state === "refreshing") && (
              <motion.div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at top, rgba(255,107,53,0.12) 0%, transparent 70%)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}

            <motion.div
              className="flex flex-col items-center gap-2"
              style={{ scale }}
            >
              {state === "complete" ? (
                <Checkmark />
              ) : state === "refreshing" ? (
                <Spinner spin />
              ) : (
                <Arrow ready={state === "ready"} />
              )}

              <motion.span
                className="text-xs font-medium text-[#FF6B35] flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {label}
                {state === "refreshing" && <Dots />}
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div style={{ y: state !== "idle" ? contentY : 0 }}>
        {children}
      </motion.div>
    </div>
  );
}
