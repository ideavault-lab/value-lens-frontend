"use client";

import { motion } from "framer-motion";

export interface Alternative {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  fuel: string;
  transmission: string;
  segment: string;
  price: number;
  resaleDemand: number;
}

interface AlternativeRecommendationsProps {
  alternatives: Alternative[];
  loading?: boolean;
}

function formatPrice(price: number) {
  // Guard against broken backend values (e.g. 4.57e+83)
  if (!price || price > 1000) return "—";
  return `₹${price.toFixed(2)}L`;
}

function demandLabel(value: number) {
  if (value >= 1.3) return { text: "High", color: "text-emerald-500" };
  if (value >= 1.15) return { text: "Good", color: "text-primary" };
  return { text: "Average", color: "text-muted-foreground" };
}

export function AlternativeRecommendations({
  alternatives,
  loading,
}: AlternativeRecommendationsProps) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="h-4 w-48 bg-muted rounded animate-pulse mb-3" />
        <div className="h-3 w-64 bg-muted/70 rounded animate-pulse" />
      </div>
    );
  }

  if (!alternatives.length) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <p className="text-sm font-medium text-foreground">
          Similar vehicles
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          No recommendations available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
      {/* Header */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-foreground">
          Similar vehicles worth considering
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Based on market value & resale demand
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {alternatives.map((alt, index) => {
          const demand = demandLabel(alt.resaleDemand);

          return (
            <motion.div
              key={alt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-xl border border-border bg-background/60 p-4 hover:border-primary/30 hover:bg-background transition-all"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground truncate">
                    {alt.brand}
                  </p>
                  <h3 className="font-semibold text-foreground leading-snug truncate">
                    {alt.model}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {alt.variant}
                  </p>
                </div>

                <span className="shrink-0 text-[11px] font-medium rounded-md border border-border bg-card px-2 py-1 text-muted-foreground">
                  {alt.year}
                </span>
              </div>

              {/* Price */}
              <div className="mt-4">
                <p className="text-[11px] text-muted-foreground mb-0.5">
                  Est. market value
                </p>
                <p className="text-xl font-bold text-primary tracking-tight">
                  {formatPrice(alt.price)}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {alt.fuel}
                </span>
                <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {alt.transmission}
                </span>
                <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] text-muted-foreground capitalize">
                  {alt.segment.replaceAll("_", " ")}
                </span>
              </div>

              {/* Demand */}
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">
                  Resale demand
                </span>
                <span className={`text-xs font-semibold ${demand.color}`}>
                  {demand.text} · ×{alt.resaleDemand.toFixed(2)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}