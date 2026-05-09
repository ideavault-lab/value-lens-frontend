"use client"

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight
} from "lucide-react";
import { Button } from "../ui/Button";
import { MARKET_ROWS } from "@/lib/homeData";

// ─── MARKET INSIGHTS ──────────────────────────────────────────────────────────

export default function MarketInsights() {
  return (
    <section id="market" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Live Market Pulse</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              Current resale market trends
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our AI tracks thousands of listings daily. These are the <strong className="text-foreground">resale health scores</strong> across categories right now.
            </p>
            <Link href="/valuation">
              <Button size="lg" className="rounded-xl group">
                Check Your Vehicle
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-3">
            {MARKET_ROWS.map((d, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border px-5 py-4">
                <div className="flex justify-between mb-2">
                  <span className="text-foreground font-semibold text-sm">{d.label}</span>
                  <span className={`text-xs font-bold ${d.up ? "text-chart-2" : "text-destructive"}`}>{d.note}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${d.up ? "bg-primary" : "bg-muted-foreground/50"}`}
                    initial={{ width: 0 }} whileInView={{ width: `${d.pct}%` }}
                    viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.08 + 0.2 }} />
                </div>
                <p className="text-muted-foreground text-xs mt-1 text-right font-medium">{d.pct}% resale health</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
