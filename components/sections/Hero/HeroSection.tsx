"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typewriter from "@/components/ui/Typewriter";
import SplitReveal from "@/components/ui/SplitReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const NAME = "Kahfiya Nur Gunami";

// ─── Floating Tech Logos (desktop only) ──────────────────────────────────────

const FLOATING_TECHS = [
  { name: "React",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",              x: "4%",  y: "14%", size: 40, delay: 0.0, duration: 5.2, drift: 14 },
  { name: "TypeScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",    x: "9%",  y: "48%", size: 34, delay: 0.6, duration: 6.0, drift: 10 },
  { name: "Next.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",            x: "2%",  y: "72%", size: 38, delay: 1.1, duration: 5.6, drift: 12 },
  { name: "Python",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",            x: "16%", y: "30%", size: 30, delay: 0.3, duration: 6.8, drift: 8  },
  { name: "Figma",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",              x: "12%", y: "64%", size: 28, delay: 0.9, duration: 5.8, drift: 10 },
  { name: "Blender",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",          x: "19%", y: "82%", size: 30, delay: 1.4, duration: 6.3, drift: 9  },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",  x: "81%", y: "18%", size: 40, delay: 0.4, duration: 5.4, drift: 13 },
  { name: "Node.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",            x: "87%", y: "52%", size: 34, delay: 0.8, duration: 6.2, drift: 11 },
  { name: "Git",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",                  x: "91%", y: "32%", size: 28, delay: 1.2, duration: 6.5, drift: 8  },
  { name: "PostgreSQL",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",    x: "94%", y: "16%", size: 30, delay: 0.5, duration: 6.1, drift: 10 },
  { name: "Docker",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",            x: "78%", y: "70%", size: 32, delay: 1.3, duration: 5.9, drift: 11 },
  { name: "C++",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",      x: "93%", y: "64%", size: 30, delay: 1.5, duration: 6.4, drift: 9  },
  { name: "HTML5",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",              x: "68%", y: "78%", size: 30, delay: 1.6, duration: 5.7, drift: 10 },
];

function FloatingTechCard({ tech }: { tech: typeof FLOATING_TECHS[number] }) {
  const [showLabel, setShowLabel] = useState(false);
  const pad = 20;
  const xVal = parseFloat(tech.x);
  const tooltipPos: "top" | "right" | "left" = xVal < 22 ? "right" : xVal > 75 ? "left" : "top";
  const tooltipStyle: React.CSSProperties =
    tooltipPos === "top"     ? { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }
    : tooltipPos === "right" ? { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
    :                          { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" };
  const arrowStyle: React.CSSProperties =
    tooltipPos === "top"     ? { position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid rgba(10,10,10,0.85)" }
    : tooltipPos === "right" ? { position: "absolute", left: -4, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderRight: "4px solid rgba(10,10,10,0.85)" }
    :                          { position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "4px solid rgba(10,10,10,0.85)" };
  return (
    <div className="absolute" style={{ left: tech.x, top: tech.y, zIndex: 1 }}
      onMouseEnter={() => setShowLabel(true)} onMouseLeave={() => setShowLabel(false)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.75, 0.75], scale: [0.5, 1, 1], y: [0, -tech.drift, 0] }}
        transition={{
          opacity: { delay: tech.delay + 0.8, duration: 0.6 },
          scale:   { delay: tech.delay + 0.8, duration: 0.6 },
          y: { delay: tech.delay + 1.5, duration: tech.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        }}
        className="relative"
      >
        <AnimatePresence>
          {showLabel && (
            <motion.div className="absolute whitespace-nowrap"
              style={{ ...tooltipStyle, background: "rgba(10,10,10,0.85)", color: "#fafafa", fontSize: "0.65rem", letterSpacing: "0.05em", padding: "3px 10px", borderRadius: 6, pointerEvents: "none", zIndex: 10 }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}>
              {tech.name}<span style={arrowStyle} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="rounded-2xl flex items-center justify-center"
          style={{ width: tech.size + pad, height: tech.size + pad, background: "rgba(255,255,255,0.12)", boxShadow: "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.18)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tech.icon} alt={tech.name} width={tech.size} height={tech.size} style={{ width: tech.size, height: tech.size, objectFit: "contain" }} />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Social Links ─────────────────────────────────────────────────────────────

const SOCIALS = [
  { href: "https://github.com/kahfiya", label: "GitHub",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
  { href: "https://www.linkedin.com/in/kahfiya-nur-gunami/", label: "LinkedIn",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];

// ─── Mobile Skill Pills (scrollable horizontal strip) ────────────────────────

const MOBILE_SKILLS = [
  { name: "Next.js",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "React",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "TypeScript",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/ffffff" },
  { name: "Python",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Blender",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg" },
  { name: "Node.js",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Git",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Docker",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
];

// ─── Tech Marquee — auto-scroll, pauseable on touch ─────────────────────────

function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate pills already rendered via JSX (×2), so we animate -50%
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(track, {
        x: "-50%",
        ease: "none",
        duration: 18,
        repeat: -1,
        // modifiers keep it seamless without jumping
        modifiers: {
          x: gsap.utils.unitize((x: number) => x % (track.scrollWidth / 2)),
        },
      });
    });

    // Pause on touch, resume on release
    const pause  = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.play();
    track.addEventListener("touchstart", pause,  { passive: true });
    track.addEventListener("touchend",   resume, { passive: true });

    return () => {
      ctx.revert();
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend",   resume);
    };
  }, []);

  const pills = (
    <>
      {MOBILE_SKILLS.map((skill) => (
        <div
          key={skill.name}
          className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.icon}
            alt={skill.name}
            width={16}
            height={16}
            style={{ width: 16, height: 16, objectFit: "contain", flexShrink: 0 }}
          />
          <span className="font-sans text-xs font-medium text-white/70 whitespace-nowrap">
            {skill.name}
          </span>
        </div>
      ))}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.5 }}
      className="relative z-10 py-3 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      aria-hidden="true"
    >
      {/* Left + right edge fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10"
        style={{ background: "linear-gradient(to left, rgba(0,0,0,0.5), transparent)" }} />

      {/* Track — doubled for seamless loop */}
      <div
        ref={trackRef}
        className="flex gap-2.5 w-max px-3"
        style={{ willChange: "transform" }}
      >
        {pills}
        {/* Duplicate for seamless loop */}
        {pills}
      </div>
    </motion.div>
  );
}

// ─── Mobile Hero ──────────────────────────────────────────────────────────────

function MobileHero({ t }: { t: (key: string) => string }) {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-neutral-900"
    >
      {/* ── Full-screen background PNG ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Hero/Hero Mobile.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* ── Dark gradient overlay — heavier at bottom so text is readable ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.88) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content — sits over video ── */}
      <div className="relative z-10 flex flex-col flex-1 justify-end px-6 pb-6">

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-white leading-[1.05]"
          style={{ fontSize: "clamp(2.2rem, 9vw, 3.2rem)" }}
        >
          {NAME}
        </motion.h1>

        {/* Typewriter row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex items-center gap-2 mt-2"
          style={{ fontSize: "clamp(0.9rem, 4vw, 1.1rem)" }}
        >
          <span className="text-white/55 font-sans font-light">{t("hero.im")}</span>
          <Typewriter
            words={[t("hero.role1"), t("hero.role2"), t("hero.role3"), t("hero.role4"), t("hero.role5")]}
            typeSpeed={70}
            deleteSpeed={35}
            pauseAfterType={1800}
            className="font-serif font-bold text-white"
            cursorClassName="bg-white"
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="font-sans text-white/50 font-light leading-relaxed mt-3 max-w-xs"
          style={{ fontSize: "clamp(0.78rem, 3.5vw, 0.88rem)" }}
        >
          {t("hero.bio")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex gap-3 mt-5"
        >
          <a
            href="/work"
            className="flex-1 text-center py-3.5 rounded-2xl font-sans text-sm font-semibold
                       bg-white text-neutral-900 active:scale-95 transition-transform duration-150"
          >
            {t("hero.cta.work")}
          </a>
          <a
            href="/contact"
            className="flex-1 text-center py-3.5 rounded-2xl font-sans text-sm font-semibold
                       text-white active:scale-95 transition-transform duration-150"
            style={{
              background: "rgba(249,115,22,0.18)",
              border: "1px solid rgba(249,115,22,0.4)",
            }}
          >
            {t("hero.cta.contact")}
          </a>
        </motion.div>

        {/* Socials + location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center gap-4 mt-4"
        >
          {SOCIALS.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/45 active:text-white transition-colors duration-200"
            >
              {icon}
            </a>
          ))}
          <div className="w-px h-4 bg-white/20" aria-hidden="true" />
          <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-white/35">
            {t("hero.location")}
          </span>
        </motion.div>
      </div>

      {/* ── Tech pills — auto-scrolling marquee strip ── */}
      <TechMarquee />
    </section>
  );
}

// ─── Desktop Hero ─────────────────────────────────────────────────────────────

function DesktopHero({ t }: { t: (key: string) => string }) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => {
      const v = videoRef.current;
      if (!v) return;
      v.src = "/Hero/Hero Section.webm";
      v.load();
    };
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(load);
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(load, 100);
      return () => clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.8, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "60% top", scrub: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label="Hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-md tablet:px-2xl overflow-hidden bg-neutral-900">
      <video ref={videoRef} aria-hidden="true" autoPlay muted loop playsInline preload="none"
        className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      <div ref={overlayRef} aria-hidden="true" className="absolute inset-0"
        style={{ zIndex: 1, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)" }} />


      <motion.div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
        <SplitReveal
          as="h1"
          split="chars"
          trigger="immediate"
          delay={0.2}
          className="font-serif leading-[1.1] text-white whitespace-nowrap"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)" }}
        >
          {NAME}
        </SplitReveal>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.6rem)" }}>
          <span className="text-white/65 font-sans font-light">{t("hero.im")}</span>
          <Typewriter
            words={[t("hero.role1"), t("hero.role2"), t("hero.role3"), t("hero.role4"), t("hero.role5")]}
            typeSpeed={75} deleteSpeed={40} pauseAfterType={2000}
            className="font-serif font-bold text-white" cursorClassName="bg-white" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-sans text-white/60 font-light max-w-sm leading-relaxed"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}>
          {t("hero.bio")}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-1">
          <a href="/work"
            className="px-6 py-3 rounded-full font-sans text-sm font-semibold bg-white text-neutral-900 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-200">
            {t("hero.cta.work")}
          </a>
          <a href="/contact"
            className="px-6 py-3 rounded-full font-sans text-sm font-semibold text-white hover:scale-105 active:scale-95 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}>
            {t("hero.cta.contact")}
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="flex items-center gap-4 mt-1">
          {SOCIALS.map(({ href, label, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="text-white/50 hover:text-white transition-colors duration-200">{icon}</a>
          ))}
          <div className="w-px h-4 bg-white/25" aria-hidden="true" />
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/50">{t("hero.location")}</span>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} aria-hidden="true">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40">{t("hero.scroll")}</span>
        <motion.div className="w-px bg-gradient-to-b from-white/40 to-transparent"
          initial={{ height: 0 }} animate={{ height: 40 }} transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }} />
      </motion.div>
    </section>
  );
}

// ─── Hero Section (responsive) ────────────────────────────────────────────────

export default function HeroSection() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Before mount: render desktop (SSR safe, no flash)
  if (!mounted) return <DesktopHero t={t} />;

  return isMobile ? <MobileHero t={t} /> : <DesktopHero t={t} />;
}
