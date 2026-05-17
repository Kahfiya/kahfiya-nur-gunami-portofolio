import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Kahfiya Nur Gunami — fullstack developer and designer based in Banjarmasin, Indonesia.",
  openGraph: {
    title: "About | Kahfiya Nur Gunami",
    description: "Learn about Kahfiya Nur Gunami — fullstack developer and designer based in Banjarmasin, Indonesia.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
