import { http } from "@/api/client/http";
import { API_ENDPOINTS } from "@/api/client/api-endpoints";
import { CreateValuationDraftApiResponse, SaveDraftPayload, ValuationAPIResponse } from "../types/valuation.types";

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