"use client";

import { useParams } from "next/navigation";
import PredictView from "@/modules/predict/views/PredictView";

export default function PredictPage() {
  const params = useParams();
  const vehicleType = params.type as string;

  console.log("Vehicle Type:", vehicleType);
  
  if (!["car", "bike"].includes(vehicleType)) {
    return <div>Invalid vehicle type</div>;
  }

  return <PredictView  />;
}