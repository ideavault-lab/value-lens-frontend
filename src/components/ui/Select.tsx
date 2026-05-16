"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import {
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                  VARIANTS                                  */
/* -------------------------------------------------------------------------- */

const selectTriggerVariants = cva(
  `
    flex w-full items-center justify-between
    rounded-xl border
    text-sm
    transition-all
    outline-none

    disabled:cursor-not-allowed
    disabled:opacity-50

    [&>span]:line-clamp-1
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

      size: {
        sm: "h-9 px-3",
        default: "h-11 px-4",
        lg: "h-12 px-5",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

/* -------------------------------------------------------------------------- */
/*                                    ROOT                                    */
/* -------------------------------------------------------------------------- */

export const Select =
  SelectPrimitive.Root;

export const SelectGroup =
  SelectPrimitive.Group;

export const SelectValue =
  SelectPrimitive.Value;

/* -------------------------------------------------------------------------- */
/*                                  TRIGGER                                   */
/* -------------------------------------------------------------------------- */

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<
      typeof SelectPrimitive.Trigger
    >,
    VariantProps<
      typeof selectTriggerVariants
    > {}

export const SelectTrigger =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.Trigger
    >,
    SelectTriggerProps
  >(
    (
      {
        className,
        children,
        variant,
        size,
        ...props
      },
      ref
    ) => (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          selectTriggerVariants({
            variant,
            size,
          }),
          className
        )}
        {...props}
      >
        {children}

        <SelectPrimitive.Icon asChild>
          <ChevronDown
            className="
              h-4 w-4
              opacity-50
              shrink-0
            "
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    )
  );

SelectTrigger.displayName =
  SelectPrimitive.Trigger.displayName;

/* -------------------------------------------------------------------------- */
/*                              SCROLL BUTTONS                                */
/* -------------------------------------------------------------------------- */

export const SelectScrollUpButton =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.ScrollUpButton
    >,
    React.ComponentPropsWithoutRef<
      typeof SelectPrimitive.ScrollUpButton
    >
  >(
    ({ className, ...props }, ref) => (
      <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn(
          `
            flex items-center justify-center
            py-1
            text-muted-foreground
          `,
          className
        )}
        {...props}
      >
        <ChevronUp className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>
    )
  );

SelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName;

export const SelectScrollDownButton =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.ScrollDownButton
    >,
    React.ComponentPropsWithoutRef<
      typeof SelectPrimitive.ScrollDownButton
    >
  >(
    ({ className, ...props }, ref) => (
      <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn(
          `
            flex items-center justify-center
            py-1
            text-muted-foreground
          `,
          className
        )}
        {...props}
      >
        <ChevronDown className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    )
  );

SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

interface SelectContentProps
  extends React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.Content
  > {
  position?: "popper" | "item-aligned";
}

export const SelectContent =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.Content
    >,
    SelectContentProps
  >(
    (
      {
        className,
        children,
        position = "popper",
        ...props
      },
      ref
    ) => (
      <SelectPrimitive.Portal>

        <SelectPrimitive.Content
          ref={ref}
          position={position}
          className={cn(
            `
              relative z-50
              max-h-96
              min-w-[8rem]
              overflow-hidden

              rounded-2xl
              border border-border

              bg-popover
              text-popover-foreground

              shadow-xl
            `,
            className
          )}
          {...props}
        >

          <SelectScrollUpButton />

          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                `
                  h-[var(--radix-select-trigger-height)]
                  w-full
                `
            )}
          >
            {children}
          </SelectPrimitive.Viewport>

          <SelectScrollDownButton />

        </SelectPrimitive.Content>

      </SelectPrimitive.Portal>
    )
  );

SelectContent.displayName =
  SelectPrimitive.Content.displayName;

/* -------------------------------------------------------------------------- */
/*                                    LABEL                                   */
/* -------------------------------------------------------------------------- */

export const SelectLabel =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.Label
    >,
    React.ComponentPropsWithoutRef<
      typeof SelectPrimitive.Label
    >
  >(
    ({ className, ...props }, ref) => (
      <SelectPrimitive.Label
        ref={ref}
        className={cn(
          `
            px-2 py-1.5
            text-sm
            font-semibold
          `,
          className
        )}
        {...props}
      />
    )
  );

SelectLabel.displayName =
  SelectPrimitive.Label.displayName;

/* -------------------------------------------------------------------------- */
/*                                     ITEM                                   */
/* -------------------------------------------------------------------------- */

export const SelectItem =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.Item
    >,
    React.ComponentPropsWithoutRef<
      typeof SelectPrimitive.Item
    >
  >(
    (
      {
        className,
        children,
        ...props
      },
      ref
    ) => (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          `
            relative flex w-full
            cursor-default
            select-none
            items-center

            rounded-xl

            py-2 pl-3 pr-8
            text-sm

            outline-none
            transition-colors

            focus:bg-accent
            focus:text-accent-foreground

            data-[disabled]:pointer-events-none
            data-[disabled]:opacity-50
          `,
          className
        )}
        {...props}
      >

        <span
          className="
            absolute right-3
            flex h-4 w-4
            items-center justify-center
          "
        >
          <SelectPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
          </SelectPrimitive.ItemIndicator>
        </span>

        <SelectPrimitive.ItemText>
          {children}
        </SelectPrimitive.ItemText>

      </SelectPrimitive.Item>
    )
  );

SelectItem.displayName =
  SelectPrimitive.Item.displayName;

/* -------------------------------------------------------------------------- */
/*                                 SEPARATOR                                  */
/* -------------------------------------------------------------------------- */

export const SelectSeparator =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.Separator
    >,
    React.ComponentPropsWithoutRef<
      typeof SelectPrimitive.Separator
    >
  >(
    ({ className, ...props }, ref) => (
      <SelectPrimitive.Separator
        ref={ref}
        className={cn(
          "my-1 h-px bg-border",
          className
        )}
        {...props}
      />
    )
  );

SelectSeparator.displayName =
  SelectPrimitive.Separator.displayName;