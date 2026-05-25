"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/sections/SectionHeading";
import { Timeline } from "@/components/ui/timeline";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MusicPlayer from "@/components/ui/MusicPlayer";
import TiltedCard from "@/components/ui/TiltedCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// ─── Skill Bar ────────────────────────────────────────────────────────────────

function SkillBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div
      className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label} proficiency ${percent}%`}
    >
      <motion.div
        className="h-full rounded-full bg-accent-500"
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      />
    </div>
  );
}

// ─── My Stack ────────────────────────────────────────────────────────────────

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const STACK_CATEGORIES = [
  {
    label: "FRONTEND",
    items: [
      { name: "HTML / CSS",    icon: `${CDN}/html5/html5-original.svg` },
      { name: "JavaScript",    icon: `${CDN}/javascript/javascript-original.svg` },
      { name: "TypeScript",    icon: `${CDN}/typescript/typescript-original.svg` },
      { name: "React",         icon: `${CDN}/react/react-original.svg` },
      { name: "Next.js",       icon: `${CDN}/nextjs/nextjs-original.svg` },
      { name: "Tailwind CSS",  icon: `${CDN}/tailwindcss/tailwindcss-original.svg` },
      { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/ffffff" },
    ],
  },
  {
    label: "DESIGN",
    items: [
      { name: "Figma",   icon: `${CDN}/figma/figma-original.svg` },
      { name: "Blender", icon: `${CDN}/blender/blender-original.svg` },
    ],
  },
  {
    label: "PROGRAMMING",
    items: [
      { name: "Python", icon: `${CDN}/python/python-original.svg` },
      { name: "C++",    icon: `${CDN}/cplusplus/cplusplus-original.svg` },
      { name: "C#",     icon: `${CDN}/csharp/csharp-original.svg` },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { name: "Git",    icon: `${CDN}/git/git-original.svg` },
      { name: "Docker", icon: `${CDN}/docker/docker-original.svg` },
      { name: "Linux",  icon: `${CDN}/linux/linux-original.svg` },
    ],
  },
];

const SKILLS: Array<{ name: string; bg: string; percent: number; iconUrl: string }> = [
  { name: "React",           percent: 85, bg: "#20232a", iconUrl: `${CDN}/react/react-original.svg` },
  { name: "Next.js",         percent: 82, bg: "#000000", iconUrl: `${CDN}/nextjs/nextjs-original.svg` },
  { name: "TypeScript",      percent: 78, bg: "#3178C6", iconUrl: `${CDN}/typescript/typescript-original.svg` },
  { name: "Tailwind CSS",    percent: 88, bg: "#0f172a", iconUrl: `${CDN}/tailwindcss/tailwindcss-original.svg` },
  { name: "Framer Motion",   percent: 75, bg: "#0d0d0d", iconUrl: "https://cdn.simpleicons.org/framer" },
  { name: "Figma",           percent: 80, bg: "#1e1e1e", iconUrl: `${CDN}/figma/figma-original.svg` },
  { name: "UI/UX Design",    percent: 77, bg: "#1a1a2e", iconUrl: `${CDN}/figma/figma-original.svg` },
  { name: "Python",          percent: 70, bg: "#1e3a5f", iconUrl: `${CDN}/python/python-original.svg` },
  { name: "HTML/CSS",        percent: 92, bg: "#e34c26", iconUrl: `${CDN}/html5/html5-original.svg` },
  { name: "C++",             percent: 60, bg: "#00427e", iconUrl: `${CDN}/cplusplus/cplusplus-original.svg` },
  { name: "C#",              percent: 55, bg: "#68217a", iconUrl: `${CDN}/csharp/csharp-original.svg` },
  { name: "Public Speaking", percent: 72, bg: "#b45309", iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z'/%3E%3Cpath d='M19 10v2a7 7 0 0 1-14 0v-2'/%3E%3Cline x1='12' y1='19' x2='12' y2='23'/%3E%3Cline x1='8' y1='23' x2='16' y2='23'/%3E%3C/svg%3E" },
  { name: "3D Artist",       percent: 65, bg: "#1a0533", iconUrl: `${CDN}/blender/blender-original.svg` },
  { name: "DevOps Engineer", percent: 58, bg: "#0f2027", iconUrl: `${CDN}/docker/docker-original.svg` },
];

function MyStack() {
  const { t } = useLanguage();
  return (
    <section
      aria-labelledby="stack-heading"
      className="mb-3xl rounded-3xl overflow-hidden"
      style={{ background: "#0d0d12" }}
    >
      {/* Header */}
      <div className="px-xl pt-2xl pb-xl border-b border-white/10">
        <h2
          id="stack-heading"
          className="font-sans font-black tracking-tight text-white"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
        >
          {t("about.skills.title").toUpperCase().split(" ").map((word, i) => (
            <span key={i}>
              {i === 1 ? <span className="text-accent-500">{word}</span> : word}
              {i < t("about.skills.title").split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
      </div>

      {/* Categories */}
      <div className="divide-y divide-white/10">
        {STACK_CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: ci * 0.08 }}
            className="grid grid-cols-[120px_1fr] tablet:grid-cols-[200px_1fr] gap-0"
          >
            {/* Category label */}
            <div className="flex items-start pt-xl px-xl pb-xl border-r border-white/10">
              <span
                className="font-sans font-bold tracking-widest text-white/30"
                style={{ fontSize: "0.65rem", writingMode: "horizontal-tb" }}
              >
                {cat.label}
              </span>
            </div>

            {/* Tech items */}
            <div className="flex flex-wrap gap-sm px-xl py-xl">
              {cat.items.map((tech, ti) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.35, delay: ci * 0.08 + ti * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    width={28}
                    height={28}
                    style={{ width: 28, height: 28, objectFit: "contain" }}
                  />
                  <span className="font-sans text-sm font-medium text-white/80 whitespace-nowrap">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── PPLG Grid + Detail Modal ────────────────────────────────────────────────

const PPLG_CARDS = [
  { key: "casing3d",  icon: "/Images/3D Casing.jpg",  bg: "#e34c26", href: "https://drive.google.com/drive/folders/1II8sI4B9RycI5tQOieX5bj03-8lBHuLx?usp=sharing" },
  { key: "sysop",   icon: "/Images/Sistem Ops.jpg", bg: "#00758f", href: "https://drive.google.com/drive/folders/1uPGYj_TycWJYNB86urnr7txj9lWvoOoE?usp=sharing" },
  { key: "uiux", icon: "/Images/Figma.jpg",      bg: "#a259ff", href: "https://www.figma.com/proto/eW4Bgtr8VlLE0uTBN22EY4/IOT-WEBSITE-AND-APP?node-id=119-63&t=wjF33PSxnepo5Iak-1" },
  { key: "algo2",  icon: "/Images/Flowchart.jpg",      bg: "#16a34a", href: "https://drive.google.com/drive/folders/1MtDp6E-fZCOw_4ZZUzW2iamGTtuf3CXq?usp=sharing" },
  { key: "brosur", icon: "/Images/Browser.jpg",    bg: "#cc0000", href: "https://drive.google.com/drive/folders/1II8sI4B9RycI5tQOieX5bj03-8lBHuLx?usp=sharing" },
] as const;

function PplgGrid() {
  const { t } = useLanguage();
  const [active, setActive] = React.useState<typeof PPLG_CARDS[number] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 tablet:grid-cols-3 gap-lg">
        {PPLG_CARDS.map(({ key, icon, bg, href }, i) => (
          <motion.button
            key={key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            onClick={() => setActive(PPLG_CARDS[i])}
            className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-[15px]"
            aria-label={`View details: ${t(`pplg.${key}.title`)}`}
          >
            <TiltedCard
              imageSrc={icon}
              altText={t(`pplg.${key}.title`)}
              captionText={t(`pplg.${key}.title`)}
              containerHeight="220px"
              imageHeight="220px"
              imageWidth="100%"
              scaleOnHover={1.05}
              rotateAmplitude={10}
              showMobileWarning={false}
              displayOverlayContent
              overlayContent={
                <div
                  className="w-full h-full rounded-[15px] flex flex-col justify-end p-md"
                  style={{ background: `linear-gradient(to top, ${bg}ee 0%, ${bg}44 50%, transparent 100%)` }}
                >
                  <p className="font-sans text-white text-sm font-semibold leading-tight">{t(`pplg.${key}.title`)}</p>
                </div>
              }
            />
          </motion.button>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative bg-[var(--color-bg-primary)] rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full image — natural size */}
              <div className="relative w-full bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.icon} alt={t(`pplg.${active.key}.title`)} className="w-full h-auto block" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Text + link */}
              <div className="p-6 flex flex-col gap-3">
                <h3 className="font-serif text-xl font-bold text-[var(--color-text-primary)]">
                  {t(`pplg.${active.key}.title`)}
                </h3>
                <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {t(`pplg.${active.key}.desc`)}
                </p>
                <a
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                  </svg>
                  Lihat Prototype →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const { t } = useLanguage();

  const timelineData = [
    {
      title: t("edu.smp.title"),
      subtitle: t("edu.smp.subtitle"),
      period: t("edu.smp.period"),
      description: t("edu.smp.description"),
      tags: [t("edu.smp.tag1"), t("edu.smp.tag2"), t("edu.smp.tag3"), t("edu.smp.tag4")],
    },
    {
      title: t("edu.smk.title"),
      subtitle: t("edu.smk.subtitle"),
      period: t("edu.smk.period"),
      description: t("edu.smk.description"),
      tags: ["Web Development", "UI/UX Design", "C++", "Pyhton", "3D Artist", "Figma"],
      achievements: [
        t("edu.smk.achievement1"),
        t("edu.smk.achievement2"),
        t("edu.smk.achievement3"),
        t("edu.smk.achievement4"),
      ],
    },
  ];

  return (
    <main className="px-md tablet:px-2xl desktop:px-3xl py-2xl desktop:py-3xl max-w-[1280px] mx-auto">

      {/* ── Bio Section ── */}
      <section aria-labelledby="about-heading" className="mb-3xl">
        <SectionHeading title={t("about.title")} as="h1" />
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2xl">
          <ScrollReveal direction="left" delay={0.1} className="order-first flex justify-center items-start">
            <SpotlightCard className="max-w-[340px] w-full p-0" spotlightColor="rgba(249, 115, 22, 0.3)">
              <div className="relative w-full rounded-3xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Images/Kahfiya Nur Gunami.jpg" alt="Kahfiya Nur Gunami" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-lg">
                  <p className="font-serif text-white text-lg font-bold">Kahfiya Nur Gunami</p>
                  <p className="font-sans text-white/60 text-sm mt-0.5">Prompt Engineering & Designer</p>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2} className="flex flex-col justify-center gap-md">
            <p className="font-sans text-[var(--color-text-secondary)] text-base leading-relaxed">{t("about.bio.p1")}</p>
            <p className="font-sans text-[var(--color-text-secondary)] text-base leading-relaxed">{t("about.bio.p2")}</p>
            <p className="font-sans text-[var(--color-text-secondary)] text-base leading-relaxed">{t("about.bio.p3")}</p>
            <MusicPlayer />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Education Timeline ── */}
      <ScrollReveal direction="up" delay={0} className="mb-3xl -mx-md tablet:-mx-2xl desktop:-mx-3xl">
        <div className="px-md tablet:px-2xl desktop:px-3xl">
          <SectionHeading title={t("about.education.title")} as="h2" />
        </div>
        <Timeline data={timelineData} />
      </ScrollReveal>

      {/* ── Skills Section ── */}
      <section aria-labelledby="skills-heading" className="mb-3xl">
        <SectionHeading title={t("about.skills.title")} as="h2" />
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-md max-w-3xl">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center gap-md"
            >
              {/* Logo badge */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                style={{ background: skill.bg }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={skill.iconUrl} alt={skill.name} width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain" }} />
              </div>

              {/* Label + bar */}
              <div className="flex-1 flex flex-col gap-xs">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-sm font-medium text-[var(--color-text-primary)]">{skill.name}</span>
                  <span className="font-sans text-xs text-[var(--color-text-secondary)]">{skill.percent}%</span>
                </div>
                <SkillBar percent={skill.percent} label={skill.name} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PPLG Competencies ── */}
      <section aria-labelledby="pplg-heading">
        <SectionHeading title={t("pplg.title")} as="h2" />
        <p className="font-sans text-sm text-[var(--color-text-secondary)] mb-xl -mt-sm max-w-2xl">
          {t("pplg.subtitle")}
        </p>
        <PplgGrid />
      </section>

    </main>
  );
}
