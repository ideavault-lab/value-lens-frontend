"use client";

import { Skeleton } from "@/components/ui/Skeleton";

const ITEMS = Array.from({ length: 8 });

export default function StepModelSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {ITEMS.map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-4"
        >
          {/* shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

          <div className="relative flex items-center justify-between gap-4">
            {/* left content */}
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-6 w-[80%] rounded-md" />
              <Skeleton className="h-3 w-14 rounded-md" />
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}