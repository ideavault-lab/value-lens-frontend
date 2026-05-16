export type VehicleBrand = {
  id: string;
  slug: string;
  name: string;
  country: string;

  logo: {
    light: string;
    dark: string;
  };
};


export type VehicleFuelType = {
  id: string;

  slug: string;

  name: string;

  icon: string;

  description: string;
};

export type VehicleTransmission = {
  id: string;

  slug: string;

  name: string;

  icon: string;

  description: string;
};

export type VehicleModel = {
  id: string;

  slug: string;

  name: string;

  launchYear: number;

  fuelTypes: VehicleFuelType[];

  transmissions: VehicleTransmission[];
};


//Mileage
export interface MileageZone {
  min: number;
  max: number;

  label: string;

  emoji: string;

  description: string;
}

export interface MileageQuickPick {
  label: string;

  value: number;
}

export interface MileageInsights {

  expectedKm: number;

  yearlyAverage: number;

  recommendedRange: {
    min: number;
    max: number;
  };

  quickPicks:
    MileageQuickPick[];

  zones:
    MileageZone[];
}