export const CAR_BRANDS = [
  { id: "toyota", name: "Toyota", logo: "https://cdn.simpleicons.org/toyota", country: "Japan" },
  { id: "honda", name: "Honda", logo: "https://cdn.simpleicons.org/honda", country: "Japan" },
  { id: "hyundai", name: "Hyundai", logo: "https://cdn.simpleicons.org/hyundai", country: "South Korea" },
  { id: "maruti", name: "Maruti Suzuki", logo: "https://cdn.simpleicons.org/suzuki", country: "India" },
  { id: "tata", name: "Tata Motors", logo: "https://cdn.simpleicons.org/tata", country: "India" },
  { id: "mahindra", name: "Mahindra", logo: "https://cdn.simpleicons.org/mahindra", country: "India" },
  { id: "kia", name: "Kia", logo: "https://cdn.simpleicons.org/kia", country: "South Korea" },
  { id: "bmw", name: "BMW", logo: "https://cdn.simpleicons.org/bmw", country: "Germany" },
  { id: "mercedes", name: "Mercedes-Benz", logo: "/icons/mercedes-benz.svg", country: "Germany" },
  { id: "audi", name: "Audi", logo: "https://cdn.simpleicons.org/audi", country: "Germany" },
  { id: "volkswagen", name: "Volkswagen", logo: "https://cdn.simpleicons.org/volkswagen", country: "Germany" },
  { id: "ford", name: "Ford", logo: "https://cdn.simpleicons.org/ford", country: "USA" },
  { id: "chevrolet", name: "Chevrolet", logo: "https://cdn.simpleicons.org/chevrolet", country: "USA" },
  { id: "nissan", name: "Nissan", logo: "https://cdn.simpleicons.org/nissan", country: "Japan" },
  { id: "skoda", name: "Škoda", logo: "https://cdn.simpleicons.org/skoda", country: "Czech Republic" },
  { id: "renault", name: "Renault", logo: "https://cdn.simpleicons.org/renault", country: "France" },
  { id: "mg", name: "MG Motor", logo: "https://cdn.simpleicons.org/mg", country: "UK" },
  { id: "jeep", name: "Jeep", logo: "https://cdn.simpleicons.org/jeep", country: "USA" }
];

export const CAR_MODELS = {
  toyota: ["Innova Crysta", "Fortuner", "Camry", "Glanza", "Urban Cruiser", "Corolla Altis", "Etios", "Yaris"],
  honda: ["City", "Amaze", "WR-V", "Jazz", "Civic", "CR-V", "BR-V"],
  hyundai: ["Creta", "Venue", "i20", "i10 Grand", "Verna", "Tucson", "Alcazar", "Exter"],
  maruti: ["Swift", "Baleno", "Brezza", "Dzire", "Alto", "Ertiga", "Wagon R", "Ciaz", "S-Cross", "XL6"],
  tata: ["Nexon", "Harrier", "Safari", "Punch", "Altroz", "Tiago", "Tigor"],
  mahindra: ["Thar", "XUV700", "XUV300", "Scorpio N", "Bolero", "XUV400", "Marazzo"],
  kia: ["Seltos", "Sonet", "Carens", "Carnival", "EV6"],
  bmw: ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "2 Series Gran Coupe"],
  mercedes: ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS"],
  audi: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron"],
  volkswagen: ["Polo", "Vento", "Taigun", "Virtus", "Tiguan"],
  ford: ["EcoSport", "Endeavour", "Figo", "Aspire", "Freestyle"],
  chevrolet: ["Beat", "Cruze", "Spark", "Tavera", "Enjoy"],
  nissan: ["Magnite", "Kicks", "Terrano", "Sunny"],
  skoda: ["Octavia", "Superb", "Kushaq", "Slavia", "Kodiaq"],
  renault: ["Kwid", "Triber", "Kiger", "Duster"],
  mg: ["Hector", "Astor", "Gloster", "ZS EV", "Comet EV"],
  jeep: ["Compass", "Meridian", "Wrangler", "Grand Cherokee"],
  
};

