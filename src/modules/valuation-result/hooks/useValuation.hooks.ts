import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { createValuationDraft, getValuationMeta, getValuationResult } from "../services/valuation-service.api";
import { ValuationFormState } from "@/modules/valuation/context/valuation.context";
import { SaveDraftPayload, ValuationAPIResponse } from "../types/valuation.types";



export function buildDraftPayload(
  form: ValuationFormState,
  step: number,
  draftId?: string,
): SaveDraftPayload {

  return {

    // draftId,

    vehicleType:
      form.vehicleType?.slug ?? "",

    brandId:
      form.brand?.id,

    modelId:
      form.model?.id,

    variantId:
      form.variant?.id,

    year:
      form.year ?? undefined,

    kmDriven:
      form.kmDriven ?? undefined,

    ownership:
      form.ownership?.name ?? undefined,

    condition:
      form.condition?.name ?? undefined,

    conditionIssues:
      form.conditionIssues,

    conditionNotes:
      form.conditionNotes || undefined,

    city:
      form.city?.name ?? undefined,

    currentStep:
      step,

    realMileage:
      form.realMileage ?? undefined,
  };
}

export function useCreateValuationDraft() {

  return useMutation({
    mutationFn: createValuationDraft,
  });
}

export interface SegmentIntelligenceItem {
  key: string;
  label: string;
  insight: string;
}

export interface PriceFactor {
  key: string;
  label: string;
  value: number;
  note?: string | null;
}

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

export interface AIInsights {
  priceSentiment: string;
  reasoning: string;
  sellerTip: string;
  buyerTip: string;
  strengths: string[];
  weaknesses: string[];
}

export interface ValuationResultUI {
  price: number;
  priceLow: number;
  priceHigh: number;

  confidence: Confidence;

  reasoning: string;

  warnings: string[];

  priceFactors: PriceFactor[];

  aiInsights: AIInsights;

  segmentIntelligence: SegmentIntelligenceItem[];

  brand: string;
  model: string;
  variant: string;
  year: number;
}

function mapValuationResponse(res: ValuationAPIResponse): ValuationResultUI {
  const data = res?.data; // ← one level only, NOT res.data.data

  if (
    !data ||
    typeof data.estimatedPrice !== "number" ||
    !data.priceRange ||
    !data.confidence
  ) {
    throw new Error("Unexpected valuation response shape");
  }

  return {
    price: data.estimatedPrice,
    priceLow: data.priceRange.low,
    priceHigh: data.priceRange.high,

    confidence: {
      score: data.confidence.score,
      label: data.confidence.label,
      dataQuality: data.confidence.dataQuality,
      dataStats: data.confidence.dataStats,
    },

    reasoning: data.aiInsights?.reasoning ?? "",

    warnings: data.warnings ?? [],

    aiInsights: {
      priceSentiment: data.aiInsights?.priceSentiment ?? "fairly_priced",
      reasoning: data.aiInsights?.reasoning ?? "",
      sellerTip: data.aiInsights?.sellerTip ?? "",
      buyerTip: data.aiInsights?.buyerTip ?? "",
      strengths: data.aiInsights?.strengths ?? [],
      weaknesses: data.aiInsights?.weaknesses ?? [],
    },

    segmentIntelligence:
      data.segmentIntelligence?.map((item) => ({
        key: item.key,
        label: item.label,
        insight: item.insight,
      })) ?? [],

    brand: data.meta?.brand ?? "",
    model: data.meta?.model ?? "",
    variant: data.meta?.variant ?? "",
    year: data.meta?.year ?? 0,

    priceFactors:
      data.priceFactors?.map((f) => ({
        key: f.key,
        label: f.label,
        value: f.value,
        note: f.note,
      })) ?? [],
  };
}

export function useValuationResult(draftId: string) {
  return useQuery({
    queryKey: ["valuation", "result", draftId],

    queryFn: async (): Promise<ValuationResultUI> => {
      const response = await getValuationResult(draftId);
      return mapValuationResponse(response);
    },

    enabled: !!draftId,

    staleTime: 5 * 60 * 1000,
  });
}


//valuation summary hook
export interface ValuationMetaUI {

  brand: string;

  brandLogo?: string;

  model: string;

  variant: string;

  fuelType?: string;

  transmission?: string;

  year: number;

  ownerType: string;

  condition?: string;

  location?: string;
}

function mapMetaResponse(
  response: any
): ValuationMetaUI {

  const data = response.data;

  return {

    brand:
      data.brand.name,

    brandLogo:
      data.brand.logo,

    model:
      data.model.name,

    variant:
      data.variant.name,

    fuelType:
      data.variant.fuelType,

    transmission:
      data.variant.transmission,

    year:
      data.year,

    ownerType:
      data.ownerType,

    condition:
      data.condition,

    location:
      data.location,
  };

}

export function useValuationMeta(
  draftId: string
) {

  return useQuery({

    queryKey: [
      "valuation",
      "meta",
      draftId,
    ],

    queryFn: async () => {

      const response =
        await getValuationMeta(
          draftId
        );

      return mapMetaResponse(
        response
      );
    },

    enabled: !!draftId,

    staleTime:
      1000 * 60 * 30,
  });
}