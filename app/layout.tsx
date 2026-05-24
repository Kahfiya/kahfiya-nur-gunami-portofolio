import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";
import PreloaderWrapper from "@/components/layout/PreloaderWrapper";
import PullToRefresh from "@/components/layout/PullToRefresh";
import ClickSpark from "@/components/ui/ClickSpark";
import GSAPInit from "@/components/ui/GSAPInit";
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
  metadataBase: new URL("https://portofolio.kahfiya.dev"),
  title: {
    default: "Kahfiya Nur Gunami | Fullstack Developer & Designer",
    template: "%s | Kahfiya Nur Gunami",
  },
  description:
    "Portfolio of Kahfiya Nur Gunami - Crafting digital experiences with modern web technologies.",
  authors: [{ name: "Kahfiya Nur Gunami" }],
  keywords: ["fullstack developer", "web designer", "portfolio", "Banjarmasin", "Next.js"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kahfiya Nur Gunami",
    title: "Kahfiya Nur Gunami | Fullstack Developer & Designer",
    description:
      "Portfolio of Kahfiya Nur Gunami - Crafting digital experiences with modern web technologies.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kahfiya Nur Gunami Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kahfiya Nur Gunami | Fullstack Developer & Designer",
    description:
      "Portfolio of Kahfiya Nur Gunami - Crafting digital experiences with modern web technologies.",
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
        <LanguageProvider>
          <MusicProvider>
          <PreloaderWrapper>
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
          </PreloaderWrapper>
          </MusicProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
