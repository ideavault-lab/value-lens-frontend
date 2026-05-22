"use client";

import { Skeleton } from "@/components/ui/Skeleton";

/* -------------------------------------------------------------------------- */
/*                           STEP BRAND SKELETON                              */
/* -------------------------------------------------------------------------- */

const StepBrandSkeleton = () => {

    return (

        <div className="space-y-6">

            {/* GRID */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

                {Array.from({ length: 9 }).map((_, index) => (

                    <div
                        key={index}
                        className="relative flex  items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-4"
                    >

                        {/* GLOW */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />

                        {/* LOGO */}
                        <Skeleton className="relative z-10 h-10 w-10 shrink-0 rounded-xl" />

                        {/* CONTENT */}
                        <div className="relative z-10 min-w-0 flex-1 space-y-2">

                            <Skeleton className="h-4 w-20 rounded-md" />

                            <Skeleton className="h-3 w-14 rounded-md" />

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default StepBrandSkeleton;