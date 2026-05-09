"use client";

import React from "react";
import { motion } from "framer-motion";

interface PriceCardProps {
  price: number;
  priceLow: number;
  priceHigh: number;
  confidence: number;
  explanation: string;
  specs: string[];
}

export function PriceCard({
  price,
  priceLow,
  priceHigh,
  confidence,
  explanation,
  specs,
}: PriceCardProps) {
  const [displayed, setDisplayed] = React.useState(0);

  React.useEffect(() => {
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setDisplayed(parseFloat((price * eased).toFixed(2)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [price]);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Price hero */}
      <div className="px-5 py-6 text-center border-b border-border">
        <p className="text-[11px] uppercase tracking-[0.07em] text-muted-foreground mb-2">
          Estimated market value
        </p>
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-primary leading-none"
        >
          ₹{displayed.toFixed(2)}L
        </motion.p>
        <p className="text-sm text-muted-foreground mt-2.5">
          Fair range: ₹{priceLow}L — ₹{priceHigh}L
        </p>

        {/* Confidence bar */}
        <div className="flex items-center gap-3 mt-4 max-w-xs mx-auto">
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-blue-600 rounded-full"
            />
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {confidence}% confidence
          </span>
        </div>
      </div>

      {/* Insight */}
      <div className="px-5 py-4 border-b border-border bg-accent/10">
        <p className="text-sm text-foreground/80 leading-relaxed">{explanation}</p>
      </div>

      {/* Spec tags */}
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