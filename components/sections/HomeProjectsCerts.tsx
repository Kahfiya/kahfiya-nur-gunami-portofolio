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
    categoryKey: "cert.cat.aiml",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif Dasar AI.jpg",
    thumbUrl: "/Images/Sertifikat/thumb-Sertif Dasar AI.webp",
  },
  {
    titleKey: "cert.frontend.title",
    issuer: "Dicoding Indonesia",
    category: "Financial Literacy",
    categoryKey: "cert.cat.finance",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif financial.jpg",
    thumbUrl: "/Images/Sertifikat/thumb-Sertif financial.webp",
  },
  {
    titleKey: "cert.python.title",
    issuer: "Dicoding Indonesia",
    category: "Python Programming",
    categoryKey: "cert.cat.python",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif Memulai Pemrograman dengan Python.jpg",
    thumbUrl: "/Images/Sertifikat/thumb-Sertif Memulai Pemrograman dengan Python.webp",
  },
  {
    titleKey: "cert.ai.title",
    issuer: "IBM SkillsBuild",
    category: "Artificial Intelligence",
    categoryKey: "cert.cat.ai",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif Introduction to Artificial Intelligence.jpg",
    thumbUrl: "/Images/Sertifikat/thumb-Sertif Introduction to Artificial Intelligence.webp",
  },
  {
    titleKey: "cert.claude.title",
    issuer: "Anthropic",
    category: "Prompt & LLM Engineering",
    categoryKey: "cert.cat.prompt",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif Claude 101.jpg",
    thumbUrl: "/Images/Sertifikat/thumb-Sertif Claude 101.webp",
  },
  {
    titleKey: "cert.aifund.title",
    issuer: "Coursera",
    category: "AI Fundamentals",
    categoryKey: "cert.cat.aifund",
    year: "2025",
    imageUrl: "/Images/Sertifikat/Sertif AI Fundamentals for Non-Data Scientists.jpg",
    thumbUrl: "/Images/Sertifikat/thumb-Sertif AI Fundamentals for Non-Data Scientists.webp",
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
        <p className="proj-word font-sans text-xs tracking-[0.2em] uppercase text-accent-500 mb-3 inline-block">— {t("projects.badge")}</p>
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
                  <span className="text-xs text-accent-500 font-sans font-semibold group-hover/card:translate-x-1 transition-transform duration-200">{t("common.visit")}</span>
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
  const [hoveredCert, setHoveredCert] = useState<typeof CERTIFICATES[number] | null>(null);
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATES[number] | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const updatePosition = (clientX: number, clientY: number) => {
    if (typeof window === "undefined") return;
    const cardWidth = window.innerWidth >= 1280 ? 400 : 340;
    const cardHeight = Math.round((cardWidth * 11) / 16);

    let x = clientX + 24;
    if (x + cardWidth > window.innerWidth - 16) {
      x = clientX - cardWidth - 24;
    }
    x = Math.max(16, Math.min(x, window.innerWidth - cardWidth - 16));

    let y = clientY - Math.round(cardHeight / 2);
    y = Math.max(16, Math.min(y, window.innerHeight - cardHeight - 16));

    setMousePos({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updatePosition(e.clientX, e.clientY);
  };

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

  return (
    <section ref={sectionRef} className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full">
      {/* ── Preload Thumbnails in Memory ── */}
      <div className="hidden" aria-hidden="true">
        {CERTIFICATES.map((c) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={c.titleKey} src={c.thumbUrl || c.imageUrl} alt="" loading="eager" />
        ))}
      </div>

      {/* ── Section Header matching Ahmed Ragab style ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 tablet:mb-12 border-b border-[var(--color-border)] pb-6">
        <div className="flex items-center gap-3">
          <span
            className="text-accent-500 font-sans font-black text-xl tablet:text-2xl select-none"
            style={{ display: "inline-block", animation: "spin 6s linear infinite" }}
          >
            ✦
          </span>
          <h2 className="text-2xl tablet:text-3xl desktop:text-4xl font-sans font-black tracking-wide uppercase">
            <span className="text-accent-500">{t("certificates.title")}</span>{" "}
            <span className="text-[var(--color-text-primary)]">{t("certificates.list_badge")}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-500/20 bg-accent-500/5 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-sans text-[11px] tracking-wider uppercase font-bold text-[var(--color-text-secondary)]">
            {CERTIFICATES.length} {t("cert.label")} · {t("cert.growing")}
          </span>
        </div>
      </div>

      {/* ── Pure Text List Container ── */}
      <div
        className="flex flex-col cert-list-container relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCert(null)}
      >
        {CERTIFICATES.map((cert, i) => {
          const indexStr = String(i + 1).padStart(2, "0") + ".";

          return (
            <div
              key={cert.titleKey}
              onMouseEnter={(e) => {
                updatePosition(e.clientX, e.clientY);
                setHoveredCert(cert);
              }}
              onMouseMove={(e) => {
                updatePosition(e.clientX, e.clientY);
                if (hoveredCert?.titleKey !== cert.titleKey) {
                  setHoveredCert(cert);
                }
              }}
              onMouseLeave={() => setHoveredCert(null)}
              onClick={() => setSelectedCert(cert)}
              className="cert-item-row group relative py-6 tablet:py-7 border-b border-[var(--color-border)] cursor-pointer transition-all duration-200 px-4 -mx-4 rounded-2xl hover:bg-accent-500/[0.04] overflow-hidden"
            >
              {/* ── Ambient Row Watermark Background (Shows across the cert's div on hover) ── */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl overflow-hidden z-0"
                aria-hidden="true"
              >
                <div className="absolute right-0 top-0 bottom-0 w-2/3 max-w-[460px] overflow-hidden opacity-10 dark:opacity-20 pointer-events-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.thumbUrl || cert.imageUrl}
                    alt=""
                    className="w-full h-full object-cover blur-[1px]"
                    style={{
                      maskImage: "linear-gradient(to right, transparent 0%, black 70%)",
                      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 70%)",
                    }}
                  />
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-start gap-4 tablet:gap-6 flex-1 min-w-0">
                  {/* Index Number */}
                  <span className="font-sans font-bold text-lg tablet:text-2xl text-[var(--color-text-secondary)]/50 group-hover:text-accent-500 transition-colors select-none shrink-0 pt-0.5">
                    {indexStr}
                  </span>

                  {/* Title + Subtitle */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-bold text-xl tablet:text-2xl desktop:text-3xl text-[var(--color-text-primary)] group-hover:text-accent-500 transition-colors duration-200 leading-snug">
                      {t(cert.titleKey)}
                    </h3>

                    {/* Meta Stack / Issuer / Category */}
                    <p className="font-sans text-xs tablet:text-sm text-[var(--color-text-secondary)] mt-1.5 flex flex-wrap items-center gap-2">
                      <span>{cert.issuer}</span>
                      <span className="opacity-40">•</span>
                      <span>{cert.categoryKey ? t(cert.categoryKey) : cert.category}</span>
                      <span className="opacity-40">•</span>
                      <span>{cert.year}</span>
                      <span className="opacity-40">•</span>
                      <span className="text-accent-500 font-medium inline-flex items-center gap-1">
                        <span className="text-[9px]">✦</span>
                        {t("cert.verified")}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right Side: Small preview badge on mobile/touch + Arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Compact thumbnail for touch / small screens */}
                  <div className="md:hidden w-14 h-10 rounded-lg overflow-hidden border border-[var(--color-border)] bg-neutral-900 shadow-sm shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.thumbUrl || cert.imageUrl}
                      alt={t(cert.titleKey)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Right Arrow Icon */}
                  <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-transparent group-hover:border-[var(--color-border)] group-hover:bg-[var(--color-bg-secondary)] transition-all duration-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-accent-500 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Floating Preview Image (Instant WebP + Smooth Viewport Tracking) ── */}
      <AnimatePresence>
        {hoveredCert && (
          <motion.div
            key={hoveredCert.titleKey}
            initial={{ opacity: 0, scale: 0.85, x: mousePos.x, y: mousePos.y }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x,
              y: mousePos.y,
            }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              opacity: { duration: 0.15 },
              scale: { duration: 0.15 },
              x: { type: "spring", damping: 28, stiffness: 350, mass: 0.1 },
              y: { type: "spring", damping: 28, stiffness: 350, mass: 0.1 },
            }}
            className="pointer-events-none fixed top-0 left-0 z-[9999]"
          >
            <div className="w-[360px] desktop:w-[420px] aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-1.5 backdrop-blur-xl">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hoveredCert.thumbUrl || hoveredCert.imageUrl}
                  alt={t(hoveredCert.titleKey)}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="sync"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                  <p className="font-sans font-bold text-xs truncate">
                    {t(hoveredCert.titleKey)}
                  </p>
                  <p className="font-sans text-[10px] text-accent-400 font-medium mt-0.5">
                    {hoveredCert.issuer} · {hoveredCert.year}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal Lightbox for Full Credential Inspection (on click) ── */}
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
                    {selectedCert.issuer} · {selectedCert.categoryKey ? t(selectedCert.categoryKey) : selectedCert.category} · {selectedCert.year} · {t("cert.verified")}
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
