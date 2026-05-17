"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/motion-variants";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  id: string;           // stable ID for layoutId
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags?: string[];
  href?: string;
  size?: "default" | "featured"; // featured = col-span-2, wider
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProjectCard({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
  tags = [],
  href,
  size = "default",
}: ProjectCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const isFeatured = size === "featured";

  const handleClick = () => {
    setIsRevealed((prev) => !prev);
  };

  const cardContent = (
    <>
      {/* ── Image / Placeholder ─────────────────────────────────────────── */}
      <div
        className={[
          "relative overflow-hidden w-full",
          "aspect-[4/3] tablet:aspect-[16/9]",
        ].join(" ")}
      >
        {/* Image scale wrapper — desktop hover only */}
        <motion.div
          className="absolute inset-0"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              loading="lazy"
              sizes={
                isFeatured
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
              className="object-cover"
            />
          ) : (
            <div
              className="bg-neutral-200 w-full h-full"
              aria-hidden="true"
            />
          )}
        </motion.div>

        {/* ── Overlay — desktop CSS hover + mobile isRevealed ───────────── */}
        <div
          className={[
            "absolute inset-0 bg-neutral-900 transition-opacity",
            // Desktop: CSS group-hover
            "opacity-0 group-hover:opacity-60",
            // Mobile: visible when isRevealed
            isRevealed ? "opacity-60" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        />
      </div>

      {/* ── Text content ────────────────────────────────────────────────── */}
      <div className="p-md flex flex-col gap-sm">
        {/* Title — slides up 8px on desktop hover */}
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { y: -8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
        >
          <h3
            className={[
              "font-serif text-neutral-900 leading-tight",
              isFeatured
                ? "text-2xl desktop:text-3xl"
                : "text-lg desktop:text-xl",
            ].join(" ")}
          >
            {title}
          </h3>
        </motion.div>

        {/* Description — always visible */}
        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <ul
            role="list"
            aria-label="Project tags"
            className="flex flex-wrap gap-xs mt-xs"
          >
            {tags.map((tag) => (
              <li
                key={tag}
                className="text-xs px-sm py-xs rounded-full bg-neutral-100 text-neutral-700 font-sans"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  return (
    <motion.article
      layoutId={id}
      aria-label={title}
      onClick={handleClick}
      className={[
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-background-primary border border-neutral-200",
        "cursor-pointer select-none",
        isFeatured ? "col-span-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      transition={{ layout: { duration: prefersReducedMotion ? 0 : 0.4 } }}
    >
      {href ? (
        <a
          href={href}
          className="contents"
          aria-label={title}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </motion.article>
  );
}
