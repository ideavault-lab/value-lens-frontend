"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { MapPin, Search } from "lucide-react";
import { LOCATIONS } from "@/lib/carData";

/* ---------------- TYPES ---------------- */

type LocationValue = string;

/* ---------------- COMPONENT ---------------- */

const StepLocation = () => {
  const [search, setSearch] = useState<string>("");
  const [value, setValue] = useState<LocationValue | null>(null);

  const filtered = (LOCATIONS as string[]).filter((l) =>
    l.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-2">
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          Where is the car located?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Location affects demand and pricing
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search cities..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="pl-10 bg-card border-border h-12 rounded-xl text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto pr-1">
        {filtered.map((city, i) => (
          <motion.button
            key={city}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.25 }}
            onClick={() => setValue(city)}
            className={`
              flex items-center gap-2 p-3.5 rounded-xl border-2 transition-all duration-200
              hover:border-primary/40 hover:bg-accent/30
              ${
                value === city
                  ? "border-primary bg-accent/50 shadow-sm"
                  : "border-border bg-card"
              }
            `}
          >
            <MapPin
              className={`w-3.5 h-3.5 flex-shrink-0 ${
                value === city
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            />

            <span className="font-medium text-sm text-foreground truncate flex-1">
              {city}
            </span>

            {/* ✅ Tick indicator */}
            {value === city && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
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
};

export default StepLocation;