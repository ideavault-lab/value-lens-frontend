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
import { AuthUser } from "../types/auth.types";
import { SignInSchema } from "@/schemas/auth/sign-in.schema";


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



export async function signIn(
  payload: SignInSchema
) {
  return http.post<ApiSuccessResponse<AuthUser>>(
    API_ENDPOINTS.AUTH.SIGN_IN,
    payload
  );
}

export async function getCurrentUser() {
  return http.get<ApiSuccessResponse<AuthUser>>(
    API_ENDPOINTS.AUTH.CURRENT_USER
  );
}