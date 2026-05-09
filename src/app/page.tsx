
// ─── PAGE ─────────────────────────────────────────────────────────────────────

import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItsWorks";
import MarketInsights from "@/components/home/MarketInsights";
import Navbar from "@/components/home/Navbar";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import VehicleTypes from "@/components/home/vehicleTypes";

export default function Page() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <VehicleTypes />
      <HowItWorks />
      <MarketInsights />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}