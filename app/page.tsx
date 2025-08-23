"use client"

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Hero from "@/components/landing/Hero";
import OmniStage from "@/components/landing/OmniStage";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#F6F4EF' }}>
      <main>
        <Hero />
        <OmniStage />
      </main>
      <Footer />
    </div>
  );
}