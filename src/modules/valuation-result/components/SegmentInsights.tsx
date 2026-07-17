"use client";

import { motion } from "framer-motion";
import type { SegmentIntelligenceItem } from "../hooks/useValuation.hooks";

interface Props {
  insights: SegmentIntelligenceItem[];
  loading?: boolean;
}

const icons: Record<string, string> = {
  demand: "📈",
  positioning: "🎯",
  depreciation: "📉",
  timing: "📅",
};

export function SegmentInsights({
  insights,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold">
          🧠 Segment Intelligence
        </h3>

        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl bg-secondary"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!insights.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold">
          🧠 Segment Intelligence
        </h3>

        <p className="mt-3 text-sm text-muted-foreground">
          No market intelligence is available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
        🧠 Segment Intelligence
      </h3>

      <div className="space-y-3">
        {insights.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-xl border border-border bg-secondary/30 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg">
                {icons[item.key] ?? "ℹ️"}
              </span>

              <h4 className="text-sm font-semibold">
                {item.label}
              </h4>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              {item.insight}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}