"use client";

import { ValuationHeader } from "./ValuationHeader";
import { MetricCards } from "./MetricCards";
import { PriceCard } from "./PriceCard";
import { PriceTrendChart } from "./PriceTrendChart";
import { FactorAnalysis, type Factor } from "./FactorAnalysis";
import { CompetitorChart, type CompetitorModel } from "./CompetitorChart";
import { MarketSnapshot } from "./MarketSnapshot";
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
}

interface ResultDashboardProps {
  result?: ValuationResult;
  formData?: ValuationFormData;
  onReset?: () => void;
}

// ─── DEMO DATA ───────────────────────────────────────────────────────────────

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
};

const demoResult: ValuationResult = {
  predicted_price: 8.45,
  price_low: 7.8,
  price_high: 9.1,
  confidence: 87,
  explanation: "Excellent condition Glanza with low mileage in a high-demand location. Strong resale value due to Toyota reliability and fuel efficiency.",
  factors: {
    age_impact: -12,
    km_impact: -8,
    condition_impact: 14,
    owner_impact: 6,
    location_impact: 9,
    fuel_impact: 5,
    transmission_impact: 3,
  },
};

// ─── Demo / placeholder data ─────────────────────────────────────────────────

const TREND_DATA = [
  { year: "2020", avgMarket: 9.2, depFloor: 7.8, yourCar: null },
  { year: "2021", avgMarket: 8.9, depFloor: 7.5, yourCar: null },
  { year: "2022", avgMarket: 8.6, depFloor: 7.2, yourCar: null },
  { year: "2023", avgMarket: 8.3, depFloor: 6.9, yourCar: 8.45 },
  { year: "2024*", avgMarket: 8.0, depFloor: 6.6, yourCar: null },
];

const COMPETITOR_MODELS: CompetitorModel[] = [
  { name: "Glanza", price: 8.45, isYours: true },
  { name: "Swift", price: 7.9 },
  { name: "Baleno", price: 8.1 },
  { name: "i20", price: 8.6 },
  { name: "Punch", price: 7.5 },
];

const MARKET_ROWS = [
  { label: "Avg. days to sell", value: "18 days", badge: { text: "Fast", variant: "good" as const } },
  { label: "Active listings", value: "Moderate", badge: { text: "42 listings", variant: "warn" as const } },
  { label: "Buyer demand index", value: "78 / 100", badge: { text: "Strong", variant: "good" as const } },
  { label: "Best sell season", value: "Oct – Dec", badge: { text: "4 mo away", variant: "info" as const } },
  { label: "Annual depreciation", value: "~4.8% / yr" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ResultDashboard({
  result = demoResult,
  formData = demoFormData,
  // onReset,
}: ResultDashboardProps) {
  const onReset = () => {
    window.location.href = "/valuation";
  }
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
      color: "green" as const,
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
      label: "Resale trend",
      value: "+4.2%",
      sub: "vs last quarter",
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
    formData.transmission && formData.transmission.charAt(0).toUpperCase() + formData.transmission.slice(1),
    formData.condition && `${formData.condition} condition`,
    formData.owner_type && `${formData.owner_type.replace("_", " ")} owner`,
    formData.location,
  ].filter(Boolean) as string[];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
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

      {/* Main grid: left = charts+factors, right = price card + market */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        {/* Left column */}
        <div className="space-y-4">
          <PriceTrendChart data={TREND_DATA} />
          <FactorAnalysis factors={factors} />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <PriceCard
            price={result.predicted_price}
            priceLow={result.price_low}
            priceHigh={result.price_high}
            confidence={result.confidence}
            explanation={result.explanation}
            specs={specs}
          />
          <CompetitorChart models={COMPETITOR_MODELS} />
          <MarketSnapshot rows={MARKET_ROWS} />
        </div>
      </div>

      {/* Reset */}
      <div className="mt-8 flex justify-start">
        <Button
          variant="outline"
          onClick={onReset ?? (() => (window.location.href = "/valuation"))}
          className="gap-2 h-11 px-6"
        >
          <RotateCcw className="w-4 h-4" />
          New valuation
        </Button>
      </div>
    </div>
  );
}