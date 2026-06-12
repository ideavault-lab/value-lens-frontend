"use client";

import { ValuationHeader } from "./ValuationHeader";
import { MetricCards } from "./MetricCards";
import { ScoreCards } from "./ScoreCards";
import { PriceCard } from "./PriceCard";
import { FactorAnalysis, type Factor } from "./FactorAnalysis";
import { SegmentCompetitorChart, type CompetitorModel } from "./SegmentCompetitorChart";
import { AlternativeRecommendations, type Alternative } from "./AlternativeRecommendations";
import { ProjectedTrendChart } from "./ProjectedTrendChart";
import { SegmentInsights } from "./SegmentInsights";
import { ValuationSnapshot } from "./ValuationSnapshot";
import { Button } from "@/components/ui/Button";
import { RotateCcw } from "lucide-react";

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
  result?: ValuationResult;
  formData?: ValuationFormData;
  draftId: string;
}

// ─── DEMO DATA ────────────────────────────────────────────────────────────────

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
  scores: {
    value_retention: 91,
    ownership_score: 88,
    demand_index: 78,
  },
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
    {
      make: "Hyundai",
      model: "i20",
      price: 8.6,
      fuel: "Petrol",
      transmission: "Manual",
      resaleScore: 89,
    },
    {
      make: "Maruti",
      model: "Baleno",
      price: 8.1,
      fuel: "Petrol",
      transmission: "Auto",
      resaleScore: 87,
    },
    {
      make: "Tata",
      model: "Altroz",
      price: 7.85,
      fuel: "Petrol",
      transmission: "Manual",
      resaleScore: 82,
    },
    {
      make: "Honda",
      model: "Jazz",
      price: 8.2,
      fuel: "Petrol",
      transmission: "CVT",
      resaleScore: 85,
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ResultDashboard({
  result = demoResult,
  formData = demoFormData,
  draftId
}: ResultDashboardProps) {
  const onReset = () => {
    window.location.href = "/valuation";
  };

  const handleShare = () => {
    const text = `My ${formData.year} ${formData.brandName} ${formData.model} is valued at ₹${result.predicted_price}L!`;
    if (navigator.share) {
      navigator.share({ title: "Car Valuation", text });
    } else {
      navigator.clipboard?.writeText(text);
    }
  };

  const factors: Factor[] = [
    { label: "Condition", value: result.factors.condition_impact },
    { label: "Location", value: result.factors.location_impact },
    { label: "Ownership", value: result.factors.owner_impact },
    { label: "Fuel type", value: result.factors.fuel_impact },
    { label: "Gearbox", value: result.factors.transmission_impact },
    { label: "Mileage", value: result.factors.km_impact },
    { label: "Age", value: result.factors.age_impact },
  ];

  const metrics = [
    {
      label: "Estimated value",
      value: `₹${result.predicted_price}L`,
      sub: "Market best-fit",
      color: "orange" as const,
      animate: true,
      animTarget: result.predicted_price,
    },
    {
      label: "Price range",
      value: `₹${result.price_low}–${result.price_high}L`,
      sub: "Fair market band",
    },
    {
      label: "Confidence",
      value: `${result.confidence}%`,
      sub: "AI accuracy",
      color: "blue" as const,
    },
    {
      label: "Retention score",
      value: `${result.scores?.value_retention ?? 91}/100`,
      sub: "Value retention",
      color: "green" as const,
    },
    {
      label: "Market demand",
      value: "High",
      sub: formData.location ?? "Your region",
      color: "amber" as const,
    },
  ];

  const specs = [
    formData.fuel && formData.fuel.charAt(0).toUpperCase() + formData.fuel.slice(1),
    formData.transmission &&
      formData.transmission.charAt(0).toUpperCase() + formData.transmission.slice(1),
    formData.condition && `${formData.condition} condition`,
    formData.owner_type && `${formData.owner_type.replace("_", " ")} owner`,
    formData.location,
  ].filter(Boolean) as string[];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-5 pb-16">
      <ValuationHeader
        brand={formData.brandName}
        brandLogo={formData.brandLogo}
        model={formData.model}
        year={formData.year}
        fuel={formData.fuel}
        transmission={formData.transmission}
        ownerType={formData.owner_type}
        onShare={handleShare}
      />

      <MetricCards metrics={metrics} />

      <ScoreCards
        retentionScore={result.scores?.value_retention ?? 91}
        ownershipScore={result.scores?.ownership_score ?? 88}
        demandIndex={result.scores?.demand_index ?? 78}
      />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* Left */}
        <div className="space-y-4 min-w-0">
          <PriceCard
            price={result.predicted_price}
            priceLow={result.price_low}
            priceHigh={result.price_high}
            confidence={result.confidence}
            explanation={result.explanation}
            specs={specs}
          />
          <FactorAnalysis factors={factors} />
          <SegmentCompetitorChart
            models={result.competitors ?? demoResult.competitors!}
            segment={formData.segment ?? "Premium Hatchback"}
          />
          <AlternativeRecommendations
            alternatives={result.alternatives ?? demoResult.alternatives!}
            segment={formData.segment ?? "Premium Hatchback"}
          />
        </div>

        {/* Right */}
        <div className="space-y-4 min-w-0">
          <ProjectedTrendChart
            projections={result.projections ?? demoResult.projections!}
            carLabel={`${formData.brandName} ${formData.model}`}
          />
          <SegmentInsights
            segment={formData.segment ?? "Premium Hatchback"}
            location={formData.location}
            brand={formData.brandName}
          />
          <ValuationSnapshot location={formData.location} />
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