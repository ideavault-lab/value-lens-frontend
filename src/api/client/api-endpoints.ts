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

    VARIANTS: ( vehicleType: string, brandId: string, modelId: string ) => `/vehicles/${vehicleType}/brands/${brandId}/models/${modelId}/variants`,

    KM_DRIVEN_INSIGHTS: `/vehicles/km-driven-insights`,

    ALTERNATIVES: `/vehicles/alternatives`,

  },

  VALUATION: {

    CREATE_DRAFT: "/vehicles/drafts",


    META: (draftId: string) =>
      `/valuation/drafts/${draftId}/meta`,

    ESTIMATE: (draftId: string) => `/valuation/drafts/${draftId}/estimate`,
  },

  AUTH: {
    SIGN_UP: "/auth/sign-up",
    SIGN_IN: "/auth/sign-in",
  }
};