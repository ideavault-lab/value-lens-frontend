export const API_ENDPOINTS = {
  VEHICLES: {

    TYPES: "/vehicles/types",

    BRANDS:
      (vehicleType: string) =>
        `/vehicles/${vehicleType}/brands`,

    MODELS: (
      vehicleType: string,
      brandId: string
    ) =>
      `/vehicles/${vehicleType}/brands/${brandId}/models`,

    MILEAGE_INSIGHTS: `/vehicles/mileage-insights`,
  },
};