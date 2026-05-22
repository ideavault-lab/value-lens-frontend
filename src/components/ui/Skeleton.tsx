"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                 SKELETON                                   */
/* -------------------------------------------------------------------------- */

function Skeleton({
  className,
  shimmer = true,
  ...props
}: SkeletonProps) {

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-muted",

        /* smooth pulse */
        "animate-pulse",

        /* shimmer effect */
        shimmer &&
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent dark:before:via-white/5",

        className
      )}
      {...props}
    />
  );
}

export { Skeleton };