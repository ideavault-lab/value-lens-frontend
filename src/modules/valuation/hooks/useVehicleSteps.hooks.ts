import { keepPreviousData, useQuery }
from "@tanstack/react-query";

import { getKMDrivenInsights, getVehicleBrands, getVehicleModels, getVehicleVariants }
from "../services/vehicle-steps.api";

export function useVehicleBrands(
  vehicleType: string,
  search: string
) {

  return useQuery({

    queryKey: [
      "vehicle",
      "brands",
      vehicleType,
      search,
    ],

    queryFn: async () => {

      const response =
        await getVehicleBrands(
          vehicleType,
          search
        );

      return response.data;
    },

    enabled: !!vehicleType,

    staleTime: 5 * 60 * 1000,
  });
}



export function useVehicleModels(
  vehicleType: string,
  brandId: string,
  search: string
) {

  return useQuery({

    queryKey: [
      "vehicle",
      "models",
      vehicleType,
      brandId,
      search,
    ],

    queryFn: async () => {

      const response =
        await getVehicleModels(
          vehicleType,
          brandId,
          search
        );

      return response.data;
    },

    enabled:
      !!vehicleType &&
      !!brandId,

    staleTime: 5 * 60 * 1000,
  });
}

export function useVehicleVariants(
  vehicleType: string,
  brandId: string,
  modelId: string,
  year?: number,
  search?: string
) {

  return useQuery({

    queryKey: [
      "vehicle-variants",
      vehicleType,
      brandId,
      modelId,
      year,
      search,
    ],

    queryFn: async () => {

      const response =
        await getVehicleVariants(
          vehicleType,
          brandId,
          modelId,
          year,
          search
        );

      return response.data;
    },

    enabled:
      !!vehicleType &&
      !!brandId &&
      !!modelId,

    staleTime:
      1000 * 60 * 10,
  });
}



export function useKMDrivenInsights(
  payload: {
    modelId?: string;
    variantId?: string;
    year?: number | null;
    ownerShip?: string;
  }
) {
  return useQuery({
    queryKey: [
      "vehicle",
      "km-driven-insights",
      payload.modelId,
      payload.variantId,
      payload.year,
      payload.ownerShip, //for future implementation if insights are also based on ownership
    ],

    queryFn: async () => {
      const response =
        await getKMDrivenInsights({
          modelId: payload.modelId!,
          variantId: payload.variantId!,
          year: payload.year!,
        });

      return response.data;
    },
    placeholderData: keepPreviousData,

    enabled:
      !!payload.modelId &&
      !!payload.variantId &&
      !!payload.year &&
      !!payload.ownerShip,  

    staleTime: 5 * 60 * 1000,

  });
}