"use client";

import { motion } from "framer-motion";

export interface CompetitorModel {
  name: string;
  price: number;
  isYours?: boolean;
}

interface SegmentCompetitorChartProps {
  models: CompetitorModel[];
  segment?: string;
}

export function SegmentCompetitorChart({
  models,
  segment = "Premium Hatchback",
}: SegmentCompetitorChartProps) {
  const maxPrice = Math.max(...models.map((m) => m.price));
  // Keep segment-appropriate models only (same price band ±₹2L)
  const yours = models.find((m) => m.isYours);
  const filtered = yours
    ? models.filter((m) => Math.abs(m.price - yours.price) <= 2)
    : models;

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <span className="text-base">🏁</span> Segment comparison
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {segment} · vehicles within ±₹2L range
        </p>
      </div>

      <div className="space-y-2.5">
        {filtered.map((model, i) => {
          const pct = (model.price / maxPrice) * 100;
          return (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-medium w-14 sm:w-16 flex-shrink-0 text-foreground truncate">
                {model.name}
                {model.isYours && (
                  <span className="ml-1 text-[10px] text-primary font-normal">★</span>
                )}
              </span>
              <div className="flex-1 h-6 bg-secondary rounded-md overflow-hidden min-w-0">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: "easeOut" }}
                  className={`h-full rounded-md flex items-center justify-end pr-2.5 ${
                    model.isYours
                      ? "bg-primary"
                      : "bg-border/80 dark:bg-secondary"
                  }`}
                >
                  <span
                    className={`text-[11px] font-medium whitespace-nowrap ${
                      model.isYours ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    ₹{model.price}L
                  </span>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground mt-4 flex items-center gap-1">
        <span className="text-primary font-medium">★</span> = your vehicle
      </p>
    </div>
  );
}