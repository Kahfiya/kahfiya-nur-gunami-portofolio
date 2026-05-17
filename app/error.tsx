"use client";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-md text-center gap-lg">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col items-center gap-md">
        <p className="font-serif text-6xl text-neutral-200 select-none" aria-hidden="true">!</p>
        <h1 className="font-serif text-2xl text-neutral-900">Something went wrong</h1>
        <p className="font-sans text-neutral-600 max-w-sm">{error.message || "An unexpected error occurred. Please try again."}</p>
        <MagneticButton variant="primary" onClick={reset}>Try again</MagneticButton>
      </motion.div>
    </main>
  );
}
