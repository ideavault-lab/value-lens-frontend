"use client";

import React from "react";

import { Skeleton } from "@/components/ui/Skeleton";

const QuickPicksSkeleton = () => {
  return (
    <div className="space-y-3">

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              relative
              flex
              min-h-[86px]
              flex-col
              justify-between
              rounded-2xl
              border
              border-border
              bg-card
              px-4
              py-3
            "
          >

            {/* Content */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-md" />

              <Skeleton className="h-3 w-32 rounded-md" />
            </div>

            {/* Bottom */}
            <div className="space-y-2 pt-3">
              <Skeleton className="h-6 w-20 rounded-md" />

              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickPicksSkeleton;