"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, TrendingUp, Award } from "lucide-react";
import { OWNER_TYPES, OwnershipOption } from "@/lib/carData";
import { useValuation } from "../../context/valuation.context";
import StepHeader from "./StepHeader";

const StepOwnership = () => {
  const { data, updateForm } = useValuation();
  const selectedOwnership = data.form.ownership;

  // Get selected owner's insight
  const selectedOwnerData = OWNER_TYPES.find(
    (o) => o.id === selectedOwnership?.id
  );

  return (
    <div className="space-y-6 p-4 pb-12">
      <StepHeader
        title="How many owners has the car had?"
        description="Ownership history affects resale value"
      />

      {/* Compact Ownership Cards */}
      <div className="space-y-3">
        {OWNER_TYPES.map((owner, index) => {
          const active = selectedOwnership?.id === owner.id;

          return (
            <motion.button
              key={owner.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileTap={{ scale: 0.985 }}
              onClick={() =>
                updateForm("ownership", {
                  id: owner.id,
                  name: owner.label,
                })
              }
              className={`group relative w-full rounded-2xl border-2 p-4 text-left transition-all duration-200 ${active
                  ? "border-primary bg-accent/50 shadow-sm"
                  : "border-border bg-card hover:border-primary/40 hover:bg-accent/30"
                }`}
            >
              <div className="flex gap-4">
                {/* Number */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm sm:text-xl font-bold transition-colors ${active
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground group-hover:bg-muted/80"
                    }`}
                >
                  {owner.shortLabel}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h2 className="font-semibold text-foreground text-xl sm:text-base">
                    {owner.label}
                  </h2>

                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {owner.description}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-[0.625rem] sm:text-xs text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{owner.recommendedMileage}</span>
                  </div>
                </div>

                {/* Checkmark */}
                {active && (
                  <div className="mt-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                      <Check className="h-4 w-4 text-white" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Market Insight - Only shows after selection */}
      {selectedOwnerData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card p-5"
        >
          <div className="flex gap-4">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Award className="h-5 w-5" />
            </div>

            <div>
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                Market Insight
                <TrendingUp className="h-4 w-4" />
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selectedOwnerData.marketInsight}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hint when nothing selected */}
      {!selectedOwnership && (
        <p className="text-center text-xs text-muted-foreground">
          Select an option above to see market insight
        </p>
      )}
    </div>
  );
};

export default StepOwnership;