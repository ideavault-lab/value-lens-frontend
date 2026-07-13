"use client";

import { ValuationHeader } from "./ValuationHeader";
import { MetricCards } from "./MetricCards";
import { ScoreCards } from "./ScoreCards";
import { formatINR, PriceCard } from "./PriceCard";
import { FactorAnalysis, type Factor } from "./FactorAnalysis";
import { SegmentCompetitorChart, type CompetitorModel } from "./SegmentCompetitorChart";
import { AlternativeRecommendations, type Alternative } from "./AlternativeRecommendations";
import { ProjectedTrendChart } from "./ProjectedTrendChart";
import { SegmentInsights } from "./SegmentInsights";
import { ValuationSnapshot } from "./ValuationSnapshot";
import { Button } from "@/components/ui/Button";
import { RotateCcw } from "lucide-react";
import { useValuationMeta, useValuationResult } from "../hooks/useValuation.hooks";
import FeatureCard from "@/components/common/FeatureCard";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ValuationResult {
  predicted_price: number;
  price_low: number;
  price_high: number;
  confidence: number;
  explanation: string;
  factors: {
    age_impact: number;
    km_impact: number;
    condition_impact: number;
    owner_impact: number;
    location_impact: number;
    fuel_impact: number;
    transmission_impact: number;
  };
  scores?: {
    value_retention: number;
    ownership_score: number;
    demand_index: number;
  };
  projections?: { year: string; value: number }[];
  competitors?: CompetitorModel[];
  alternatives?: Alternative[];
}

export interface ValuationFormData {
  brand: string;
  brandName: string;
  brandLogo?: string;
  model: string;
  year: number;
  fuel?: string;
  transmission?: string;
  condition?: string;
  owner_type?: string;
  location?: string;
  segment?: string;
}

interface ResultDashboardProps {
  draftId: string;
}

// ─── Demo data — drives everything except the live price card ─────────────────

const demoFormData: ValuationFormData = {
  brand: "toyota",
  brandName: "Toyota",
  brandLogo: "https://cdn.simpleicons.org/toyota",
  model: "Glanza",
  year: 2023,
  fuel: "petrol",
  transmission: "manual",
  condition: "excellent",
  owner_type: "first",
  location: "Thrissur, Kerala",
  segment: "Premium Hatchback",
};

