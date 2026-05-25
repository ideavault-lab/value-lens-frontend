import { KMDrivenZone } from "@/modules/valuation/types/vehicle-valuation-steps.types";
import React from "react";


const MAX_MILEAGE = 1000000; // 1000k

const KMDrivenSlider = ({
  value,
  onChange,
  zones = [],
}: {
  value: number | null;
  onChange: (v: number) => void;
  zones?: KMDrivenZone[];
}) => {
  const safeValue = value ?? 0;

  // Correct percentage calculation
  const pct = Math.min((safeValue / MAX_MILEAGE) * 100, 100);

  const currentZone = zones.find(
    (z) => safeValue >= z.min && safeValue <= z.max
  );

  return (
    <div className="space-y-4">
      {/* Slider Track */}
      <div className="relative h-3 bg-zinc-200 rounded-full overflow-hidden">
        {/* Filled Progress */}
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-200"
          style={{
            width: `${pct}%`,
            backgroundColor: currentZone ? "#10b981" : "#64748b",
          }}
        />

        {/* Native Range Input */}
        <input
          type="range"
          min={0}
          max={MAX_MILEAGE}
          step={1000}
          value={safeValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>0</span>
        <span>250k</span>
        <span>500k</span>
        <span>750k</span>
        <span>1000k</span>
      </div>

      {/* Current Selected Value */}
      <div className="text-center text-sm font-semibold">
        {(safeValue / 1000).toFixed(0)}k km
      </div>
    </div>
  );
};

export default KMDrivenSlider;