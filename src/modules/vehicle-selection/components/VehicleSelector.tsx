"use client";

import { useRouter } from "next/navigation";

import {
  AnimatePresence,
  motion,
  Variants,
} from "framer-motion";

import {
  ArrowRight,
  Bike,
  Car,
  Loader2,
  LucideIcon,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  Truck,
} from "lucide-react";

import { QueryErrorState } from "@/components/ui/QueryErrorState";

import { VehicleSelectorCardSkeleton }
  from "./VehicleSelectorCardSkeleton";

import {
  useVehicleTypes,
} from "../hooks/useVehicleTypes";
import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                    ICONS                                   */
/* -------------------------------------------------------------------------- */

const ICONS: Record<string, LucideIcon> = {
  car: Car,
  bike: Bike,
  truck: Truck,
};

/* -------------------------------------------------------------------------- */
/*                                 ANIMATIONS                                 */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function VehicleSelector() {

  const router =
    useRouter();

  const [localLoading, setLocalLoading] = useState(false);

  const {
    data: vehicleTypes = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useVehicleTypes();

  /* ---------------------------------------------------------------------- */
  /*                               HANDLERS                                 */
  /* ---------------------------------------------------------------------- */

  const handleSelect = (
    slug: string,
    enabled: boolean
  ) => {

    if (!enabled || localLoading) return;

    setLocalLoading(true);

    router.push(`/valuation/${slug}`);
  };

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (

    <div className="relative min-h-screen overflow-hidden bg-background w-full">

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[260px] w-[260px] rounded-full bg-primary/5 blur-3xl" />

      </div>

      {/* MAIN */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center md:mb-10">

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[8px] font-semibold text-primary backdrop-blur-sm sm:text-sm"
          >

            <span className="relative flex h-2.5 w-2.5">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/80" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />

            </span>

            AI Powered Vehicle Valuation

          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-[28px] font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Find the real resale value
            <span className="block text-primary">of your vehicle</span>
          </motion.h1>

          {/* DESCRIPTION - Hidden on mobile */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-4 hidden max-w-2xl text-sm leading-relaxed text-muted-foreground sm:block sm:text-base"
          >
            AI-driven market pricing with real-time resale demand, depreciation
            trends and city-wise valuation insights.
          </motion.p>

          {/* TRUST */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-1 sm:gap-3"
          >

            <div className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-2 py-2 text-[9px] font-medium text-muted-foreground backdrop-blur-sm sm:px-4 sm:text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              100% Private
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-2 py-2 text-[9px] font-medium text-muted-foreground backdrop-blur-sm sm:px-4 sm:text-xs">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              Live Market Data
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-2 py-2 text-[9px] font-medium text-muted-foreground backdrop-blur-sm sm:px-4 sm:text-xs">
              <Timer className="h-3.5 w-3.5 text-primary" />
              Instant Estimate
            </div>

          </motion.div>

        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">

          {/* ERROR */}
          {isError ? (

            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              <QueryErrorState
                title="Failed to load vehicle types"
                description={
                  error instanceof Error
                    ? error.message
                    : "Unable to fetch vehicle categories right now."
                }
                onRetry={refetch}
                isRetrying={isFetching}
              />

            </motion.div>

          ) : isLoading ? (

            /* LOADING */
            <motion.div
              key="loading"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >

              {Array.from({ length: 3 }).map(
                (_, index) => (

                  <VehicleSelectorCardSkeleton
                    key={index}
                  />
                )
              )}

            </motion.div>

          ) : (

            /* DATA */
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >

              {vehicleTypes.map((item) => {

                const Icon =
                  ICONS[item.icon] ?? Car;

                const isEnabled =
                  item.enabled;

                return (
<motion.button
  key={item.id}
  type="button"
  variants={itemVariants}
  whileHover={
    isEnabled
      ? {
          y: -4,
          scale: 1.01,
        }
      : {}
  }
  whileTap={
    isEnabled
      ? {
          scale: 0.98,
        }
      : {}
  }
  onClick={() =>
    handleSelect(
      item.slug,
      isEnabled
    )
  }
  className={`group relative overflow-hidden rounded-3xl border transition-all duration-300

  flex min-h-[140px] flex-row items-center gap-4 p-4 text-left

  sm:flex-col sm:items-start sm:p-6 sm:min-h-[220px]

  lg:min-h-[320px]

  ${
    isEnabled
      ? "cursor-pointer border-border bg-card/95 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
      : "cursor-not-allowed border-border/60 bg-muted/30 opacity-75"
  }`}
>
  {/* Glow */}
  {isEnabled && (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  )}

  {/* Icon */}
  <div
    className={`relative z-10 flex shrink-0 items-center justify-center rounded-2xl transition-all duration-300

    h-14 w-14

    sm:h-16 sm:w-16

    lg:h-20 lg:w-20

    ${
      isEnabled
        ? "bg-primary/10 text-primary group-hover:scale-105 group-hover:bg-primary/15"
        : "bg-muted text-muted-foreground"
    }`}
  >
    <Icon
      size={28}
      strokeWidth={1.8}
      className="sm:h-8 sm:w-8 lg:h-10 lg:w-10"
    />
  </div>

  {/* Content */}
  <div className="relative z-10 flex min-w-0 flex-1 flex-col sm:mt-6">
    {/* Top Row */}
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl lg:text-[28px]">
          {item.label}
        </h3>

        <p className="mt-1 text-xs font-medium text-muted-foreground sm:hidden">
          {isEnabled
            ? "Ready Now"
            : "Launching Soon"}
        </p>
      </div>

      {/* Badge */}
      {item.popular ? (
        <div className="hidden shrink-0 items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/20 sm:inline-flex">
          <Sparkles className="h-3 w-3" />
          Popular
        </div>
      ) : !isEnabled ? (
        <div className="hidden shrink-0 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:block">
          Coming Soon
        </div>
      ) : null}
    </div>

    {/* Description */}
    <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:line-clamp-2 lg:block">
      {item.description}
    </p>

    {/* Footer */}
    <div className="mt-auto flex items-center justify-between pt-3 sm:border-t sm:border-border sm:pt-5">
      <div className="hidden flex-col sm:flex">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Estimation
        </span>

        <span className="mt-1 text-sm font-semibold text-foreground">
          {isEnabled
            ? "Ready Now"
            : "Launching Soon"}
        </span>
      </div>

      {isEnabled && (
        <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-300 group-hover:translate-x-1 lg:h-11 lg:w-11 lg:rounded-2xl">
          {localLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <ArrowRight className="h-5 w-5" />
          )}
        </div>
      )}
    </div>
  </div>
</motion.button>
                );
              })}

            </motion.div>
          )}

        </AnimatePresence>

        {/* FOOTER */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground sm:text-xs">

          <div className="flex items-center gap-1.5">
            <span>🔒</span>
            Secure & Private
          </div>

          <div>
            AI + Market Verified
          </div>

          <div>
            Live Resale Trends
          </div>

          <div>
            Trusted by Thousands
          </div>

        </div>

      </div>

    </div>
  );
}