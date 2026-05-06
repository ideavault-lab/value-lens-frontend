"use client";

import React from "react";
import { motion } from "framer-motion";
import { CONDITIONS } from "@/lib/carData";

/* ---------------- TYPES ---------------- */

type ConditionId = string; // tighten later if you have exact union

type StepConditionProps = {
  value: ConditionId | null;
  onChange: (value: ConditionId) => void;
};

type ConditionItem = {
  id: ConditionId;
  label: string;
  description: string;
  icon: React.ReactNode;
};

/* ---------------- COMPONENT ---------------- */
const StepCondition = () => {
  const [value, setValue] = React.useState<ConditionId | null>(null);
  return (
    <div className="space-y-6 p-2">
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          What condition is it in?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Be honest — it helps us give an accurate estimate
        </p>
      </div>

      <div className="space-y-3">
        {(CONDITIONS as ConditionItem[]).map((cond, i) => (
          <motion.button
            key={cond.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            onClick={() => setValue(cond.id)}
            className={`
    w-full flex items-start sm:items-center gap-3 sm:gap-4 
    p-4 sm:p-5 rounded-xl border-2 text-left 
    transition-all duration-200
    hover:border-primary/40 hover:bg-accent/20
    ${value === cond.id
                ? "border-primary bg-accent/40 shadow-sm"
                : "border-border bg-card"
              }
  `}
          >
            {/* ICON */}
            <span className="text-xl sm:text-2xl shrink-0 mt-0.5 sm:mt-0">
              {cond.icon}
            </span>

            {/* TEXT */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm sm:text-base text-foreground truncate">
                {cond.label}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-2 sm:line-clamp-none">
                {cond.description}
              </p>
            </div>

            {/* CHECK */}
            {value === cond.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center shrink-0"
              >
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-foreground"
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

export default StepCondition