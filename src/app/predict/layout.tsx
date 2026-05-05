"use client";

import { ReactNode } from "react";

export default function PredictLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </div>
    </div>
  );
}