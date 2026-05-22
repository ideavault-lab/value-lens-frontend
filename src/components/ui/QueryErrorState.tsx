"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface QueryErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function QueryErrorState({
  title = "Something went wrong",
  description = "We couldn't load the requested data.",
  onRetry,
  isRetrying = false,
}: QueryErrorStateProps) {
  return (
    <div className="col-span-full flex min-h-[320px] flex-col items-center justify-center rounded-3xl px-6 py-10 text-center">

      {/* Icon */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-8 w-8" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Action */}
      <Button
        onClick={onRetry}
        disabled={isRetrying}
        className="mt-6 rounded-xl"
      >
        <RefreshCcw
          className={`mr-2 h-4 w-4 ${
            isRetrying ? "animate-spin" : ""
          }`}
        />

        {isRetrying
          ? "Retrying..."
          : "Try Again"}
      </Button>
    </div>
  );
}