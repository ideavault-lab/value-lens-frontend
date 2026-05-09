"use client";

import { FEATURES } from "@/lib/homeData";
import { motion } from "framer-motion";

export default 
// ─── FEATURES ─────────────────────────────────────────────────────────────────

function Features() {
  return (
    <section id="features" className="py-20 md:py-28 border-t border-border bg-card/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Why VehicleVal</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground">Built for every vehicle owner.</h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-lg mx-auto">
            A smarter way to understand your vehicle's true market position.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-7 hover:border-primary/25 hover:shadow-md transition-all group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <f.Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}