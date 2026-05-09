"use client";

import React from "react";

interface Metric {
  label: string;
  value: string;
  sub: string;
  color?: "orange" | "green" | "amber" | "blue" | "default";
  animate?: boolean;
  animTarget?: number;
}

interface MetricCardsProps {
  metrics: Metric[];
}

const colorMap: Record<string, string> = {
  orange: "text-primary",
  green: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  blue: "text-blue-600 dark:text-blue-400",
  default: "text-foreground",
};

function AnimatedValue({ target }: { target: number }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const dur = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(2, -10 * p);
      setVal(parseFloat((target * e).toFixed(2)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <>₹{val.toFixed(2)}L</>;
}

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 mb-4">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="bg-secondary/60 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 min-w-0"
        >
          <p className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5 truncate">
            {m.label}
          </p>
          <p
            className={`text-lg sm:text-xl font-semibold tracking-tight leading-none truncate ${
              colorMap[m.color ?? "default"]
            }`}
          >
            {m.animate && m.animTarget !== undefined ? (
              <AnimatedValue target={m.animTarget} />
            ) : (
              m.value
            )}
          </p>
          <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-1.5 truncate">
            {m.sub}
          </p>
        </div>
      ))}
    </div>
  );
}