"use client";

/**
 * SmoothScrollProvider — Native scroll + GSAP ScrollTrigger
 *
 * Lenis dihapus karena konflik dengan GSAP ScrollTrigger menyebabkan
 * getaran dan scroll lambat. Native browser scroll sudah sangat smooth
 * di browser modern. GSAP ScrollTrigger bekerja langsung dengan native scroll.
 *
 * CSS scroll-behavior: smooth diatur di globals.css (html { scroll-behavior: smooth })
 */

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Refresh ScrollTrigger setelah semua komponen mount
    ScrollTrigger.refresh();

    // Recalculate on resize
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <>{children}</>;
}
