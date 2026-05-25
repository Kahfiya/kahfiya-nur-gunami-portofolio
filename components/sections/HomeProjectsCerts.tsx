"use client";

import { useRef } from "react";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ScrollScrub from "@/components/ui/ScrollScrub";

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
  { titleKey: "cert.web.title",     issuer: "Dicoding Indonesia", year: "2026", imageUrl: "/Images/Sertifikat/Sertif Dasar AI.jpg" },
  { titleKey: "cert.frontend.title", issuer: "Dicoding Indonesia", year: "2026", imageUrl: "/Images/Sertifikat/Sertif financial.jpg" },
  { titleKey: "cert.python.title",  issuer: "Dicoding Indonesia", year: "2026", imageUrl: "/Images/Sertifikat/Sertif Memulai Pemrograman dengan Python.jpg" },
  { titleKey: "cert.ai.title",      issuer: "IBM SkillsBuild",    year: "2026", imageUrl: "/Images/Sertifikat/Sertif Introduction to Artificial Intelligence.jpg" },
  { titleKey: "cert.claude.title",  issuer: "Anthropic",          year: "2026", imageUrl: "/Images/Sertifikat/Sertif Claude 101.jpg" },
  { titleKey: "cert.aifund.title",  issuer: "Coursera",           year: "2026", imageUrl: "/Images/Sertifikat/Sertif AI Fundamentals for Non-Data Scientists.jpg" },
];

export function HomeProjects() {
  const { t } = useLanguage();

  return (
    <section className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full">
      <ScrollScrub stagger={0.05} start="top 90%" end="top 60%" className="mb-2xl">
        <div>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-accent-500 mb-3">— Work</p>
          <h2 className="font-serif font-bold text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            {t("projects.title")}
          </h2>
          <p className="font-sans text-[var(--color-text-secondary)] mt-3 max-w-xl" style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}>
            {t("projects.subtitle")}
          </p>
        </div>
      </ScrollScrub>

      <ScrollScrub stagger={0.12} start="top 88%" end="top 20%"
        className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-lg">
        {PROJECTS.map((p) => (
          <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" className="block">
            <CardContainer className="w-full">
              <CardBody className="bg-[var(--color-bg-primary)] relative group/card border border-[var(--color-border)] hover:border-accent-400 hover:shadow-xl w-full h-auto rounded-2xl p-6 transition-all duration-300 cursor-pointer">
                <CardItem translateZ="50" className="text-xl font-bold text-[var(--color-text-primary)] font-serif">{p.title}</CardItem>
                <CardItem as="p" translateZ="60" className="text-[var(--color-text-secondary)] text-sm max-w-sm mt-2 font-sans leading-relaxed">{t(p.descKey)}</CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="relative h-48 w-full rounded-xl overflow-hidden bg-neutral-100">
                    <Image src={p.imageUrl} alt={p.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover/card:scale-105 transition-transform duration-500" />
                  </div>
                </CardItem>
                <div className="flex flex-wrap gap-1.5 mt-4 items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] font-sans">{tag}</span>
                    ))}
                  </div>
                  <span className="text-xs text-accent-500 font-sans font-semibold">Visit →</span>
                </div>
              </CardBody>
            </CardContainer>
          </a>
        ))}
      </ScrollScrub>
    </section>
  );
}

export function HomeCertificates() {
  const { t } = useLanguage();

  return (
    <section className="px-md tablet:px-2xl py-3xl max-w-7xl mx-auto w-full">
      <ScrollScrub stagger={0.05} start="top 90%" end="top 60%" className="mb-2xl">
        <div>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-accent-500 mb-3">— Credentials</p>
          <h2 className="font-serif font-bold text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            {t("certificates.title")}
          </h2>
          <p className="font-sans text-[var(--color-text-secondary)] mt-3 max-w-xl" style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}>
            {t("certificates.subtitle")}
          </p>
        </div>
      </ScrollScrub>

      <ScrollScrub stagger={0.08} start="top 88%" end="top 20%"
        className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-md">
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.titleKey}
            className="rounded-2xl border border-[var(--color-border)] overflow-hidden group hover:shadow-md transition-all duration-300 bg-[var(--color-bg-primary)] hover:-translate-y-1"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
              <Image src={cert.imageUrl} alt={t(cert.titleKey)} fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-sm font-bold text-[var(--color-text-primary)]">{t(cert.titleKey)}</h3>
                <p className="font-sans text-xs text-[var(--color-text-secondary)] mt-0.5">{cert.issuer} · {cert.year}</p>
              </div>
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
          </div>
        ))}
      </ScrollScrub>
    </section>
  );
}
