"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProgressBar from "@/modules/valuation/components/ProgressBar";
import StepNavigation from "./StepNavigation";

import { useRouter } from "next/navigation";
import { useValuation, ValuationProvider } from "../context/valuation.context";

import StepBrand
  from "./steps/StepBrand";

import StepModel
  from "./steps/StepModel";

import StepDetails
  from "./steps/StepDetails";

import StepMileage
  from "./steps/StepMileage";

import StepCondition
  from "./steps/StepCondition";

import StepLocation
  from "./steps/StepLocation";

import StepOwnership
  from "./steps/StepOwnership";


const TOTAL_STEPS = 7;

const steps = [
  StepBrand,
  StepModel,
  StepDetails,
  StepMileage,
  StepCondition,
  StepLocation,
  StepOwnership,
];


const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

const ValuationContent = ({ vehicleType }: { vehicleType: string }) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  //context
  const { data } = useValuation();

  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ ADD THIS (scroll reset on step change)
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "auto", // important: don't use smooth
    });
  }, [step]);


  const next = () => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else if (step === TOTAL_STEPS - 1) {
      router.push(`/valuation/${vehicleType}/result`)
    }
  };

  const back = () => {

    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    } else if (step === 0) {
      router.push(`/valuation`)
    }
  };

  const CurrentStep = steps[step];

  // ========================================
  // STEP VALIDATION
  // ========================================

  const canProceedByStep = [
    !!data.brand?.id,        // Step 1
    !!data.model?.id,        // Step 2
    !!data.year,             // Step 3
    !!data.mileage, // Step 4
    !!data.condition,        // Step 5
    !!data.city?.id,         // Step 6
    !!data.ownership,        // Step 7
  ];

  const canProceed =
    canProceedByStep[step];

  return (

    <div className="flex flex-col h-[calc(100vh-0rem)]">

      {/* 🔵 Progress */}
      <div className="shrink-0">
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      </div>

      {/* 🟡 Scrollable Step Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pt-5 pr-1 sm:px-0 px-2">
        <div className="min-h-[420px] relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <CurrentStep />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 🟢 Sticky Bottom Navigation */}
      <div className="sticky bottom-0 left-0 w-full bg-background/95 backdrop-blur border-t border-border pt-4 pb-5 sm:px-0 px-2">
        <StepNavigation
          onBack={back}
          onNext={next}
          isFirst={step === 0}
          isLast={step === TOTAL_STEPS - 1}
          canProceed={canProceed}   // ✅ always enabled (UI phase)
          isLoading={false}   // ✅ no loading yet
        />
      </div>
    </div>
  );
}


const ValuationContainer = ({
  vehicleType,
}: {
  vehicleType: string;
}) => {

  return (
    <ValuationProvider
      vehicleType={vehicleType}
    >
      <ValuationContent
        vehicleType={vehicleType}
      />
    </ValuationProvider>
  );
};

export default ValuationContainer;