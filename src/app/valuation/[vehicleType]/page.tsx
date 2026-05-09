"use client";

import { useParams } from "next/navigation";
import ValuationView from "@/modules/valuation/views/ValuationView";

export default function ValuationPage() {
  const params = useParams();
  const vehicleType = params.vehicleType as string;

  console.log("Vehicle Type:", vehicleType);

  if (!["car", "bike"].includes(vehicleType)) {
    return <div>Invalid vehicle type</div>;
  }

  return (
  <div className="max-w-2xl mx-auto sm:px-4 sm:px-6 px-0 py-0">
    <ValuationView vehicleType={vehicleType} />
  </div>
  );
}