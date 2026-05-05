import React from "react";
import { Label } from "@/components/ui/Label";
import { QUICK_OPTIONS, QuickOption } from "./types";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface QuickSelectProps {
  /** Currently selected km value (null = nothing selected). */
  selected: number | null;
  /** Called when the user taps a chip. */
  onSelect: (km: number) => void;
  /** Override the option list if you need different chips. Defaults to QUICK_OPTIONS. */
  options?: QuickOption[];
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function QuickSelect({
  selected,
  onSelect,
  options = QUICK_OPTIONS,
}: QuickSelectProps): React.ReactElement {
  return (
    <div className="space-y-3">
      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
        Quick Select
      </Label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {options.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={[
                "p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200",
                "hover:border-primary/40 hover:bg-accent/30",
                isActive
                  ? "border-primary bg-accent/50 text-accent-foreground"
                  : "border-border bg-card text-muted-foreground",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}