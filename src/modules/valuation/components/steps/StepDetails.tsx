"use client";

import { useMemo, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Fuel,
  Gauge,
  Search,
  Sparkles,
  Zap,
  Info,
} from "lucide-react";

import { Input } from "@/components/ui/Input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import {
  useValuation,
  VehicleVariantOption,
} from "../../context/valuation.context";

import StepHeader from "./StepHeader";

import StepDetailsSkeleton from "../skeletons/StepDetailsSkeleton";

import { QueryErrorState } from "@/components/ui/QueryErrorState";

import { useVehicleVariants } from "../../hooks/useVehicleSteps.hooks";
import SelectedCheck from "@/components/ui/SelectedCheck";

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function StepDetails() {

  const {
    data,
    updateForm,
  } = useValuation();

  const [search, setSearch] =
    useState("");

  const selectedYear =
    data.form.year;

  const selectedVariant =
    data.form.variant;

  /* ---------------------------------------------------------------------- */
  /*                               API HOOK                                 */
  /* ---------------------------------------------------------------------- */

  // fetch ALL variants initially
  // backend now ignores undefined year

  const {
    data: variantsData = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useVehicleVariants(
    data.form.vehicleType?.slug || "",
    data.form.brand?.id || "",
    data.form.model?.id || "",
    undefined,
    search.trim()
  );

  /* ---------------------------------------------------------------------- */
  /*                                YEARS                                   */
  /* ---------------------------------------------------------------------- */

  const years = useMemo(() => {

    return [...new Set(
      variantsData.map(
        (variant) => variant.year
      )
    )].sort((a, b) => b - a);

  }, [variantsData]);

  /* ---------------------------------------------------------------------- */
  /*                           FILTERED VARIANTS                            */
  /* ---------------------------------------------------------------------- */

  const variants = useMemo(() => {

    let filtered =
      [...variantsData];

    // frontend year filter only
    if (selectedYear) {

      filtered =
        filtered.filter(
          (variant) =>
            variant.year === selectedYear
        );
    }

    return filtered;

  }, [
    variantsData,
    selectedYear,
  ]);

  /* ---------------------------------------------------------------------- */
  /*                             SELECT VARIANT                             */
  /* ---------------------------------------------------------------------- */

  const handleSelectVariant = (
    variant: VehicleVariantOption
  ) => {

    updateForm(
      "variant",
      variant
    );

    updateForm(
      "year",
      variant.year
    );
  };

  /* ---------------------------------------------------------------------- */
  /*                                  UI                                    */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="space-y-6 p-2 pb-10">

      <StepHeader
        title={`Choose your ${data.form.model?.name} variant`}
        description="Select year and exact vehicle configuration"
      />

      {/* CONTROLS */}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_1fr]">

        {/* YEAR */}

        <div className="space-y-2">

          <label className="text-sm font-medium text-foreground">
            Manufacturing Year
          </label>

          <Select
            value={
              selectedYear
                ? String(selectedYear)
                : "all"
            }
            onValueChange={(value) => {

              updateForm(
                "variant",
                null
              );

              if (value === "all") {

                updateForm(
                  "year",
                  null
                );

                return;
              }

              updateForm(
                "year",
                Number(value)
              );
            }}
          >

            <SelectTrigger className="h-12 rounded-2xl border-border bg-card">

              <SelectValue placeholder="All years" />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All years
              </SelectItem>

              {years.map((year) => (

                <SelectItem
                  key={year}
                  value={String(year)}
                >
                  {year}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

        </div>

        {/* SEARCH */}

        <div className="space-y-2">

          <label className="text-sm font-medium text-foreground">
            Search Variant
          </label>

          <div className="relative">

            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search variants..."
              className="
                h-12
                rounded-2xl
                border-border
                bg-card
                pl-10
              "
            />

          </div>

        </div>

      </div>

      {/* ERROR */}

      {isError && (

        <QueryErrorState
          title="Failed to load variants"
          description={
            error instanceof Error
              ? error.message
              : "Something went wrong while fetching variants."
          }
          onRetry={refetch}
          isRetrying={isFetching}
        />
      )}

      {/* LOADING */}

      {isLoading && (
        <StepDetailsSkeleton />
      )}

      {/* VARIANTS */}

      <AnimatePresence mode="wait">

        {!isLoading &&
          !isError && (

            <motion.div
              key={selectedYear || "all"}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="grid grid-cols-1 gap-4"
            >

              {variants.length > 0 ? (

                variants.map((variant, index) => {

                  const active =
                    selectedVariant?.id ===
                    variant.id;

                  return (

                    <motion.button
                      key={variant.id}
                      type="button"
                      initial={{
                        opacity: 0,
                        y: 14,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.995,
                      }}
                      onClick={() =>
                        handleSelectVariant(
                          variant
                        )
                      }
                      className={`
                        group
                        relative
                        overflow-hidden
                        rounded-[30px]
                        border
                        p-5
                        text-left
                        transition-all
                        duration-300

                        ${
                          active
                            ? `
                              border-primary
                              bg-primary/[0.05]
                              shadow-lg
                              shadow-primary/10
                            `
                            : `
                              border-border
                              bg-card
                              hover:border-primary/30
                            `
                        }
                      `}
                    >

                      {/* GLOW */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-br
                          from-primary/[0.05]
                          via-transparent
                          to-transparent
                          opacity-0
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        "
                      />

                      {/* TOP */}

                      <div
                        className="
                          relative
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3
                              className="
                                truncate
                                text-lg
                                font-semibold
                                tracking-tight
                                text-foreground
                                md:text-xl
                              "
                            >
                              {variant.name}
                            </h3>

                            <div
                              className="
                                rounded-full
                                bg-muted
                                px-2
                                py-1
                                text-[10px]
                                font-semibold
                                text-muted-foreground
                              "
                            >
                              {variant.year}
                            </div>

                            {active && (

                              <motion.div
                                initial={{
                                  scale: 0,
                                }}
                                animate={{
                                  scale: 1,
                                }}
                                className="
                                  rounded-full
                                  bg-primary/10
                                  p-1
                                  text-primary
                                "
                              >

                                <Sparkles className="h-3.5 w-3.5" />

                              </motion.div>
                            )}

                          </div>

                          {/* TAGS */}

                          <div className="mt-3 flex flex-wrap gap-2">

                            <div
                              className="
                                rounded-full
                                border
                                border-border
                                bg-muted/50
                                px-3
                                py-1
                                text-[11px]
                                font-medium
                                text-muted-foreground
                              "
                            >
                              {variant.fuelType.icon}{" "}
                              {variant.fuelType.name}
                            </div>

                            <div
                              className="
                                rounded-full
                                border
                                border-border
                                bg-muted/50
                                px-3
                                py-1
                                text-[11px]
                                font-medium
                                text-muted-foreground
                              "
                            >
                              {variant.transmission.icon}{" "}
                              {variant.transmission.name}
                            </div>

                            {variant.drivetrain && (

                              <div
                                className="
                                  rounded-full
                                  border
                                  border-border
                                  bg-muted/50
                                  px-3
                                  py-1
                                  text-[11px]
                                  font-medium
                                  text-muted-foreground
                                "
                              >
                                {variant.drivetrain}
                              </div>
                            )}

                          </div>

                        </div>

                        {/* CHECK */}

                        {active && (
                          <SelectedCheck layoutId="variant-check" />
                        )}

                      </div>

                      {/* SPECS */}

                      <div className="relative mt-5 grid grid-cols-3 gap-3">

                        {/* ENGINE */}

                        <div
                          className="
                            rounded-2xl
                            border
                            border-border
                            bg-background/70
                            p-3
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-muted-foreground
                            "
                          >

                            <Gauge className="h-4 w-4" />

                            <span
                              className="
                                text-[10px]
                                uppercase
                                tracking-wide
                              "
                            >
                              Engine
                            </span>

                          </div>

                          <div
                            className="
                              mt-2
                              text-sm
                              font-semibold
                              text-foreground
                              md:text-base
                            "
                          >
                            {variant.engineCc} cc
                          </div>

                        </div>

                        {/* MILEAGE */}

                        <div
                          className="
                            rounded-2xl
                            border
                            border-border
                            bg-background/70
                            p-3
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-muted-foreground
                            "
                          >

                            <Fuel className="h-4 w-4" />

                            <span
                              className="
                                text-[10px]
                                uppercase
                                tracking-wide
                              "
                            >
                              Mileage
                            </span>

                          </div>

                          <div
                            className="
                              mt-2
                              text-sm
                              font-semibold
                              text-foreground
                              md:text-base
                            "
                          >
                            {variant.mileage} km/l
                          </div>

                        </div>

                        {/* POWER */}

                        <div
                          className="
                            rounded-2xl
                            border
                            border-border
                            bg-background/70
                            p-3
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-muted-foreground
                            "
                          >

                            <Zap className="h-4 w-4" />

                            <span
                              className="
                                text-[10px]
                                uppercase
                                tracking-wide
                              "
                            >
                              Power
                            </span>

                          </div>

                          <div
                            className="
                              mt-2
                              text-sm
                              font-semibold
                              text-foreground
                              md:text-base
                            "
                          >
                            {variant.powerBhp} bhp
                          </div>

                        </div>

                      </div>

                      {/* REAL WORLD MILEAGE */}

                      {active && (

                        <motion.div
                          initial={{
                            opacity: 0,
                            height: 0,
                          }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                          }}
                          className="
                            relative
                            mt-4
                            overflow-hidden
                            rounded-2xl
                            border
                            border-primary/15
                            bg-primary/[0.03]
                            p-4
                          "
                        >

                          <div className="flex items-start gap-3">

                            <div
                              className="
                                mt-0.5
                                rounded-xl
                                bg-primary/10
                                p-2
                                text-primary
                              "
                            >

                              <Info className="h-4 w-4" />

                            </div>

                            <div className="min-w-0 flex-1">

                              <div className="flex items-center gap-2">

                                <p
                                  className="
                                    text-sm
                                    font-semibold
                                    text-foreground
                                  "
                                >
                                  Real-world mileage
                                </p>

                                <div
                                  className="
                                    rounded-full
                                    bg-muted
                                    px-2
                                    py-0.5
                                    text-[10px]
                                    font-medium
                                    text-muted-foreground
                                  "
                                >
                                  Optional
                                </div>

                              </div>

                              <p
                                className="
                                  mt-1
                                  text-xs
                                  leading-relaxed
                                  text-muted-foreground
                                "
                              >
                                Company claimed mileage is{" "}
                                <span className="font-medium text-foreground">
                                  {variant.mileage} km/l
                                </span>
                                . You can enter your actual mileage for better valuation accuracy.
                              </p>

                              <div className="relative mt-4 max-w-[220px]">

                                <Input
                                  type="number"
                                  step="0.1"
                                  min={1}
                                  max={50}
                                  value={
                                    data.form.realMileage || ""
                                  }
                                  onChange={(e) =>
                                    updateForm(
                                      "realMileage",
                                      e.target.value
                                        ? Number(e.target.value)
                                        : null
                                    )
                                  }
                                  placeholder={`${variant.mileage}`}
                                  className="
                                    h-11
                                    rounded-2xl
                                    border-border
                                    bg-background
                                    pr-14
                                  "
                                />

                                <div
                                  className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-xs
                                    font-semibold
                                    text-muted-foreground
                                  "
                                >
                                  km/l
                                </div>

                              </div>

                            </div>

                          </div>

                        </motion.div>
                      )}

                    </motion.button>
                  );
                })

              ) : (

                <div
                  className="
                    flex
                    min-h-[240px]
                    items-center
                    justify-center
                    rounded-[28px]
                    border
                    border-dashed
                    border-border
                    bg-card/50
                    p-8
                    text-center
                  "
                >

                  <div>

                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-foreground
                      "
                    >
                      No variants found
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-muted-foreground
                      "
                    >
                      Try another search keyword
                    </p>

                  </div>

                </div>
              )}

            </motion.div>
          )}

      </AnimatePresence>

    </div>
  );
}