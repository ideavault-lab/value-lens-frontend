
// ─── PAGE ─────────────────────────────────────────────────────────────────────

import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import WhyAI from "@/components/home/WhyAI";
import IntelligenceEngine from "@/components/home/IntelligenceEngine";
import VehicleUniverse from "@/components/home/VehicleUniverse";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/home/Footer";
 
export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhyAI />
      <IntelligenceEngine />
      <VehicleUniverse />
      <FinalCTA />
      <Footer />
    </main>
  );
}
 