import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react'

const StepConditonSkeleton = () => {
  return (

    <div className="relative flex items-start gap-3 rounded-2xl border border-border bg-card p-4">

      <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />

      <div className="min-w-0 flex-1 space-y-2">

        <Skeleton className="h-4 w-32" />

        <Skeleton className="h-3.5 w-full max-w-[220px]" />

        <Skeleton className="h-3.5 w-5/6 max-w-[180px]" />

      </div>

      <Skeleton className="absolute right-3 top-3 h-5 w-5 rounded-full" />

    </div>
  );
}

export default StepConditonSkeleton
