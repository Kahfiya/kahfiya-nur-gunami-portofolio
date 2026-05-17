"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/sections/SectionHeading";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import ScrollReveal, { ScrollStagger, scrollItem } from "@/components/ui/ScrollReveal";
import { fadeUp, prefersReducedMotion } from "@/lib/motion-variants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type FilterCategory = "All" | "Web" | "Design" | "Mobile";

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

const FILTERS: FilterCategory[] = ["All", "Web", "Design"];

function ProjectCard3D({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      aria-label={`Visit ${project.title}`}
    >
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
            <span className="text-xs text-accent-500 font-sans font-medium shrink-0 ml-2">Visit →</span>
          </div>
        </CardBody>
      </CardContainer>
    </a>
  );
}

export default function WorkPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const PROJECTS: Project[] = [
    {
      id: "proj-adria",
      title: "ADRIA Studio",
      description: t("work.proj.adria.desc"),
      imageUrl: "/Images/Adria.jpg",
      imageAlt: "ADRIA Graphic Design Studio",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Typescript"],
      href: "https://adria-website.vercel.app/",
      category: ["Web", "Design"],
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
      category: ["Web", "Design"],
    },
  ];

  const filterLabel = (f: FilterCategory): string => {
    if (f === "All") return t("work.filter.all");
    if (f === "Design") return t("work.filter.design");
    return f; // "Web" is same in both languages
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
          {filtered.map((project) => (
            <motion.div key={project.id} layout
              variants={fadeUp} initial="hidden" animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}>
              <ProjectCard3D project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
