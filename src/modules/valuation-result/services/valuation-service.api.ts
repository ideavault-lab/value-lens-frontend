import { http } from "@/api/client/http";
import { API_ENDPOINTS } from "@/api/client/api-endpoints";
import { CreateValuationDraftApiResponse, SaveDraftPayload, ValuationAPIResponse, ValuationMetaResponse, AlternativeResponse } from "../types/valuation.types";

export async function createValuationDraft(
  payload: SaveDraftPayload
): Promise<CreateValuationDraftApiResponse> {

  const response = await http.post<
    CreateValuationDraftApiResponse
  >(
    API_ENDPOINTS.VALUATION.CREATE_DRAFT,
    payload
  );

  return response;
}

export async function getValuationResult(
  draftId: string
) {
  return http.get<
  ValuationAPIResponse
  >(
    API_ENDPOINTS.VALUATION.ESTIMATE(
      draftId
    )
  );
}

export async function getValuationMeta(
  draftId: string
) {

  return http.get<ValuationMetaResponse>(
    API_ENDPOINTS.VALUATION.META(
      draftId
    )
  );
}

export async function getSuggestAlternatives(
  params: {
    modelId: string;
    predictedPrice: number;
    vehicleAgeYears: number;
  }
) {
  return http.get<AlternativeResponse>(
    API_ENDPOINTS.VEHICLES.ALTERNATIVES,
    { params }
  );
}
