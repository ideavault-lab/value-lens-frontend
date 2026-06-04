"use client";

import { useContext } from "react";
import { ToastContext } from "./ToastProvider";
import type { ToastAPI } from "./toast.types";

export function useToast(): ToastAPI {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");

  const { addToast } = ctx;

  return {
    success: (title, description) =>
      addToast({ variant: "success", title, description }),
    error: (title, description) =>
      addToast({ variant: "error", title, description }),
    warning: (title, description) =>
      addToast({ variant: "warning", title, description }),
    info: (title, description) =>
      addToast({ variant: "info", title, description }),
  };
}