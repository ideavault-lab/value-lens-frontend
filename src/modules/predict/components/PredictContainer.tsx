"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProgressBar from "@/modules/predict/components/ProgressBar";
import StepNavigation from "./StepNavigation";

import Step1 from "../components/steps/StepBrand"
import Step2 from "../components/steps/StepModel";
import Step3 from "../components/steps/StepDetails";
import Step4 from "../components/steps/StepMileage";
import Step5 from "../components/steps/StepCondition";
import Step6 from "../components/steps/StepLocation";
import Step7 from "../components/steps/StepOwnership";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 7;

const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];

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

const PredictContainer = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);


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
    }else if(step === TOTAL_STEPS - 1){
      router.push('/result')
    }
  };

  const back = () => {

    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    } else if (step === 0) {
      router.push('/valuation')
    }
  };

  const CurrentStep = steps[step];

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
          canProceed={true}   // ✅ always enabled (UI phase)
          isLoading={false}   // ✅ no loading yet
        />
      </div>
    </div>
  );
}

export default PredictContainer;