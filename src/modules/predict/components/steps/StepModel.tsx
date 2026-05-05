"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { CAR_BRANDS } from "./StepBrand";


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

type StepModelProps = {
    value: string;
    onChange: (value: string) => void;
    brand: string; // required because this step depends on it
};
const StepModel = () => {
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");
    const brand = "toyota"; // hardcoded for now, will come from props later

    // 🔒 Safe access
    const models: string[] = CAR_MODELS[brand as keyof typeof CAR_MODELS] || [];

    const brandName =
        CAR_BRANDS.find((b) => b.id === brand)?.name || brand;

    const filtered = models.filter((m) =>
        m.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 p-2">
            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
                    Which {brandName} model?
                </h2>
                <p className="text-muted-foreground mt-2 text-sm md:text-base">
                    Choose the specific model of your car
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search models..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-card border-border h-12 rounded-xl text-sm"
                />
            </div>

            {/* Models list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto pr-1">
                {filtered.map((model, i) => (
                    <motion.button
                        key={model}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        onClick={() => setValue(model)}
                        className={`
              relative flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200
              hover:border-primary/40 hover:bg-accent/30
              ${value === model
                                ? "border-primary bg-accent/50 shadow-sm"
                                : "border-border bg-card"
                            }
            `}
                    >
                        <span className="font-medium text-sm text-foreground">
                            {model}
                        </span>

                        {value === model && (
                            <motion.div
                                layoutId="model-check"
                                className="w-5 h-5 bg-primary rounded-full flex items-center justify-center"
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

            {/* ⚠️ Edge case */}
            {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">
                    No models found
                </p>
            )}
        </div>
    );
}

export default StepModel