import { useQuery }
from "@tanstack/react-query";

import { getMileageInsights, getVehicleBrands, getVehicleModels }
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
  });
}



export function useMileageInsights(
  payload: {
    modelId?: string;
    fuelTypeId?: string;
    transmissionId?: string;
    year?: number | null;
  }
) {
  return useQuery({
    queryKey: [
      "vehicle",
      "mileage-insights",
      payload.modelId,
      payload.fuelTypeId,
      payload.transmissionId,
      payload.year,
    ],

    queryFn: async () => {
      const response =
        await getMileageInsights({
          modelId: payload.modelId!,
          fuelTypeId: payload.fuelTypeId!,
          transmissionId:
            payload.transmissionId!,
          year: payload.year!,
        });

      return response.data;
    },

    enabled:
      !!payload.modelId &&
      !!payload.fuelTypeId &&
      !!payload.transmissionId &&
      !!payload.year,

    staleTime: Infinity,

    retry: false,
  });
}