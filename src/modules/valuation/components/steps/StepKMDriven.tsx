"use client";

import { useState, useCallback, useEffect } from "react";
import { useValuation } from "../../context/valuation.context";

import QuickPicks from "./km-driven/QuickPicks";

import ReadoutBox from "./km-driven/ReadoutBox";
import StepHeader from "./StepHeader";
import { useKMDrivenInsights } from "../../hooks/useVehicleSteps.hooks";
import KMDrivenSlider from "./km-driven/KMDrivenSlider";
import { getCurrentZone } from "./km-driven/km-driven.utils";

// ─── Main Component ─────────────────────────────────────────────────────
export default function StepKMDriven() {
  const { data, updateForm } = useValuation();

  const [selectedKm, setSelectedKm] = useState<number | null>(
    data.form.kmDriven || null
  );

  // Fetch insights from backend
  const {
    data: insights,
    isLoading,
  } = useKMDrivenInsights({
    modelId: data.form.model?.id,
    variantId: data.form.variant?.id,
    year: data.form.year,
    ownerShip: data.form.ownership?.id,
  });

  // Sync with context when mileage changes
  useEffect(() => {
    if (selectedKm !== data.form.kmDriven) {
      setSelectedKm(data.form.kmDriven);
    }
  }, [data.form.kmDriven]);

  // Update context when user changes mileage
  const handleKMDrivenChange = useCallback((km: number | null) => {
    setSelectedKm(km);
    updateForm("kmDriven", km);
  }, [updateForm]);

  const currentZone = getCurrentZone(selectedKm, insights?.zones || []);

  return (
    <div className="space-y-6 px-1 pb-4">
      {/* Header */}
      <StepHeader
        title="How many kilometers has your car driven?"
        description="Mileage significantly impacts your vehicle’s valuation"
      />


      {/* Readout Box - Shows exact value + Backend Insight */}
      <ReadoutBox
        value={selectedKm}
        zone={currentZone}
        expectedKm={
          insights?.expectedKm
        }
        isLoading={isLoading}
        onChange={
          handleKMDrivenChange
        }
      />

      {/* Slider */}
      <KMDrivenSlider
        value={selectedKm}
        onChange={handleKMDrivenChange}
        zones={insights?.zones}
      />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-zinc-100" />
        <span className="text-xs text-zinc-400">or</span>
        <div className="flex-1 h-px bg-zinc-100" />
      </div>

      {/* Quick Picks from Backend */}
      <QuickPicks
        quickPicks={insights?.quickPicks || []}
        value={selectedKm}
        onSelect={handleKMDrivenChange}
      />

    </div>
  );
}
