"use client";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion-variants";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-md text-center">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center gap-lg">
        <motion.p variants={fadeUp} className="font-serif text-neutral-100 select-none" style={{ fontSize: "clamp(6rem, 20vw, 14rem)", lineHeight: 1 }} aria-hidden="true">404</motion.p>
        <motion.h1 variants={fadeUp} className="font-serif text-2xl tablet:text-3xl text-neutral-900">{t("error.404.heading")}</motion.h1>
        <motion.p variants={fadeUp} className="font-sans text-neutral-600 max-w-sm">{t("error.404.desc")}</motion.p>
        <motion.div variants={fadeUp}>
          <MagneticButton variant="primary" href="/">{t("error.404.back")}</MagneticButton>
        </motion.div>
      </motion.div>
    </main>
  );
}
