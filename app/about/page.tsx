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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── My Stack Bento Grid ──────────────────────────────────────────────────────

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

interface StackItem {
  name: string;
  icon: string;
}

interface StackCategory {
  id: string;
  key: string;
  featured?: boolean;
  colSpan: string;
  items: StackItem[];
}

function CategoryIcon({ id, className = "w-4 h-4 shrink-0" }: { id: string; className?: string }) {
  switch (id) {
    case "ai-dev":
      return (
        <svg className={`${className} text-accent-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case "frontend":
      return (
        <svg className={`${className} text-[var(--color-text-secondary)]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "backend":
      return (
        <svg className={`${className} text-[var(--color-text-secondary)]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
          <line x1="6" x2="6.01" y1="6" y2="6" />
          <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
      );
    case "design":
      return (
        <svg className={`${className} text-[var(--color-text-secondary)]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
        </svg>
      );
    case "programming":
      return (
        <svg className={`${className} text-[var(--color-text-secondary)]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 8-4 4 4 4" />
          <path d="m17 8 4 4-4 4" />
          <path d="m14 4-4 16" />
        </svg>
      );
    case "tools":
      return (
        <svg className={`${className} text-[var(--color-text-secondary)]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    default:
      return null;
  }
}

const STACK_CATEGORIES: StackCategory[] = [
  {
    id: "ai-dev",
    key: "stack.aidev",
    featured: true,
    colSpan: "col-span-12 lg:col-span-7",
    items: [
      { name: "Antigravity",        icon: "/icons/antigravity.svg" },
      { name: "Cursor",             icon: "/icons/cursor.svg" },
      { name: "Claude",             icon: "/icons/claude.svg" },
      { name: "Codex",              icon: "/icons/codex.svg" },
      { name: "Kiro",               icon: "/icons/kiro.svg" },
      { name: "Blackbox",           icon: "/icons/blackbox.svg" },
      { name: "AI Coding",          icon: "/icons/ai-coding.svg" },
      { name: "Debugging",          icon: "/icons/debugging.svg" },
      { name: "Refactoring",        icon: "/icons/refactoring.svg" },
      { name: "Technical Research", icon: "/icons/technical-research.svg" },
    ],
  },
  {
    id: "frontend",
    key: "stack.frontend",
    colSpan: "col-span-12 lg:col-span-5",
    items: [
      { name: "HTML / CSS",    icon: `${CDN}/html5/html5-original.svg` },
      { name: "JavaScript",    icon: `${CDN}/javascript/javascript-original.svg` },
      { name: "TypeScript",    icon: `${CDN}/typescript/typescript-original.svg` },
      { name: "React",         icon: `${CDN}/react/react-original.svg` },
      { name: "Next.js",       icon: `${CDN}/nextjs/nextjs-original.svg` },
      { name: "Tailwind CSS",  icon: `${CDN}/tailwindcss/tailwindcss-original.svg` },
      { name: "Framer Motion", icon: "/icons/framer.svg" },
      { name: "GSAP",          icon: "https://cdn.simpleicons.org/greensock/88CE02" },
    ],
  },
  {
    id: "backend",
    key: "stack.backend",
    colSpan: "col-span-12 lg:col-span-7",
    items: [
      { name: "Node.js",    icon: `${CDN}/nodejs/nodejs-original.svg` },
      { name: "Express",    icon: `${CDN}/express/express-original.svg` },
      { name: "PostgreSQL", icon: `${CDN}/postgresql/postgresql-original.svg` },
      { name: "MySQL",      icon: `${CDN}/mysql/mysql-original.svg` },
      { name: "Prisma",     icon: `${CDN}/prisma/prisma-original.svg` },
      { name: "Supabase",   icon: `${CDN}/supabase/supabase-original.svg` },
    ],
  },
  {
    id: "design",
    key: "stack.design",
    colSpan: "col-span-12 lg:col-span-5",
    items: [
      { name: "Figma",         icon: `${CDN}/figma/figma-original.svg` },
      { name: "Blender",       icon: `${CDN}/blender/blender-original.svg` },
      { name: "Google Stitch", icon: "/icons/google-stitch.png" },
    ],
  },
  {
    id: "programming",
    key: "stack.core",
    colSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    items: [
      { name: "Python", icon: `${CDN}/python/python-original.svg` },
      { name: "C++",    icon: `${CDN}/cplusplus/cplusplus-original.svg` },
      { name: "C#",     icon: `${CDN}/csharp/csharp-original.svg` },
    ],
  },
  {
    id: "tools",
    key: "stack.tools",
    colSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    items: [
      { name: "Git",        icon: `${CDN}/git/git-original.svg` },
      { name: "GitHub",     icon: "/icons/github.svg" },
      { name: "Docker",     icon: `${CDN}/docker/docker-original.svg` },
      { name: "Windows 11", icon: `${CDN}/windows11/windows11-original.svg` },
    ],
  },
];

function MyStack() {
  const { t } = useLanguage();
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate each bento card on scroll
      const cards = section.querySelectorAll<HTMLElement>(".bento-card");
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1, y: 0, scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 70%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );

        // Tech pills inside card with staggered entrance
        const pills = card.querySelectorAll<HTMLElement>(".stack-pill");
        gsap.fromTo(pills,
          { opacity: 0, scale: 0.92, y: 10 },
          {
            opacity: 1, scale: 1, y: 0,
            ease: "power2.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 62%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stack-heading"
      className="mb-3xl rounded-3xl overflow-hidden relative border border-[var(--color-border)]
                 bg-[var(--color-bg-primary)] shadow-sm"
    >
      {/* Subtle orange glow top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(249,115,22,0.06) 0%, transparent 65%)" }} />

      {/* Header */}
      <div className="relative px-6 tablet:px-8 desktop:px-10 pt-2xl pb-xl border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-accent-500 font-sans font-black text-xl"
              style={{ display: "inline-block", animation: "spin 6s linear infinite" }}>✦</span>
            <h2 id="stack-heading" className="font-sans font-black tracking-tight text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
              {t("about.stack.title1")}{" "}<span className="text-accent-500">{t("about.stack.title2")}</span>
            </h2>
          </div>
          <div className="hidden tablet:flex items-center gap-2 px-3.5 py-1.5 rounded-full
                          border border-accent-500/20 bg-accent-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[var(--color-text-secondary)]">
              {t("about.stack.badge")}
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="p-6 tablet:p-8 desktop:p-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 tablet:gap-6">
          {STACK_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`bento-card ${cat.colSpan} flex flex-col justify-between p-6 tablet:p-7 rounded-2xl
                          border transition-all duration-300 relative overflow-hidden group
                          ${cat.featured
                            ? "border-accent-500/35 bg-gradient-to-br from-accent-500/[0.04] via-[var(--color-bg-secondary)] to-[var(--color-bg-secondary)] shadow-sm hover:border-accent-500/60 hover:shadow-xl"
                            : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-accent-500/30 hover:shadow-lg"
                          }`}
            >
              {/* Featured glow ornament */}
              {cat.featured && (
                <div
                  className="absolute top-0 right-0 w-64 h-64 pointer-events-none rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
                    transform: "translate(30%, -30%)",
                  }}
                />
              )}

              {/* Card Top / Header */}
              <div className="relative mb-5 z-10">
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <div className="flex items-center gap-2">
                    <CategoryIcon id={cat.id} />
                    <h3 className="font-sans font-bold tracking-wider text-xs uppercase text-[var(--color-text-secondary)]">
                      {t(`${cat.key}.label`)}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-sans font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border shrink-0 ${
                    cat.featured
                      ? "border-accent-500/30 bg-accent-500/10 text-accent-500"
                      : "border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] opacity-80"
                  }`}>
                    {t(`${cat.key}.badge`)}
                  </span>
                </div>
                <p className="font-sans text-xs text-[var(--color-text-secondary)] opacity-70 leading-relaxed">
                  {t(`${cat.key}.desc`)}
                </p>
              </div>

              {/* Pills Grid */}
              <div className="flex flex-wrap gap-2 tablet:gap-2.5 relative z-10">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="stack-pill flex items-center gap-2 px-3 py-2 rounded-xl cursor-default group/pill
                               border border-[var(--color-border)] bg-[var(--color-bg-primary)]
                               hover:border-accent-500/50 hover:bg-accent-500/5
                               hover:scale-[1.03] hover:-translate-y-0.5
                               transition-all duration-200 shadow-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      width={18}
                      height={18}
                      style={{ width: 18, height: 18, objectFit: "contain", flexShrink: 0 }}
                    />
                    <span className="font-sans text-xs tablet:text-sm font-medium text-[var(--color-text-primary)]
                                     group-hover/pill:text-accent-500 whitespace-nowrap transition-colors duration-200">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
      <ScrollScrub stagger={0.1} start="top 88%" end="top 30%"
        className="grid grid-cols-2 tablet:grid-cols-3 gap-lg">
        {PPLG_CARDS.map(({ key, icon, bg, href }, i) => (
          <button
            key={key}
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
          </button>
        ))}
      </ScrollScrub>

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
                  {t("common.view_proto")}
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
      tags: ["Web Development", "UI/UX Design", "C++", "Python", "3D Artist", "Figma"],
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
                  <p className="font-sans text-white/60 text-sm mt-0.5">{t("about.hero.role")}</p>
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
