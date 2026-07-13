"use client";

import { Lock, Sparkles } from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardProps {
  children: ReactNode;
  enabled?: boolean;

  title: string;
  description: string;
}

export default function FeatureCard({
  children,
  enabled = true,
  title,
  description,
}: FeatureCardProps) {
  if (enabled) return <>{children}</>;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

      {/* Actual Content */}
      <div className="pointer-events-none select-none blur-md opacity-30 scale-[1.02]">
        {children}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/65 to-background/90 backdrop-blur-sm" />

      {/* Shine */}
      {/* <div className="absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            -left-1/2
            top-0
            h-full
            w-1/2
            rotate-12

            bg-gradient-to-r
            from-transparent
            via-primary/10
            to-transparent

            animate-[shimmer_3s_linear_infinite]
          "
        />

      </div> */}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center p-6">

        <div className="max-w-sm text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">

            <Sparkles className="h-8 w-8 text-primary" />

          </div>

          <h3 className="text-xl font-semibold">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {description}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">

            <Lock className="h-4 w-4" />

            Coming Soon

          </div>

        </div>

      </div>

    </div>
  );
}