"use client";

/**
 * HomeProjectsCerts — GSAP scrub with dramatic reveals
 * Projects: staggered y + scale + rotateX (depth feel)
 * Certs: staggered with alternating x direction
 */

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  {
    titleKey: "cert.web.title",
    issuer: "Dicoding Indonesia",
    category: "AI & Machine Learning",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif Dasar AI.jpg",
  },
  {
    titleKey: "cert.frontend.title",
    issuer: "Dicoding Indonesia",
    category: "Financial Literacy",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif financial.jpg",
  },
  {
    titleKey: "cert.python.title",
    issuer: "Dicoding Indonesia",
    category: "Python Programming",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif Memulai Pemrograman dengan Python.jpg",
  },
  {
    titleKey: "cert.ai.title",
    issuer: "IBM SkillsBuild",
    category: "Artificial Intelligence",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif Introduction to Artificial Intelligence.jpg",
  },
  {
    titleKey: "cert.claude.title",
    issuer: "Anthropic",
    category: "Prompt & LLM Engineering",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif Claude 101.jpg",
  },
  {
    titleKey: "cert.aifund.title",
    issuer: "Coursera",
    category: "AI Fundamentals",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif AI Fundamentals for Non-Data Scientists.jpg",
  },
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
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATES[number] | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for rows
      const rows = section.querySelectorAll<HTMLElement>(".cert-item-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section.querySelector(".cert-list-container"),
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const activeCert = CERTIFICATES[hoveredIndex] ?? CERTIFICATES[0];

  return (
    <section ref={sectionRef} className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full">
      {/* ── Section Header matching Ahmed Ragab style ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 tablet:mb-12 border-b border-[var(--color-border)] pb-6">
        <div className="flex items-center gap-2.5">
          <span className="text-accent-500 text-2xl font-black select-none">✱</span>
          <h2 className="text-2xl tablet:text-3xl desktop:text-4xl font-sans font-black tracking-wide uppercase">
            <span className="text-accent-500">{t("certificates.title")}</span>{" "}
            <span className="text-[var(--color-text-primary)]">LIST</span>
          </h2>
        </div>
        <p className="font-sans text-xs tablet:text-sm text-[var(--color-text-secondary)]">
          {CERTIFICATES.length} {t("cert.label")} · {t("cert.growing")}
        </p>
      </div>

      {/* ── Main Layout: Certificate List + Floating/Sticky Image Preview Card ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start cert-list-container">
        
        {/* Left Column: Certificate List */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
          {CERTIFICATES.map((cert, i) => {
            const indexStr = String(i + 1).padStart(2, "0") + ".";

            return (
              <div
                key={cert.titleKey}
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => setSelectedCert(cert)}
                className="cert-item-row group relative py-6 tablet:py-7 border-b border-[var(--color-border)] cursor-pointer transition-all duration-200 hover:pl-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 tablet:gap-6 flex-1 min-w-0">
                    {/* Index Number */}
                    <span className="font-sans font-bold text-lg tablet:text-2xl text-[var(--color-text-secondary)]/50 group-hover:text-accent-500 transition-colors select-none shrink-0 pt-0.5">
                      {indexStr}
                    </span>

                    {/* Title + Subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-sans font-bold text-lg tablet:text-2xl desktop:text-[1.75rem] text-[var(--color-text-primary)] group-hover:text-accent-500 transition-colors duration-200 leading-snug">
                          {t(cert.titleKey)}
                        </h3>
                        {/* Hover External Arrow Icon */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 tablet:w-5 tablet:h-5 text-accent-500 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>

                      {/* Meta Stack / Issuer / Category */}
                      <p className="font-sans text-xs tablet:text-sm text-[var(--color-text-secondary)] mt-1.5 flex flex-wrap items-center gap-2">
                        <span>{cert.issuer}</span>
                        <span className="opacity-40">•</span>
                        <span>{cert.category}</span>
                        <span className="opacity-40">•</span>
                        <span>{cert.year}</span>
                        <span className="opacity-40">•</span>
                        <span className="text-accent-500 font-medium">{t("cert.verified")}</span>
                      </p>
                    </div>
                  </div>

                  {/* Mobile Thumbnail Button */}
                  <div className="lg:hidden shrink-0 mt-1">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-[var(--color-border)] shadow-sm">
                      <Image
                        src={cert.imageUrl}
                        alt={t(cert.titleKey)}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Floating/Sticky Image Preview Card on Desktop */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-28">
          <div className="rounded-3xl p-4 border border-[var(--color-border)] bg-[var(--color-bg-primary)] shadow-2xl backdrop-blur-sm">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCert.imageUrl}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full cursor-pointer group/preview"
                  onClick={() => setSelectedCert(activeCert)}
                >
                  <Image
                    src={activeCert.imageUrl}
                    alt={t(activeCert.titleKey)}
                    fill
                    sizes="(max-width: 1280px) 40vw, 450px"
                    className="object-cover group-hover/preview:scale-105 transition-transform duration-500"
                    priority
                  />
                  {/* Hover Prompt */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-[2px]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                    {t("cert.verified")} Detail
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Active Card Info */}
            <div className="mt-4 px-2 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <p className="font-sans font-bold text-sm text-[var(--color-text-primary)] truncate">
                  {t(activeCert.titleKey)}
                </p>
                <p className="font-sans text-xs text-[var(--color-text-secondary)]">
                  {activeCert.issuer} · {activeCert.year}
                </p>
              </div>
              <button
                onClick={() => setSelectedCert(activeCert)}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-sans font-semibold bg-accent-500 text-white hover:bg-accent-600 transition-colors shadow-sm"
              >
                Detail ↗
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Modal Lightbox for Full Credential Inspection ── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[var(--color-bg-primary)] rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
                <div>
                  <h4 className="font-sans font-bold text-lg text-[var(--color-text-primary)]">
                    {t(selectedCert.titleKey)}
                  </h4>
                  <p className="font-sans text-xs text-[var(--color-text-secondary)]">
                    {selectedCert.issuer} · {selectedCert.category} · {selectedCert.year} · {t("cert.verified")}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors text-base font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative w-full aspect-[16/11] bg-neutral-900">
                <Image
                  src={selectedCert.imageUrl}
                  alt={t(selectedCert.titleKey)}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
