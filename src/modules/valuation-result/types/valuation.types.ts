import { Alternative } from "../components/AlternativeRecommendations";

export interface SaveDraftPayload {
  draftId?: string;

  vehicleType: string;

  brandId?: string;
  modelId?: string;
  variantId?: string;

  year?: number;

  kmDriven?: number;

  ownership?: string;

  condition?: string;

  conditionIssues?: string[];

  conditionNotes?: string;

  city?: string;

  currentStep: number;

  realMileage?: number;
}

export interface CreateValuationDraftResponse {
  draftId: string;

  currentStep: number;

  updatedAt: string;
}

export interface CreateValuationDraftApiResponse {
  status: boolean;
  message: string;
  data: CreateValuationDraftResponse;
}
// ============================================================================
// Valuation API Response
// ============================================================================

export interface ValuationAPIResponse {
  status: boolean;
  statusCode: number;
  message: string;
  timestamp: string;

  data: ValuationData;
}



// api/types/alternative.ts
export interface AlternativeApiItem {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  fuel: string;
  transmission: string;
  segment: string;
  price: number;
  resaleDemand: number;
}



export interface AlternativeResponse {
  status: boolean;
  statusCode: number;
  message: string;
  timestamp: string;

  data: AlternativeApiItem[];
}

// ============================================================================
// Main Data
// ============================================================================

export interface ValuationData {
  estimatedPrice: number;

  priceRange: PriceRange;

  confidence: Confidence;

  marketSummary: MarketSummary | null;

  comparables: ComparableVehicle[];

  priceFactors: PriceFactor[];

  aiInsights: AIInsights;

  segmentIntelligence: SegmentIntelligence[];

  warnings: string[];

  meta: VehicleMeta;
}

// ============================================================================
// Price
// ============================================================================

export interface PriceRange {
  low: number;
  high: number;
}

// ============================================================================
// Confidence
// ============================================================================

export interface Confidence {
  score: number;
  label: string;
  dataQuality: string;

  dataStats: {
    sampleSize: number;
    tierUsed: string | null;
    topSimilarityScore: number;
  };
}

// ============================================================================
// Market Summary
// ============================================================================

export interface MarketSummary {
  averagePrice: number;
  medianPrice: number;
  weightedAveragePrice: number;
  listingCount: number;
};

// ============================================================================
// Comparable Vehicles
// ============================================================================

export interface ComparableVehicle {
  id?: string;

  brand: string;
  model: string;
  variant?: string;

  year: number;

  kmDriven: number;

  price: number;

  similarityScore: number;

  location?: string;

  source?: string;
}

// ============================================================================
// Price Factors
// ============================================================================

export interface PriceFactor {
  key: string;

  label: string;

  value: number;

  note: string | null;
}

// ============================================================================
// AI Insights
// ============================================================================

export interface AIInsights {
  priceSentiment:
    | "undervalued"
    | "fairly_priced"
    | "overvalued";

  reasoning: string;

  sellerTip: string;

  buyerTip: string;

  strengths: string[];

  weaknesses: string[];
}

// ============================================================================
// Segment Intelligence
// ============================================================================

export interface SegmentIntelligence {
  key: string;

  label: string;

  insight: string;
}

// ============================================================================
// Vehicle Meta
// ============================================================================

export interface VehicleMeta {
  vehicleType: string;

  brand: string;

  model: string;

  variant: string;

  year: number;

  estimatedAt: string;
}


export interface ValuationMetaResponse {

  brand: {
    id: string;
    name: string;
    logo?: string;
  };

  model: {
    id: string;
    name: string;
  };

  variant: {
    id: string;
    name: string;
    fuelType?: string;
    transmission?: string;
  };

  year: number;

  ownerType: string;

  condition: string;

  location: string;
}