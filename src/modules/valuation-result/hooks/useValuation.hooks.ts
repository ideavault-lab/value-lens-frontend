import { useMutation } from "@tanstack/react-query";
import { createValuationDraft} from "../services/valuation-service.api";
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