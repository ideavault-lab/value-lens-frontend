"use client";

import { motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { Label } from "@/components/ui/Label";

import {
  useValuation,
  FuelTypeOption,
  TransmissionOption,
} from "../../context/valuation.context";

/* =========================================
   COMPONENT
========================================= */

const StepDetails = () => {

  const {
    data,
    updateForm,
  } = useValuation();

  /* =========================================
     FORM
  ========================================= */

  const form =
    data.form;

  /* =========================================
     META
  ========================================= */

  const fuelTypes =
    data.meta.availableFuelTypes;

  const transmissions =
    data.meta.availableTransmissions;

  const years =
    data.meta.availableYears;

  return (
    <div className="space-y-6 p-2">

      {/* =====================================
          HEADER
      ===================================== */}

      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          Tell us more about your car
        </h2>

        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Year, fuel type, and transmission
        </p>
      </div>

      {/* =====================================
          YEAR
      ===================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
        }}
        className="space-y-2"
      >
        <Label>
          Manufacturing Year
        </Label>

        <Select
          value={
            form.year
              ? form.year.toString()
              : ""
          }
          onValueChange={(v) =>
            updateForm("year",parseInt(v),
    )
          }
        >
          <SelectTrigger className="h-12 rounded-xl bg-card border-border">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>

          <SelectContent>
            {years.map((year) => (
              <SelectItem
                key={year}
                value={year.toString()}
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* =====================================
          FUEL TYPES
      ===================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="space-y-3"
      >
        <Label>
          Fuel Type
        </Label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {fuelTypes.map(
            (
              fuel: FuelTypeOption
            ) => {

              const isSelected =
                form.fuelType?.id ===
                fuel.id;

              return (
                <button
                  key={fuel.id}
                  type="button"
                  onClick={() =>
                    updateForm(
                      'fuelType',
                 
                          fuel,
                    )
                  }
                  className={`
                    relative flex flex-col items-center justify-center gap-2
                    p-4 rounded-2xl border-2 transition-all duration-200
                    hover:border-primary/40 hover:bg-accent/30
                    min-h-[110px]

                    ${isSelected
                      ? "border-primary bg-accent/50"
                      : "border-border bg-card"
                    }
                  `}
                >

                  {/* icon */}

                  {fuel.icon ? (
                    // <img
                    //   src={fuel.icon}
                    //   alt={fuel.name}
                    //   className="w-8 h-8 object-contain"
                    // />
                    <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                      {fuel.icon}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted" />
                  )}

                  {/* name */}

                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">
                      {fuel.name}
                    </p>

                    {fuel.description && (
                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                        {fuel.description}
                      </p>
                    )}
                  </div>

                  {/* tick */}

                  {isSelected && (
                    <motion.div
                      layoutId="fuel-check"
                      className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                      }}
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
            }
          )}
        </div>
      </motion.div>

      {/* =====================================
          TRANSMISSIONS
      ===================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
        }}
        className="space-y-3"
      >
        <Label>
          Transmission
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {transmissions.map(
            (
              transmission: TransmissionOption
            ) => {

              const isSelected =
                form.transmission?.id ===
                transmission.id;

              return (
                <button
                  key={transmission.id}
                  type="button"
                  onClick={() =>
                    updateForm("transmission", transmission)
                  }
                  className={`
                    relative flex items-center gap-4
                    p-4 rounded-2xl border-2
                    transition-all duration-200
                    hover:border-primary/40 hover:bg-accent/30

                    ${isSelected
                      ? "border-primary bg-accent/50"
                      : "border-border bg-card"
                    }
                  `}
                >

                  {/* icon */}

                  {transmission.icon ? (
                    // <img
                    //   src={transmission.icon}
                    //   alt={transmission.name}
                    //   className="w-9 h-9 object-contain"
                    // />
                    <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                      {transmission.icon}
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-muted" />
                  )}

                  {/* content */}

                  <div className="flex-1 text-left">

                    <p className="font-semibold text-sm text-foreground">
                      {transmission.name}
                    </p>

                    {transmission.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {transmission.description}
                      </p>
                    )}
                  </div>

                  {/* tick */}

                  {isSelected && (
                    <motion.div
                      layoutId="transmission-check"
                      className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
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
            }
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StepDetails;