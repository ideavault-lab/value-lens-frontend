"use client"

import { TESTIMONIALS } from "@/lib/homeData";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Real Stories</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground">People love it.</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/25 hover:shadow-md transition-all">
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 text-chart-3 fill-chart-3" />)}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div>
                <p className="text-foreground font-bold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}