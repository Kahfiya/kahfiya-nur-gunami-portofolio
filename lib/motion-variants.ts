import type { Variants } from "framer-motion";

/**
 * Detects reduced-motion preference at module load time.
 * Components can use this to conditionally skip animations.
 */
export const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

// ─── Fade Up ──────────────────────────────────────────────────────────────────
/** Fades an element in while translating it upward from 20px below. */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.5,
      ease: "easeOut",
    },
  },
};

// ─── Stagger Container ────────────────────────────────────────────────────────
/**
 * Wraps a list of child elements and staggers their entrance animations.
 * Apply `fadeUp` (or any variant) to each child.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.1,
      delayChildren: 0,
    },
  },
};

// ─── Slide In ─────────────────────────────────────────────────────────────────
/** Slides an element in from the left while fading it in. */
export const slideIn: Variants = {
  hidden: {
    x: prefersReducedMotion ? 0 : -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.5,
      ease: "easeOut",
    },
  },
};

// ─── Scale Hover ──────────────────────────────────────────────────────────────
/**
 * Spread directly onto a motion component for interactive scale feedback.
 *
 * @example
 * <motion.button {...scaleHover}>Click me</motion.button>
 */
export const scaleHover = {
  whileHover: { scale: prefersReducedMotion ? 1 : 1.05 },
  whileTap: { scale: prefersReducedMotion ? 1 : 0.95 },
};

// ─── Page Transition ──────────────────────────────────────────────────────────
/**
 * Fade transition for full-page route changes.
 * Use with Framer Motion's `AnimatePresence` in the root layout.
 *
 * @example
 * <motion.div {...pageTransition}>...</motion.div>
 */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: prefersReducedMotion ? 0 : 0.3, ease: "easeIn" },
  },
};
