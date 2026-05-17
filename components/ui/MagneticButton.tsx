"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { scaleHover, prefersReducedMotion } from "@/lib/motion-variants";

// ─── Props ────────────────────────────────────────────────────────────────────

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // default: 'primary'
  onClick?: () => void;
  href?: string; // renders <a> when provided
  ariaLabel?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

// ─── Variant styles ───────────────────────────────────────────────────────────

const variantClasses: Record<"primary" | "secondary", string> = {
  primary: "bg-accent-500 text-white hover:shadow-lg",
  secondary:
    "border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function MagneticButton({
  children,
  variant = "primary",
  onClick,
  href,
  ariaLabel,
  className = "",
  type = "button",
}: MagneticButtonProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  // Dev warning for icon-only buttons missing an accessible label
  if (process.env.NODE_ENV !== "production") {
    if (typeof children !== "string" && !ariaLabel) {
      console.warn(
        "[MagneticButton] Non-string children detected without an `ariaLabel` prop. " +
          "Provide `ariaLabel` to ensure the button is accessible to screen readers."
      );
    }
  }

  // Motion values for the magnetic translate effect (desktop only)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop || !ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.35);
    y.set(offsetY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = [
    "inline-flex items-center justify-center",
    "px-xl py-sm rounded",
    "min-w-[44px] min-h-[44px]",
    "font-sans text-sm font-medium",
    "transition-shadow",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
    "cursor-pointer select-none",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Desktop: magnetic spring translate; mobile: scaleHover tap feedback
  // Use separate event handlers on the element instead of MotionProps to avoid type conflicts
  const magneticStyle = isDesktop ? { x: springX, y: springY } : {};
  const magneticHandlers = isDesktop
    ? { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
    : {};
  const tapProps = !isDesktop ? { whileTap: scaleHover.whileTap } : {};

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={baseClasses}
        style={magneticStyle}
        {...magneticHandlers}
        {...tapProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={baseClasses}
      style={magneticStyle}
      {...magneticHandlers}
      {...tapProps}
    >
      {children}
    </motion.button>
  );
}

export default MagneticButton;
