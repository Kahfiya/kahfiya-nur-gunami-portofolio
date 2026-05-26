"use client";

/**
 * HomeProjectsCerts — GSAP scrub with dramatic reveals
 * Projects: staggered y + scale + rotateX (depth feel)
 * Certs: staggered with alternating x direction
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useLanguage } from "@/lib/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "marbas",
    title: "Marbas-Nusantara",
    descKey: "project.marbas.desc",
    imageUrl: "/Images/Marbas.jpg",
    imageAlt: "Marbas Nusantara",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "E-Commerce"],
    href: "https://v0-marbas-store-s7.vercel.app",
  },
  {
    id: "lumidh",
    title: "Lumidh Parfum",
    descKey: "project.lumidh.desc",
    imageUrl: "/Images/Lumidh.jpg",
    imageAlt: "Lumidh Parfum",
    tags: ["Next.js", "E-Commerce", "UI/UX", "TypeScript"],
    href: "https://web-lumidh-versi-lebih-bagus.vercel.app/",
  },
  {
    id: "adria",
    title: "Adria Studio Design",
    descKey: "project.adria.desc",
    imageUrl: "/Images/Adria.jpg",
    imageAlt: "Adria Studio Design",
    tags: ["Framer Motion", "Animation", "UI/UX", "Next.js"],
    href: "https://adria-website.vercel.app/",
  },
];

const CERTIFICATES = [
  { titleKey: "cert.web.title",      issuer: "Dicoding Indonesia", year: "2026", imageUrl: "/Images/Sertifikat/Sertif Dasar AI.jpg" },
  { titleKey: "cert.frontend.title", issuer: "Dicoding Indonesia", year: "2026", imageUrl: "/Images/Sertifikat/Sertif financial.jpg" },
  { titleKey: "cert.python.title",   issuer: "Dicoding Indonesia", year: "2026", imageUrl: "/Images/Sertifikat/Sertif Memulai Pemrograman dengan Python.jpg" },
  { titleKey: "cert.ai.title",       issuer: "IBM SkillsBuild",    year: "2026", imageUrl: "/Images/Sertifikat/Sertif Introduction to Artificial Intelligence.jpg" },
  { titleKey: "cert.claude.title",   issuer: "Anthropic",          year: "2026", imageUrl: "/Images/Sertifikat/Sertif Claude 101.jpg" },
  { titleKey: "cert.aifund.title",   issuer: "Coursera",           year: "2026", imageUrl: "/Images/Sertifikat/Sertif AI Fundamentals for Non-Data Scientists.jpg" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export function HomeProjects() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading clip wipe
      const words = section.querySelectorAll<HTMLElement>(".proj-word");
      gsap.fromTo(words,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)", opacity: 1,
          ease: "expo.out", stagger: 0.06,
          scrollTrigger: {
            trigger: section.querySelector(".proj-heading"),
            start: "top 88%", end: "top 50%",
            scrub: 1.2, invalidateOnRefresh: true,
          },
        }
      );

      // Cards — dramatic depth reveal
      const cards = section.querySelectorAll<HTMLElement>(".proj-card");
      gsap.fromTo(cards,
        { opacity: 0, y: 100, scale: 0.85, rotateX: 12, transformOrigin: "center bottom" },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          ease: "expo.out", stagger: 0.18,
          scrollTrigger: {
            trigger: section.querySelector(".proj-grid"),
            start: "top 85%", end: "top 5%",
            scrub: 1.8, invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full" style={{ perspective: "1200px" }}>

      <div className="proj-heading mb-2xl">
        <p className="proj-word font-sans text-xs tracking-[0.2em] uppercase text-accent-500 mb-3 inline-block">— Work</p>
        <h2 className="font-serif font-bold text-[var(--color-text-primary)] flex flex-wrap gap-x-[0.25em]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          {t("projects.title").split(" ").map((w, i) => (
            <span key={i} className="proj-word inline-block">{w}</span>
          ))}
        </h2>
        <p className="proj-word font-sans text-[var(--color-text-secondary)] mt-3 max-w-xl inline-block"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}>
          {t("projects.subtitle")}
        </p>
      </div>

      <div className="proj-grid grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-lg">
        {PROJECTS.map((p) => (
          <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" className="proj-card block" style={{ willChange: "transform" }}>
            <CardContainer className="w-full">
              <CardBody className="bg-[var(--color-bg-primary)] relative group/card border border-[var(--color-border)] hover:border-accent-400 hover:shadow-2xl w-full h-auto rounded-2xl p-6 transition-all duration-300 cursor-pointer">
                <CardItem translateZ="50" className="text-xl font-bold text-[var(--color-text-primary)] font-serif">{p.title}</CardItem>
                <CardItem as="p" translateZ="60" className="text-[var(--color-text-secondary)] text-sm max-w-sm mt-2 font-sans leading-relaxed">{t(p.descKey)}</CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="relative h-48 w-full rounded-xl overflow-hidden bg-neutral-100">
                    <Image src={p.imageUrl} alt={p.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover/card:scale-110 transition-transform duration-700" />
                  </div>
                </CardItem>
                <div className="flex flex-wrap gap-1.5 mt-4 items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] font-sans">{tag}</span>
                    ))}
                  </div>
                  <span className="text-xs text-accent-500 font-sans font-semibold group-hover/card:translate-x-1 transition-transform duration-200">Visit →</span>
                </div>
              </CardBody>
            </CardContainer>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── Certificates ─────────────────────────────────────────────────────────────

export function HomeCertificates() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      // ── Heading clip wipe ────────────────────────────────────────────────
      const words = section.querySelectorAll<HTMLElement>(".cert-word");
      gsap.fromTo(words,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)", opacity: 1,
          ease: "expo.out", stagger: 0.06,
          scrollTrigger: {
            trigger: section.querySelector(".cert-heading"),
            start: "top 88%", end: "top 50%",
            scrub: 1.2, invalidateOnRefresh: true,
          },
        }
      );

      // ── Counter line — draws across the full width ───────────────────────
      const counterLine = section.querySelector<HTMLElement>(".cert-counter-line");
      if (counterLine) {
        gsap.fromTo(counterLine,
          { scaleX: 0 },
          {
            scaleX: 1, ease: "expo.out",
            scrollTrigger: {
              trigger: section.querySelector(".cert-heading"),
              start: "top 80%", end: "top 40%",
              scrub: 1.5, invalidateOnRefresh: true,
            },
          }
        );
      }

      // ── Each row reveals with a staggered clip from bottom ───────────────
      const rows = section.querySelectorAll<HTMLElement>(".cert-row");
      const isMobile = window.innerWidth < 768;

      rows.forEach((row) => {
        if (isMobile) {
          // Mobile: simple fade-up, no clipPath — clipPath scrub needs
          // enough scroll distance which mobile screens don't have
          gsap.fromTo(row,
            { opacity: 0, y: 24 },
            {
              opacity: 1, y: 0,
              ease: "expo.out",
              scrollTrigger: {
                trigger: row,
                start: "top 95%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
              },
            }
          );
        } else {
          gsap.fromTo(row,
            { opacity: 0, y: 32, clipPath: "inset(100% 0 0 0)" },
            {
              opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)",
              ease: "expo.out",
              scrollTrigger: {
                trigger: row,
                start: "top 92%", end: "top 62%",
                scrub: 1, invalidateOnRefresh: true,
              },
            }
          );

          const img = row.querySelector<HTMLElement>(".cert-img-wrap");
          if (img) {
            gsap.fromTo(img,
              { scale: 1.15, opacity: 0 },
              {
                scale: 1, opacity: 1, ease: "expo.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 90%", end: "top 55%",
                  scrub: 1.2, invalidateOnRefresh: true,
                },
              }
            );
          }
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full">

      {/* ── Heading ── */}
      <div className="cert-heading mb-3xl">
        <p className="cert-word font-sans text-xs tracking-[0.2em] uppercase text-accent-500 mb-3 inline-block">
          — {t("cert.label")}
        </p>
        <h2
          className="font-serif font-bold text-[var(--color-text-primary)] flex flex-wrap gap-x-[0.25em]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          {t("certificates.title").split(" ").map((w, i) => (
            <span key={i} className="cert-word inline-block">{w}</span>
          ))}
        </h2>
        <p
          className="cert-word font-sans text-[var(--color-text-secondary)] mt-3 max-w-xl inline-block"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
        >
          {t("certificates.subtitle")}
        </p>

        {/* Animated counter line */}
        <div className="cert-counter-line mt-2xl h-px bg-[var(--color-border)] origin-left" />
      </div>

      {/* ── Certificate rows — editorial list layout ── */}
      <div className="flex flex-col">
        {CERTIFICATES.map((cert, i) => (
          <div
            key={cert.titleKey}
            className="cert-row group relative flex items-center gap-6 tablet:gap-10 py-6 border-b border-[var(--color-border)] cursor-default overflow-hidden"
          >
            {/* Hover fill */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.03) 0%, transparent 60%)" }}
            />

            {/* Index number */}
            <span
              className="cert-num font-serif font-black tabular-nums shrink-0 select-none"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "#f97316",
                minWidth: "3rem",
                lineHeight: 1,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Thumbnail */}
            <div
              className="cert-img-wrap relative shrink-0 rounded-xl overflow-hidden"
              style={{ width: "clamp(64px, 8vw, 96px)", aspectRatio: "4/3" }}
            >
              <Image
                src={cert.imageUrl}
                alt={t(cert.titleKey)}
                fill
                sizes="96px"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, transparent 60%)" }}
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3
                className="font-serif font-bold text-[var(--color-text-primary)] group-hover:text-accent-500 transition-colors duration-300 truncate"
                style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}
              >
                {t(cert.titleKey)}
              </h3>
              <p className="font-sans text-xs text-[var(--color-text-secondary)] mt-1 tracking-wide">
                {cert.issuer}
              </p>
            </div>

            {/* Year + badge */}
            <div className="hidden tablet:flex flex-col items-end gap-1 shrink-0">
              <span className="font-sans text-xs text-[var(--color-text-secondary)] tabular-nums">
                {cert.year}
              </span>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
              >
                <svg viewBox="0 0 12 12" className="w-3 h-3 text-accent-500" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 6 L5 9 L10 3" />
                </svg>
                <span className="font-sans text-[10px] tracking-widest uppercase text-accent-500">{t("cert.verified")}</span>
              </div>
            </div>

            {/* Arrow */}
            <span
              className="font-sans text-sm text-[var(--color-text-secondary)] group-hover:text-accent-500 group-hover:translate-x-1 transition-all duration-300 shrink-0"
            >
              →
            </span>
          </div>
        ))}
      </div>

      {/* ── Bottom count ── */}
      <div className="mt-xl flex items-center justify-between">
        <p className="font-sans text-xs text-[var(--color-text-secondary)]">
          {CERTIFICATES.length} {t("cert.label")} · {t("cert.growing")}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-secondary)]">
            {t("cert.verified")}
          </span>
        </div>
      </div>
    </section>
  );
}
