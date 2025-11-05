import Hero from "@/components/landing/Hero";
import SocialProofStrip from "@/components/landing/SocialProofStrip";
import UseCases from "@/components/landing/UseCases";
import PromptPlayground from "@/components/landing/PromptPlayground";
import KnowledgebaseAgent from "@/components/landing/KnowledgebaseAgent";
import Integrations from "@/components/landing/Integrations";
import PerformanceSecurity from "@/components/landing/PerformanceSecurity";
import PricingCTA from "@/components/landing/PricingCTA";

export default function Home() {
  return (
    <main className="bg-[#050607] text-zinc-100">
      <Hero />
      <SocialProofStrip />
      <UseCases />
      <PromptPlayground />
      <KnowledgebaseAgent />
      <Integrations />
      <PerformanceSecurity />
      <PricingCTA />
    </main>
  );
}
