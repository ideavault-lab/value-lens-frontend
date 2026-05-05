"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

// type StepBrandProps = {
//   value: string;
//   onChange: (value: string) => void;
// };

export type CarBrand = {
    id: string;
    name: string;
    logo: string;
    country: string;
};

export const CAR_BRANDS: CarBrand[] = [
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

const StepBrand = () => {
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");

    const filtered = CAR_BRANDS.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 p-2">
            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
                    What brand is your car?
                </h2>
                <p className="text-muted-foreground mt-2 text-sm md:text-base">
                    Select the manufacturer of your vehicle
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search brands..."
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                    }
                    className="pl-10 bg-card border-border h-12 rounded-xl text-sm"
                />
            </div>

            {/* Brand Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto pr-1">
                {filtered.map((brand: CarBrand, i: number) => (
                    <motion.button
                        key={brand.id}
                        type="button"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                        onClick={() => setValue(brand.id)}
                        className={`
              relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
              hover:border-primary/40 hover:bg-accent/30
              ${value === brand.id
                                ? "border-primary bg-accent/50 shadow-sm"
                                : "border-border bg-card"
                            }
            `}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center overflow-hidden">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="w-6 h-6 object-contain"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            </div>

                            <div className="flex flex-col items-start">
                                <span className="font-medium text-sm text-foreground">
                                    {brand.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {brand.country}
                                </span>
                            </div>
                        </div>

                        {value === brand.id && (
                            <motion.div
                                layoutId="brand-check"
                                className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                            >
                                <svg
                                    className="w-3 h-3 text-primary-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

export default StepBrand;