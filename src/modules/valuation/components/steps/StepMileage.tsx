"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useValuation } from "../../context/valuation.context";
import { useMileageInsights } from "../../hooks/useVehicleSteps.hooks";
import { getCurrentZone } from "./mileage/mileage.utils";
import QuickPicks from "./mileage/QuickPicks";
import MileageSlider from "./mileage/MileageSlider";
import ReadoutBox from "./mileage/ReadoutBox";

// ─── Types from API Response ─────────────────────────────────────────────
export interface MileageZone {
  min: number;
  max: number;
  label: string;
  emoji: string;
  description: string;
}

// ─── Main Component ─────────────────────────────────────────────────────
export default function StepMileage() {
  const { data, updateForm } = useValuation();

  const [selectedKm, setSelectedKm] = useState<number | null>(
    data.form.mileage || null
  );

  // Fetch insights from backend
  const {
    data: insights,
    isLoading,
    refetch,
  } = useMileageInsights({
    modelId: data.form.model?.id,
    fuelTypeId: data.form.fuelType?.id,
    transmissionId: data.form.transmission?.id,
    year: data.form.year,
  });

  // Sync with context when mileage changes
  useEffect(() => {
    if (selectedKm !== data.form.mileage) {
      setSelectedKm(data.form.mileage);
    }
  }, [data.form.mileage]);

  // Update context when user changes mileage
  const handleMileageChange = useCallback((km: number | null) => {
    setSelectedKm(km);
    updateForm("mileage", km );
  }, [updateForm]);

  // Refetch insights when car details change
  useEffect(() => {
    if (data.form.model?.id && data.form.year) {
      refetch();
    }
  }, [data.form.model?.id, data.form.fuelType?.id, data.form.transmission?.id, data.form.year, refetch]);

  const currentZone = getCurrentZone(selectedKm, insights?.zones || []);

  return (
    <div className="space-y-6 px-1 pb-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          How far has it gone?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Mileage significantly impacts your vehicle’s valuation
        </p>
      </div>

      {/* Readout Box - Shows exact value + Backend Insight */}
      <ReadoutBox
         value={selectedKm}
        zone={currentZone}
        expectedKm={
          insights?.expectedKm
        }
        isLoading={isLoading}
        onChange={
          handleMileageChange
        }
      />

      {/* Slider */}
      <MileageSlider
        value={selectedKm}
        onChange={handleMileageChange}
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
        onSelect={handleMileageChange}
      />

    </div>
  );
}
