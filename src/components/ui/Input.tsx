"use client";

import * as React from "react";
import {
  cva,
  type VariantProps,
} from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   VARIANTS                                 */
/* -------------------------------------------------------------------------- */

const inputVariants = cva(
  `
    flex w-full rounded-xl border
    text-sm
    transition-all
    outline-none

    disabled:cursor-not-allowed
    disabled:opacity-50

    placeholder:text-muted-foreground
  `,
  {
    variants: {
      variant: {
        primary: `
          border-input
          bg-background
          focus:border-primary/30
          focus:ring-4
          focus:ring-primary/10
        `,

        secondary: `
          border-border
          bg-muted/40
          focus:border-primary/20
          focus:bg-background
        `,

        ghost: `
          border-transparent
          bg-transparent
          focus:border-primary/20
          focus:bg-background
        `,
      },

      inputSize: {
        sm: "h-9 px-3",
        default: "h-11 px-4",
        lg: "h-12 px-5",
      },
    },

    defaultVariants: {
      variant: "primary",
      inputSize: "default",
    },
  }
);

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: string;
}

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      variant,
      inputSize,
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1">
        <input
          ref={ref}
          type={type}
          className={cn(
            inputVariants({
              variant,
              inputSize,
            }),
            error &&
              "border-destructive ring-2 ring-destructive/10 focus:ring-destructive/20",
            className
          )}
          {...props}
        />

        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              key="input-error"
              initial={{
                opacity: 0,
                height: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -6,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="overflow-hidden text-xs text-destructive"
            >
              * {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };