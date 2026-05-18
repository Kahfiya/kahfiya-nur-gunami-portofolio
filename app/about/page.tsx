"use client";

import React from "react";
import { motion } from "framer-motion";
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

// ─── Skills data ─────────────────────────────────────────────────────────────

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const SKILLS: Array<{ name: string; bg: string; percent: number; iconUrl: string }> = [
  { name: "React",           percent: 1, bg: "#20232a", iconUrl: `${CDN}/react/react-original.svg` },
  { name: "Next.js",         percent: 1, bg: "#000000", iconUrl: `${CDN}/nextjs/nextjs-original.svg` },
  { name: "TypeScript",      percent: 1, bg: "#3178C6", iconUrl: `${CDN}/typescript/typescript-original.svg` },
  { name: "Tailwind CSS",    percent: 1, bg: "#0f172a", iconUrl: `${CDN}/tailwindcss/tailwindcss-original.svg` },
  { name: "Framer Motion",   percent: 1, bg: "#0d0d0d", iconUrl: "https://cdn.simpleicons.org/framer" },
  { name: "Figma",           percent: 1, bg: "#1e1e1e", iconUrl: `${CDN}/figma/figma-original.svg` },
  { name: "UI/UX Design",    percent: 1, bg: "#1a1a2e", iconUrl: `${CDN}/figma/figma-original.svg` },
  { name: "Python",          percent: 1, bg: "#1e3a5f", iconUrl: `${CDN}/python/python-original.svg` },
  { name: "HTML/CSS",        percent: 1, bg: "#e34c26", iconUrl: `${CDN}/html5/html5-original.svg` },
  { name: "C++",             percent: 1, bg: "#00427e", iconUrl: `${CDN}/cplusplus/cplusplus-original.svg` },
  { name: "C#",              percent: 1, bg: "#68217a", iconUrl: `${CDN}/csharp/csharp-original.svg` },
  { name: "Public Speaking", percent: 1, bg: "#b45309", iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z'/%3E%3Cpath d='M19 10v2a7 7 0 0 1-14 0v-2'/%3E%3Cline x1='12' y1='19' x2='12' y2='23'/%3E%3Cline x1='8' y1='23' x2='16' y2='23'/%3E%3C/svg%3E" },
  { name: "3D Artist",       percent: 1, bg: "#1a0533", iconUrl: `${CDN}/blender/blender-original.svg` },
  { name: "DevOps Engineer", percent: 1, bg: "#0f2027", iconUrl: `${CDN}/docker/docker-original.svg` },
];

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
                  <p className="font-sans text-white/60 text-sm mt-0.5">Fullstack Developer & Designer</p>
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
        <div className="grid grid-cols-2 tablet:grid-cols-3 gap-lg">
          {([
            { key: "web",  icon: "/Images/3D Casing.jpg",    bg: "#e34c26" },
            { key: "db",   icon: "/Images/Sistem Ops.jpg",    bg: "#00758f" },
            { key: "uiux", icon: "/Images/Figma.jpg",         bg: "#a259ff" },
            { key: "algo", icon: "/Images/Pin.jpg",           bg: "#1e3a5f" },
            { key: "net",  icon: "/Images/Nilai.jpg",         bg: "#16a34a" },
            { key: "game", icon: "/Images/Panel-P10.jpg",     bg: "#cc0000" },
          ] as const).map(({ key, icon, bg }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
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
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
