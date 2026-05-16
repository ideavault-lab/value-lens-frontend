// stores/valuation-confirmation.store.ts

import { create } from "zustand";

type ConfirmationStore = {
  isOpen: boolean;

  title: string;

  description: string;

  onConfirm?: () => void;

  openConfirmation: (payload: {
    title: string;
    description: string;
    onConfirm: () => void;
  }) => void;

  closeConfirmation: () => void;

  confirm: () => void;
};

export const useValuationConfirmation =
  create<ConfirmationStore>((set, get) => ({

    isOpen: false,

    title: "",

    description: "",

    onConfirm: undefined,

    openConfirmation: ({
      title,
      description,
      onConfirm,
    }) =>
      set({
        isOpen: true,
        title,
        description,
        onConfirm,
      }),

    closeConfirmation: () =>
      set({
        isOpen: false,
        title: "",
        description: "",
        onConfirm: undefined,
      }),

    confirm: () => {

      get().onConfirm?.();

      get().closeConfirmation();
    },
  }));