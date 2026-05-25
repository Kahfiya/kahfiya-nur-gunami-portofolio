# Kahfiya Nur Gunami — Portfolio

Personal portfolio website built with Next.js 14, featuring smooth scroll animations, multilingual support, and an interactive music player.

**Live:** [kahfiya-nur-gunami-portofolio-oted.vercel.app](https://kahfiya-nur-gunami-portofolio-oted.vercel.app)

---

## Preview

| Desktop | Mobile |
|---|---|
| Full-screen video hero with floating tech logos | SVG background hero with horizontal tech pill strip |

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11, GSAP 3.12 |
| 3D | Three.js, React Three Fiber, React Three Drei |
| Smooth Scroll | Lenis 1.1 |
| UI Primitives | Radix UI, shadcn/ui |
| Icons | Lucide React |
| i18n | Custom context (EN, ID, RU, JA, ZH, KO, HI, MS) |

---

## Features

- **Hero Section** — full-screen video (desktop) / SVG image (mobile) with GSAP scroll parallax
- **Floating Tech Logos** — animated floating icons on desktop hero
- **Horizontal Tech Strip** — scrollable pill strip on mobile hero
- **Scroll Animations** — GSAP ScrollTrigger scrub, Framer Motion reveal
- **Music Player** — background music with Rex Orange County & JVKE tracks
- **Multilingual** — 8 languages switchable via flag toggle
- **Contact Form** — email form with validation
- **Lanyard** — Discord presence card via lanyard API
- **Smooth Scroll** — Lenis smooth scrolling across all pages
- **Grain Overlay** — subtle film grain texture on body

---

## Project Structure

```
├── app/
│   ├── about/          # About page (bio, timeline, stack, PPLG)
│   ├── contact/        # Contact page
│   ├── work/           # Projects page
│   ├── api/
│   │   ├── image/      # OG image API
│   │   └── lyrics/     # Lyrics fetch API
│   ├── layout.tsx      # Root layout (fonts, providers)
│   └── page.tsx        # Home page
├── components/
│   ├── layout/         # Navbar, Footer, Preloader, SmoothScrollProvider
│   ├── sections/       # Page sections (Hero, HomeStats, HomeWhatIDo, etc.)
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/
│   ├── i18n/           # Language context + translations
│   └── utils.ts        # Utility functions
└── public/
    ├── Audio/          # Music files (.mp3)
    ├── Hero/           # Hero assets (SVG, webm)
    └── Images/         # Project & profile images
```

---

## Getting Started

**Prerequisites:** Node.js 18+, npm or pnpm

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, stats, what I do, projects, certificates |
| `/about` | About — bio, education timeline, tech stack, PPLG competencies |
| `/work` | Projects — filterable project cards |
| `/contact` | Contact — form + social links |

---

## Internationalization

Languages are toggled via the flag button in the navbar. Translations live in `lib/i18n/translations.ts`. To add a new language:

1. Add a new `translations[LANG]` export in `translations.ts`
2. Register it in `LanguageContext.tsx`
3. Add the flag image to `public/Flag Language/`

---

## License

This project is personal and not open for redistribution. Feel free to use it as inspiration.

---

*Built by Kahfiya Nur Gunami — Banjarmasin, Indonesia*
