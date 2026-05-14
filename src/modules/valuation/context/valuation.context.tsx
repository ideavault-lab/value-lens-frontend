"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

/* =========================================
   COMMON TYPES
========================================= */

export type BaseOption = {
  id: string;
  name: string;
};

export type VehicleTypeOption = {
  slug: string;
  name: string;
};

/* =========================================
   FUEL TYPE
========================================= */

export type FuelTypeOption = {
  id: string;

  slug: string;

  name: string;

  icon?: string;

  description?: string;
};

/* =========================================
   TRANSMISSION
========================================= */

export type TransmissionOption = {
  id: string;

  slug: string;

  name: string;

  icon?: string;

  description?: string;
};

/* =========================================
   VEHICLE MODEL
========================================= */

export type VehicleModelOption = {
  id: string;

  slug: string;

  name: string;

  launchYear: number;

  fuelTypes: FuelTypeOption[];

  transmissions: TransmissionOption[];
};

/* =========================================
   FORM STATE
   (actual payload values)
========================================= */

export type ValuationFormState = {

  vehicleType:
    VehicleTypeOption | null;

  brand:
    BaseOption | null;

  model:
    VehicleModelOption | null;

  fuelType:
    FuelTypeOption | null;

  transmission:
    TransmissionOption | null;

  year:
    number | null;

  city:
    BaseOption | null;

  variant:
    BaseOption | null;

  condition:
    BaseOption | null;

  ownership:
    BaseOption | null;

  mileage:
    number | null;
};

/* =========================================
   META STATE
   (cached reusable UI data)
========================================= */

export type ValuationMetaState = {

  availableFuelTypes:
    FuelTypeOption[];

  availableTransmissions:
    TransmissionOption[];

  availableYears:
    number[];
};

/* =========================================
   ROOT STATE
========================================= */

export type ValuationState = {

  form: ValuationFormState;

  meta: ValuationMetaState;
};

/* =========================================
   CONTEXT TYPE
========================================= */

type ValuationContextType = {

  data: ValuationState;

  updateForm: (
    values: Partial<ValuationFormState>
  ) => void;

  updateMeta: (
    values: Partial<ValuationMetaState>
  ) => void;

  resetData: () => void;
};

/* =========================================
   INITIAL STATES
========================================= */

const initialFormState:
  ValuationFormState = {

  vehicleType: null,

  brand: null,

  model: null,

  fuelType: null,

  transmission: null,

  year: null,

  city: null,

  variant: null,

  condition: null,

  ownership: null,

  mileage: null,
};

const initialMetaState:
  ValuationMetaState = {

  availableFuelTypes: [],

  availableTransmissions: [],

  availableYears: [],
};

/* =========================================
   CONTEXT
========================================= */

const ValuationContext =
  createContext<
    ValuationContextType | undefined
  >(undefined);

/* =========================================
   PROVIDER
========================================= */

type Props = {
  children: ReactNode;

  vehicleType: string;
};

export function ValuationProvider({
  children,
  vehicleType,
}: Props) {

  const [data, setData] =
    useState<ValuationState>({
      form: {
        ...initialFormState,

        vehicleType: vehicleType
          ? {
              slug: vehicleType,

              name:
                vehicleType.charAt(0).toUpperCase() +
                vehicleType.slice(1),
            }
          : null,
      },

      meta: initialMetaState,
    });

  /* =========================
     UPDATE FORM
  ========================= */

  const updateForm = (
    values: Partial<ValuationFormState>
  ) => {

    setData((prev) => ({
      ...prev,

      form: {
        ...prev.form,
        ...values,
      },
    }));
  };

  /* =========================
     UPDATE META
  ========================= */

  const updateMeta = (
    values: Partial<ValuationMetaState>
  ) => {

    setData((prev) => ({
      ...prev,

      meta: {
        ...prev.meta,
        ...values,
      },
    }));
  };

  /* =========================
     RESET
  ========================= */

  const resetData = () => {

    setData({
      form: {
        ...initialFormState,

        vehicleType: vehicleType
          ? {
              slug: vehicleType,

              name:
                vehicleType.charAt(0).toUpperCase() +
                vehicleType.slice(1),
            }
          : null,
      },

      meta: initialMetaState,
    });
  };

  return (
    <ValuationContext.Provider
      value={{
        data,
        updateForm,
        updateMeta,
        resetData,
      }}
    >
      {children}
    </ValuationContext.Provider>
  );
}

/* =========================================
   HOOK
========================================= */

export function useValuation() {

  const context =
    useContext(ValuationContext);

  if (!context) {

    throw new Error(
      "useValuation must be used inside ValuationProvider"
    );
  }

  return context;
}