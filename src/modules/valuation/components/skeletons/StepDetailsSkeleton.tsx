"use client";

import React from "react";

import { Skeleton } from "@/components/ui/Skeleton";

const StepDetailsSkeleton = () => {

  return (

    <div className="space-y-6 pb-10">
      {/* VARIANT CARDS */}

      <div className="grid grid-cols-1 gap-4">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            key={index}
            className="
              relative overflow-hidden
              rounded-[30px]
              border border-border
              bg-card
              p-5
            "
          >

            {/* TOP */}

            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0 flex-1">

                {/* TITLE */}

                <div className="flex items-center gap-2">

                  <Skeleton className="h-6 w-52 rounded-lg" />

                  <Skeleton className="h-6 w-6 rounded-full" />

                </div>

                {/* TAGS */}

                <div className="mt-3 flex flex-wrap gap-2">

                  <Skeleton className="h-7 w-24 rounded-full" />

                  <Skeleton className="h-7 w-28 rounded-full" />

                  <Skeleton className="h-7 w-16 rounded-full" />

                </div>

              </div>

              {/* CHECK */}
{/* 
              <Skeleton className="h-7 w-7 shrink-0 rounded-full" /> */}

            </div>

            {/* SPECS */}

            <div className="mt-5 grid grid-cols-3 gap-3">

              {Array.from({ length: 3 }).map((_, specIndex) => (

                <div
                  key={specIndex}
                  className="
                    rounded-2xl
                    border border-border
                    bg-background/70
                    p-3
                    space-y-3
                  "
                >

                  <div className="flex items-center gap-2">

                    <Skeleton className="h-4 w-4 rounded-full" />

                    <Skeleton className="h-3 w-14 rounded-md" />

                  </div>

                  <Skeleton className="h-5 w-20 rounded-md" />

                </div>
              ))}

            </div>

            {/* REAL WORLD MILEAGE SECTION */}
{/* 
            <div
              className="
                mt-4 overflow-hidden
                rounded-2xl
                border border-border
                bg-background/40
                p-4
              "
            >

              <div className="flex items-start gap-3">

                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

                <div className="min-w-0 flex-1 space-y-3">

                  <div className="flex items-center gap-2">

                    <Skeleton className="h-4 w-40 rounded-md" />

                    <Skeleton className="h-5 w-16 rounded-full" />

                  </div>

                  <Skeleton className="h-3.5 w-full max-w-[340px] rounded-md" />

                  <Skeleton className="h-3.5 w-full max-w-[280px] rounded-md" />

                  <Skeleton className="h-11 w-full max-w-[220px] rounded-2xl" />

                </div>

              </div>

            </div> */}

          </div>
        ))}

      </div>

    </div>
  );
};

export default StepDetailsSkeleton;