"use client";

import { motion } from "framer-motion";

interface GaugeDialProps {
  /** 0–100 */
  value: number;
  size?: number;
  label?: string;
  /** delay before the needle/arc animate in, useful when stacking a few of these */
  delay?: number;
  revertTheme?: boolean;
}

/**
 * The recurring "signature" visual for the page — a dashboard-style gauge.
 * Reused as: confidence meter (WhyAI), estimate reveal (IntelligenceEngine),
 * vehicle-picker needle base (VehicleUniverse), settled value (FinalCTA).
 *
 * Colors come entirely from the existing token set via `currentColor` +
 * Tailwind text-color utilities — no new palette introduced.
 */
export default function GaugeDial({ value, size = 72, label, delay = 0 , revertTheme= false }: GaugeDialProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const angle = -90 + (clamped / 100) * 180;
  const r = size / 2 - 6;
  const cx = size / 2;
  const cy = size / 2;
  const arcLength = Math.PI * r;
  const needleLen = r - 10;

  const needleColor = revertTheme ? "bg-background" : "bg-foreground";
const centerColor = revertTheme ? "bg-background" : "bg-foreground";
const labelColor = revertTheme
  ? "text-background/80"
  : "text-muted-foreground";

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size / 2 + 12 }}>
      <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`} className="absolute inset-0">
        <path
          d={`M 6 ${cy} A ${r} ${r} 0 0 1 ${size - 6} ${cy}`}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          stroke="currentColor"
          className="text-border"
        />
        <motion.path
          d={`M 6 ${cy} A ${r} ${r} 0 0 1 ${size - 6} ${cy}`}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          stroke="currentColor"
          className="text-primary"
          strokeDasharray={arcLength}
          initial={{ strokeDashoffset: arcLength }}
          whileInView={{ strokeDashoffset: arcLength - (clamped / 100) * arcLength }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut", delay }}
        />
      </svg>

      <motion.div
        className={`absolute left-1/2 bottom-[10px] -ml-px w-[2px] ${needleColor} rounded-full origin-bottom`}
        style={{ height: needleLen }}
        initial={{ rotate: -90 }}
        whileInView={{ rotate: angle }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut", delay }}
      />
      <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ${centerColor}`} />

      {label && (
        <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wide ${labelColor} whitespace-nowrap`}>
          {label}
        </span>
      )}
    </div>
  );
}