"use client";

import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import SectionHeading from "@/components/sections/SectionHeading";
import Typewriter from "@/components/ui/Typewriter";
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
  { titleKey: "cert.web.title", issuer: "Dicoding Indonesia", year: "2026", color: "from-blue-50 to-blue-100", accent: "text-blue-600" },
  { titleKey: "cert.frontend.title", issuer: "Dicoding Indonesia", year: "2026", color: "from-purple-50 to-purple-100", accent: "text-purple-600" },
  { titleKey: "cert.uiux.title", issuer: "Coursera", year: "2026", color: "from-orange-50 to-orange-100", accent: "text-accent-600" },
  { titleKey: "cert.js.title", issuer: "freeCodeCamp", year: "2026", color: "from-green-50 to-green-100", accent: "text-green-600" },
];

const NAME = "Kahfiya Nur Gunami";

// ─── Floating tech logos ──────────────────────────────────────────────────────

const FLOATING_TECHS: Array<{
  name: string;
  icon: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}> = [
  // Left side
  { name: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",           x: "5%",  y: "15%", size: 40, delay: 0.0, duration: 5.2, drift: 14 },
  { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", x: "10%", y: "50%", size: 34, delay: 0.6, duration: 6.0, drift: 10 },
  { name: "Next.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",         x: "3%",  y: "74%", size: 38, delay: 1.1, duration: 5.6, drift: 12 },
  { name: "Python",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",         x: "17%", y: "31%", size: 30, delay: 0.3, duration: 6.8, drift: 8  },
  { name: "Figma",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",           x: "13%", y: "66%", size: 28, delay: 0.9, duration: 5.8, drift: 10 },
  { name: "Blender",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",       x: "20%", y: "82%", size: 30, delay: 1.4, duration: 6.3, drift: 9  },
  // Right side
  { name: "Tailwind CSS",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", x: "81%", y: "20%", size: 40, delay: 0.4, duration: 5.4, drift: 13 },
  { name: "Node.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",         x: "87%", y: "53%", size: 34, delay: 0.8, duration: 6.2, drift: 11 },
  { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",               x: "91%", y: "33%", size: 28, delay: 1.2, duration: 6.5, drift: 8  },
  { name: "PostgreSQL",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", x: "94%", y: "18%", size: 30, delay: 0.5, duration: 6.1, drift: 10 },
  { name: "Docker",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",         x: "78%", y: "72%", size: 32, delay: 1.3, duration: 5.9, drift: 11 },
  { name: "C++",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",   x: "93%", y: "65%", size: 30, delay: 1.5, duration: 6.4, drift: 9  },
  { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",           x: "68%", y: "78%", size: 30, delay: 1.6, duration: 5.7, drift: 10 },
];

function FloatingTechCard({ tech }: { tech: typeof FLOATING_TECHS[number] }) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const pad = 20;

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ left: tech.x, top: tech.y, zIndex: dragging ? 50 : 1 }}
      drag
      dragMomentum={false}
      dragElastic={0.15}
      whileDrag={{ scale: 1.18, zIndex: 50 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={dragging ? {} : {
        opacity: [0, 0.7, 0.7],
        scale: [0.5, 1, 1],
        y: [0, -tech.drift, 0],
      }}
      transition={{
        opacity: { delay: tech.delay + 0.8, duration: 0.6 },
        scale:   { delay: tech.delay + 0.8, duration: 0.6 },
        y: {
          delay: tech.delay + 1.5,
          duration: tech.duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && !dragging && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            style={{
              background: "rgba(10,10,10,0.85)",
              color: "#fafafa",
              fontSize: "0.65rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              letterSpacing: "0.05em",
              padding: "3px 10px",
              borderRadius: 6,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {tech.name}
            <span
              style={{
                position: "absolute",
                bottom: -4,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: "4px solid rgba(10,10,10,0.85)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon pill */}
      <motion.div
        className="rounded-2xl flex items-center justify-center backdrop-blur-sm"
        animate={{ scale: hovered && !dragging ? 1.12 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          width: tech.size + pad,
          height: tech.size + pad,
          background: dragging ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
          boxShadow: dragging
            ? "0 16px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)"
            : hovered
            ? "0 8px 28px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.9)"
            : "0 4px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.85)",
          border: "1px solid rgba(255,255,255,0.8)",
          transition: "box-shadow 0.2s, background 0.2s",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tech.icon}
          alt={tech.name}
          width={tech.size}
          height={tech.size}
          style={{ width: tech.size, height: tech.size, objectFit: "contain", display: "block" }}
        />
      </motion.div>
    </motion.div>
  );
}

function FloatingTechLogos() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="false" style={{ zIndex: 1 }}>
      {FLOATING_TECHS.map((tech, i) => (
        <FloatingTechCard key={i} tech={tech} />
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[90svh] flex flex-col items-center justify-center px-md tablet:px-2xl overflow-hidden bg-gradient-to-br from-neutral-50 via-orange-50/40 to-amber-50/30"
    >
      {/* Decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-orange-100/50 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-amber-100/60 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-50/40 blur-3xl" />
      </div>

      <FloatingTechLogos />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center gap-lg"
      >

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif leading-tight text-neutral-900 whitespace-nowrap"
          style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
        >
          {NAME}
        </motion.h1>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="font-sans text-neutral-500 font-light max-w-md"
          style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)" }}
        >
          {t("hero.bio")}
        </motion.p>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          style={{ fontSize: "clamp(1.1rem, 3vw, 1.75rem)" }}
        >
          <span className="text-neutral-500 font-sans font-light">{t("hero.im")}</span>
          <Typewriter
            words={[t("hero.role1"), t("hero.role2"), t("hero.role3"), t("hero.role4"), t("hero.role5")]}
            typeSpeed={75}
            deleteSpeed={40}
            pauseAfterType={2000}
            className="font-serif font-bold text-neutral-900"
            cursorClassName="bg-accent-500"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-2"
        >
          <a
            href="/work"
            className="px-6 py-3 rounded-full bg-neutral-900 text-white font-sans text-sm font-medium hover:bg-neutral-700 transition-colors duration-200"
          >
            {t("hero.cta.work")}
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-full border border-neutral-300 text-neutral-700 font-sans text-sm font-medium hover:border-neutral-500 hover:text-neutral-900 transition-colors duration-200"
          >
            {t("hero.cta.contact")}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex items-center gap-4 mt-1"
        >
          {[
            { href: "https://github.com/kahfiya", label: "GitHub", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            )},
            { href: "https://linkedin.com/in/kahfiya", label: "LinkedIn", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            )},
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-neutral-400 hover:text-neutral-700 transition-colors duration-200"
            >
              {icon}
            </a>
          ))}
          <div className="w-px h-4 bg-neutral-300" />
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-neutral-400">{t("hero.location")}</span>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400">{t("hero.scroll")}</span>
        <div className="w-px h-10 bg-gradient-to-b from-neutral-400 to-transparent" />
      </motion.div>
    </section>
  );
}

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
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-md">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.titleKey}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className={`relative rounded-2xl bg-gradient-to-br ${cert.color} p-6 border border-[var(--color-border)] overflow-hidden group hover:shadow-md transition-shadow duration-300`}
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/40 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute -right-2 -top-2 w-12 h-12 rounded-full bg-white/60 group-hover:scale-110 transition-transform duration-500 delay-75" />
            <div className="mb-4">
              <svg viewBox="0 0 24 24" className={`w-8 h-8 ${cert.accent}`} fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 className="font-serif text-lg font-bold text-[var(--color-text-primary)] mb-1 relative z-10">{t(cert.titleKey)}</h3>
            <p className={`font-sans text-sm font-medium ${cert.accent} relative z-10`}>{cert.issuer}</p>
            <p className="font-sans text-xs text-[var(--color-text-secondary)] mt-1 relative z-10">{cert.year}</p>
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
