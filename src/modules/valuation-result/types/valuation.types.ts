export interface SaveDraftPayload {
  draftId?: string;

  vehicleType: string;

  brandId?: string;
  modelId?: string;
  variantId?: string;

  year?: number;

  kmDriven?: number;

  ownership?: string;

  condition?: string;

  conditionIssues?: string[];

  conditionNotes?: string;

  city?: string;

  currentStep: number;

  realMileage?: number;
}

export interface CreateValuationDraftResponse {
  draftId: string;

  currentStep: number;

  updatedAt: string;
}

export interface CreateValuationDraftApiResponse {
  status: boolean;
  message: string;
  data: CreateValuationDraftResponse;
}


export interface ValuationAPIResponse {
  status: boolean;
  statusCode: number;
  message?: string;

  data: {
    estimatedPrice: number;

    priceRange: {
      low: number;
      high: number;
    };

    confidence: {
      score: number;
      label: string;

      dataQuality: {
        sampleSize: number;
        tierUsed: string | null;
        topSimilarityScore: number;
      };
    };
  };

  timestamp?: string;
}


export interface ValuationMetaResponse {

  brand: {
    id: string;
    name: string;
    logo?: string;
  };

  model: {
    id: string;
    name: string;
  };

  variant: {
    id: string;
    name: string;
    fuelType?: string;
    transmission?: string;
  };

  year: number;

  ownerType: string;

  condition: string;

  location: string;
}