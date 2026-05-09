export const API_ENDPOINTS = {
  VEHICLES: {
    
    TYPES: "/vehicles/types",

    BRANDS: (type: string) =>
      `/vehicles/${type}/brands`,

    MODELS: (
      type: string,
      brandId: string
    ) =>
      `/vehicles/${type}/brands/${brandId}/models`,
  },
};