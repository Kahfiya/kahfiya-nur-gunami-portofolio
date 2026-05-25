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
import ScrollScrub from "@/components/ui/ScrollScrub";

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
      { name: "GSAP",          icon: "https://cdn.simpleicons.org/greensock/88CE02" },
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
      { name: "Windows 11", icon: `${CDN}/windows11/windows11-original.svg` },
    ],
  },
];

function MyStack() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="stack-heading"
      className="mb-3xl rounded-3xl overflow-hidden relative border border-[var(--color-border)]
                 bg-[var(--color-bg-primary)] shadow-sm"
    >
      {/* Subtle orange glow top-right */}
      <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(249,115,22,0.06) 0%, transparent 65%)" }} />

      {/* Header */}
      <div className="relative px-xl pt-2xl pb-xl border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-accent-500 font-sans font-black text-xl"
              style={{ display: "inline-block", animation: "spin 6s linear infinite" }}>✦</span>
            <h2 id="stack-heading" className="font-sans font-black tracking-tight text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
              MY <span className="text-accent-500">STACK</span>
            </h2>
          </div>
          <div className="hidden tablet:flex items-center gap-2 px-3 py-1.5 rounded-full
                          border border-accent-500/20 bg-accent-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-secondary)]">
              Always Learning
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="relative divide-y divide-[var(--color-border)]">
        {STACK_CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: ci * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col tablet:flex-row"
          >
            {/* Category label */}
            <div className="flex items-center tablet:items-start pt-xl px-xl pb-3 tablet:pb-xl tablet:w-44 shrink-0">
              <span className="font-sans font-bold tracking-[0.2em] text-[var(--color-text-secondary)] opacity-50"
                style={{ fontSize: "0.6rem" }}>
                {cat.label}
              </span>
            </div>

            {/* Tech items */}
            <div className="tablet:border-l tablet:border-[var(--color-border)] px-xl pb-xl tablet:pt-xl">
              <ScrollScrub stagger={0.04} scrub={true} start="top 90%" end="top 50%"
                className="flex flex-wrap gap-2.5">
                {cat.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.3, delay: ci * 0.06 }}
                    whileHover={{ scale: 1.07, y: -3 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default group
                               border border-[var(--color-border)] bg-[var(--color-bg-secondary)]
                               hover:border-accent-500/40 hover:bg-accent-500/5
                               transition-all duration-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tech.icon} alt={tech.name} width={20} height={20}
                      style={{ width: 20, height: 20, objectFit: "contain", flexShrink: 0 }} />
                    <span className="font-sans text-sm font-medium text-[var(--color-text-secondary)]
                                     group-hover:text-accent-500 whitespace-nowrap transition-colors duration-200">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </ScrollScrub>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.35), transparent)" }} />
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
            <ScrollScrub stagger={0.08} scrub={1} start="top 85%" end="top 40%">
              <p className="font-sans text-[var(--color-text-secondary)] text-base leading-relaxed">{t("about.bio.p1")}</p>
              <p className="font-sans text-[var(--color-text-secondary)] text-base leading-relaxed">{t("about.bio.p2")}</p>
              <p className="font-sans text-[var(--color-text-secondary)] text-base leading-relaxed">{t("about.bio.p3")}</p>
            </ScrollScrub>
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

      {/* ── My Stack ── */}
      <MyStack />

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
