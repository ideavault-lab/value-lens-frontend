import { http } from "@/api/client/http";
import { API_ENDPOINTS } from "@/api/client/api-endpoints";
import { ValuationFormState } from "@/modules/valuation/context/valuation.context";
import { CreateValuationSessionApiResponse } from "../types/valuation.types";

export async function createValuationSession(
  payload: ValuationFormState
): Promise<CreateValuationSessionApiResponse> {

  return http.post<
    CreateValuationSessionApiResponse
  >(
    API_ENDPOINTS.VALUATION.CREATE_SESSION,
    payload
  );
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