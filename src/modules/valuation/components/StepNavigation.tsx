"use client";

import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface StepNavigationProps {
  onBack: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  canProceed: boolean;
  isLoading?: boolean; // optional (safer)
  disabled?: boolean; // optional (safer)
  highlightNext?: boolean;
}

export default function StepNavigation({
  onBack,
  onNext,
  isFirst,
  isLast,
  canProceed,
  isLoading = false,
  disabled = false,
  highlightNext = false,
}: StepNavigationProps) {
  const isDisabled = !canProceed || isLoading || disabled;

  return (
    <motion.div
      className="flex items-center justify-between pt-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.35 }}
    >
      {/* Back */}
      {/* {!isFirst ? (
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={isLoading} // 🔴 prevents weird double clicks
          className="text-muted-foreground hover:text-foreground group transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>
      ) : (
        <div /> // keeps spacing consistent
      )} */}

      <Button
        variant="ghost"
        onClick={onBack}
        disabled={isLoading || disabled} // 🔴 prevents weird double clicks
        className="text-muted-foreground hover:text-foreground group transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back
      </Button>

      {/* Next */}

      <motion.div
        animate={
          highlightNext
            ? {
              scale: [1, 1.08, 0.96, 1.04, 1],
              rotate: [0, -2, 2, -1, 0],
            }
            : {}
        }
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <Button
          onClick={onNext}
          disabled={isDisabled}
          className={`
      px-8 py-3 rounded-xl font-semibold
      transition-all duration-300
      ${isLast
              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
              : "bg-foreground hover:bg-foreground/90 text-background"
            }
      disabled:opacity-40
      disabled:cursor-not-allowed
      group
    `}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Predicting...
            </div>
          ) : isLast ? (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Get Valuation
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Continue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
