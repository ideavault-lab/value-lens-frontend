import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { createValuationDraft, getValuationResult} from "../services/valuation-service.api";
import { ValuationFormState } from "@/modules/valuation/context/valuation.context";
import { SaveDraftPayload } from "../types/valuation.types";



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

export interface ValuationResultUI {
  price: number;       // raw rupees, e.g. 544000
  priceLow: number;
  priceHigh: number;
  confidence: number;
  confidenceLabel: string;
  reasoning: string;
  warnings: string[];
  brand: string;
  model: string;
  year: number;
  variant?: string;
}

function mapValuationResponse(res: any): ValuationResultUI {
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
    price:          data.estimatedPrice,
    priceLow:       data.priceRange.low,
    priceHigh:      data.priceRange.high,
    confidence:     data.confidence.score,
    confidenceLabel: data.confidence.label,
    reasoning:      data.aiInsights?.reasoning ?? "",
    warnings:       data.warnings ?? [],
    brand:          data.meta?.brand ?? "",
    model:          data.meta?.model ?? "",
    year:           data.meta?.year ?? 0,
    variant:        data.meta?.variant,
  };
}

export function useValuationResult(draftId: string) {
  return useQuery({
    queryKey: ["valuation" , "result", draftId],

    queryFn: async (): Promise<ValuationResultUI> => {
      const response = await getValuationResult(draftId);
      return mapValuationResponse(response);
    },

    enabled: !!draftId,

    staleTime: 5 * 60 * 1000,
  });
}