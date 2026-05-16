"use client";

import * as React from "react";
import {
  cva,
  type VariantProps,
} from "class-variance-authority";

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
    VariantProps<typeof inputVariants> {}

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      className,
      variant,
      inputSize,
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          inputVariants({
            variant,
            inputSize,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */

export {
  Input,
  inputVariants,
};