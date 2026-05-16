"use client";

import { useValuationConfirmation } from "@/stores/valuation/valuation-step-guard.store";
import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertTriangle } from "lucide-react";
import ValuationResetAlert from "./ValuationResetAlert";

const STEP_LABELS = [
  "Brand", "Model", "Details", "Mileage", "Condition", "Location", "Ownership"
] as const;

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps
}: ProgressBarProps) {

  const {
    isOpen,
    title,
    description,
    confirm,
    closeConfirmation,
  } = useValuationConfirmation();

  const safeStep = Math.min(Math.max(currentStep, 0), totalSteps - 1);
  const progress = ((safeStep + 1) / totalSteps) * 100;

  const showWarning = false;

  // 👇 only show nearby steps on mobile
  const visibleSteps = STEP_LABELS.map((_, i) => i).filter(
    (i) => Math.abs(i - safeStep) <= 1
  );

  return (
    <div className="w-full bg-card border-b border-border sticky top-0 z-50 px-5 py-4">

      {/* Progress line */}
      <div className="h-0.5 bg-border rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="flex items-center justify-between gap-3">

        {/* LEFT: current step */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-primary text-primary-foreground font-semibold text-sm ring-2 ring-primary/20 shrink-0">
            {safeStep + 1}
          </div>

          <div className="min-w-0">
            <p className="font-medium text-sm text-foreground truncate">
              {STEP_LABELS[safeStep]}
            </p>
            <p className="text-xs text-muted-foreground">
              Step {safeStep + 1} of {totalSteps}
            </p>
          </div>
        </div>

        {/* RIGHT: step indicators */}
        <div className="flex items-center gap-2">

          {/* Mobile (compressed) */}
          <div className="flex sm:hidden items-center gap-2">
            {visibleSteps.map((index) => {
              const isCompleted = index < safeStep;
              const isActive = index === safeStep;

              return (
                <div
                  key={index}
                  className={`
                    w-7 h-7 rounded-xl flex items-center justify-center border text-xs font-medium
                    ${isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isActive
                        ? "border-primary bg-card text-primary"
                        : "border-border text-muted-foreground"
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : index + 1}
                </div>
              );
            })}
          </div>

          {/* Desktop (full steps) */}
          <div className="hidden sm:flex items-center gap-2">
            {STEP_LABELS.map((_, index) => {
              const isCompleted = index < safeStep;
              const isActive = index === safeStep;

              return (
                <motion.div
                  key={index}
                  className={`
                    relative w-6 h-6 rounded-xl flex items-center justify-center border transition-all
                    ${isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isActive
                        ? "border-primary bg-card shadow-sm"
                        : "border-border bg-card"
                    }
                  `}
                  whileHover={{ scale: 1.15 }}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={4} />
                  ) : (
                    <span className={`text-[11px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {index + 1}
                    </span>
                  )}

                  {isActive && (
                    <div className="absolute inset-0 border border-primary/40 rounded-xl animate-pulse" />
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

     {/* confirmation */}
<ValuationResetAlert
  isOpen={isOpen}
  title={title}
  description={description}
  onCancel={closeConfirmation}
  onConfirm={confirm}
/>

      {/* Warning */}
      {showWarning && (
        // <motion.div
        //   initial={{ opacity: 0, y: -10 }}
        //   animate={{ opacity: 1, y: 0 }}
        //   className="mt-4 flex items-start gap-3 bg-amber-100/70 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-4 py-3.5 rounded-2xl text-sm"
        // >
        //   <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        //   <div className="leading-snug">
        //     High mileage can significantly reduce your vehicle's market value. 
        //     Consider mentioning any major service history.
        //   </div>
        // </motion.div>
        <></>
      )}
    </div>
  );
}