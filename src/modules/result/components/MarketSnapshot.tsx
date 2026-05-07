"use client";

interface SnapshotRow {
  label: string;
  value: string;
  badge?: { text: string; variant: "good" | "warn" | "info" };
}

interface MarketSnapshotProps {
  rows: SnapshotRow[];
}

const badgeStyles = {
  good: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  warn: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
};

export function MarketSnapshot({ rows }: MarketSnapshotProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
        <span className="text-base">📊</span> Market snapshot
      </p>
      <div className="divide-y divide-border">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 gap-3">
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{row.value}</span>
              {row.badge && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
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