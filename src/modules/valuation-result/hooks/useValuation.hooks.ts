import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { createValuationDraft, getValuationMeta, getValuationResult} from "../services/valuation-service.api";
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

export interface PriceFactor {
  key: string;
  label: string;
  value: number;
  note?: string | null;
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
  priceFactors: PriceFactor[];
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
    priceFactors:   data.priceFactors?.map((f: any) => ({
      key: f.key,
      label: f.label,
      value: f.value,
      note: f.note,
    })),
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