const demoResult: ValuationResult = {
  predicted_price: 8.45,
  price_low: 7.8,
  price_high: 9.1,
  confidence: 87,
  explanation:
    "Excellent condition Glanza with low mileage in a high-demand location. Strong resale value due to Toyota reliability and segment-leading fuel efficiency.",
  factors: {
    age_impact: -12,
    km_impact: -8,
    condition_impact: 14,
    owner_impact: 6,
    location_impact: 9,
    fuel_impact: 5,
    transmission_impact: 3,
  },
  scores: { value_retention: 91, ownership_score: 88, demand_index: 78 },
  projections: [
    { year: "2023", value: 8.45 },
    { year: "2024", value: 7.9 },
    { year: "2025", value: 7.4 },
    { year: "2026", value: 6.9 },
    { year: "2027", value: 6.4 },
  ],
  competitors: [
    { name: "Glanza", price: 8.45, isYours: true },
    { name: "i20", price: 8.6 },
    { name: "Baleno", price: 8.1 },
    { name: "Jazz", price: 8.2 },
    { name: "Altroz", price: 7.85 },
  ],
  alternatives: [
    { make: "Hyundai", model: "i20", price: 8.6, fuel: "Petrol", transmission: "Manual", resaleScore: 89 },
    { make: "Maruti", model: "Baleno", price: 8.1, fuel: "Petrol", transmission: "Auto", resaleScore: 87 },
    { make: "Tata", model: "Altroz", price: 7.85, fuel: "Petrol", transmission: "Manual", resaleScore: 82 },
    { make: "Honda", model: "Jazz", price: 8.2, fuel: "Petrol", transmission: "CVT", resaleScore: 85 },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ResultDashboard({ draftId }: ResultDashboardProps) {
  // These two are intentionally separate concerns:
  // `live` = real API data (price, confidence, reasoning from backend)
  // `demo` = placeholder data for sections the API doesn't cover yet
  const {
    data: meta,
    isLoading: metaLoading,
  } = useValuationMeta(
    draftId
  );
  const {
    data: estimate,
    isLoading,
    isError,
  } = useValuationResult(draftId);



  const demo = demoResult;
  const formData = demoFormData;

  const onReset = () => { window.location.href = "/valuation"; };

  const handleShare = () => {
    const text = estimate
      ? `My ${estimate.year} ${estimate.brand} ${estimate.model} is valued at ${formatINR(estimate.price)}!`
      : `My ${formData.year} ${formData.brandName} ${formData.model} valuation is ready!`;
    if (navigator.share) navigator.share({ title: "Car Valuation", text });
    else navigator.clipboard?.writeText(text);
  };

  // ── Metric cards: use live price data when available, demo otherwise ─────
  const metrics = [
    {
      label: "Estimated value",
      value: metaLoading || isLoading ? "—" : isError ? "N/A" : formatINR(estimate!.price),
      sub: "Market best-fit",
      color: "orange" as const,
    },
    {
      label: "Price range",
      value: metaLoading || isLoading
        ? "—"
        : isError
          ? "N/A"
          : `${formatINR(estimate!.priceLow)} – ${formatINR(estimate!.priceHigh)}`,
      sub: "Fair market band",
    },
    {
      label: "Confidence",
      value: metaLoading || isLoading ? "—" : isError ? "N/A" : `${estimate!.confidence}%`,
      sub: metaLoading || isLoading || isError ? "AI accuracy" : estimate!.confidenceLabel,
      color: "blue" as const,
    },
    // These two have no live equivalent yet — intentionally demo
    {
      label: "Retention score",
      value: `${demo.scores?.value_retention ?? 91}/100`,
      sub: "Value retention",
      color: "green" as const,
    },
    {
      label: "Market demand",
      value: "High",
      sub: meta?.location ?? "N/A",
      color: "amber" as const,
    },
  ];

  const factors: Factor[] =
    estimate?.priceFactors?.map((factor) => ({
      label: factor.label,
      value: factor.value,
    })) ?? [];

  //for pricecard
  const specs = [
    meta?.fuelType && meta.fuelType.charAt(0).toUpperCase() + meta.fuelType.slice(1),
    meta?.transmission && meta.transmission.charAt(0).toUpperCase() + meta.transmission.slice(1),
    meta?.condition && `${meta.condition} condition`,
    meta?.ownerType && `${meta.ownerType.replace("_", " ")}`,
    meta?.location,
  ].filter(Boolean) as string[];

  // ── PriceCard explanation copy ───────────────────────────────────────────
  const explanation = isError
    ? "We couldn't retrieve a valuation for this vehicle. Please try again."
    : estimate
      ? estimate.reasoning || `${estimate.confidenceLabel} confidence estimate for your ${estimate.brand} ${estimate.model}.`
      : "Analyzing market conditions for your vehicle…";

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-5 pb-16">
      <ValuationHeader

        brand={meta?.brand ?? ""}
        brandLogo={meta?.brandLogo}
        model={meta?.model ?? ""}
        variant={meta?.variant ?? ""}
        year={meta?.year ?? 0}
        ownerType={meta?.ownerType}
        onShare={handleShare}
      />

      <MetricCards metrics={metrics} />
{/* 
      <ScoreCards
        retentionScore={demo.scores?.value_retention ?? 91}
        ownershipScore={demo.scores?.ownership_score ?? 88}
        demandIndex={demo.scores?.demand_index ?? 78}
      /> */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* Left column */}
        <div className="space-y-4 min-w-0">

          {/* ← LIVE API DATA ONLY */}
          <PriceCard
            price={estimate?.price}
            priceLow={estimate?.priceLow}
            priceHigh={estimate?.priceHigh}
            confidence={estimate?.confidence}
            confidenceLabel={estimate?.confidenceLabel}
            explanation={explanation}
            specs={specs}
            loading={isLoading}
            metaLoading={metaLoading}
            error={isError}
          />

          {/* ← DEMO DATA (no backend equivalent yet) */}
          <FactorAnalysis factors={factors} loading={metaLoading || isLoading} />
          {/* <SegmentCompetitorChart
            models={demo.competitors!}
            segment={formData.segment ?? "Premium Hatchback"}
          /> */}
          <AlternativeRecommendations
            alternatives={demo.alternatives!}
            segment={formData.segment ?? "Premium Hatchback"}
          />
        </div>

        {/* Right column — all demo */}
        <div className="space-y-4 min-w-0">
          <FeatureCard
            enabled={false}
            title="AI Price Forecast"
            description="Forecasts are being trained using verified resale transactions, depreciation patterns and live market demand."
          >
            <ProjectedTrendChart
              projections={demo.projections!}
              carLabel={`${formData.brandName} ${formData.model}`}
            />
          </FeatureCard>
          <SegmentInsights
            segment={formData.segment ?? "Premium Hatchback"}
            location={formData.location}
            brand={formData.brandName}
          />
          {/* <ValuationSnapshot location={formData.location} /> */}
        </div>
      </div>

      <div className="mt-8 flex justify-start">
        <Button variant="outline" onClick={onReset} className="gap-2 h-11 px-6">
          <RotateCcw className="w-4 h-4" />
          New valuation
        </Button>
      </div>
    </div>
  );
}