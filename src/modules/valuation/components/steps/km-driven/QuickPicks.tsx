"use client";

import React from "react";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import QuickPicksSkeleton from "../../skeletons/quick-picks-skeleton";
import { QueryErrorState } from "@/components/ui/QueryErrorState";

interface QuickPick {
  label: string;
  value: number;
}

interface QuickPicksProps {
  quickPicks: QuickPick[];
  value: number | null;
  onSelect: (v: number) => void;
  dataLoading: boolean;
  isError: boolean;
  error: any;
  onRetry: () => void;
  isRetrying: boolean;
}

function formatKm(value: number) {
  return value.toLocaleString("en-IN");
}

const QuickPicks = ({
  quickPicks,
  value,
  onSelect,
  dataLoading,
  isError,
  error,
  onRetry,
  isRetrying,

}: QuickPicksProps) => {

  if (!quickPicks?.length) {
    return null;
  }

  return (
    <div className="space-y-3">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Recommended ranges
          </p>

          <p className="text-sm text-zinc-500 mt-1">
            Smart km-driven suggestions based on your vehicle
          </p>
        </div>
      </div>

        {/* ERROR */}
        {isError ? (

          <QueryErrorState
            title="Failed to load mileage suggestions"
            description={
              error instanceof Error
                ? error.message
                : "Something went wrong while fetching km-driven suggestions."
            }
            onRetry={onRetry}
            isRetrying={isRetrying}
          />

        ) : dataLoading ? (

          /* LOADING ONLY PICKS AREA */
          <QuickPicksSkeleton />

        ) : !quickPicks.length ? null : (

          /* PICKS */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

            {quickPicks.map((pick) => {

              const isSelected = value === pick.value;

              return (
                <Button
                  key={pick.label}
                  type="button"
                  variant="outline"
                  onClick={() => onSelect(pick.value)}
                  className={cn(
                    `
                  relative
                  h-auto
                  min-h-[84px]
                  flex-col
                  items-start
                  justify-between
                  rounded-2xl
                  border
                  px-4
                  py-3
                  text-left
                  transition-all
                  duration-200
                  hover:border-primary/40
                  hover:bg-primary/[0.03]
                  hover:shadow-sm
                  active:scale-[0.98]
                  `,
                    isSelected &&
                    `
                    border-primary
                    ring-2
                    ring-primary/15
                    bg-transparent
                    text-foreground
                    shadow-sm
                    `
                  )}
                >

                  {/* Selected Check */}
                  {isSelected && (
                    <div
                      className="
                      absolute
                      right-3
                      top-3
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-primary
                      text-primary-foreground
                    "
                    >
                      <Check className="h-3 w-3" />
                    </div>
                  )}

                  {/* Label */}
                  <div className="space-y-1">

                    <p
                      className={cn(
                        `
                      text-sm
                      font-semibold
                      leading-none
                      `,
                        isSelected
                          ? "text-primary"
                          : "text-zinc-800"
                      )}
                    >
                      {pick.label}
                    </p>

                    <p className="text-xs text-zinc-500">
                      Suggested usage
                    </p>
                  </div>

                  {/* Value */}
                  <div className="pt-3">

                    <p
                      className={cn(
                        `
                      text-lg
                      font-bold
                      tracking-tight
                      `,
                        isSelected
                          ? "text-primary"
                          : "text-zinc-900"
                      )}
                    >
                      {formatKm(pick.value)}
                    </p>

                    <span className="text-xs text-zinc-400">
                      kilometers
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
        )}
      </div>
  );
};

export default QuickPicks;