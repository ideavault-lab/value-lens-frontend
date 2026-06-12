import { http } from "@/api/client/http";
import { API_ENDPOINTS } from "@/api/client/api-endpoints";
import { CreateValuationDraftApiResponse, SaveDraftPayload } from "../types/valuation.types";

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

// export async function getValuationResult(
//   sessionId: string
// ) {
//   return http.post(
//     API_ENDPOINTS.VALUATION.PREDICT(
//       sessionId
//     )
//   );
// }