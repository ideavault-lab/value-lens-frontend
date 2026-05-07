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
    <div className="flex items-center justify-between gap-4 flex-wrap py-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center flex-shrink-0">
          {brandLogo ? (
            <img
              src={brandLogo}
              alt={brand}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-xl">🚗</span>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {brand} {model}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2 h-9">
          <Lightbulb className="w-4 h-4" />
          Get sell tips
        </Button>
        <Button size="sm" className="gap-2 h-9" onClick={onShare}>
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  );
}