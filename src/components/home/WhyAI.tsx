"use client";

import { motion } from "framer-motion";
import { MessageCircleQuestion, Store, Users2 } from "lucide-react";
import GaugeDial from "./GaugeDial";

const GUESSES = [
  { icon: Store, label: "A dealer's counter-offer", value: "₹3.10L", rotate: -4, top: 0, indent: 0 },
  { icon: Users2, label: "A friend's rough guess", value: "₹4.60L", rotate: 3, top: 46, indent: 14 },
  { icon: MessageCircleQuestion, label: "A random online listing", value: "₹2.90L", rotate: -2, top: 92, indent: 4 },
];

const EVIDENCE = [
  "Condition analysis across 40+ inspection points",
  "Historical sale data for this exact model, nearby",
  "Full ownership and service timeline",
  "Live demand signal for your region, this week",
];

export default function WhyAI() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Two ways to price a vehicle</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-[1.1]">
            Guesswork has never agreed with itself.
          </h2>
        </div>

        <div className="relative mt-16 md:mt-20 grid md:grid-cols-2 gap-y-20 md:gap-x-0">
          {/* center seam */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-border -translate-x-1/2" aria-hidden />
          <div className="hidden md:flex absolute top-[180px] left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full bg-card border border-border items-center justify-center shadow-sm">
            <span className="font-heading italic text-sm text-muted-foreground">vs</span>
          </div>

          {/* LEFT — scattered, inconsistent */}
          <div className="relative md:pr-16">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-10">Guesswork</p>

            <div className="relative h-[220px]">
              {GUESSES.map((g, i) => (
                <motion.div
                  key={g.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  style={{ top: g.top, left: `${g.indent}%`, rotate: g.rotate }}
                  className="absolute w-60 max-w-[80%] bg-card border border-border rounded-2xl px-5 py-4 shadow-sm"
                >
                  <g.icon className="w-4 h-4 text-muted-foreground mb-2" />
                  <p className="text-sm text-foreground/80 font-medium">{g.label}</p>
                  <p className="mt-1 font-heading text-xl text-muted-foreground line-through decoration-1">{g.value}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-sm text-muted-foreground max-w-xs">
              Three sources. Three different numbers. None of them are lying — none of them are reliable either.
            </p>
          </div>

          {/* RIGHT — aligned, resolved */}
          <div className="relative md:pl-16 md:pt-2">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-10">Evidence</p>

            <ul className="space-y-4">
              {EVIDENCE.map((e, i) => (
                <motion.li
                  key={e}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 border-b border-border pb-4"
                >
                  <span className="font-heading text-sm text-primary mt-0.5 flex-shrink-0">0{i + 1}</span>
                  <span className="text-foreground/90 text-sm font-medium leading-relaxed">{e}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center gap-5 bg-accent/40 border border-accent rounded-2xl p-5"
            >
              <GaugeDial value={98} />
              <div>
                <p className="text-xs uppercase tracking-wide text-accent-foreground/70 font-semibold">Confidence score</p>
                <p className="font-heading text-3xl text-foreground">₹4.20L</p>
                <p className="text-xs text-muted-foreground mt-0.5">One number. Backed by data.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}