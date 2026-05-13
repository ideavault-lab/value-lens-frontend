import { useQuery } from "@tanstack/react-query";
import { getVehicleTypes } from "../services/vehicle.api";


export function useVehicleTypes() {
  return useQuery({
    queryKey: ["vehicle","types"],

    queryFn: async () => {
      const response =
        await getVehicleTypes();

      return response.data;
    },
  });
}