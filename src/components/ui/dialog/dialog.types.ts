export type DialogVariant = "success" | "error" | "warning" | "info" | "default";

export interface DialogOptions {
  variant?: DialogVariant;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Render custom content below description */
  children?: React.ReactNode;
}

export interface DialogContextValue {
  open: (options: DialogOptions) => void;
  close: () => void;
}