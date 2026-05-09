"use client";

import { Share2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ValuationHeaderProps {
  brand: string;
  brandLogo?: string;
  model: string;
  year: number;
  fuel?: string;
  transmission?: string;
  ownerType?: string;
  onShare?: () => void;
}

export function ValuationHeader({
  brand,
  brandLogo,
  model,
  year,
  fuel,
  transmission,
  ownerType,
  onShare,
}: ValuationHeaderProps) {
  const subtitle = [
    year,
    fuel && fuel.charAt(0).toUpperCase() + fuel.slice(1),
    transmission && transmission.charAt(0).toUpperCase() + transmission.slice(1),
    ownerType && `${ownerType.replace("_", " ")} owner`,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="flex items-center justify-between gap-3 flex-wrap py-4 border-b border-border mb-4">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
          {brandLogo ? (
            <img
              src={brandLogo}
              alt={brand}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-xl">🚗</span>
          )}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight truncate">
            {brand} {model}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Button variant="outline" size="sm" className="gap-1.5 h-8 sm:h-9 px-3 text-xs sm:text-sm">
          <Lightbulb className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sell tips</span>
          <span className="sm:hidden">Tips</span>
        </Button>
        <Button size="sm" className="gap-1.5 h-8 sm:h-9 px-3 text-xs sm:text-sm" onClick={onShare}>
          <Share2 className="w-3.5 h-3.5" />
          Share
        </Button>
      </div>
    </div>
  );
}