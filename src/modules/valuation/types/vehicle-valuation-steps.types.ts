
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

  segment?: string;

  image?: string;
};

//Mileage
export interface KMDrivenZone {
  min: number;
  max: number;

  label: string;

  emoji: string;

  description: string;
}


export type VehicleVariant = { 
  id: string; 
  slug: string; 
  year: number; 
  name: string; 
  engineCc: number; 
  mileage: number; 
  powerBhp: number; 
  torqueNm?: number; 
  drivetrain?: string; 
  exShowroomPriceLakh?: number; 
  fuelType: VehicleFuelType; 
  transmission: VehicleTransmission; 
};

export interface KMDrivenQuickPick {
  label: string;

  value: number;
}

export interface KMDrivenInsights {

  expectedKm: number;

  yearlyAverage: number;

  recommendedRange: {
    min: number;
    max: number;
  };

  quickPicks:
    KMDrivenQuickPick[];

  zones:
    KMDrivenZone[];
}