"use client";

import Link from "next/link";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Car className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg text-foreground">
            CarValue
          </span>
        </div>

        <Link href="/valuation">
          <Button className="rounded-full px-5 h-9 text-sm">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}