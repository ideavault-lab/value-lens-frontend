"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Cpu, History, ShieldCheck, TrendingUp } from "lucide-react";
import GaugeDial from "./GaugeDial";

const STEPS = [
  { icon: ClipboardCheck, title: "Vehicle details", desc: "Make, model, year, mileage, condition." },
  { icon: Cpu, title: "AI processing", desc: "40+ signals weighed in seconds." },
  { icon: TrendingUp, title: "Market intelligence", desc: "Live listings for this model, nearby." },
  { icon: History, title: "Historical comparison", desc: "How similar vehicles actually sold." },
  { icon: ShieldCheck, title: "Confidence check", desc: "Every estimate is scored, not guessed." },
];

export default function IntelligenceEngine() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-lg">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Inside the estimate</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-[1.1]">
            Five steps. One settled number.
          </h2>
        </div>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-11 left-0 right-0 h-px border-t border-dashed border-border" aria-hidden />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative"
              >
                <div className="relative bg-card border border-border rounded-2xl px-5 pt-8 pb-6 h-full">
                  {/* perforation notches — nod to a valuation ticket stub */}
                  <span className="hidden md:block absolute -left-2 top-11 w-4 h-4 rounded-full bg-muted border border-border" aria-hidden />
                  <span className="hidden md:block absolute -right-2 top-11 w-4 h-4 rounded-full bg-muted border border-border" aria-hidden />

                  <span className="absolute top-3 left-5 font-heading text-xs text-primary">0{i + 1}</span>
                  <s.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-base text-foreground">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-6 justify-center bg-card border border-border rounded-2xl p-6 md:p-8 max-w-xl mx-auto"
          >
            <GaugeDial value={96} size={88} label="confidence" delay={0.6} />
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Estimated value</p>
              <p className="font-heading text-4xl text-foreground mt-1">₹4.20L – ₹4.55L</p>
              <p className="text-xs text-muted-foreground mt-1">Recalculated the moment new listings appear.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}