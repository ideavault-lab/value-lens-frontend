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


export type VehicleModel = {
  id: string;

  slug: string;

  name: string;
};