"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { VEHICLE_TYPES } from "@/lib/homeData";
import GaugeDial from "./GaugeDial";

const STATS = [
  { value: "50k+", label: "vehicles valued" },
  { value: "98%", label: "confidence" },
  { value: "12", label: "cities" },
];

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIdx((i) => (i + 1) % VEHICLE_TYPES.length),
      4200
    );
    return () => clearInterval(t);
  }, []);

  const active = VEHICLE_TYPES[activeIdx];

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Soft glow */}
      <div
        className="absolute top-0 right-0 w-[420px] h-[420px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI-powered · Live market data
            </span>

            {/* Headline */}
            <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.08]">
              Know your vehicle&apos;s{" "}
              <span className="text-primary">true worth.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
              Instant resale valuations for cars, bikes, trucks & commercial
              vehicles — no guesswork.
            </p>

            {/* Vehicle type pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {VEHICLE_TYPES.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    i === activeIdx
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card"
                  }`}
                >
                  <v.Icon className="w-3.5 h-3.5" />
                  {v.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href="/valuation">
                <Button size="lg" className="rounded-xl px-7 h-12 group">
                  Value My Vehicle
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How it works →
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-xl sm:text-2xl text-foreground tabular-nums">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — sample estimate card (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden md:block relative"
          >
            {/* Soft rotating ring */}
            <motion.div
              aria-hidden
              className="absolute -inset-8 rounded-full border border-primary/10 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="relative bg-card rounded-3xl border border-border shadow-xl p-7"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5">
                      Sample estimate
                    </p>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {active.label}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-0.5">
                      {active.examples[0]}
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center shrink-0">
                    <active.Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Gauge + Price */}
                <div className="flex items-center gap-5 py-5 border-y border-border">
                  <GaugeDial value={96} size={96} label="confidence" />
                  <div>
                    <p className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                      ₹4.2L – ₹6.8L
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Estimated resale range
                    </p>
                  </div>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-between mt-5">
                  <span className="text-xs text-muted-foreground">
                    Switch vehicle type
                  </span>
                  <div className="flex gap-1.5">
                    {VEHICLE_TYPES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        aria-label={`Show ${VEHICLE_TYPES[i].label}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeIdx
                            ? "w-5 bg-primary"
                            : "w-1.5 bg-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}