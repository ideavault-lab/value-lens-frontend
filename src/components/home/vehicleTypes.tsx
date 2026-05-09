"use client"
import { AnimatePresence, motion } from "framer-motion";
// ─── VEHICLE TYPES ────────────────────────────────────────────────────────────

import { VEHICLE_TYPES } from "@/lib/homeData";
import { useState } from "react";
import { ArrowRight, CheckCircle, Link } from "lucide-react";
import { Button } from "../ui/Button";

export default function VehicleTypes() {
  const [active, setActive] = useState(0);
  const vt = VEHICLE_TYPES[active];

  return (
    <section id="vehicle-types" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">All Categories</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground">Every vehicle. One platform.</h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-lg mx-auto">
            Accurate valuations across all vehicle types — from daily commuters to commercial fleets.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {VEHICLE_TYPES.map((v, i) => (
            <button key={v.id} onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all ${
                i === active
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}>
              <v.Icon className="w-4 h-4" />{v.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-5">
                  <vt.Icon className="w-9 h-9 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-3xl text-foreground">{vt.label}</h3>
                <p className="text-muted-foreground mt-2">{vt.description}</p>
                <div className="mt-6 space-y-3">
                  {["Instant market valuation", "Depreciation trend analysis", "Best time to sell insights", "Compare similar listings"].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/80 font-medium text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/valuation" className="mt-8 inline-block">
                  <Button size="lg" className="rounded-xl group">
                    Value a {vt.label.split("&")[0].trim()}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {vt.examples.concat(["More models…"]).slice(0, 4).map((ex, i) => (
                  <div key={i} className="bg-muted rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer">
                    <vt.Icon className="w-6 h-6 text-primary mb-3" />
                    <p className="text-foreground font-semibold text-sm">{ex}</p>
                    <p className="text-primary font-bold text-xs mt-1">Get price →</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}