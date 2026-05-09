"use client";

interface SnapshotRow {
  label: string;
  value: string;
  badge?: { text: string; variant: "good" | "warn" | "info" };
}

interface ValuationSnapshotProps {
  location?: string;
}

const badgeStyles = {
  good: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  warn: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
};

export function ValuationSnapshot({ location }: ValuationSnapshotProps) {
  const rows: SnapshotRow[] = [
    {
      label: "Avg. days to sell",
      value: "18 days",
      badge: { text: "Fast", variant: "good" },
    },
    {
      label: "Active listings",
      value: "Moderate",
      badge: { text: "42 listings", variant: "warn" },
    },
    {
      label: "Annual depreciation",
      value: "~4.8% / yr",
    },
    {
      label: "Best sell season",
      value: "Oct – Dec",
      badge: { text: "Seasonal", variant: "info" },
    },
    {
      label: "Segment position",
      value: "Top 30%",
      badge: { text: "Strong", variant: "good" },
    },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
        <span className="text-base">📋</span> Valuation snapshot
        {location && (
          <span className="text-[11px] ml-auto text-muted-foreground font-normal truncate max-w-[120px]">
            {location}
          </span>
        )}
      </p>
      <div className="divide-y divide-border">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 gap-2">
            <span className="text-xs text-muted-foreground flex-shrink-0">{row.label}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-medium">{row.value}</span>
              {row.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    badgeStyles[row.badge.variant]
                  }`}
                >
                  {row.badge.text}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}