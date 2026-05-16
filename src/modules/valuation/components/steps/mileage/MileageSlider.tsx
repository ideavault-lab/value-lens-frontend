import React from 'react'
import { MileageZone } from '../StepMileage';

const MileageSlider = ({
  value,
  onChange,
  zones = [],
}: {
  value: number | null;
  onChange: (v: number) => void;
  zones?: MileageZone[];
}) => {
 const pct = value ? Math.min((value / 300000) * 100, 100) : 0;
  const currentZone = zones.find((z) => value && value >= z.min && value <= z.max);

  return (
    <div className="space-y-4">
      <div className="relative h-3 bg-zinc-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-200"
          style={{
            width: `${pct}%`,
            backgroundColor: currentZone ? "#10b981" : "#64748b",
          }}
        />
        <input
          type="range"
          min={0}
          max={300000}
          step={1000}
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>0</span>
        <span>75k</span>
        <span>150k</span>
        <span>225k</span>
        <span>300k</span>
      </div>
    </div>
  );
}

export default MileageSlider;
