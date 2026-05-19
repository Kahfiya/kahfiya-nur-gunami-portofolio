"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/sections/SectionHeading";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import ScrollReveal, { ScrollStagger, scrollItem } from "@/components/ui/ScrollReveal";
import { fadeUp, prefersReducedMotion } from "@/lib/motion-variants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type FilterCategory = "All" | "Web" | "Design" | "School" | "Mobile";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  href?: string;
  category: FilterCategory[];
}

const FILTERS: FilterCategory[] = ["All", "Web", "Design", "School"];

// ── Modal ──────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal card */}
        <motion.div
          key="modal"
          className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden bg-[var(--color-bg-primary)] shadow-2xl"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <div className="relative w-full aspect-[4/3] bg-neutral-100">
            <Image
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-xl font-bold font-serif text-[var(--color-text-primary)] mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed mb-4">
              {project.description}
            </p>
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent-500 font-sans font-medium hover:underline"
              >
                <ExternalLink size={14} />
                {project.href.includes("drive.google.com") ? "Lihat di Google Drive →" : "Visit →"}
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────
function ProjectCard3D({ project, onClick }: { project: Project; onClick?: () => void }) {
  const isClickable = !!project.href || !!onClick;

  const inner = (
    <CardContainer className="inter-var w-full">
      <CardBody className="bg-[var(--color-bg-primary)] relative group/card border border-[var(--color-border)] hover:border-accent-400 hover:shadow-lg w-full h-auto rounded-xl p-6 transition-all duration-300 cursor-pointer">
        <CardItem translateZ="50" className="text-xl font-bold text-[var(--color-text-primary)] font-serif">
          {project.title}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-[var(--color-text-secondary)] text-sm max-w-sm mt-2 font-sans leading-relaxed">
          {project.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <div className="relative h-48 w-full rounded-lg overflow-hidden bg-neutral-100">
            <Image
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover/card:scale-105 transition-transform duration-500"
            />
          </div>
        </CardItem>
        <div className="flex items-center justify-between mt-6">
          <CardItem translateZ={20} className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-[var(--color-text-secondary)] border border-[var(--color-border)] font-sans">
                {tag}
              </span>
            ))}
          </CardItem>
          {isClickable && (
            <span className="text-xs text-accent-500 font-sans font-medium shrink-0 ml-2">Visit →</span>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );

  // Project with href that is NOT a Google Drive link → open in new tab directly
  if (project.href && !project.href.includes("drive.google.com") && !onClick) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Visit ${project.title}`}>
        {inner}
      </a>
    );
  }

  // Otherwise (modal trigger or no link)
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View ${project.title}` : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={onClick ? "block cursor-pointer" : "block"}
    >
      {inner}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const PROJECTS: Project[] = [
    {
      id: "proj-adria",
      title: "ADRIA Studio",
      description: t("work.proj.adria.desc"),
      imageUrl: "/Images/Adria.jpg",
      imageAlt: "ADRIA Graphic Design Studio",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Typescript"],
      href: "https://adria-website.vercel.app/",
      category: ["Web"],
    },
    {
      id: "proj-lumidh",
      title: "Lumidh Parfum",
      description: t("work.proj.lumidh.desc"),
      imageUrl: "/Images/Lumidh.jpg",
      imageAlt: "Lumidh Parfum E-Commerce",
      tags: ["Next.js", "E-Commerce", "UI/UX", "Tailwind CSS", "Typescript"],
      href: "https://web-lumidh-versi-lebih-bagus.vercel.app/",
      category: ["Web"],
    },
    {
      id: "proj-marbas",
      title: "Marbas-Nusantara",
      description: t("work.proj.marbas.desc"),
      imageUrl: "/Images/Marbas.jpg",
      imageAlt: "Marbas Nusantara E-Commerce",
      tags: ["Next.js", "Tailwind CSS", "E-Commerce", "Typescript"],
      href: "https://v0-marbas-store-s7.vercel.app",
      category: ["Web"],
    },
    {
      id: "proj-mantles",
      title: "Mantles.",
      description: t("work.proj.mantles.desc"),
      imageUrl: "/Images/Mantles.jpg",
      imageAlt: "Mantles Fashion E-Commerce",
      tags: ["Next.js", "E-Commerce", "Fashion", "UI/UX"],
      href: "https://mantles-of.vercel.app",
      category: ["Web"],
    },
    {
      id: "proj-birthday",
      title: "Birthday Gift",
      description: t("work.proj.birthday.desc"),
      imageUrl: "/Images/Birthday.jpg",
      imageAlt: "Birthday Gift — Interactive Love Letter",
      tags: ["Java Script", "Framer Motion", "Tailwind CSS", "Creative"],
      href: "https://birthday-gift-one-ochre.vercel.app",
      category: ["Web"],
    },
    {
      id: "proj-rumah",
      title: "Casing Rumah IoT",
      description: t("work.proj.rumah.desc"),
      imageUrl: "/Images/Rumah2.jpg",
      imageAlt: "Rumah IPAS — 3D House Model",
      tags: ["3D", "Akulturasi", "IPAS", "School"],
      href: "https://drive.google.com/drive/folders/1U-C_nbNWTz864sFeGunWOybLlseOXpnn?usp=sharing",
      category: ["Design", "School"],
    },
    {
      id: "proj-panel",
      title: "Panel LED P10",
      description: t("work.proj.panel.desc"),
      imageUrl: "/Images/Panel-P10.jpg",
      imageAlt: "Panel LED P10 — Outdoor LED Matrix Display",
      tags: ["Hardware", "LED", "Electronics", "IoT"],
      href: "https://drive.google.com/drive/folders/1npR3hgn1lRBoaJhuFFzINxUsTsczB4q6?usp=sharing",
      category: ["Design", "School"],
    },
  ];

  const filterLabel = (f: FilterCategory): string => {
    if (f === "All") return t("work.filter.all");
    if (f === "Design") return t("work.filter.design");
    if (f === "School") return t("work.filter.school");
    return f;
  };

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.includes(activeFilter));

  return (
    <main className="px-4 tablet:px-8 desktop:px-12 py-8 desktop:py-12 max-w-screen-xl mx-auto">
      <SectionHeading title={t("work.title")} as="h1" />

      {/* Filter Tabs */}
      <div role="tablist" aria-label="Filter projects by category"
        className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {FILTERS.map((filter) => (
          <button key={filter} role="tab" aria-selected={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={["relative shrink-0 px-4 py-2 text-sm font-sans rounded-none border-b-2 border-transparent transition-colors",
              activeFilter === filter ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
            ].join(" ")}>
            {filterLabel(filter)}
            {activeFilter === filter && (
              <motion.div layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-text-primary)]"
                transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => {
            // Design projects open modal; Web projects open in new tab
            const isDesign = project.category.includes("Design");
            return (
              <motion.div key={project.id} layout
                variants={fadeUp} initial="hidden" animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}>
                <ProjectCard3D
                  project={project}
                  onClick={isDesign ? () => setSelectedProject(project) : undefined}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
