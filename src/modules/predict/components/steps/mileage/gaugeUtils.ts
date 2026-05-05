import {
  GAUGE_END_ANGLE,
  GAUGE_START_ANGLE,
  MAX_KM,
  ZONES,
  Zone,
  EMPTY_ZONE,
} from "./types";

// ─── Polar geometry ────────────────────────────────────────────────────────────

export interface Point {
  x: number;
  y: number;
}

export function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): Point {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const s = polarToCartesian(cx, cy, r, startAngle);
  const e = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}

// ─── Zone helpers ──────────────────────────────────────────────────────────────

/** Returns the Zone object that applies for a given km value. */
export function getZone(km: number | null | undefined): Zone | typeof EMPTY_ZONE {
  if (!km) return EMPTY_ZONE;
  return ZONES.find((z) => km < z.maxKm) ?? ZONES[ZONES.length - 1];
}

/** Returns only the fill color for a km value (used for LED segment coloring). */
export function segmentColor(km: number): string {
  return (ZONES.find((z) => km < z.maxKm) ?? ZONES[ZONES.length - 1]).color;
}

// ─── Gauge angle mapping ───────────────────────────────────────────────────────

/** Maps a km value (0 – MAX_KM) to an angle on the gauge arc. */
export function kmToAngle(km: number): number {
  return (
    GAUGE_START_ANGLE +
    (Math.min(km, MAX_KM) / MAX_KM) * (GAUGE_END_ANGLE - GAUGE_START_ANGLE)
  );
}

// ─── Insight derivation ────────────────────────────────────────────────────────

export interface Insight {
  icon: string;
  text: string;
}

export function deriveInsight(km: number | null): Insight | null {
  if (!km) return null;
  if (km < 20_000) return { icon: "💎", text: "Very low mileage — adds strong resale value." };
  if (km < 50_000) return { icon: "👍", text: "Balanced usage — ideal range." };
  if (km < 100_000) return { icon: "📊", text: "Moderate usage — slightly impacts price." };
  return { icon: "📉", text: "High mileage — reduces resale value." };
}

// ─── Formatting ────────────────────────────────────────────────────────────────

export function formatKm(km: number | null | undefined): string {
  return km ? km.toLocaleString("en-IN") : "";
}