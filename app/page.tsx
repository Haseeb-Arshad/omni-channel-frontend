import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import OmniStage from "@/components/landing/OmniStage";
import Channels from "@/components/landing/Channels";
import Integrations from "@/components/landing/Integrations";
import AgentsShowcase from "@/components/landing/AgentsShowcase";
import TheThread from "@/components/landing/TheThread";
import DayWithOneBrain from "@/components/landing/DayWithOneBrain";
import TrustSignals from "@/components/landing/TrustSignals";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main className="landing">
      <Hero />
      <Features />
      <OmniStage />
      <Channels />
      <Integrations />
      <AgentsShowcase />
      <TheThread />
      <DayWithOneBrain />
      <TrustSignals />
      <Pricing />
      <CTA />
    </main>
  );
}
