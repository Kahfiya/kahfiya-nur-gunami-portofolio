import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and case studies by Kahfiya Nur Gunami — web apps, e-commerce, and UI/UX design.",
  openGraph: {
    title: "Work | Kahfiya Nur Gunami",
    description: "Projects and case studies by Kahfiya Nur Gunami — web apps, e-commerce, and UI/UX design.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
