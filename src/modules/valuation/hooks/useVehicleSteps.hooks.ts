import { useQuery }
from "@tanstack/react-query";

import { getVehicleBrands, getVehicleModels }
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