"use client";

import { STEPS } from "@/lib/homeData";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 border-t border-border bg-card/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Simple Process</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground">How it works</h2>
          <p className="mt-3 text-muted-foreground text-lg">From zero to valuation in under 60 seconds.</p>
        </motion.div>

        {/* A real sequence, so it stays numbered — but the steps now sit on one connected line */}
        <div className="relative">
         

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className={`bg-card rounded-2xl border border-border p-6 hover:border-primary/25 hover:shadow-md transition-all ${
                  i % 2 === 1 ? "md:mt-8" : ""
                }`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-heading font-bold text-5xl text-primary/20 leading-none">{s.num}</span>
                  <span className="hidden md:block w-2 h-2 rounded-full bg-primary/40" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}