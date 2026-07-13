"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface PriceCardProps {
  price?: number;
  priceLow?: number;
  priceHigh?: number;
  confidence?: number;
  confidenceLabel?: string;
  explanation: string;
  specs: string[];
  loading?: boolean;
  metaLoading?: boolean;
  error?: boolean;
}
export function formatINR(amount?: number) {
  if (amount == null || Number.isNaN(amount)) {
    return "—";
  }

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-muted ${className}`}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}

const STATUS_MESSAGES = [
  "Analyzing market listings…",
  "Comparing similar vehicles…",
  "Calculating fair price…",
  "Checking demand trends…",
];

function LoadingStatus() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 h-5 mt-3">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="text-sm text-muted-foreground"
        >
          {STATUS_MESSAGES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
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
  metaLoading = false,
  error = false,
}: PriceCardProps) {
  const [displayed, setDisplayed] = React.useState<number | null>(null);

React.useEffect(() => {
  if (price == null) {
    setDisplayed(null);
    return;
  }

  const duration = 1400;
  const start = performance.now();

  const animate = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);

    const eased =
      1 - Math.pow(2, -10 * progress);

    setDisplayed(price * eased);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}, [price]);
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-7 border-b border-border text-center">
        <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-3">
          Estimated Market Value
        </p>

        {metaLoading || loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center">
              <Skeleton className="h-12 w-50 rounded-xl" />
            </div>
            <LoadingStatus />
            {/* <div className="flex items-center gap-3 mt-6 max-w-xs mx-auto">
              <Skeleton className="h-2 flex-1 rounded-full" />
            </div> */}
          </div>
        ) : error ? (
          <div className="h-[108px] flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-7 h-7 text-destructive" />
            <p className="font-medium text-destructive">Valuation unavailable</p>
          </div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-5xl font-bold tracking-tight text-primary tabular-nums"
            >
              {formatINR(displayed ?? 0)}
            </motion.p>

            <p className="h-5 mt-3 text-sm text-muted-foreground">
              Fair range: {formatINR(priceLow!)} – {formatINR(priceHigh!)}
            </p>

            <div className="flex items-center gap-3 mt-5 max-w-xs mx-auto">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                />
              </div>
              <span className="text-xs whitespace-nowrap text-muted-foreground">
                {confidence}% · {confidenceLabel}
              </span>
            </div>
          </>
        )}
      </div>

      {/* INSIGHT */}
      <div className="px-6 py-5 bg-accent/10 border-b border-border min-h-[95px] flex items-center">
        {loading ? (
          <div className="w-full space-y-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ) : (
          <p
            className={`text-sm leading-relaxed ${error ? "text-destructive" : "text-foreground/80"
              }`}
          >
            {explanation}
          </p>
        )}
      </div>

      {/* SPECS */}
      <div className="px-6 py-5 flex flex-wrap gap-2 min-h-[72px]">
        {metaLoading
          ? Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-8 rounded-full"
              style={{ width: `${70 + i * 18}px` } as React.CSSProperties}
            />
          ))
          : specs.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-xs rounded-full border border-border bg-secondary text-muted-foreground capitalize"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
}