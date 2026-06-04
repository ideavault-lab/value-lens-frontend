"use client";

import { createContext, useCallback, useState } from "react";
import type { DialogContextValue, DialogOptions } from "./dialog.types";
import { Dialog } from "./Dialog";

export const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<(DialogOptions & { isOpen: boolean }) | null>(null);

  const open = useCallback((options: DialogOptions) => {
    setState({ ...options, isOpen: true });
  }, []);

  const close = useCallback(() => {
    setState((prev) => prev ? { ...prev, isOpen: false } : null);
  }, []);

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}
      {state && (
        <Dialog
          {...state}
          onClose={close}
        />
      )}
    </DialogContext.Provider>
  );
}