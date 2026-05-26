"use client";

import React, { useMemo, useState } from "react";

import { motion } from "framer-motion";

import {
  MapPin,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { Input } from "@/components/ui/Input";

import { LOCATIONS } from "@/lib/carData";

import {
  useValuation,
} from "../../context/valuation.context";
import StepHeader from "./StepHeader";

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

const StepLocation = () => {

  const {
    data,
    updateForm,
  } = useValuation();

  const [search, setSearch] =
    useState("");

  const selectedCity =
    data.form.city;

  /* ---------------------------------------------------------------------- */
  /*                           FEATURED LOCATIONS                           */
  /* ---------------------------------------------------------------------- */

  const featuredLocations =
    useMemo(() => {

      return [...LOCATIONS]
        .sort(
          (a, b) =>
            a.marketPriority -
            b.marketPriority
        )
        .slice(0, 6);

    }, []);

  /* ---------------------------------------------------------------------- */
  /*                             SEARCH FILTER                              */
  /* ---------------------------------------------------------------------- */

  const filteredLocations =
    useMemo(() => {

      return LOCATIONS.filter(
        (location) =>

          location.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          location.state
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [search]);

  /* ---------------------------------------------------------------------- */
  /*                          REMAINING LOCATIONS                           */
  /* ---------------------------------------------------------------------- */

  const remainingLocations =
    useMemo(() => {

      const featuredIds =
        featuredLocations.map(
          (l) => l.id
        );

      return LOCATIONS.filter(
        (location) =>
          !featuredIds.includes(
            location.id
          )
      );

    }, [featuredLocations]);

  /* ---------------------------------------------------------------------- */
  /*                          MARKET LABEL HELPER                           */
  /* ---------------------------------------------------------------------- */

  const getMarketLabel = (
    demandLevel: string
  ) => {

    switch (demandLevel.toLowerCase()) {

      case "high":
        return "High resale demand";

      case "medium":
        return "Good resale market";

      default:
        return "Moderate resale demand";
    }
  };

  /* ---------------------------------------------------------------------- */
  /*                           LOCATION CARD UI                             */
  /* ---------------------------------------------------------------------- */

  const renderLocationCard = (
    location: typeof LOCATIONS[number],
    index: number
  ) => {

    const active =
      selectedCity?.id ===
      location.id;

    return (

      <motion.button
        key={location.id}
        type="button"
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: index * 0.02,
          duration: 0.25,
        }}
        whileTap={{
          scale: 0.985,
        }}
        onClick={() =>
          updateForm(
            "city",
            location
          )
        }
        className={`relative overflow-hidden rounded-xl p-3.5 text-left transition-all duration-200 border-2
                        hover:border-primary/40
                                    hover:bg-accent/30 ${active
            ? "border-primary bg-accent/50 shadow-sm"
            : "border-border bg-card"
          }`}
      >

        <div className="flex items-start gap-3">

          {/* ICON */}
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
            }`}
          >
            <MapPin className="h-4 w-4" />
          </div>

          {/* CONTENT */}
          <div className="min-w-0 flex-1">

            <div className="flex items-start justify-between gap-3">

              <div className="min-w-0">

                <h3 className="truncate text-sm font-semibold text-foreground">
                  {location.name}
                </h3>

                <p className="text-xs text-muted-foreground">
                  {location.state}
                </p>

                <p className="mt-2 text-[11px] font-medium text-primary">
                  {getMarketLabel(location.demandLevel)}
                </p>

              </div>

              {/* CHECK */}
              {active && (

                <motion.div
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
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary"
                >

                  <svg
                    className="h-3 w-3 text-primary-foreground"
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

            </div>

          </div>

        </div>

      </motion.button>
    );
  };

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (

    <div className="space-y-6 p-2 pb-10">

      {/* HEADER */}
      <StepHeader
        title="Where is the car located?"
        description="Resale value varies slightly across different cities"
      />

      {/* SEARCH */}
      <div className="relative">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search city or state..."
          inputSize="lg"
          className="                pl-10
                        bg-card
                        border-border
                        h-12
                        rounded-xl
                        text-sm"
        />

      </div>

      {/* SEARCH RESULTS */}
      {search.length > 0 ? (

        <div className="space-y-3">

          <h3 className="text-sm font-semibold text-foreground">
            Search Results
          </h3>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

            {filteredLocations.map(
              renderLocationCard
            )}

          </div>

        </div>

      ) : (

        <>

          {/* FEATURED */}
          <div className="space-y-3">

            <div className="flex items-center gap-2">

              <TrendingUp className="h-4 w-4 text-primary" />

              <h3 className="text-sm font-semibold text-foreground">
                Popular Cities
              </h3>

            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

              {featuredLocations.map(
                renderLocationCard
              )}

            </div>

          </div>

          {/* OTHER CITIES */}
          <div className="space-y-3">

            <h3 className="text-sm font-semibold text-muted-foreground">
              Other Cities
            </h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

              {remainingLocations.map(
                renderLocationCard
              )}

            </div>

          </div>

        </>
      )}

    </div>
  );
};

export default StepLocation;