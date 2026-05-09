"use client";

import { motion } from "framer-motion";

interface SegmentInsightsProps {
  segment?: string;
  location?: string;
  brand?: string;
}

interface InsightItem {
  icon: string;
  text: React.ReactNode;
}

export function SegmentInsights({
  segment = "Premium Hatchback",
  location = "Kerala",
  brand = "Toyota",
}: SegmentInsightsProps) {
  const insights: InsightItem[] = [
    {
      icon: "📊",
      text: (
        <>
          <strong className="text-foreground font-medium">{segment}s</strong> retain value better
          than compact sedans — avg 4.8% annual depreciation vs 6.2%.
        </>
      ),
    },
    {
      icon: "🌍",
      text: (
        <>
          <strong className="text-foreground font-medium">{location} market</strong> shows higher
          demand for petrol manuals — approx 22% faster turnaround time.
        </>
      ),
    },
    {
      icon: "🏆",
      text: (
        <>
          <strong className="text-foreground font-medium">{brand}</strong> ranks among top brands
          for value retention — strong reliability perception drives resale.
        </>
      ),
    },
    {
      icon: "📅",
      text: (
        <>
          Best sell window:{" "}
          <strong className="text-foreground font-medium">Oct – Dec</strong>. Festival season
          drives higher buyer activity in your region.
        </>
      ),
    },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
        <span className="text-base">🧠</span> Segment intelligence
      </p>
      <div className="space-y-2.5">
        {insights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="flex items-start gap-3 p-3 bg-secondary/40 rounded-xl border border-border/50"
          >
            <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}