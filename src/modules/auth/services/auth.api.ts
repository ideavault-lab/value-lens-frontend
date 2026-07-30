// auth.service.ts

import { http } from "@/api/client/http";
import { API_ENDPOINTS } from "@/api/client/api-endpoints";


import {
  ApiSuccessResponse,
} from "@/types/api.types";

// import {
//   AuthResponse,
// } from "../types/auth-response.types";

import { SignUpSchema } from "@/schemas/auth/sign-up.schema";
export async function signUp(
  payload: SignUpSchema
) {
  return http.post<
    ApiSuccessResponse<any>
  >(
    API_ENDPOINTS.AUTH.SIGN_UP,
    payload
  );
}