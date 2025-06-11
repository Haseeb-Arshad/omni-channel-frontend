// Removed all old imports and constants related to the previous landing page design.
// Kept only the necessary imports for the new structure.

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        {/* Other new sections will be added here */}
      </main>
      <Footer />
    </>
  );
}
