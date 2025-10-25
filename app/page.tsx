import Hero from "@/components/landing/Hero";
import UseCases from "@/components/landing/UseCases";
import PromptPlayground from "@/components/landing/PromptPlayground";
import KnowledgebaseAgent from "@/components/landing/KnowledgebaseAgent";

export default function Home() {
  return (
    <main>
      <Hero />
      <UseCases />
      <PromptPlayground />
      <KnowledgebaseAgent />
    </main>
  );
}
