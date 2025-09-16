"use client"

import { Header } from "@/components/layout/header";
import Hero from "@/components/landing/Hero";
import CofounderFeatures from "@/components/landing/CofounderFeatures";
import AnimatedDemo from "@/components/landing/AnimatedDemo";
import AgentsShowcase from "@/components/landing/AgentsShowcase";
import Integrations from "@/components/landing/Integrations";
import LeftRailNav from "@/components/landing/LeftRailNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Single shared left rail navigation (fixes duplicates) */}
      <LeftRailNav />
      <main>
        <Hero />
        <CofounderFeatures />
        <AnimatedDemo />
        <AgentsShowcase />
        <Integrations />
      </main>
    </div>
  );
}
