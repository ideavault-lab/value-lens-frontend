// ─────────────────────────────────────────────────────────────
// ReadoutBox.tsx
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { Input } from "@/components/ui/Input";

import { MileageZone }
from "../StepMileage";

import { formatKm }
from "./mileage.utils";

const MAX_KM = 1000000;

interface ReadoutBoxProps {
  value: number | null;

  zone: MileageZone;

  expectedKm?: number;

  isLoading: boolean;

  onChange: (
    value: number | null
  ) => void;

  onLimitReach?: (
    message: string | null
  ) => void;
}

const ReadoutBox = ({
  value,
  zone,
  expectedKm,
  isLoading,
  onChange,
  onLimitReach,
}: ReadoutBoxProps) => {

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const raw =
      e.target.value.replace(
        /[^0-9]/g,
        ""
      );

    if (!raw) {

      onChange(null);

      onLimitReach?.(null);

      return;
    }

    const parsed =
      Number(raw);

    if (parsed > MAX_KM) {

      onChange(MAX_KM);

      onLimitReach?.(
        "Mileage cannot exceed 300,000 km"
      );

      return;
    }

    onLimitReach?.(null);

    onChange(parsed);
  };

  const hasValue =
    value !== null &&
    value > 0;

  return (
    <motion.div
      layout
      className="
        rounded-3xl
        border
        border-border
        bg-card
        px-6
        py-5
        transition-all
        duration-300
      "
    >

      <div className="flex items-start justify-between gap-4">

        {/* LEFT */}
        <div className="flex-1 min-w-0">

          {/* INPUT */}
          <div className="flex items-end gap-2">

            <Input
              type="text"
              inputMode="numeric"
              value={
                hasValue
                  ? formatKm(value)
                  : ""
              }
              onChange={handleChange}
              placeholder="0"
              className="
                h-auto
                border-0
                bg-transparent
                p-0
                shadow-none
                ring-0
                focus-visible:ring-0
                focus-visible:ring-offset-0

                text-4xl
                md:text-5xl

                font-bold
                tracking-tighter

                text-foreground
                placeholder:text-muted-foreground/40

               
              "
            />

            <span
              className="
                pb-[10px]
                text-base
                md:text-lg
                font-medium
                text-muted-foreground
                shrink-0
              "
            >
              km
            </span>
          </div>
 
          {/* DESCRIPTION */}
          <AnimatePresence mode="wait">
  <motion.div style={{display: "flex", position: "relative", alignItems: "center", justifyContent: "space-between", overflow: "hidden"}}>
              
{/* //left */}
            <motion.p
              key={zone.label}
              initial={{
                opacity: 0,
                y: 4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -4,
              }}
              className="
                mt-2
                text-sm
                text-muted-foreground
              "
            >
              {hasValue
                ? zone.description
                : "Enter your current vehicle mileage"}
            </motion.p>


{/* RIGHT */}
        {hasValue && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              flex
              flex-col
              items-end
              shrink-0
            "
          >

            <div
              className="
                mt-2
                rounded-full
                bg-primary/10
                px-3
                py-1
                text-xs
                font-semibold
                text-primary
              "
            >
              {zone.label} {zone.emoji}
            </div>

          </motion.div>
        )}
</motion.div>
          </AnimatePresence>
        </div>

      
      </div>

      {/* EXPECTED */}
      {!!expectedKm &&
        hasValue && (
        <div
          className="
            mt-5
            border-t
            border-border
            pt-4
          "
        >

          <div className="flex items-center justify-between">

            <p className="text-sm text-muted-foreground">
              Expected for your car
            </p>

            <p className="text-sm font-semibold text-foreground">
              {formatKm(expectedKm)} km
            </p>
          </div>

          {/* COMPARISON */}
          <div className="mt-2 text-xs text-muted-foreground">

            {value! <
              expectedKm * 0.7 &&
              "Exceptionally low usage compared to similar vehicles"}

            {value! >=
              expectedKm * 0.7 &&
              value! <=
              expectedKm * 1.15 &&
              "Healthy mileage range for this vehicle"}

            {value! >
              expectedKm * 1.15 &&
              value! <=
              expectedKm * 1.5 &&
              "Slightly above expected yearly usage"}

            {value! >
              expectedKm * 1.5 &&
              "Heavy usage detected for this vehicle age"}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReadoutBox;