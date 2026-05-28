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
  title: {
    default: "Kahfiya Nur Gunami | Junior Frontend Developer",
    template: "%s | Kahfiya Nur Gunami",
  },
  description:
    "Portfolio Kahfiya Nur Gunami — Junior Frontend Developer dari Banjarmasin. Terbuka untuk peluang magang & freelance. Spesialis Next.js, React, dan UI/UX.",
  authors: [{ name: "Kahfiya Nur Gunami" }],
  keywords: [
    "Kahfiya Nur Gunami",
    "junior frontend developer",
    "frontend developer Banjarmasin",
    "magang frontend developer",
    "freelance web developer",
    "portfolio web developer",
    "Next.js developer",
    "React developer",
    "UI/UX designer",
    "SMKN 2 Banjarmasin",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Kahfiya Nur Gunami",
    title: "Kahfiya Nur Gunami | Junior Frontend Developer",
    description:
      "Portfolio Kahfiya Nur Gunami — Junior Frontend Developer dari Banjarmasin. Terbuka untuk peluang magang & freelance. Spesialis Next.js, React, dan UI/UX.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kahfiya Nur Gunami — Junior Frontend Developer Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kahfiya Nur Gunami | Junior Frontend Developer",
    description:
      "Portfolio Kahfiya Nur Gunami — Junior Frontend Developer dari Banjarmasin. Terbuka untuk peluang magang & freelance.",
    images: ["/Images/Kahfiya Nur Gunami.jpg"],
  },
  robots: { index: true, follow: true },
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
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
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
