"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/sections/SectionHeading";
import { Timeline } from "@/components/ui/timeline";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
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

// ─── Tech badge SVG icons ─────────────────────────────────────────────────────

const SKILLS: Array<{ name: string; bg: string; percent: number; icon: React.ReactNode }> = [
  {
    name: "React",
    percent: 1,
    bg: "#20232a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  {
    name: "Next.js",
    percent: 1,
    bg: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5V7.5l7 9H11z"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    percent: 1,
    bg: "#3178C6",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6"/>
        <path fill="white" d="M13.5 12.5h2v5h-1.5v-3.5l-1 1.5-1-1.5V17.5H10.5v-5h2l.5.8.5-.8zM7 12.5h4v1.5H9.5V17.5H8V14H7v-1.5z"/>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    percent: 1,
    bg: "#0f172a",
    icon: (
      <svg viewBox="0 0 24 24" fill="#38BDF8" className="w-5 h-5">
        <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.6 2.15C19.67 12 21.33 10.67 22 8c-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.51 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 17.85 9.49 19 12 19c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C12.62 14.15 11.51 13 7 13z"/>
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    percent: 1,
    bg: "#0d0d0d",
    icon: (
      <svg viewBox="0 0 24 24" fill="#BB4B96" className="w-5 h-5">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    ),
  },
  {
    name: "Figma",
    percent: 1,
    bg: "#1e1e1e",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M8 2a3 3 0 0 0 0 6h3V2H8z" fill="#F24E1E"/>
        <path d="M11 2v6h3a3 3 0 0 0 0-6h-3z" fill="#FF7262"/>
        <path d="M8 10a3 3 0 0 0 0 6h3v-6H8z" fill="#A259FF"/>
        <path d="M11 10v6h.5a3 3 0 0 0 0-6H11z" fill="#1ABCFE"/>
        <path d="M11 18a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" fill="#0ACF83"/>
      </svg>
    ),
  },
  {
    name: "UI/UX Design",
    percent: 1,
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>
      </svg>
    ),
  },
  {
    name: "Python",
    percent: 1,
    bg: "#1e3a5f",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#FFD43B" d="M12 2C9.2 2 7 3.1 7 4.5V7h5v1H5.5C4.1 8 3 9.2 3 11v3c0 1.8 1.1 3 2.5 3H7v-2.5C7 13.1 9.2 12 12 12s5 1.1 5 2.5V17h1.5c1.4 0 2.5-1.2 2.5-3v-3c0-1.8-1.1-3-2.5-3H17V4.5C17 3.1 14.8 2 12 2zm-1.5 2a1 1 0 110 2 1 1 0 010-2z"/>
        <path fill="#4B8BBE" d="M12 12c-2.8 0-5 1.1-5 2.5V19.5C7 20.9 9.2 22 12 22s5-1.1 5-2.5v-5C17 13.1 14.8 12 12 12zm1.5 8a1 1 0 110-2 1 1 0 010 2z"/>
      </svg>
    ),
  },
  {
    name: "HTML/CSS",
    percent: 1,
    bg: "#e34c26",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4zm13.1 5H8.9l.2 2h7.8l-.6 6.5L12 18l-4.3-1.5-.3-3h2l.2 1.8L12 16l2.4-.7.3-2.8H7.7L7.1 8z"/>
      </svg>
    ),
  },
  {
    name: "C++",
    percent: 1,
    bg: "#00427e",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <text x="2" y="18" fontSize="14" fontWeight="bold" fill="white">C++</text>
      </svg>
    ),
  },
  {
    name: "C#",
    percent: 1,
    bg: "#68217a",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <text x="2" y="18" fontSize="14" fontWeight="bold" fill="white">C#</text>
      </svg>
    ),
  },
  {
    name: "Public Speaking",
    percent: 1,
    bg: "#1a1a1a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/>
      </svg>
    ),
  },
  {
    name: "3D Artist",
    percent: 1,
    bg: "#1a0533",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 3L21 8.5V15.5L12 21L3 15.5V8.5L12 3Z" stroke="#E87D0D" strokeWidth="1.4" fill="none"/>
        <path d="M12 3V21" stroke="#E87D0D" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.5"/>
        <path d="M3 8.5L21 8.5" stroke="#E87D0D" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.5"/>
        <path d="M12 3L21 8.5" stroke="#5B9BD5" strokeWidth="1.4"/>
        <path d="M12 3L3 8.5" stroke="#5B9BD5" strokeWidth="1.4"/>
        <circle cx="12" cy="12" r="2" fill="#E87D0D" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "DevOps Engineer",
    percent: 1,
    bg: "#0f2027",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M12 12C12 12 9.5 8 7 8C4.5 8 3 9.8 3 12C3 14.2 4.5 16 7 16C9.5 16 12 12 12 12Z"
          stroke="#00D4FF"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M12 12C12 12 14.5 16 17 16C19.5 16 21 14.2 21 12C21 9.8 19.5 8 17 8C14.5 8 12 12 12 12Z"
          stroke="#00D4FF"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="7" cy="12" r="1" fill="#00D4FF" opacity="0.7"/>
        <circle cx="17" cy="12" r="1" fill="#00D4FF" opacity="0.7"/>
      </svg>
    ),
  },
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
      tags: ["Web Development", "UI/UX Design", "C++", "JavaScript", "C#", "Figma"],
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
      <section aria-labelledby="skills-heading">
        <SectionHeading title={t("about.skills.title")} as="h2" />
        <div className="flex flex-col gap-md max-w-xl">
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
                {skill.icon}
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

    </main>
  );
}
