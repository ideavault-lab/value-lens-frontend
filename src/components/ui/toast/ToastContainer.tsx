"use client";

import { AnimatePresence } from "framer-motion";
import type { Toast } from "./toast.types";
import { ToastItem } from "./ToastItem";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({
  toasts,
  onRemove,
}: ToastContainerProps) {
  return (
    <div
      aria-label="Notifications"
      className="fixed top-16 right-5 z-[9999] flex flex-col gap-3 pointer-events-none"
    >
      <AnimatePresence
        mode="popLayout"
        initial={false}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto"
          >
            <ToastItem
              toast={toast}
              onRemove={onRemove}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}