

import { API_ENDPOINTS } from "@/api/client/api-endpoints";
import { http } from "@/api/client/http";
import { ApiSuccessResponse } from "@/types/api.types";
import { VehicleBrand, VehicleModel } from "../types/vehicle-valuation-steps.types";

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