"use client";

import React from "react";

import { motion } from "framer-motion";

import {
  Check,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import {
  OWNER_TYPES,
  OwnershipOption,
} from "@/lib/carData";

import {
  useValuation,
} from "../../context/valuation.context";
import StepHeader from "./StepHeader";

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

const StepOwnership = () => {

  const {
    data,
    updateForm,
  } = useValuation();

  const selectedOwnership =
    data.form.ownership;

  return (

    <div className="space-y-6 p-2 pb-10">

      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <StepHeader
        title="How many owners has the car had?"
        description=" Ownership history impacts resale trust and market demand"
      />

      {/* ------------------------------------------------------------------ */}
      {/* OWNERSHIP LIST                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="space-y-3">

        {OWNER_TYPES.map(
          (
            owner: OwnershipOption,
            index
          ) => {

            const active =
              selectedOwnership?.id ===
              owner.id;

            return (

              <motion.button
                key={owner.id}
                type="button"
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.25,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                onClick={() =>
                  updateForm(
                    "ownership",
                    {
                      id: owner.id,
                      name: owner.label,
                    }
                  )
                }
                className={`
                  relative
                  w-full
                  rounded-2xl
                  border-2
                  p-4
                  text-left
                  transition-all duration-200

                  hover:border-primary/40
                  hover:bg-accent/30

                  ${active
                    ? `
                        border-primary
                        bg-accent/40
                        shadow-sm
                      `
                    : `
                        border-border
                        bg-card
                      `
                  }
                `}
              >

                {/* Badge */}
                {owner.badge && (

                  <div
                    className="
                      absolute
                      right-3
                      top-3
                      rounded-full
                      bg-primary/10
                      px-2 py-1
                      text-[10px]
                      font-semibold
                      text-primary
                    "
                  >
                    {owner.badge}
                  </div>
                )}

                <div className="flex items-start gap-4">

                  {/* Number */}
                  <div
                    className={`
                      flex h-12 w-12
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      text-sm font-bold

                      ${active
                        ? `
                            bg-primary
                            text-primary-foreground
                          `
                        : `
                            bg-muted
                            text-foreground
                          `
                      }
                    `}
                  >
                    {owner.shortLabel}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-2">

                      <h3
                        className="
                          text-sm sm:text-base
                          font-semibold
                          text-foreground
                        "
                      >
                        {owner.label}
                      </h3>

                    </div>

                    <p
                      className="
                        mt-1
                        text-xs sm:text-sm
                        leading-relaxed
                        text-muted-foreground
                      "
                    >
                      {owner.description}
                    </p>

                    {/* Mileage Hint */}
                    <div
                      className="
                        mt-3
                        flex items-center gap-2
                        text-[11px]
                        text-muted-foreground
                      "
                    >
                      <TrendingUp className="h-3 w-3" />

                      <span>
                        {owner.recommendedMileage}
                      </span>
                    </div>

                  </div>

                  {/* Check */}
                  {active && (

                    <motion.div
                      layoutId="ownership-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                      }}
                      className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2

      flex h-6 w-6
      items-center justify-center

      rounded-full
      bg-primary
      shadow-sm
    "
                    >
                      <Check
                        className="
        h-3.5 w-3.5
        text-primary-foreground
      "
                        strokeWidth={3}
                      />
                    </motion.div>
                  )}

                </div>

              </motion.button>
            );
          }
        )}

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MARKET INFO                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          rounded-2xl
          border border-border
          bg-card
          p-4
        "
      >

        <div className="flex items-start gap-3">

          <div
            className="
              flex h-10 w-10
              shrink-0
              items-center justify-center
              rounded-xl
              bg-primary/10
              text-primary
            "
          >
            <TrendingUp className="h-4 w-4" />
          </div>

          <div>

            <h4
              className="
                text-sm
                font-semibold
                text-foreground
              "
            >
              Market Insight
            </h4>

            <p
              className="
                mt-1
                text-xs sm:text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              First-owner vehicles generally receive stronger resale demand,
              especially when paired with lower mileage and a clean condition history.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StepOwnership;