"use client";

import { motion } from "framer-motion";
import { FUEL_TYPES, TRANSMISSIONS } from "@/lib/carData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { useState } from "react";

/* ---------------- TYPES ---------------- */

type FormData = {
  year: number | null;
  fuel_type: string;
  transmission: string;
};

type StepDetailsProps = {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
};

/* ---------------- COMPONENT ---------------- */

const StepDetails = () => {

  const [data, setData] = useState<FormData>({
    year: null,
    fuel_type: "",
    transmission: "",
  });

 const currentYear = new Date().getFullYear();
  const years: number[] = Array.from(
    { length: 25 },
    (_, i) => currentYear - i
  );
 return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          Tell us more about your car
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Year, fuel type, and transmission
        </p>
      </div>

      {/* Year */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label>Manufacturing Year</Label>

        <Select
          value={data.year ? data.year.toString() : ""}
          onValueChange={(v: string) =>
            setData({ ...data, year: parseInt(v) })
          }
        >
          <SelectTrigger className="h-12 rounded-xl bg-card border-border">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>

          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Fuel Type */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <Label>Fuel Type</Label>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {FUEL_TYPES.map((ft) => {
            const isSelected = data.fuel_type === ft.id;

            return (
              <button
                key={ft.id}
                onClick={() =>
                  setData({ ...data, fuel_type: ft.id })
                }
                className={`
                  relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200
                  hover:border-primary/40
                  ${
                    isSelected
                      ? "border-primary bg-accent/50"
                      : "border-border bg-card"
                  }
                `}
              >
                <span className="text-lg">{ft.icon}</span>
                <span className="text-xs font-medium">{ft.label}</span>

                {/* ✅ Tick */}
                {isSelected && (
                  <motion.div
                    layoutId="fuel-check"
                    className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <svg
                      className="w-2.5 h-2.5 text-primary-foreground"
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
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Transmission */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <Label>Transmission</Label>

        <div className="grid grid-cols-2 gap-3">
          {TRANSMISSIONS.map((t) => {
            const isSelected = data.transmission === t.id;

            return (
              <button
                key={t.id}
                onClick={() =>
                  setData({ ...data, transmission: t.id })
                }
                className={`
                  relative flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
                  hover:border-primary/40
                  ${
                    isSelected
                      ? "border-primary bg-accent/50"
                      : "border-border bg-card"
                  }
                `}
              >
                <span className="text-xl">{t.icon}</span>
                <span className="font-medium text-sm">{t.label}</span>

                {/* ✅ Tick */}
                {isSelected && (
                  <motion.div
                    layoutId="transmission-check"
                    className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
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
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default StepDetails;