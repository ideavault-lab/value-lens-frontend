"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Info,
    X,
} from "lucide-react";
import type { Toast } from "./toast.types";

// ─── Config ──────────────────────────────────
const CONFIG = {
    success: {
        Icon: CheckCircle2,
        accent: "hsl(var(--chart-2))",
        track: "bg-[hsl(142_72%_36%)]",
        iconBg: "bg-[hsl(142_72%_36%/0.10)]",
        iconColor: "text-[hsl(142_72%_32%)]",
        border: "border-[hsl(142_50%_80%)]",
        bg: "bg-[hsl(142_40%_98%)]",
        label: "Success",
    },
    error: {
        Icon: XCircle,
        accent: "hsl(var(--destructive))",
        track: "bg-[hsl(0_72%_51%)]",
        iconBg: "bg-[hsl(0_72%_51%/0.10)]",
        iconColor: "text-[hsl(0_72%_46%)]",
        border: "border-[hsl(0_55%_84%)]",
        bg: "bg-[hsl(0_50%_98%)]",
        label: "Error",
    },
    warning: {
        Icon: AlertTriangle,
        accent: "hsl(var(--chart-3))",
        track: "bg-[hsl(38_92%_50%)]",
        iconBg: "bg-[hsl(38_92%_50%/0.12)]",
        iconColor: "text-[hsl(30_85%_34%)]",
        border: "border-[hsl(38_65%_78%)]",
        bg: "bg-[hsl(38_70%_98%)]",
        label: "Warning",
    },
    info: {
        Icon: Info,
        accent: "hsl(210 80% 50%)",
        track: "bg-[hsl(210_80%_50%)]",
        iconBg: "bg-[hsl(210_80%_50%/0.10)]",
        iconColor: "text-[hsl(210_80%_40%)]",
        border: "border-[hsl(210_60%_82%)]",
        bg: "bg-[hsl(210_60%_98%)]",
        label: "Info",
    },
} as const;

// ─── Progress bar ─────────────────────────────
function ProgressBar({ duration, track }: { duration: number; track: string }) {
    return (
        <motion.div
            className={`absolute bottom-0 left-0 h-[3px] rounded-none ${track}`}
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
        />
    );
}

// ─── Toast Item ───────────────────────────────
interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

export function ToastItem({ toast, onRemove }: ToastItemProps) {
    const cfg = CONFIG[toast.variant];
    const duration = toast.duration ?? 4500;
    const { Icon } = cfg;

    useEffect(() => {
        const t = setTimeout(() => onRemove(toast.id), duration);
        return () => clearTimeout(t);
    }, [toast.id, duration, onRemove]);

    return (
        <motion.div
            layout="position"
            initial={{
                x: 420,
                opacity: 0,
                scale: 0.96,
            }}
            animate={{
                x: 0,
                opacity: 1,
                scale: 1,
            }}
            exit={{
                x: 420,
                opacity: 0,
                scale: 0.95,
            }}
            transition={{
                type: "spring",
                stiffness: 420,
                damping: 30,
                mass: 0.8,
            }}
            whileHover={{
                y: -2,
                scale: 1.01,
            }}
            role="alert"
            aria-live="assertive"
            onClick={() => onRemove(toast.id)}
            className={`
    group relative w-[360px]
    overflow-hidden
    rounded-2xl
    border
    backdrop-blur-xl
    cursor-pointer
    shadow-[0_20px_40px_rgba(0,0,0,0.08)]
    transition-all duration-300
    hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)]
    ${cfg.bg}
    ${cfg.border}
  `}
        >
            {/* Top accent stripe */}

            {/* Body */}
            <div className="relative z-10 flex items-start gap-3 px-4 pt-5 pb-4">
                {/* Icon */}
                <motion.div
                    initial={{
                        scale: 0,
                        rotate: -25,
                    }}
                    animate={{
                        scale: 1,
                        rotate: 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                        delay: 0.05,
                    }}
                    className={`
    mt-px
    flex
    h-10
    w-10
    shrink-0
    items-center
    justify-center
    rounded-xl
    ${cfg.iconBg}
    ${cfg.iconColor}
  `}
                >
                    <Icon size={16} strokeWidth={2.2} />
                </motion.div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold leading-snug text-foreground font-[var(--font-heading)]">
                        {toast.title}
                    </p>
                    {toast.description && (
                        <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
                            {toast.description}
                        </p>
                    )}
                </div>

                {/* Dismiss */}
                <motion.button
                    whileHover={{
                        scale: 1.1,
                        rotate: 90,
                    }}
                    whileTap={{
                        scale: 0.9,
                    }}
                    transition={{
                        duration: 0.18,
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(toast.id);
                    }}
                    className="
    shrink-0
    rounded-lg
    p-1.5
    text-muted-foreground
    opacity-0
    group-hover:opacity-100
    hover:bg-black/5
    transition-all
  "
                >

                    <X size={13} strokeWidth={2.5} />
                </motion.button>
            </div>

            {/* Progress */}
            <ProgressBar duration={duration} track={cfg.track} />
        </motion.div>
    );
}