export type LocationOption = {
  id: string;
  slug: string;

  name: string;
  state: string;

  tier: "Metro" | "Tier 1" | "Tier 2";

  marketPriority: number;

  demandLevel: "High" | "Medium" | "Low";

  marketLabel: string;

  featured?: boolean;
};

export const LOCATIONS: LocationOption[] = [

  /* ---------------------------------------------------------------------- */
  /*                                METRO                                   */
  /* ---------------------------------------------------------------------- */

  {
    id: "mum",
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    tier: "Metro",
    marketPriority: 1,
    demandLevel: "High",
    marketLabel: "Excellent resale market",
    featured: true,
  },

  {
    id: "del",
    slug: "delhi-ncr",
    name: "Delhi NCR",
    state: "Delhi",
    tier: "Metro",
    marketPriority: 2,
    demandLevel: "High",
    marketLabel: "High used-car demand",
    featured: true,
  },

  {
    id: "blr",
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    tier: "Metro",
    marketPriority: 3,
    demandLevel: "High",
    marketLabel: "Fast-moving resale market",
    featured: true,
  },

  {
    id: "hyd",
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    tier: "Metro",
    marketPriority: 4,
    demandLevel: "High",
    marketLabel: "Strong resale value",
    featured: true,
  },

  {
    id: "chn",
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    tier: "Metro",
    marketPriority: 5,
    demandLevel: "Medium",
    marketLabel: "Stable resale demand",
    featured: true,
  },

  {
    id: "kol",
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    tier: "Metro",
    marketPriority: 6,
    demandLevel: "Medium",
    marketLabel: "Growing resale market",
    featured: true,
  },

  {
    id: "pun",
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    tier: "Metro",
    marketPriority: 7,
    demandLevel: "High",
    marketLabel: "Strong buyer demand",
    featured: true,
  },

  {
    id: "ahm",
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    tier: "Metro",
    marketPriority: 8,
    demandLevel: "Medium",
    marketLabel: "Good resale activity",
    featured: false,
  },

  /* ---------------------------------------------------------------------- */
  /*                               TIER 1                                   */
  /* ---------------------------------------------------------------------- */

  {
    id: "koc",
    slug: "kochi",
    name: "Kochi",
    state: "Kerala",
    tier: "Tier 1",
    marketPriority: 9,
    demandLevel: "Medium",
    marketLabel: "Reliable resale market",
    featured: true,
  },

  {
    id: "cbe",
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    tier: "Tier 1",
    marketPriority: 10,
    demandLevel: "Medium",
    marketLabel: "Consistent resale demand",
    featured: false,
  },

  {
    id: "tvm",
    slug: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    state: "Kerala",
    tier: "Tier 1",
    marketPriority: 11,
    demandLevel: "Medium",
    marketLabel: "Steady resale value",
    featured: false,
  },

  {
    id: "cal",
    slug: "calicut",
    name: "Calicut",
    state: "Kerala",
    tier: "Tier 1",
    marketPriority: 12,
    demandLevel: "Medium",
    marketLabel: "Good local demand",
    featured: false,
  },

  {
    id: "mys",
    slug: "mysore",
    name: "Mysore",
    state: "Karnataka",
    tier: "Tier 1",
    marketPriority: 13,
    demandLevel: "Medium",
    marketLabel: "Growing resale market",
    featured: false,
  },

  {
    id: "viz",
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    tier: "Tier 1",
    marketPriority: 14,
    demandLevel: "Medium",
    marketLabel: "Strong local demand",
    featured: false,
  },

  {
    id: "ind",
    slug: "indore",
    name: "Indore",
    state: "Madhya Pradesh",
    tier: "Tier 1",
    marketPriority: 15,
    demandLevel: "Medium",
    marketLabel: "Healthy resale activity",
    featured: false,
  },

  {
    id: "bhp",
    slug: "bhopal",
    name: "Bhopal",
    state: "Madhya Pradesh",
    tier: "Tier 1",
    marketPriority: 16,
    demandLevel: "Low",
    marketLabel: "Moderate resale demand",
    featured: false,
  },

  {
    id: "sur",
    slug: "surat",
    name: "Surat",
    state: "Gujarat",
    tier: "Tier 1",
    marketPriority: 17,
    demandLevel: "Medium",
    marketLabel: "Strong family car market",
    featured: false,
  },

  {
    id: "nag",
    slug: "nagpur",
    name: "Nagpur",
    state: "Maharashtra",
    tier: "Tier 1",
    marketPriority: 18,
    demandLevel: "Medium",
    marketLabel: "Balanced resale market",
    featured: false,
  },

  /* ---------------------------------------------------------------------- */
  /*                               TIER 2                                   */
  /* ---------------------------------------------------------------------- */

  {
    id: "jai",
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    tier: "Tier 2",
    marketPriority: 19,
    demandLevel: "Medium",
    marketLabel: "Emerging resale market",
    featured: false,
  },

  {
    id: "lko",
    slug: "lucknow",
    name: "Lucknow",
    state: "Uttar Pradesh",
    tier: "Tier 2",
    marketPriority: 20,
    demandLevel: "Medium",
    marketLabel: "Growing used-car demand",
    featured: false,
  },

  {
    id: "pat",
    slug: "patna",
    name: "Patna",
    state: "Bihar",
    tier: "Tier 2",
    marketPriority: 21,
    demandLevel: "Low",
    marketLabel: "Moderate resale activity",
    featured: false,
  },

  {
    id: "rnc",
    slug: "ranchi",
    name: "Ranchi",
    state: "Jharkhand",
    tier: "Tier 2",
    marketPriority: 22,
    demandLevel: "Low",
    marketLabel: "Smaller resale market",
    featured: false,
  },

  {
    id: "guw",
    slug: "guwahati",
    name: "Guwahati",
    state: "Assam",
    tier: "Tier 2",
    marketPriority: 23,
    demandLevel: "Medium",
    marketLabel: "Regional demand hub",
    featured: false,
  },

  {
    id: "vij",
    slug: "vijayawada",
    name: "Vijayawada",
    state: "Andhra Pradesh",
    tier: "Tier 2",
    marketPriority: 24,
    demandLevel: "Medium",
    marketLabel: "Stable resale demand",
    featured: false,
  },

  {
    id: "mad",
    slug: "madurai",
    name: "Madurai",
    state: "Tamil Nadu",
    tier: "Tier 2",
    marketPriority: 25,
    demandLevel: "Low",
    marketLabel: "Moderate local demand",
    featured: false,
  },

  {
    id: "tri",
    slug: "thrissur",
    name: "Thrissur",
    state: "Kerala",
    tier: "Tier 2",
    marketPriority: 26,
    demandLevel: "Medium",
    marketLabel: "Strong local resale market",
    featured: false,
  },

  {
    id: "kan",
    slug: "kannur",
    name: "Kannur",
    state: "Kerala",
    tier: "Tier 2",
    marketPriority: 27,
    demandLevel: "Low",
    marketLabel: "Moderate resale demand",
    featured: false,
  },

  {
    id: "mal",
    slug: "malappuram",
    name: "Malappuram",
    state: "Kerala",
    tier: "Tier 2",
    marketPriority: 28,
    demandLevel: "Medium",
    marketLabel: "Strong SUV demand",
    featured: false,
  },
];

