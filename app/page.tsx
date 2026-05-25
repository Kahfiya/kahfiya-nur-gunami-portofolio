"use client";

import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import SectionHeading from "@/components/sections/SectionHeading";
import HeroSection from "@/components/sections/Hero/HeroSection";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "project-marbas",
    title: "Marbas-Nusantara",
    descKey: "project.marbas.desc",
    imageUrl: "/Images/Marbas.jpg",
    imageAlt: "Marbas Nusantara",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "E-Commerce"],
    href: "https://v0-marbas-store-s7.vercel.app",
  },
  {
    id: "project-lumidh",
    title: "Lumidh Parfum",
    descKey: "project.lumidh.desc",
    imageUrl: "/Images/Lumidh.jpg",
    imageAlt: "Lumidh Parfum E-Commerce",
    tags: ["Next.js", "E-Commerce", "UI/UX", "Typescript"],
    href: "https://web-lumidh-versi-lebih-bagus.vercel.app/",
  },
  {
    id: "project-adria",
    title: "Adria Studio Design",
    descKey: "project.adria.desc",
    imageUrl: "/Images/Adria.jpg",
    imageAlt: "Adria Studio Design",
    tags: ["Framer Motion", "Animation", "UI/UX", "Next.js"],
    href: "https://adria-website.vercel.app/",
  },
];

const CERTIFICATES = [
  { titleKey: "cert.web.title",     issuer: "Dicoding Indonesia", year: "2026", imageUrl: "/Images/Sertifikat/Sertif Dasar AI.jpg" },
  { titleKey: "cert.frontend.title", issuer: "Dicoding Indonesia", year: "2026", imageUrl: "/Images/Sertifikat/Sertif financial.jpg" },
  { titleKey: "cert.python.title",  issuer: "Dicoding Indonesia", year: "2026", imageUrl: "/Images/Sertifikat/Sertif Memulai Pemrograman dengan Python.jpg" },
  { titleKey: "cert.ai.title",      issuer: "IBM SkillsBuild",    year: "2026", imageUrl: "/Images/Sertifikat/Sertif Introduction to Artificial Intelligence.jpg" },
  { titleKey: "cert.claude.title",  issuer: "Anthropic",          year: "2026", imageUrl: "/Images/Sertifikat/Sertif Claude 101.jpg" },
  { titleKey: "cert.aifund.title",  issuer: "Coursera",           year: "2026", imageUrl: "/Images/Sertifikat/Sertif AI Fundamentals for Non-Data Scientists.jpg" },
];

// ─── Floating tech logos ──────────────────────────────────────────────────────

// ─── Stats ────────────────────────────────────────────────────────────────────

function useCounter(target: number, duration = 1.5, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ value, suffix = "", label, sub, delay, inView }: {
  value: number; suffix?: string; label: string; sub: string; delay: number; inView: boolean;
}) {
  const count = useCounter(value, 1.2, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center gap-1 px-xl py-2xl"
    >
      <span className="font-serif font-bold text-neutral-900" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
        {count}{suffix}
      </span>
      <span className="font-sans text-sm font-semibold text-neutral-700">{label}</span>
      <span className="font-sans text-xs text-neutral-400">{sub}</span>
    </motion.div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="px-md tablet:px-2xl py-2xl max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 tablet:grid-cols-3 divide-y tablet:divide-y-0 tablet:divide-x divide-neutral-200 rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <StatItem value={4}  suffix="+" label={t("stats.projects.label")} sub={t("stats.projects.sub")}  delay={0}    inView={isInView} />
        <StatItem value={10} suffix="+" label={t("stats.stack.label")}    sub={t("stats.stack.sub")}     delay={0.1}  inView={isInView} />
        <StatItem value={100} suffix="%" label={t("stats.passion.label")} sub={t("stats.passion.sub")}   delay={0.2}  inView={isInView} />
      </div>
    </section>
  );
}

// ─── What I Do ────────────────────────────────────────────────────────────────

function WhatIDoSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  const SERVICES = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      titleKey: "whatido.frontend.title",
      descKey:  "whatido.frontend.desc",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      accent: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      titleKey: "whatido.design.title",
      descKey:  "whatido.design.desc",
      tags: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
      accent: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ),
      titleKey: "whatido.creative.title",
      descKey:  "whatido.creative.desc",
      tags: ["Framer Motion", "Blender", "3D", "Animation"],
      accent: "text-accent-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <section ref={ref} className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full">
      <SectionHeading title={t("whatido.title")} subtitle={t("whatido.subtitle")} align="left" as="h2" />
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-lg">
        {SERVICES.map((svc, i) => (
          <motion.div
            key={svc.titleKey}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="group flex flex-col gap-md p-xl rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-xl ${svc.bg} ${svc.accent} flex items-center justify-center`}>
              {svc.icon}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">{t(svc.titleKey)}</h3>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed">{t(svc.descKey)}</p>
            </div>
            <div className="flex flex-wrap gap-1 mt-auto pt-2">
              {svc.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-500 border border-neutral-200 font-sans">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Featured Projects ────────────────────────────────────────────────────────

function FeaturedProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  const { t } = useLanguage();

  return (
    <section ref={ref} id="featured-projects" className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full">
      <SectionHeading title={t("projects.title")} subtitle={t("projects.subtitle")} align="left" as="h2" />
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-lg">
        {PROJECTS.map((project, i) => (
          <motion.div key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
          >
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
              <CardContainer className="inter-var w-full">
                <CardBody className="bg-[var(--color-bg-primary)] relative group/card border border-[var(--color-border)] hover:border-accent-400 hover:shadow-lg w-full h-auto rounded-xl p-6 transition-all duration-300 cursor-pointer">
                  <CardItem translateZ="50" className="text-xl font-bold text-[var(--color-text-primary)] font-serif">{project.title}</CardItem>
                  <CardItem as="p" translateZ="60" className="text-[var(--color-text-secondary)] text-sm max-w-sm mt-2 font-sans leading-relaxed">{t(project.descKey)}</CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="relative h-48 w-full rounded-lg overflow-hidden bg-neutral-100">
                      <Image src={project.imageUrl} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover/card:scale-105 transition-transform duration-500" />
                    </div>
                  </CardItem>
                  <div className="flex flex-wrap gap-1 mt-4 items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-[var(--color-text-secondary)] border border-[var(--color-border)] font-sans">{tag}</span>
                      ))}
                    </div>
                    <span className="text-xs text-accent-500 font-sans font-medium flex items-center gap-1">
                      Visit →
                    </span>
                  </div>
                </CardBody>
              </CardContainer>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Certificates ─────────────────────────────────────────────────────────────

function CertificateSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full">
      <SectionHeading title={t("certificates.title")} subtitle={t("certificates.subtitle")} align="left" as="h2" />
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-md">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.titleKey}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className="relative rounded-2xl border border-[var(--color-border)] overflow-hidden group hover:shadow-md transition-shadow duration-300 bg-neutral-50"
          >
            {/* Certificate image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={cert.imageUrl}
                alt={t(cert.titleKey)}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Info bar */}
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-[var(--color-text-primary)]">{t(cert.titleKey)}</h3>
                <p className="font-sans text-xs text-[var(--color-text-secondary)] mt-0.5">{cert.issuer} · {cert.year}</p>
              </div>
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-accent-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <WhatIDoSection />
      <FeaturedProjectsSection />
      <CertificateSection />
    </main>
  );
}
