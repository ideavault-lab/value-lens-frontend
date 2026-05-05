"use client";

import { motion } from "framer-motion";

const STEP_LABELS = [
  "Brand",
  "Model",
  "Details",
  "Mileage",
  "Condition",
  "Location",
  "Ownership",
] as const;

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  // 🔴 guard (prevents crash if mismatch)
  const safeStep = Math.min(currentStep, STEP_LABELS.length - 1);

  const progress = ((safeStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full px-1">
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          Step {safeStep + 1} of {totalSteps}
        </span>

        <span className="text-xs font-semibold text-primary">
          {STEP_LABELS[safeStep]}
        </span>
      </div>

      {/* Progress track */}
      <div className="relative h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Step dots */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isActive = i === safeStep;
          const isCompleted = i < safeStep;

          return (
            <motion.div
              key={i}
              className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300
                ${isCompleted ? "bg-primary" : ""}
                ${isActive ? "bg-primary shadow-[0_0_0_4px_rgba(0,0,0,0.05)]" : ""}
                ${!isCompleted && !isActive ? "bg-border" : ""}
              `}
              initial={{ scale: 0.8 }}
              animate={{ scale: isActive ? 1.3 : 1 }}
              transition={{ duration: 0.25 }}
            />
          );
        })}
      </div>
    </div>
  );
}