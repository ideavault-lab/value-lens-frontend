export interface VehicleType {
  id: string;
  label: string;
  shortLabel: string;
  description: string;

  icon: string;

  enabled: boolean;
  popular: boolean;

  order: number;

  cta: string;

  stats?: {
    supportedBrands?: number;
    activeListings?: string;
  };

  seo?: {
    title?: string;
    slug?: string;
  };
}