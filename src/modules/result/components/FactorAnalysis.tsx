"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface Factor {
  label: string;
  value: number; // percentage, positive or negative
}

interface FactorAnalysisProps {
  factors: Factor[];
}

export function FactorAnalysis({ factors }: FactorAnalysisProps) {
  const sorted = [...factors].sort((a, b) => b.value - a.value);

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
        <span className="text-base">⚖️</span> Price factor analysis
      </p>
      <div className="space-y-3.5">
        {sorted.map((f, i) => {
          const isPos = f.value > 0;
          const isNeg = f.value < 0;
          const barPct = Math.min(Math.abs(f.value) * 4, 100);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs text-muted-foreground w-20 flex-shrink-0">
                {f.label}
              </span>
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barPct}%` }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${isPos ? "bg-emerald-500" : "bg-rose-500"}`}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium min-w-[40px] justify-end ${
                  isPos ? "text-emerald-600" : isNeg ? "text-rose-600" : "text-muted-foreground"
                }`}
              >
                {isPos && <TrendingUp className="w-3 h-3" />}
                {isNeg && <TrendingDown className="w-3 h-3" />}
                {!isPos && !isNeg && <Minus className="w-3 h-3" />}
                {isPos ? "+" : ""}{f.value}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}