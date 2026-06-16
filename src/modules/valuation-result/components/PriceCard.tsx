"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";


interface PriceCardProps {
  price?: number;       // raw rupees
  priceLow?: number;
  priceHigh?: number;
  confidence?: number;
  confidenceLabel?: string;
  explanation: string;
  specs: string[];
  loading?: boolean;
  error?: boolean;
}


/** Formats a raw rupee amount into ₹5.44L / ₹1.2Cr / ₹54K */
export function formatINR(amount: number): string {
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(2)}Cr`;
  }
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(2)}L`;
  }
  if (amount >= 1_000) {
    return `₹${(amount / 1_000).toFixed(1)}K`;
  }
  return `₹${amount}`;
}

export function PriceCard({
  price,
  priceLow,
  priceHigh,
  confidence,
  confidenceLabel,
  explanation,
  specs,
  loading = false,
  error = false,
}: PriceCardProps) {
  const [displayed, setDisplayed] = React.useState(0);

  React.useEffect(() => {
    if (price === undefined) { setDisplayed(0); return; }

    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setDisplayed(Math.round(price * eased));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [price]);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">

      {/* PRICE HERO */}
      <div className="px-5 py-6 text-center border-b border-border">
        <p className="text-[11px] uppercase tracking-[0.07em] text-muted-foreground mb-2">
          Estimated market value
        </p>

        {loading && (
          <div className="h-10 w-36 mx-auto bg-muted animate-pulse rounded-md" />
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            <p className="text-base font-medium text-destructive">
              Valuation unavailable
            </p>
          </div>
        )}

        {!loading && !error && price !== undefined && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-primary leading-none"
          >
            {formatINR(displayed)}
          </motion.p>
        )}

        {!loading && !error && priceLow !== undefined && priceHigh !== undefined && (
          <p className="text-sm text-muted-foreground mt-2.5">
            Fair range: {formatINR(priceLow)} — {formatINR(priceHigh)}
          </p>
        )}

        {/* CONFIDENCE BAR */}
        {!loading && !error && confidence !== undefined && (
          <div className="flex items-center gap-3 mt-4 max-w-xs mx-auto">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {confidence}% · {confidenceLabel}
            </span>
          </div>
        )}
      </div>

      {/* INSIGHT */}
      <div className="px-5 py-4 border-b border-border bg-accent/10">
        {loading ? (
          <div className="space-y-2">
            <div className="h-3 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
          </div>
        ) : (
          <p className={`text-sm leading-relaxed ${error ? "text-destructive" : "text-foreground/80"}`}>
            {explanation}
          </p>
        )}
      </div>

      {/* SPECS */}
      <div className="px-5 py-4 flex flex-wrap gap-2">
        {specs.map((tag, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1.5 bg-secondary rounded-full border border-border text-muted-foreground capitalize"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}