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

export const LOCATIONS = [
  "Mumbai", "Delhi NCR", "Bangalore", "Chennai", "Hyderabad",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow",
  "Chandigarh", "Kochi", "Indore", "Coimbatore", "Nagpur",
  "Surat", "Vadodara", "Bhopal", "Visakhapatnam", "Goa"
];

export const CONDITIONS = [
    { id: "excellent", label: "Excellent", description: "Like new, no visible wear", icon: "✨", severity: 1 },
      { id: "good", label: "Good", description: "Minor wear, well maintained", icon: "👍", severity: 2 },
      { id: "fair", label: "Fair", description: "Some scratches & dents, average condition", icon: "🔧", severity: 3 },
      { id: "poor", label: "Poor", description: "Significant wear, needs repairs", icon: "⚠️", severity: 4 },
      // Add more if needed
      { id: "very_poor", label: "Very Poor", description: "Major damage, not roadworthy", icon: "🚨", severity: 5 },
];

export const OWNER_TYPES = [
  { id: "first", label: "1st Owner", description: "You're the original buyer" },
  { id: "second", label: "2nd Owner", description: "One previous owner" },
  { id: "third", label: "3rd Owner", description: "Two previous owners" },
  { id: "fourth_plus", label: "4th+ Owner", description: "Three or more previous owners" },
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