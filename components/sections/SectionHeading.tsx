"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const words = title.trim().split(/\s+/);
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-md tablet:mb-2xl ${alignClass}`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {React.createElement(
          as,
          {
            style: { fontSize: "clamp(1.5rem, 4vw, 2.5rem)" },
            className: "font-serif font-bold text-[var(--color-text-primary)]",
          },
          words.map((word, i) => (
            <motion.span key={i} variants={fadeUp} className="inline-block mr-[0.25em]">
              {word}
            </motion.span>
          ))
        )}
      </motion.div>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="mt-md text-[var(--color-text-secondary)] text-base tablet:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
