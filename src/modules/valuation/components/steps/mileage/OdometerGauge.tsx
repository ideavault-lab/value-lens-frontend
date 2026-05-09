import React from "react";
import {
  GAUGE_END_ANGLE,
  GAUGE_START_ANGLE,
  MAX_KM,
  ZONES,
} from "./types";
import {
  describeArc,
  getZone,
  kmToAngle,
  polarToCartesian,
} from "./gaugeUtils";

// ─── Constants local to the SVG coordinate space ───────────────────────────────

const CX = 160;
const CY = 155;
const TRACK_R = 118;

// Pre-compute coloured zone arc paths once (they never change)
const ZONE_ARCS = (() => {
  let prevKm = 0;
  return ZONES.map((z) => {
    const a1 = kmToAngle(prevKm);
    const a2 = kmToAngle(z.maxKm);
    const arc = describeArc(CX, CY, TRACK_R - 1, a1, a2 - 0.5);
    prevKm = z.maxKm;
    return { arc, color: z.color };
  });
})();

// ─── Component ─────────────────────────────────────────────────────────────────

interface OdometerGaugeProps {
  /** Current km value (0 means idle / no input yet). */
  value: number;
}

export function OdometerGauge({ value }: OdometerGaugeProps): React.ReactElement {
  const zone = getZone(value);
  const angle = kmToAngle(value);
  const needleTip = polarToCartesian(CX, CY, 96, angle);
  const needleBase1 = polarToCartesian(CX, CY, 9, angle + 90);
  const needleBase2 = polarToCartesian(CX, CY, 9, angle - 90);
  const hasValue = value > 0;

  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[320px] mx-auto select-none"
    >
      <defs>
        <filter id="arcGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="needleGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id="hubGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="hsl(27,60%,78%)" />
          <stop offset="100%" stopColor="hsl(20,14%,30%)" />
        </radialGradient>

        <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(27,60%,70%)" />
          <stop offset="45%" stopColor="hsl(30,30%,90%)" />
          <stop offset="100%" stopColor="hsl(21,50%,55%)" />
        </linearGradient>
      </defs>

      {/* Bezel */}
      <circle cx={CX} cy={CY} r={136} fill="none" stroke="url(#bezelGrad)" strokeWidth="3.5" />
      <circle cx={CX} cy={CY} r={133} fill="none" stroke="hsl(20,14%,82%)" strokeWidth="0.75" opacity="0.6" />

      {/* Panel */}
      <circle cx={CX} cy={CY} r={132} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />

      {/* Subtle ring texture */}
      {[60, 82, 103].map((r) => (
        <circle key={r} cx={CX} cy={CY} r={r} fill="none"
          stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.35" />
      ))}

      {/* Faint zone tint bands */}
      {ZONE_ARCS.map((z, i) => (
        <path key={i} d={z.arc} stroke={z.color} strokeWidth="7" strokeLinecap="butt" opacity="0.12" />
      ))}

      {/* Track groove */}
      <path
        d={describeArc(CX, CY, TRACK_R, GAUGE_START_ANGLE, GAUGE_END_ANGLE)}
        stroke="hsl(var(--border))"
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* Tick marks */}
      {Array.from({ length: 41 }).map((_, i) => {
        const frac = i / 40;
        const a = GAUGE_START_ANGLE + frac * (GAUGE_END_ANGLE - GAUGE_START_ANGLE);
        const isMajor = i % 8 === 0;
        const isMed = i % 4 === 0;
        const len = isMajor ? 14 : isMed ? 9 : 5;
        const p1 = polarToCartesian(CX, CY, TRACK_R - 9 - len, a);
        const p2 = polarToCartesian(CX, CY, TRACK_R - 9, a);
        const isActive = frac <= value / MAX_KM;
        return (
          <line
            key={i}
            x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={isActive ? zone.color : "hsl(var(--muted-foreground))"}
            strokeWidth={isMajor ? 2 : isMed ? 1.5 : 1}
            strokeLinecap="round"
            opacity={isActive ? 1 : isMajor ? 0.45 : 0.2}
          />
        );
      })}

      {/* KM labels */}
      {[0, 50_000, 100_000, 150_000, 200_000].map((km) => {
        const a = kmToAngle(km);
        const pos = polarToCartesian(CX, CY, TRACK_R - 28, a);
        const label = km === 0 ? "0" : `${km / 1000}k`;
        return (
          <text key={km} x={pos.x} y={pos.y + 3.5}
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize="8" fontFamily="monospace" opacity="0.65">
            {label}
          </text>
        );
      })}

      {/* Progress glow halo */}
      {hasValue && (
        <path
          d={describeArc(CX, CY, TRACK_R, GAUGE_START_ANGLE, Math.min(angle, GAUGE_END_ANGLE))}
          stroke={zone.dim}
          strokeWidth="22"
          strokeLinecap="round"
        />
      )}

      {/* Progress arc */}
      {hasValue && (
        <path
          d={describeArc(CX, CY, TRACK_R, GAUGE_START_ANGLE, Math.min(angle, GAUGE_END_ANGLE))}
          stroke={zone.color}
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#arcGlow)"
        />
      )}

      {/* Needle */}
      {hasValue && (
        <g filter="url(#needleGlow)">
          <polygon
            points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
            fill={zone.color}
            opacity="0.92"
          />
        </g>
      )}

      {/* Hub */}
      <circle cx={CX} cy={CY} r={16} fill="url(#hubGrad)" />
      <circle cx={CX} cy={CY} r={10} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <circle cx={CX} cy={CY} r={5} fill={hasValue ? zone.color : "hsl(var(--muted-foreground))"} />

      {/* Digital readout */}
      <text
        x={CX} y={CY + 38}
        textAnchor="middle"
        fill={hasValue ? zone.color : "hsl(var(--muted-foreground))"}
        fontSize="21" fontWeight="700" fontFamily="monospace" letterSpacing="-0.5"
      >
        {hasValue ? value.toLocaleString("en-IN") : "—"}
      </text>
      <text
        x={CX} y={CY + 51}
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))"
        fontSize="8" fontFamily="monospace" letterSpacing="3"
      >
        KM
      </text>
    </svg>
  );
}