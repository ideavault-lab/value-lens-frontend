"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import type { DialogOptions, DialogVariant } from "./dialog.types";

const CONFIG: Record<
  DialogVariant,
  { Icon: React.ElementType; accent: string; iconBg: string; iconColor: string; border: string; bg: string; confirmBg: string }
> = {
  default: {
    Icon: Info,
    accent: "hsl(var(--primary))",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    border: "border-border",
    bg: "bg-card",
    confirmBg: "bg-primary text-primary-foreground",
  },
  success: {
    Icon: CheckCircle2,
    accent: "hsl(142 72% 36%)",
    iconBg: "bg-[hsl(142_72%_36%/0.12)]",
    iconColor: "text-[hsl(142_60%_30%)]",
    border: "border-[hsl(142_50%_80%)]",
    bg: "bg-[hsl(142_30%_98.5%)]",
    confirmBg: "bg-[hsl(142_72%_36%)] text-white",
  },
  error: {
    Icon: XCircle,
    accent: "hsl(0 72% 51%)",
    iconBg: "bg-[hsl(0_72%_51%/0.10)]",
    iconColor: "text-[hsl(0_65%_46%)]",
    border: "border-[hsl(0_55%_84%)]",
    bg: "bg-[hsl(0_45%_98.5%)]",
    confirmBg: "bg-[hsl(0_72%_51%)] text-white",
  },
  warning: {
    Icon: AlertTriangle,
    accent: "hsl(38 85% 44%)",
    iconBg: "bg-[hsl(38_92%_50%/0.12)]",
    iconColor: "text-[hsl(28_80%_34%)]",
    border: "border-[hsl(38_65%_78%)]",
    bg: "bg-[hsl(38_60%,98.5%)]",
    confirmBg: "bg-[hsl(38_80%,44%)] text-white",
  },
  info: {
    Icon: Info,
    accent: "hsl(210 80% 50%)",
    iconBg: "bg-[hsl(210_80%_50%/0.10)]",
    iconColor: "text-[hsl(210_70%_40%)]",
    border: "border-[hsl(210_60%_82%)]",
    bg: "bg-[hsl(210_55%_98.5%)]",
    confirmBg: "bg-[hsl(210_80%_50%)] text-white",
  },
};

interface DialogProps extends DialogOptions {
  isOpen: boolean;
  onClose: () => void;
}

export function Dialog({
  isOpen,
  variant = "default",
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  onClose,
  children,
}: DialogProps) {
  const cfg = CONFIG[variant];
  const { Icon } = cfg;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleConfirm = () => { onConfirm?.(); onClose(); };
  const handleCancel  = () => { onCancel?.();  onClose(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-[9980] bg-foreground/40 backdrop-blur-[3px]"
          />

          {/* Panel */}
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            initial={{ opacity: 0, scale: 0.88, y: 32, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1,    y: 0,  filter: "blur(0px)" }}
            exit={{   opacity: 0, scale: 0.92,  y: 16, filter: "blur(4px)",
                      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className={`
              fixed left-1/2 top-1/2 z-[9990]
              w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2
              overflow-hidden rounded-[20px] border
              shadow-[0_24px_60px_rgba(0,0,0,0.14),0_4px_14px_rgba(0,0,0,0.08)]
              ${cfg.bg} ${cfg.border}
            `}
          >
            {/* Accent bar */}
            <div className="h-[4px] w-full" style={{ background: cfg.accent }} />

            {/* Icon header */}
            <div className="flex flex-col items-center pt-8 pb-2 px-7">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.08 }}
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${cfg.iconBg} ${cfg.iconColor}`}
              >
                <Icon size={26} strokeWidth={1.8} />
              </motion.div>

              <motion.h2
                id="dialog-title"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="text-center text-[18px] font-bold leading-snug text-foreground font-[var(--font-heading)]"
              >
                {title}
              </motion.h2>

              {description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="mt-2 text-center text-[13px] leading-relaxed text-muted-foreground"
                >
                  {description}
                </motion.p>
              )}
            </div>

            {/* Custom slot (VehicleValuationDialog injects here) */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="px-7 pt-2 pb-1"
              >
                {children}
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex gap-2.5 px-7 pb-7 pt-5">
              <button
                onClick={handleCancel}
                className="
                  flex-1 rounded-xl border border-border bg-transparent
                  py-2.5 text-[13px] font-medium text-muted-foreground
                  transition-colors hover:bg-muted hover:text-foreground
                "
              >
                {cancelLabel}
              </button>
              <motion.button
                whileHover={{ scale: 1.02, filter: "brightness(1.08)" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleConfirm}
                className={`flex-1 rounded-xl py-2.5 text-[13px] font-semibold transition-all ${cfg.confirmBg}`}
              >
                {confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}