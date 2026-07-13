"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface Factor {
  label: string;
  value: number;
  note?: string;
}

interface FactorAnalysisProps {
  factors: Factor[];
  loading?: boolean;
}

function SkeletonRow() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="flex justify-between">
        <div className="h-3 w-24 rounded bg-secondary" />
        <div className="h-3 w-10 rounded bg-secondary" />
      </div>

      <div className="h-2 rounded-full bg-secondary" />
    </div>
  );
}

export function FactorAnalysis({
  factors,
  loading = false,
}: FactorAnalysisProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <span>⚖️</span>
            Price factor analysis
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Calculating vehicle impact...
          </p>
        </div>

        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!factors.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <span>⚖️</span>
          Price factor analysis
        </h3>

        <p className="mt-3 text-sm text-muted-foreground">
          Price factor analysis unavailable.
        </p>
      </div>
    );
  }

  const sorted = [...factors].sort(
    (a, b) => Math.abs(b.value) - Math.abs(a.value)
  );

  const maxImpact = Math.max(
    ...sorted.map((f) => Math.abs(f.value)),
    1
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-5">

      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <span>⚖️</span>
          Price factor analysis
        </h3>

        <p className="mt-1 text-xs text-muted-foreground">
          Factors affecting your vehicle valuation.
        </p>
      </div>

      <div className="space-y-3">
        {sorted.map((factor, index) => {
          const abs = Math.abs(factor.value);

          const isPositive = factor.value > 0;
          const isNegative = factor.value < 0;
          const isNeutral = factor.value === 0;

          // Relative scale
          const relative = abs / maxImpact;

          // Half of bar is 50%
          const width = relative * 50;

          // minimum visible = ~6px
          const finalWidth =
            abs === 0
              ? 0
              : Math.max(width, 2.5);

          return (
            <motion.div
              key={factor.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
              }}
            >
              <div className="flex items-center justify-between mb-1">

                <div className="flex items-center gap-2">

                  {isPositive && (
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  )}

                  {isNegative && (
                    <TrendingDown className="h-3.5 w-3.5 text-rose-600" />
                  )}

                  {isNeutral && (
                    <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                  )}

                  <span className="text-[13px] font-medium">
                    {factor.label}
                  </span>
                </div>

                <span
                  className={`text-xs font-semibold ${
                    isPositive
                      ? "text-emerald-600"
                      : isNegative
                      ? "text-rose-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {isPositive && "+"}
                  {factor.value.toFixed(1)}%
                </span>
              </div>

              <div className="relative h-2 overflow-hidden rounded-full bg-secondary">

                {/* center divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />

                {isPositive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${finalWidth}%` }}
                    transition={{
                      duration: 0.6,
                    }}
                    className="absolute left-1/2 top-0 h-full rounded-r-full bg-emerald-500"
                  />
                )}

                {isNegative && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${finalWidth}%` }}
                    transition={{
                      duration: 0.6,
                    }}
                    className="absolute right-1/2 top-0 h-full rounded-l-full bg-rose-500"
                  />
                )}

                {isNeutral && (
                  <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground" />
                )}
              </div>

              {factor.note && (
                <p className="ml-5 mt-1 text-[11px] text-muted-foreground">
                  {factor.note}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}