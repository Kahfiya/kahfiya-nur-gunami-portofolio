"use client";

import HeroSection from "@/components/sections/Hero/HeroSection";
import HomeStats from "@/components/sections/HomeStats";
import HomeWhatIDo from "@/components/sections/HomeWhatIDo";
import { HomeProjects, HomeCertificates } from "@/components/sections/HomeProjectsCerts";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <HomeStats />
        <HomeWhatIDo />
        <HomeProjects />
        <HomeCertificates />
      </main>
      <Footer />
    </>
  );
}
