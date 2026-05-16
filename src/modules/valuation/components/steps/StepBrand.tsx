"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { useValuation } from "../../context/valuation.context";
import { useVehicleBrands } from "../../hooks/useVehicleSteps.hooks";


const StepBrand = () => {
    const [search, setSearch] = useState("");

    const {
        data,
        updateForm,
    } = useValuation();


    //API hooks
    const { data: vehicleBrands, isLoading, isError, error } = useVehicleBrands(data.form.vehicleType?.slug!, search.trim());

    const handleSelectBrand = (brandId: string, brandName: string) => {
        updateForm("brand", data.form.vehicleType ? {
            id: brandId,
            name: brandName,
        } : null);  
    };

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
                {vehicleBrands?.map(
                    (brand, i) => (
                        <motion.button
                            key={brand.id}
                            type="button"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03, duration: 0.3 }}
                            onClick={() => handleSelectBrand(brand.id, brand.name)}
                            className={`
              relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
              hover:border-primary/40 hover:bg-accent/30
              ${data.form.brand?.id === brand.id
                                    ? "border-primary bg-accent/50 shadow-sm"
                                    : "border-border bg-card"
                                }
            `}
                        >
                            <div className="flex items-center gap-3 w-full min-w-0">
                                <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center overflow-hidden">
                                    <img
                                        src={brand.logo.light}
                                        alt={brand.name}
                                        className="w-6 h-6 object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                </div>

                                {/* TEXT */}
                                <div className="flex flex-col items-start min-w-0 flex-1 text-left">
                                    <span className="font-medium text-xs sm:text-sm text-foreground truncate w-full">
                                        {brand.name}
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-muted-foreground truncate w-full">
                                        {brand.country}
                                    </span>
                                </div>
                            </div>

                            {data.form.brand?.id === brand.id && (
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