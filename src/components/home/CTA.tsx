"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VEHICLE_TYPES } from "@/lib/homeData";

export default 
// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-foreground rounded-3xl p-10 md:p-16 text-center flex flex-col items-center">

          <div className="flex gap-3 mb-6 flex-wrap justify-center">
            {VEHICLE_TYPES.map(v => (
              <div key={v.id} className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center">
                <v.Icon className="w-5 h-5 text-background/60" />
              </div>
            ))}
          </div>

          <h2 className="font-heading font-bold text-4xl md:text-5xl text-background leading-tight">
            What's your vehicle worth?
          </h2>
          <p className="mt-4 text-background/60 text-lg max-w-md">
            Find out in 15 seconds. No signup required. No dealer bias. Just honest numbers.
          </p>

          <Link href="/valuation" className="mt-8">
            <Button size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-10 h-14 text-base font-semibold group shadow-lg">
              Value My Vehicle — Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="mt-4 text-background/40 text-xs">Free forever · No credit card · Results in 15 seconds</p>
        </motion.div>
      </div>
    </section>
  );
}