export const CONDITIONS = [
    { id: "excellent", label: "Excellent", description: "Like new, no visible wear", icon: "✨", severity: 1 },
      { id: "good", label: "Good", description: "Minor wear, well maintained", icon: "👍", severity: 2 },
      { id: "fair", label: "Fair", description: "Some scratches & dents, average condition", icon: "🔧", severity: 3 },
      { id: "poor", label: "Poor", description: "Significant wear, needs repairs", icon: "⚠️", severity: 4 },
      // Add more if needed
      { id: "very_poor", label: "Very Poor", description: "Major damage, not roadworthy", icon: "🚨", severity: 5 },
];
export type OwnershipOption = {

  id: string;

  slug: string;

  label: string;

  shortLabel: string;

  description: string;

  badge?: string;

  valueImpact: "high" | "medium" | "low";

  marketDemand:
    | "Excellent"
    | "Good"
    | "Average"
    | "Low";

  resaleStrength:
    number;

  buyerTrust:
    number;

  recommendedMileage: string;

  marketInsight: string;
};

export const OWNER_TYPES: OwnershipOption[] = [
  {
    id: "first",
    slug: "first-owner",
    label: "First Owner",
    shortLabel: "1",
    description:
      "Cleanest records, best maintenance, and highest resale demand.",
    badge: "Highest Resale",
    valueImpact: "high",
    marketDemand: "Excellent",
    resaleStrength: 95,
    buyerTrust: 94,
    recommendedMileage: "Ideal below 60,000 km",
    marketInsight:
      "Most preferred category in premium and mid-range used-car markets.",
  },
  {
    id: "second",
    slug: "second-owner",
    label: "Second Owner",
    shortLabel: "2",
    description:
      "Highly acceptable when mileage and condition are well maintained.",
    badge: "Market Preferred",
    valueImpact: "medium",
    marketDemand: "Good",
    resaleStrength: 82,
    buyerTrust: 80,
    recommendedMileage: "Best below 90,000 km",
    marketInsight:
      "Strong resale performance when supported by service history.",
  },
  {
    id: "third",
    slug: "third-owner",
    label: "Third Owner",
    shortLabel: "3",
    description:
      "Slightly lower buyer confidence and financing appeal.",
    badge: "Value Sensitive",
    valueImpact: "medium",
    marketDemand: "Average",
    resaleStrength: 63,
    buyerTrust: 58,
    recommendedMileage: "Typically above 90,000 km",
    marketInsight:
      "Pricing becomes highly dependent on condition and maintenance quality.",
  },
  {
    id: "fourth_plus",
    slug: "fourth-owner-or-more",
    label: "Fourth Owner or More",
    shortLabel: "4+",
    description:
      "Lower demand due to perceived wear and uncertain history.",
    badge: "Lower Demand",
    valueImpact: "low",
    marketDemand: "Low",
    resaleStrength: 38,
    buyerTrust: 35,
    recommendedMileage: "Usually high mileage vehicles",
    marketInsight:
      "Commonly evaluated as budget-market vehicles where condition matters more.",
  },
];

  export const FUEL_TYPES = [
    { id: "petrol", label: "Petrol", icon: "⛽" },
    { id: "diesel", label: "Diesel", icon: "🛢️" },
    { id: "electric", label: "Electric", icon: "⚡" },
    { id: "hybrid", label: "Hybrid", icon: "🔋" },
    { id: "cng", label: "CNG", icon: "💨" },
  ];

  export const TRANSMISSIONS = [
    { id: "manual", label: "Manual", icon: "🕹️" },
    { id: "automatic", label: "Automatic", icon: "🅰️" },
  ];

// Base prices in INR (lakhs) for rule-based prediction
export const BASE_PRICES = {
  toyota: { base: 12, premium: 1.3 },
  honda: { base: 10, premium: 1.2 },
  hyundai: { base: 9, premium: 1.15 },
  maruti: { base: 7, premium: 1.1 },
  tata: { base: 8, premium: 1.05 },
  mahindra: { base: 10, premium: 1.1 },
  kia: { base: 11, premium: 1.2 },
  bmw: { base: 35, premium: 1.5 },
  mercedes: { base: 40, premium: 1.6 },
  audi: { base: 32, premium: 1.45 },
  volkswagen: { base: 10, premium: 1.1 },
  ford: { base: 8, premium: 0.95 },
  chevrolet: { base: 6, premium: 0.85 },
  nissan: { base: 7, premium: 0.9 },
  skoda: { base: 12, premium: 1.15 },
  renault: { base: 6, premium: 0.9 },
  mg: { base: 12, premium: 1.1 },
  jeep: { base: 18, premium: 1.25 },
};