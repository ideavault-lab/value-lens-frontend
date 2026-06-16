"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export function VehicleSelectorCardSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border bg-card/95 flex min-h-[140px] flex-row items-center gap-4 p-4 sm:flex-col sm:items-start sm:p-6 sm:min-h-[220px] lg:min-h-[320px]
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

      {/* Icon */}
      <Skeleton
        className="relative z-10 shrink-0 rounded-2xl h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20
        "
      />

      {/* Content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col sm:mt-6">
        {/* Title + Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {/* Title */}
            <Skeleton className="h-6 w-28 rounded-xl sm:h-7 sm:w-36" />

            {/* Mobile status */}
            <Skeleton className="mt-2 h-4 w-20 rounded-lg sm:hidden" />
          </div>

          {/* Badge */}
          <Skeleton className="hidden h-6 w-20 rounded-full sm:block" />
        </div>

        {/* Desktop description */}
        <div className="mt-3 hidden space-y-2 lg:block">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-[85%] rounded-lg" />
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-3 sm:border-t sm:border-border sm:pt-5">
          {/* Desktop status */}
          <div className="hidden space-y-2 sm:block">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-5 w-28 rounded-lg" />
          </div>

          {/* Arrow */}
          <Skeleton
            className="ml-auto rounded-xl h-10 w-10 lg:h-11 lg:w-11 lg:rounded-2xl
            "
          />
        </div>
      </div>
    </div>
  );
}