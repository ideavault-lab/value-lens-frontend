"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { OWNER_TYPES } from "@/lib/carData";

/* ---------------- TYPES ---------------- */

type OwnerId = "first" | "second" | "third" | "fourth_plus";

type StepOwnershipProps = {
  value: OwnerId | null;
  onChange: (value: OwnerId) => void;
};

type OwnerItem = {
  id: OwnerId;
  label: string;
  description: string;
};

/* ---------------- ICON MAP ---------------- */

const OWNER_ICONS: Record<OwnerId, string> = {
  first: "1",
  second: "2",
  third: "3",
  fourth_plus: "4+",
};

/* ---------------- COMPONENT ---------------- */

const StepOwnership = () => {
  const [value , setValue] = useState<OwnerId>();
  return (
    <div className="space-y-6 p-2">
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          Ownership history
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          How many people have owned this car before?
        </p>
      </div>

      <div className="space-y-3">
        {(OWNER_TYPES as OwnerItem[]).map((owner, i) => (
          <motion.button
            key={owner.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            onClick={() => setValue(owner.id)}
            className={`
              w-full flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200
              hover:border-primary/40 hover:bg-accent/20
              ${
                value === owner.id
                  ? "border-primary bg-accent/40 shadow-sm"
                  : "border-border bg-card"
              }
            `}
          >
            <div
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
                ${
                  value === owner.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }
                transition-colors duration-200
              `}
            >
              {OWNER_ICONS[owner.id]}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-foreground">
                {owner.label}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {owner.description}
              </p>
            </div>

            {value === owner.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5 text-primary-foreground"
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

      {/* Summary hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-secondary border border-border"
      >
        <p className="text-xs text-muted-foreground">
          💡 First-owner vehicles typically retain 10-15% more value than multi-owner ones
        </p>
      </motion.div>
    </div>
  );
}

export default StepOwnership