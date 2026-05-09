"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import {
  Car, Bike, Truck, Bus,
  ArrowRight, 
  Star
} from "lucide-react";
import { VEHICLE_TYPES } from "@/lib/homeData";

export default 
// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % VEHICLE_TYPES.length), 3200);
    return () => clearInterval(t);
  }, []);

  const active = VEHICLE_TYPES[activeIdx];

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Warm gradient backdrop using theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-background to-background pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent border border-accent-foreground/10 text-xs font-semibold text-accent-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Trusted by 50,000+ owners
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-chart-2" />
              AI-Powered · Live Market Data
            </span>
          </div>

          <h1 className="font-heading font-bold text-5xl md:text-6xl text-foreground leading-[1.08]">
            Know your
            <br />vehicle's
            <br />
            <AnimatePresence mode="wait">
              <motion.span key={activeIdx}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="text-primary inline-block">
                true worth.
              </motion.span>
            </AnimatePresence>
          </h1>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-md">
            Instant resale valuations for <strong className="text-foreground font-semibold">cars, bikes, trucks,</strong> and commercial vehicles — no guesswork, no dealer bias.
          </p>

          {/* Vehicle type pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {VEHICLE_TYPES.map((v, i) => (
              <button key={v.id} onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  i === activeIdx
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground bg-card"
                }`}>
                <v.Icon className="w-3.5 h-3.5" />
                {v.label}
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/valuation" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-xl px-8 h-13 group">
                Value My Vehicle
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-xl px-8 h-13">
                How It Works
              </Button>
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <div className="flex -space-x-2">
              {["A","R","M","P","V"].map((l, i) => (
                <div key={i}
                  className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
                  style={{ background: `hsl(${21 + i * 15} 80% ${42 + i * 6}%)` }}>
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-chart-3 fill-chart-3" />)}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">4.9/5 from 2,400+ reviews</p>
            </div>
            <div className="h-7 w-px bg-border hidden sm:block" />
            <p className="text-xs text-muted-foreground hidden sm:block">
              <span className="text-foreground font-bold">50,000+</span> vehicles valued
            </p>
          </div>
        </motion.div>

        {/* RIGHT — Animated vehicle showcase card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-3xl border border-border shadow-xl p-8">

              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
                    {active.badge}
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-foreground mt-3">{active.label}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{active.description}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
                  <active.Icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Example models */}
              <div className="space-y-2 mb-6">
                {active.examples.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between bg-muted rounded-xl px-4 py-2.5">
                    <span className="text-foreground text-sm font-medium">{ex}</span>
                    <span className="text-primary text-xs font-bold">Get Value →</span>
                  </div>
                ))}
              </div>

              {/* Mini valuation preview */}
              <div className="bg-accent/50 rounded-2xl p-4 border border-accent">
                <p className="text-accent-foreground/70 text-xs uppercase tracking-wider mb-1 font-semibold">Sample Estimate</p>
                <p className="font-heading font-bold text-2xl text-foreground">₹4.2L – ₹6.8L</p>
                <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
                  <motion.div className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }} animate={{ width: "72%" }}
                    transition={{ duration: 1, delay: 0.3 }} />
                </div>
                <p className="text-muted-foreground text-xs mt-1">Market confidence: 98%</p>
              </div>

              {/* Dot nav */}
              <div className="flex gap-1.5 justify-center mt-5">
                {VEHICLE_TYPES.map((_, i) => (
                  <button key={i} onClick={() => setActiveIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIdx ? "w-6 bg-primary" : "w-1.5 bg-border"
                    }`} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}