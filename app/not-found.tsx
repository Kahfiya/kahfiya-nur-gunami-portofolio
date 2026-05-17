"use client";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion-variants";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-md text-center">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center gap-lg">
        <motion.p variants={fadeUp} className="font-serif text-neutral-100 select-none" style={{ fontSize: "clamp(6rem, 20vw, 14rem)", lineHeight: 1 }} aria-hidden="true">404</motion.p>
        <motion.h1 variants={fadeUp} className="font-serif text-2xl tablet:text-3xl text-neutral-900">This page got lost in the digital void</motion.h1>
        <motion.p variants={fadeUp} className="font-sans text-neutral-600 max-w-sm">The page you&apos;re looking for doesn&apos;t exist or has been moved.</motion.p>
        <motion.div variants={fadeUp}>
          <MagneticButton variant="primary" href="/">Back to Home</MagneticButton>
        </motion.div>
      </motion.div>
    </main>
  );
}
