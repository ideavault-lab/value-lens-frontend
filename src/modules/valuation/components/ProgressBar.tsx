"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { useValuationConfirmation } from "@/stores/valuation/valuation-step-guard.store";

import ValuationResetAlert from "./ValuationResetAlert";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type ProgressStep = {
  id: string;
  label: string;
};

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: ProgressStep[];
}

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

export default function ProgressBar({
  currentStep,
  totalSteps,
  steps,
}: ProgressBarProps) {

  const {
    isOpen,
    title,
    description,
    confirm,
    closeConfirmation,
  } = useValuationConfirmation();

  /* ---------------------------------------------------------------------- */
  /*                                  DATA                                  */
  /* ---------------------------------------------------------------------- */

  const safeStep = Math.min(Math.max(currentStep, 0), totalSteps - 1);

  const progress = ((safeStep + 1) / totalSteps) * 100;

  const currentLabel = steps[safeStep]?.label;

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-xl">

        {/* PROGRESS LINE */}
        <div className="h-[3px] overflow-hidden bg-border/60">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />

        </div>

        {/* CONTENT */}
        <div className="flex items-center justify-between px-4 py-3">

          {/* LEFT */}
          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-xs font-semibold text-primary-foreground">
              {safeStep + 1}
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-foreground">
                {currentLabel}
              </p>

              <p className="text-[11px] text-muted-foreground">
                Step {safeStep + 1} / {totalSteps}
              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex shrink-0 items-center">

            {/* MOBILE */}
            <div className="flex items-center gap-1.5 sm:hidden">

              {steps
                .map((step, index) => ({
                  step,
                  index,
                }))
                .filter(({ index }) => Math.abs(index - safeStep) <= 1)
                .map(({ step, index }) => {

                  const completed = index < safeStep;

                  const active = index === safeStep;

                  return (

                    <motion.div
                      key={step.id}
                      animate={{
                        scale: active ? 1.05 : 1,
                      }}
                      className={`relative flex h-7 w-7 items-center justify-center rounded-xl border transition-all duration-200 ${
                        completed
                          ? "border-primary bg-primary text-primary-foreground"
                          : active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground"
                      }`}
                    >

                      {completed ? (

                        <Check
                          className="h-3 w-3"
                          strokeWidth={3}
                        />

                      ) : (

                        <span className="text-[10px] font-semibold">
                          {index + 1}
                        </span>

                      )}

                      {active && (
                        <div className="absolute inset-0 rounded-xl border border-primary/40" />
                      )}

                    </motion.div>
                  );
                })}

            </div>

            {/* DESKTOP */}
            <div className="hidden items-center gap-1.5 sm:flex">

              {steps.map((step, index) => {

                const completed = index < safeStep;

                const active = index === safeStep;

                return (

                  <motion.div
                    key={step.id}
                    animate={{
                      scale: active ? 1.05 : 1,
                    }}
                    className={`relative flex h-6 w-6 items-center justify-center rounded-lg border transition-all duration-200 ${
                      completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground"
                    }`}
                  >

                    {completed ? (

                      <Check
                        className="h-3 w-3"
                        strokeWidth={3}
                      />

                    ) : (

                      <span className="text-[10px] font-semibold">
                        {index + 1}
                      </span>

                    )}

                    {active && (
                      <div className="absolute inset-0 rounded-lg border border-primary/40" />
                    )}

                  </motion.div>
                );
              })}

            </div>

          </div>

        </div>
      </div>

      {/* RESET ALERT */}
      <ValuationResetAlert
        isOpen={isOpen}
        title={title}
        description={description}
        onCancel={closeConfirmation}
        onConfirm={confirm}
      />
    </>
  );
}