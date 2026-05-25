import { KMDrivenZone } from "@/modules/valuation/types/vehicle-valuation-steps.types";


// ─── Helper Functions ───────────────────────────────────────────────────
export function formatKm(km: number | null): string {
  if (!km) return "";
  return km.toLocaleString("en-IN");
}

export function getCurrentZone(km: number | null, zones: KMDrivenZone[]): KMDrivenZone {
  if (!km || km <= 0) {
    return {
      min: 0,
      max: 0,
      label: "Not Set",
      emoji: "🚗",
      description: "Select mileage to see detailed insights",
    };
  }

  // Find matching zone
  const zone = zones.find((z) => km >= z.min && km <= z.max);
  
  // If somehow above the last zone, return the last one
  if (!zone && zones.length > 0) {
    return zones[zones.length - 1];
  }

  return zone || {
    min: 0,
    max: 400000,
    label: "Extreme",
    emoji: "🛠️",
    description: "Extremely high mileage • Major impact on valuation",
  };
}
