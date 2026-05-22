"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export function VehicleSelectorCardSkeleton() {

    return (

        <div className="relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] border border-border bg-card/95 p-6 md:min-h-[340px] md:p-7">

            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

            {/* TOP */}
            <div className="relative z-10 flex items-start justify-between">

                {/* ICON */}
                <Skeleton className="h-16 w-16 rounded-2xl md:h-20 md:w-20" />

                {/* BADGE */}
                <Skeleton className="h-6 w-20 rounded-full" />

            </div>

            {/* BODY */}
            <div className="relative z-10 mt-7 flex flex-1 flex-col">

                {/* TITLE + DESCRIPTION */}
                <div>

                    <Skeleton className="h-8 w-40 rounded-xl" />

                    <div className="mt-1 space-y-2.5">

                        <Skeleton className="h-4 w-full rounded-lg" />

                        <Skeleton className="h-4 w-[88%] rounded-lg" />
                        {/* 
            <Skeleton className="h-4 w-[65%] rounded-lg" /> */}

                    </div>

                </div>

                {/* FOOTER */}
                <div className="mt-auto pt-7">

                    <div className="flex items-center justify-between border-t border-border pt-5">

                        <div className="space-y-2">

                            <Skeleton className="h-3 w-20 rounded-md" />

                            <Skeleton className="h-5 w-28 rounded-lg" />

                        </div>

                        <Skeleton className="h-11 w-11 rounded-2xl" />

                    </div>

                </div>

            </div>

        </div>
    );
}