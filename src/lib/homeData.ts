import {
    Car, Bike, Truck, Bus,
    ArrowRight, ChevronDown, CheckCircle,
    TrendingUp, Zap, Shield, Database,
    Users, Star, Menu, X, Clock,
} from "lucide-react";
// ─── DATA ─────────────────────────────────────────────────────────────────────


export const VEHICLE_TYPES = [
    {
        id: "car",
        label: "Cars & SUVs",
        Icon: Car,
        description: "Sedans, hatchbacks, SUVs, crossovers",
        examples: ["Toyota Camry", "Honda CR-V", "Hyundai Creta"],
        badge: "Most Popular",
    },
    {
        id: "bike",
        label: "Motorcycles",
        Icon: Bike,
        description: "Sports bikes, cruisers, scooters",
        examples: ["Royal Enfield Bullet", "KTM Duke 390", "Honda Activa"],
        badge: "2-Wheelers",
    },
    {
        id: "truck",
        label: "Trucks & Pickups",
        Icon: Truck,
        description: "Light & heavy commercial vehicles",
        examples: ["Tata Ace", "Mahindra Bolero", "Ashok Leyland"],
        badge: "Commercial",
    },
    {
        id: "bus",
        label: "Buses & Vans",
        Icon: Bus,
        description: "Minibuses, tempo travellers, vans",
        examples: ["Force Traveller", "Tata Winger", "Maruti Omni"],
        badge: "Fleet",
    },
];

export const STEPS = [
    { num: "01", title: "Select Vehicle Type", desc: "Pick from cars, bikes, trucks, buses — any category" },
    { num: "02", title: "Enter Details", desc: "Brand, model, year, mileage, condition — under 60 seconds" },
    { num: "03", title: "AI Analyses Market", desc: "We scan thousands of live listings and recent sales data" },
    { num: "04", title: "Get Your Report", desc: "Full price range with every influencing factor explained" },
];

export const FEATURES = [
    { Icon: Zap, title: "Instant Results", desc: "Valuation in under 15 seconds. No waiting, no agents." },
    { Icon: Shield, title: "Unbiased Pricing", desc: "No dealer commissions. Pure market-driven numbers." },
    { Icon: Database, title: "Live Market Data", desc: "Cross-referenced against 100,000+ active listings daily." },
    { Icon: TrendingUp, title: "Depreciation Forecast", desc: "Know your vehicle's worth in 6, 12, and 24 months." },
    { Icon: CheckCircle, title: "All Vehicle Types", desc: "Cars, bikes, trucks, buses — all categories supported." },
    { Icon: Users, title: "Trusted by 50,000+", desc: "Buyers, sellers, dealers, and fleet managers rely on us." },
];

export const TESTIMONIALS = [
    { name: "Arjun Menon", role: "Sold his Honda City", text: "Got ₹2.3L more than what the dealer quoted. VehicleVal gave me the confidence to negotiate." },
    { name: "Priya Nair", role: "Fleet Manager, Kochi", text: "We use this for our entire truck fleet. The bulk valuation feature saves us days of work." },
    { name: "Rohan Das", role: "Bike Enthusiast", text: "Sold my Royal Enfield at exactly the valuation price. Buyers trust the report too!" },
    { name: "Meera Pillai", role: "Car Buyer, Thrissur", text: "Found the dealer was overquoting by 18%. VehicleVal data helped me negotiate the right price." },
];

export const MARKET_ROWS = [
    { label: "SUV / Crossover", pct: 82, note: "↑ High demand", up: true },
    { label: "Sedan", pct: 64, note: "↓ Softening", up: false },
    { label: "Hatchback", pct: 73, note: "↑ Steady", up: true },
    { label: "Motorcycle 150cc+", pct: 88, note: "↑ Strong", up: true },
    { label: "Commercial Vehicle", pct: 69, note: "↓ Mixed", up: false },
    { label: "Electric Vehicle", pct: 91, note: "↑ Trending", up: true },
];

export const NAV_LINKS = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Vehicle Types", href: "#vehicle-types" },
    { label: "Market Insights", href: "#market" },
    { label: "Features", href: "#features" },
];