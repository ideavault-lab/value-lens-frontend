"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import GaugeDial from "./GaugeDial";

const PARTICLES = [
  { left: "12%", top: "18%", delay: 0 },
  { left: "28%", top: "72%", delay: 0.5 },
  { left: "48%", top: "12%", delay: 1.1 },
  { left: "68%", top: "78%", delay: 1.6 },
  { left: "82%", top: "28%", delay: 2.1 },
  { left: "91%", top: "62%", delay: 2.6 },
];

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-foreground text-background">

      {/* Soft ambient decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft central glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-primary/[0.04] blur-3xl" />

        {/* Thin elegant arcs */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-background/[0.04] blur-[1px]"
          style={{
            maskImage:
              "conic-gradient(from 40deg, transparent 0deg, black 80deg, transparent 160deg, black 240deg, transparent 320deg)",
            WebkitMaskImage:
              "conic-gradient(from 40deg, transparent 0deg, black 80deg, transparent 160deg, black 240deg, transparent 320deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[390px] h-[390px] rounded-full border border-dashed border-background/[0.05] blur-[0.8px]"
          style={{
            maskImage:
              "conic-gradient(from 120deg, black 0deg, transparent 90deg, black 180deg, transparent 270deg)",
            WebkitMaskImage:
              "conic-gradient(from 120deg, black 0deg, transparent 90deg, black 180deg, transparent 270deg)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Soft corner glows */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />

      {/* Subtle noise grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/50"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 4.4 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-5 text-center">

        {/* Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-12"
        >
          <GaugeDial value={94} revertTheme={true} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading font-bold text-[2.5rem] md:text-[3.25rem] leading-[1.1] tracking-tight"
        >
          Dealers negotiate.
          <br />
          <span className="relative inline-block mt-1">
            {/* Soft ambient glow behind the text */}
            <span
              aria-hidden
              className="absolute inset-0 -z-10 scale-110 rounded-2xl bg-primary/20 blur-2xl"
            />
            <span className="relative text-primary">
              You calculate first.
            </span>
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-6 text-background/55 text-[1.05rem] md:text-lg leading-relaxed max-w-[22rem] mx-auto"
        >
          Get the real market number before anyone tries to lowball you.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Link href="/valuation">
            <Button
              size="lg"
              className="rounded-2xl px-9 h-14 text-[15px] font-semibold tracking-wide group bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_8px_30px_-6px] hover:shadow-primary/40 transition-all duration-300"
            >
              Value My Vehicle
              <ArrowRight className="w-4 h-4 ml-2.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}