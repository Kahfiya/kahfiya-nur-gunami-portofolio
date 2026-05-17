import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kahfiya Nur Gunami for freelance projects, collaborations, or just to say hello.",
  openGraph: {
    title: "Contact | Kahfiya Nur Gunami",
    description: "Get in touch with Kahfiya Nur Gunami for freelance projects, collaborations, or just to say hello.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
