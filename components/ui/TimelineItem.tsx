"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { prefersReducedMotion } from "@/lib/motion-variants";

// ─── Local Variants ───────────────────────────────────────────────────────────

const slideInRight: Variants = {
  hidden: { x: prefersReducedMotion ? 0 : 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" },
  },
};

const dotVariant: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" },
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface TimelineItemProps {
  year: string;
  institution: string;
  description: string;
  isLast?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimelineItem({
  year,
  institution,
  description,
  isLast = false,
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex gap-md">
      {/* Left column: dot + vertical line */}
      <div className="flex flex-col items-center">
        {/* Animated dot */}
        <motion.div
          variants={dotVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-3 h-3 rounded-full bg-accent-500 flex-shrink-0 mt-1"
          aria-hidden="true"
        />

        {/* Vertical connecting line — hidden for last item */}
        {!isLast && (
          <div className="w-px bg-neutral-300 flex-1 mt-sm" aria-hidden="true" />
        )}
      </div>

      {/* Right column: content */}
      <motion.div
        variants={slideInRight}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="pb-2xl"
      >
        {/* Year + institution — min 44px touch target */}
        <div className="min-h-[44px] flex flex-col justify-center mb-sm">
          <span className="text-sm font-sans text-neutral-500 leading-tight">
            {year}
          </span>
          <h3 className="font-serif text-lg text-neutral-900 leading-snug">
            {institution}
          </h3>
        </div>

        {/* Description */}
        <p className="font-sans text-neutral-600 text-sm leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
