"use client";

import { motion } from "framer-motion";

export interface Alternative {
  make: string;
  name: string;
  price: number;
  fuel?: string;
  transmission?: string;
  resaleScore?: number;
}

interface AlternativeRecommendationsProps {
  alternatives: Alternative[];
  segment?: string;
  loading?: boolean;
}

export function AlternativeRecommendations({
  alternatives,
  segment = "Premium Hatchback",
  loading = false,
}: AlternativeRecommendationsProps) {
  const getScoreColor = (score?: number) => {
    if (!score) return "text-muted-foreground";
    if (score >= 88) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 80) return "text-amber-600 dark:text-amber-400";
    return "text-muted-foreground";
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <span className="text-base">💡</span> You may also consider
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {segment} · similar price band · comparable resale
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5">
        {alternatives.map((alt, i) => (
          <motion.div
            key={`${alt.make}-${alt.name}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-secondary/40 border border-border rounded-xl p-3 hover:border-primary/40 transition-colors"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              {alt.make}
            </p>
            <p className="text-sm font-medium text-foreground">{alt.name}</p>
            <p className="text-base font-semibold text-primary mt-1.5">
              ₹{alt.price}L
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {alt.fuel && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-card border border-border text-muted-foreground">
                  {alt.fuel}
                </span>
              )}
              {alt.transmission && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-card border border-border text-muted-foreground">
                  {alt.transmission}
                </span>
              )}
            </div>
            {alt.resaleScore !== undefined && (
              <p className={`text-[11px] font-medium mt-2 ${getScoreColor(alt.resaleScore)}`}>
                ↑ Resale {alt.resaleScore}/100
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}