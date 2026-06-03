"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useRouter } from "next/navigation";

import ProgressBar
  from "@/modules/valuation/components/ProgressBar";

import StepNavigation
  from "./StepNavigation";

import {
  useValuation,
  ValuationProvider,
} from "../context/valuation.context";

import {
  useValuationConfirmation,
} from "@/stores/valuation/valuation-step-guard.store";

import { STEP_CONFIG } from "./steps/step-config";
import { useCreateValuationSession } from "@/modules/valuation-result/hooks/useValuation.hooks";

/* -------------------------------------------------------------------------- */
/*                               STEP CONFIG                                  */
/* -------------------------------------------------------------------------- */

const TOTAL_STEPS =
  STEP_CONFIG.length;
/* -------------------------------------------------------------------------- */
/*                               ANIMATIONS                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                             CONTENT COMPONENT                              */
/* -------------------------------------------------------------------------- */

const ValuationContent = ({
  vehicleType,
}: {
  vehicleType: string;
}) => {

  const router =
    useRouter();

    //context
  const {
    data,
  } = useValuation();

    //hooks
  const createValuation =
  useCreateValuationSession();

  const isConfirmationOpen =
    useValuationConfirmation(
      (state) => state.isOpen
    );

  const [step, setStep] =
    useState(0);

  const [direction, setDirection] =
    useState(1);

  const scrollRef =
    useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------------------- */
  /*                              STEP RESET                                */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {

    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });

  }, [step]);

  /* ---------------------------------------------------------------------- */
  /*                              NAVIGATION                                */
  /* ---------------------------------------------------------------------- */

  const next = async () => {

    if (isConfirmationOpen) {
      return;
    }

    console.log(data, "valuation data at step change");

    if (step < TOTAL_STEPS - 1) {

      setDirection(1);

      setStep((prev) => prev + 1);

      return;
    }

   try {

    const response =
      await createValuation.mutateAsync(
        data.form
      );

    const sessionId =
      response?.data?.sessionId;

    if (!sessionId) {

      throw new Error(
        "Session ID not returned"
      );
    }

    router.push(
      `/valuation/${vehicleType}/result?session=${sessionId}`
    );

  } catch (error) {

    console.error(
      "Failed to create valuation session",
      error
    );

    // toast.error(
    //   "Failed to create valuation"
    // );
  }
  };

  const back = () => {

    if (isConfirmationOpen) {
      return;
    }

    if (step > 0) {

      setDirection(-1);

      setStep((prev) => prev - 1);

      return;
    }

    router.push("/valuation");
  };

  /* ---------------------------------------------------------------------- */
  /*                              CURRENT STEP                              */
  /* ---------------------------------------------------------------------- */


  const CurrentStep =
    STEP_CONFIG[step].component;
  /* ---------------------------------------------------------------------- */
  /*                             VALIDATIONS                                */
  /* ---------------------------------------------------------------------- */

  const canProceed =
    STEP_CONFIG[step].isValid(
      data.form
    );

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (

    <div
      className="flex h-[calc(100vh-0rem)] flex-col"
    >

      {/* PROGRESS */}
      <div className="shrink-0">

        <ProgressBar
          currentStep={step}
          totalSteps={TOTAL_STEPS}
          steps={STEP_CONFIG.map(
            (step) => ({
              id: step.id,
              label: step.label,
            })
          )}
        />

      </div>

      {/* CONTENT */}
      <motion.div
        ref={scrollRef}
        animate={{
          opacity:
            isConfirmationOpen
              ? 0.45
              : 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={`flex-1 overflow-y-auto pt-5 pr-1 sm:px-0 px-2 ${isConfirmationOpen ? "pointer-events-none select-none" : "" }`}
      >

        <div
          className="relative min-h-[420px]"
        >

          <AnimatePresence
            mode="wait"
            custom={direction}
          >

            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
              }}
            >

              <CurrentStep />

            </motion.div>

          </AnimatePresence>

        </div>

      </motion.div>

      {/* NAVIGATION */}
      <motion.div
        animate={{
          opacity:
            isConfirmationOpen
              ? 0.45
              : 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={` sticky bottom-0 left-0 w-full border-t border-border bg-background/95 backdrop-blur pt-4 pb-5 sm:px-0 px-2 ${isConfirmationOpen ? "pointer-events-none" : ""}`}
      >

        <StepNavigation
          onBack={back}
          onNext={next}
          isFirst={step === 0}
          isLast={step === TOTAL_STEPS - 1}
          canProceed={canProceed}
          isLoading={false}
        />

      </motion.div>

    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              ROOT CONTAINER                                */
/* -------------------------------------------------------------------------- */

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