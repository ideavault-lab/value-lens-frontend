import { env } from "@/lib/env";
import { ApiError } from "./api-error";

interface RequestOptions
  extends RequestInit {
  params?: Record<
    string,
    string | number | boolean | undefined
  >;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    params,
    headers,
    ...fetchOptions
  } = options;

  const url = new URL(
    `${env.API_URL}${endpoint}`
  );

  // Query Params
  if (params) {
    Object.entries(params).forEach(
      ([key, value]) => {
        url.searchParams.append(
          key,
          String(value)
        );
      }
    );
  }

   console.log("API URL:", env.API_URL);
  console.log("Endpoint:", endpoint);
  console.log("Final URL:", url.toString());


  const response = await fetch(
    url.toString(),
    {
      ...fetchOptions,

      credentials: "include",

      headers: {
        "Content-Type":
          "application/json",

        ...headers,
      },

      cache: "no-store",
    }
  );

    console.log("Response:", response);

  const data = await response.json();

  // HANDLE API ERRORS
  if (!response.ok || data.status === false) {
    throw new ApiError(
      data.message ||
        "Something went wrong",

      data.statusCode ||
        response.status,

      data.details
    );
  }

  return data;
}

export const http = {
  get: <T>(
    endpoint: string,
    options?: RequestOptions
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "GET",
    }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(
    endpoint: string,
    options?: RequestOptions
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "DELETE",
    }),
};