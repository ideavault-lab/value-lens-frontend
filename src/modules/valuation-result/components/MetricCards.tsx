"use client";

interface Metric {
  label: string;
  value: string;
  sub: string;
  color?: "green" | "amber" | "blue" | "default";
}

interface MetricCardsProps {
  metrics: Metric[];
}

const colorMap = {
  green: "text-emerald-600",
  amber: "text-amber-600",
  blue: "text-blue-600",
  default: "text-foreground",
};

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-4">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="bg-secondary/60 rounded-xl px-4 py-3.5"
        >
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5">
            {m.label}
          </p>
          <p
            className={`text-xl font-semibold tracking-tight leading-none ${
              colorMap[m.color ?? "default"]
            }`}
          >
            {m.value}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1.5">{m.sub}</p>
        </div>
      ))}
    </div>
  );
}