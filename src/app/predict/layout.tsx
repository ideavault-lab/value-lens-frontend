"use client";

import { ReactNode } from "react";

export default function PredictLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto sm:px-4 sm:px-6 px-0 py-0">
        {children}
      </div>
    </div>
  );
}