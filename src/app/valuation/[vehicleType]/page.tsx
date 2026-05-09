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

  return <ValuationView vehicleType={vehicleType} />;
}