"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface CheckboxProps
    extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    label?: React.ReactNode;
    description?: React.ReactNode;
    error?: string;
}

export function Checkbox({
    label,
    description,
    error,
    className,
    id,
    ...props
}: CheckboxProps) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-start gap-3">
                <CheckboxPrimitive.Root
                    id={id}
                    className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-input bg-background transition-all duration-200",
                        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                        error &&
                        "border-destructive ring-2 ring-destructive/10",
                        className
                    )}
                    {...props}
                >
                    <CheckboxPrimitive.Indicator>
                        <Check className="h-3.5 w-3.5 text-primary-foreground" />
                    </CheckboxPrimitive.Indicator>
                </CheckboxPrimitive.Root>

                {(label || description) && (
                    <div className="space-y-0.5">
                        {label && (
                            <label
                                htmlFor={id}
                                className="cursor-pointer text-sm text-foreground"
                            >
                                {label}
                            </label>
                        )}

                        {description && (
                            <p className="text-xs text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <AnimatePresence initial={false}>
                {error && (
                    <motion.p
                        key="checkbox-error"
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
                        className="ml-8 overflow-hidden text-xs text-destructive"
                    >
                        * {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}