// ─── Domain constants ──────────────────────────────────────────────────────────

export const MAX_KM = 200_000;

export const QUICK_OPTIONS: QuickOption[] = [
  { label: "< 10,000 km", value: 8_000 },
  { label: "10k – 30k km", value: 20_000 },
  { label: "30k – 60k km", value: 45_000 },
  { label: "60k – 100k km", value: 80_000 },
  { label: "100k+ km", value: 120_000 },
];

// ─── Gauge arc geometry ────────────────────────────────────────────────────────

export const GAUGE_START_ANGLE = 135;
export const GAUGE_END_ANGLE = 405;

// ─── Zone definitions ──────────────────────────────────────────────────────────

export interface Zone {
  /** Upper bound (exclusive) in km */
  maxKm: number;
  /** Active arc / needle color */
  color: string;
  /** Translucent fill used for glows */
  dim: string;
}

export const ZONES: Zone[] = [
  { maxKm: 20_000,  color: "hsl(142, 72%, 36%)", dim: "hsla(142,72%,36%,0.15)" },
  { maxKm: 50_000,  color: "hsl(21,  90%, 48%)", dim: "hsla(21,90%,48%,0.15)"  },
  { maxKm: 100_000, color: "hsl(38,  92%, 50%)", dim: "hsla(38,92%,50%,0.15)"  },
  { maxKm: MAX_KM,  color: "hsl(0,   72%, 51%)", dim: "hsla(0,72%,51%,0.15)"   },
];

/** Fallback style when no value is set */
export const EMPTY_ZONE: Pick<Zone, "color" | "dim"> = {
  color: "hsl(20, 6%, 60%)",
  dim:   "hsla(20,6%,60%,0.12)",
};

// ─── Shared prop shapes ────────────────────────────────────────────────────────

export interface QuickOption {
  label: string;
  value: number;
}

export interface Insight {
  icon: string;
  text: string;
}