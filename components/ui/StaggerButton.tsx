"use client";

import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useAnimate, stagger } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  duration?: number;
  staggerDelay?: number;
  height?: number;
}

export function StaggerButton({
  className,
  children,
  duration = 0.2,
  staggerDelay = 0.05,
  height = 26,
  ...props
}: StaggerButtonProps) {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      animate(
        ".letter",
        { rotateX: 90 },
        { duration, delay: stagger(staggerDelay) }
      );
    } else {
      animate(
        ".letter",
        { rotateX: 0 },
        { duration, delay: stagger(staggerDelay) }
      );
    }
  }, [isHovered, animate, duration, staggerDelay]);

  const lettersArray = children?.toString().split("") || [];

  return (
    <div
      ref={scope}
      style={{ "--height": `${height}px`, perspective: "1000px" } as CSSProperties}
    >
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
          className
        )}
        {...props}
      >
        <span className="sr-only">{children}</span>
        <span
          aria-hidden
          className="relative flex items-center justify-center overflow-hidden"
          style={{ height: `${height}px` }}
        >
          {lettersArray.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="letter inline-block"
              style={{
                height: `${height}px`,
                lineHeight: `${height}px`,
                transformStyle: "preserve-3d",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      </button>
    </div>
  );
}

export default StaggerButton;
