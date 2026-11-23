import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";
import PreloaderWrapper from "@/components/layout/PreloaderWrapper";
import PullToRefresh from "@/components/layout/PullToRefresh";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ClickSpark from "@/components/ui/ClickSpark";
import GSAPInit from "@/components/ui/GSAPInit";
import ParticleRain from "@/components/ui/ParticleRain";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { MusicProvider } from "@/lib/MusicContext";
import "./globals.css";

// ─── Google Fonts ─────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  fallback: ["Georgia", "serif"],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://kahfiya-nur-gunami-portofolio.vercel.app"),
  applicationName: "Kahfiya Nur Gunami",
  title: {
    default: "Kahfiya Nur Gunami | Vibe Coder & Fullstack Developer",
    template: "%s | Kahfiya Nur Gunami",
  },
  description:
    "Portfolio resmi Kahfiya Nur Gunami — Vibe Coder & Fullstack Developer dari Banjarmasin. Spesialis AI-assisted engineering, Next.js, React, modern web architecture, dan UI/UX Design.",
  authors: [{ name: "Kahfiya Nur Gunami", url: "https://kahfiya-nur-gunami-portofolio.vercel.app" }],
  creator: "Kahfiya Nur Gunami",
  publisher: "Kahfiya Nur Gunami",
  keywords: [
    "Kahfiya Nur Gunami",
    "Kahfiya",
    "Vibe Coder",
    "Vibe Coding",
    "Fullstack Developer",
    "Frontend Developer Banjarmasin",
    "SMKN 2 Banjarmasin",
    "Next.js Developer",
    "React Developer",
    "UI/UX Designer",
    "AI Agentic Development",
    "Antigravity",
    "Portfolio Web Developer",
  ],
  alternates: {
    canonical: "https://kahfiya-nur-gunami-portofolio.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kahfiya-nur-gunami-portofolio.vercel.app",
    siteName: "Kahfiya Nur Gunami",
    title: "Kahfiya Nur Gunami | Vibe Coder & Fullstack Developer",
    description:
      "Portfolio resmi Kahfiya Nur Gunami — Vibe Coder & Fullstack Developer dari Banjarmasin. Spesialis AI-assisted engineering, Next.js, React, dan UI/UX Design.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kahfiya Nur Gunami — Vibe Coder & Fullstack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kahfiya Nur Gunami | Vibe Coder & Fullstack Developer",
    description:
      "Portfolio resmi Kahfiya Nur Gunami — Vibe Coder & Fullstack Developer dari Banjarmasin.",
    images: ["/og-image.png"],
    creator: "@kahfiya",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google7aeeab656fa62d2a",
  },
  other: {
    "thumbnail": "https://kahfiya-nur-gunami-portofolio.vercel.app/og-image.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f97316",
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kahfiya Nur Gunami",
    alternateName: ["Kahfiya", "Kahfiya Portfolio", "Kahfiya Vibe Coder"],
    url: "https://kahfiya-nur-gunami-portofolio.vercel.app",
    description: "Portfolio resmi Kahfiya Nur Gunami — Vibe Coder & Fullstack Developer",
    author: {
      "@type": "Person",
      name: "Kahfiya Nur Gunami",
    },
  };

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kahfiya Nur Gunami",
    url: "https://kahfiya-nur-gunami-portofolio.vercel.app",
    image: "https://kahfiya-nur-gunami-portofolio.vercel.app/Images/Kahfiya%20Nur%20Gunami.jpg",
    jobTitle: "Vibe Coder & Fullstack Developer",
    sameAs: [
      "https://github.com/kahfiya",
      "https://www.linkedin.com/in/kahfiya-nur-gunami/",
      "https://www.dicoding.com/users/kahfiya_nur_gunami",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Belajar Dasar AI",
        credentialCategory: "Certificate",
        url: "https://www.dicoding.com/certificates/2VX30V6JVXYQ",
        recognizedBy: {
          "@type": "Organization",
          name: "Dicoding Indonesia",
          url: "https://www.dicoding.com",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Memulai Pemrograman dengan Python",
        credentialCategory: "Certificate",
        url: "https://www.dicoding.com/certificates/ERZRLD4NOZYV",
        recognizedBy: {
          "@type": "Organization",
          name: "Dicoding Indonesia",
          url: "https://www.dicoding.com",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Literasi Keuangan",
        credentialCategory: "Certificate",
        recognizedBy: {
          "@type": "Organization",
          name: "Dicoding Indonesia",
          url: "https://www.dicoding.com",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Introduction to Artificial Intelligence",
        credentialCategory: "Certificate",
        recognizedBy: {
          "@type": "Organization",
          name: "IBM SkillsBuild",
          url: "https://skillsbuild.org",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Claude 101",
        credentialCategory: "Certificate",
        url: "https://verify.skilljar.com/c/k9rt2wdx5caz",
        recognizedBy: {
          "@type": "Organization",
          name: "Anthropic",
          url: "https://www.anthropic.com",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Claude Code 101",
        credentialCategory: "Certificate",
        url: "https://verify.skilljar.com/c/omhyjxbvinx3",
        recognizedBy: {
          "@type": "Organization",
          name: "Anthropic",
          url: "https://www.anthropic.com",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AI Fluency for Small Businesses",
        credentialCategory: "Certificate",
        url: "https://verify.skilljar.com/c/srppnu9uysds",
        recognizedBy: {
          "@type": "Organization",
          name: "Anthropic",
          url: "https://www.anthropic.com",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AI Fundamentals for Non-Data Scientists",
        credentialCategory: "Certificate",
        url: "https://coursera.org/share/25ec9a3c0e247a6c1869cb46c398aa4c",
        recognizedBy: {
          "@type": "Organization",
          name: "Coursera",
          url: "https://www.coursera.org",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        <GSAPInit />
        <ParticleRain />
        <LanguageProvider>
          <MusicProvider>
          <PreloaderWrapper>
            <SmoothScrollProvider>
            <ClickSpark
              sparkColor="#f97316"
              sparkSize={12}
              sparkRadius={20}
              sparkCount={8}
              duration={500}
              easing="ease-out"
              extraScale={1.2}
            >
              <Navbar />
              <PullToRefresh>
                <PageTransitionWrapper>{children}</PageTransitionWrapper>
              </PullToRefresh>
            </ClickSpark>
            </SmoothScrollProvider>
          </PreloaderWrapper>
          </MusicProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
