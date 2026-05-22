

import { API_ENDPOINTS } from "@/api/client/api-endpoints";
import { http } from "@/api/client/http";
import { ApiSuccessResponse } from "@/types/api.types";
import { KMDrivenInsights, VehicleBrand, VehicleModel, VehicleVariant } from "../types/vehicle-valuation-steps.types";

// ========================================
// BRANDS
// ========================================
export async function getVehicleBrands(
  vehicleType: string,
  search?: string
) {
  return http.get<
    ApiSuccessResponse<
      VehicleBrand[]
    >
  >(
    API_ENDPOINTS.VEHICLES.BRANDS(
      vehicleType
    ),
    {
      params: {
        search,
      },
    }
  );
}

// ========================================
// MODELS
// ========================================
export async function getVehicleModels(
  vehicleType: string,
  brandId: string,
  search?: string
) {

  return http.get<
    ApiSuccessResponse<
      VehicleModel[]
    >
  >(
    API_ENDPOINTS.VEHICLES.MODELS(
      vehicleType,
      brandId
    ),
    {
      params: {
        search,
      },
    }
  );
}



export async function getVehicleVariants(
  vehicleType: string,
  brandId: string,
  modelId: string,
  year?: number | null,
  search?: string
) {

  const params: Record<
    string,
    string | number
  > = {};

  // only append if exists
  if (
    year !== undefined &&
    year !== null
  ) {

    params.year = year;
  }

  // only append if exists
  if (search?.trim()) {

    params.search =
      search.trim();
  }

  return http.get<
    ApiSuccessResponse<
      VehicleVariant[]
    >
  >(
    API_ENDPOINTS.VEHICLES.VARIANTS(
      vehicleType,
      brandId,
      modelId
    ),
    {
      params,
    }
  );
}


export async function getKMDrivenInsights(
  payload: {
    modelId: string;
    variantId: string;
    year: number;
  }
) {
  return http.get<
    ApiSuccessResponse<
      KMDrivenInsights
    >
  >(
    API_ENDPOINTS.VEHICLES.KM_DRIVEN_INSIGHTS,
    {
      params: payload
    }
  );
}