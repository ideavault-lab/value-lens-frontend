"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import { useValuationConfirmation } from "@/stores/valuation/valuation-step-guard.store";
import { LocationOption } from "@/lib/carData";

/* ========================================================================== */
/*                                   TYPES                                    */
/* ========================================================================== */

export type BaseOption = {
  id: string;
  name: string;
};

export type VehicleTypeOption = {
  slug: string;
  name: string;
};

export type FuelTypeOption = {
  id: string;
  slug: string;
  name: string;
  icon?: string;
  description?: string;
};

export type TransmissionOption = {
  id: string;
  slug: string;
  name: string;
  icon?: string;
  description?: string;
};

export type VehicleModelOption = {
  id: string;
  slug: string;
  name: string;

  launchYear: number;

  fuelTypes: FuelTypeOption[];

  transmissions: TransmissionOption[];
};

/* ========================================================================== */
/*                               FORM STATE                                   */
/* ========================================================================== */

export type ValuationFormState = {

  /* VEHICLE */

  vehicleType:
  VehicleTypeOption | null;

  brand:
  BaseOption | null;

  model:
  VehicleModelOption | null;

  /* DETAILS STEP */

  year:
  number | null;

  fuelType:
  FuelTypeOption | null;

  transmission:
  TransmissionOption | null;

  /* MILEAGE */

  mileage:
  number | null;

  /* CONDITION STEP */

  condition:
  BaseOption | null;

  conditionIssues:
  string[];

  conditionNotes:
  string;

  /* LOCATION */

  city: LocationOption | null;

  /* OWNERSHIP */

  ownership:
  BaseOption | null;

  /* VARIANT */

  variant:
  BaseOption | null;
};

/* ========================================================================== */
/*                                META STATE                                  */
/* ========================================================================== */

export type ValuationMetaState = {

  availableFuelTypes:
  FuelTypeOption[];

  availableTransmissions:
  TransmissionOption[];

  availableYears:
  number[];
};

/* ========================================================================== */
/*                                ROOT STATE                                  */
/* ========================================================================== */

export type ValuationState = {

  form:
  ValuationFormState;

  meta:
  ValuationMetaState;
};

/* ========================================================================== */
/*                               STEP GROUPS                                  */
/* ========================================================================== */

export type ValuationStepId =

  | "brand"
  | "model"
  | "details"
  | "ownership"
  | "mileage"
  | "condition"
  | "location";

/* ========================================================================== */
/*                              STEP ORDER                                    */
/* ========================================================================== */

const STEP_ORDER: ValuationStepId[] = [
  "brand",
  "model",
  "details",
  "ownership",
  "mileage",
  "condition",
  "location",
];

/* ========================================================================== */
/*                             STEP FIELD MAP                                 */
/* ========================================================================== */

const STEP_FIELDS:
  Record<
    ValuationStepId,
    (keyof ValuationFormState)[]
  > = {

  brand: [
    "brand",
  ],

  model: [
    "model",
  ],

  details: [
    "year",
    "fuelType",
    "transmission",
  ],

  ownership: [
    "ownership",
  ],

  mileage: [
    "mileage",
  ],

  condition: [
    "condition",
    "conditionIssues",
    "conditionNotes",
  ],


  location: [
    "city",
  ],
};

/* ========================================================================== */
/*                           INITIAL FORM STATE                               */
/* ========================================================================== */

const initialFormState:
  ValuationFormState = {

  vehicleType: null,

  brand: null,

  model: null,

  year: null,

  fuelType: null,

  transmission: null,

  ownership: null,

  mileage: null,

  condition: null,

  conditionIssues: [],

  conditionNotes: "",

  city: null,



  variant: null,
};

/* ========================================================================== */
/*                           INITIAL META STATE                               */
/* ========================================================================== */

const initialMetaState:
  ValuationMetaState = {

  availableFuelTypes: [],

  availableTransmissions: [],

  availableYears: [],
};

/* ========================================================================== */
/*                              CONTEXT TYPE                                  */
/* ========================================================================== */

type ValuationContextType = {

  data:
  ValuationState;

  updateForm: (
    field: keyof ValuationFormState,
    value: any
  ) => void;

  updateMeta: (
    values: Partial<ValuationMetaState>
  ) => void;

  resetData: () => void;
};

/* ========================================================================== */
/*                                  CONTEXT                                   */
/* ========================================================================== */

const ValuationContext =
  createContext<
    ValuationContextType | undefined
  >(undefined);

/* ========================================================================== */
/*                             HELPER FUNCTIONS                               */
/* ========================================================================== */

const getStepByField = (
  field: keyof ValuationFormState
): ValuationStepId | null => {

  for (const step of STEP_ORDER) {

    if (
      STEP_FIELDS[step].includes(field)
    ) {
      return step;
    }
  }

  return null;
};

/* ========================================================================== */
/*                                 PROVIDER                                   */
/* ========================================================================== */

type Props = {
  children: ReactNode;
  vehicleType: string;
};

export function ValuationProvider({
  children,
  vehicleType,
}: Props) {

  /* ----------------------------------------------------------------------- */
  /*                         INITIAL VEHICLE TYPE                            */
  /* ----------------------------------------------------------------------- */

  const initialVehicleType =
    vehicleType
      ? {
        slug: vehicleType,

        name:
          vehicleType.charAt(0).toUpperCase() +
          vehicleType.slice(1),
      }
      : null;

  /* ----------------------------------------------------------------------- */
  /*                                 STATE                                   */
  /* ----------------------------------------------------------------------- */

  const [data, setData] =
    useState<ValuationState>({
      form: {
        ...initialFormState,

        vehicleType:
          initialVehicleType,
      },

      meta:
        initialMetaState,
    });

  /* ----------------------------------------------------------------------- */
  /*                        CHECK DEPENDENT STEPS                            */
  /* ----------------------------------------------------------------------- */

  const hasDependentValues = (
    field: keyof ValuationFormState,
    form: ValuationFormState
  ) => {

    const currentStep =
      getStepByField(field);

    if (!currentStep) {
      return false;
    }

    const currentStepIndex =
      STEP_ORDER.indexOf(currentStep);

    return STEP_ORDER.some(
      (step, index) => {

        if (
          index <= currentStepIndex
        ) {
          return false;
        }

        return STEP_FIELDS[step].some(
          (fieldKey) => {

            const value =
              form[fieldKey];

            if (
              Array.isArray(value)
            ) {
              return value.length > 0;
            }

            return (
              value !== null &&
              value !== ""
            );
          }
        );
      }
    );
  };

  /* ----------------------------------------------------------------------- */
  /*                              APPLY UPDATE                               */
  /* ----------------------------------------------------------------------- */

  const applyFormUpdate = (
    field: keyof ValuationFormState,
    value: any
  ) => {

    setData((prev) => {

      const currentStep =
        getStepByField(field);

      /* SAFE */

      if (!currentStep) {

        return {
          ...prev,

          form: {
            ...prev.form,

            [field]: value,
          },
        };
      }

      const currentStepIndex =
        STEP_ORDER.indexOf(currentStep);

      const nextForm: ValuationFormState = {
        ...prev.form,
        [field]: value,
      };
      /* RESET NEXT STEPS */
      STEP_ORDER.forEach(
        (step, index) => {

          if (
            index <= currentStepIndex
          ) {
            return;
          }
          STEP_FIELDS[step].forEach(
            (fieldKey) => {

              (
                nextForm as Record<
                  keyof ValuationFormState,
                  ValuationFormState[keyof ValuationFormState]
                >
              )[fieldKey] =
                initialFormState[fieldKey];
            }
          );
        }
      );
      /* KEEP VEHICLE TYPE */

      nextForm.vehicleType =
        prev.form.vehicleType;

      return {
        ...prev,

        form: nextForm,
      };
    });
  };

  /* ----------------------------------------------------------------------- */
  /*                              UPDATE FORM                                */
  /* ----------------------------------------------------------------------- */

  const updateForm = (
    field: keyof ValuationFormState,
    value: any
  ) => {

    const shouldConfirm =
      hasDependentValues(
        field,
        data.form
      );

    /* DIRECT UPDATE */

    if (!shouldConfirm) {

      applyFormUpdate(
        field,
        value
      );

      return;
    }

    /* CONFIRMATION */

    useValuationConfirmation
      .getState()
      .openConfirmation({

        title:
          "Change selection?",

        description:
          "Changing this will reset the following vehicle details.",

        onConfirm: () => {

          applyFormUpdate(
            field,
            value
          );
        },
      });
  };

  /* ----------------------------------------------------------------------- */
  /*                              UPDATE META                                */
  /* ----------------------------------------------------------------------- */

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

  /* ----------------------------------------------------------------------- */
  /*                               RESET ALL                                 */
  /* ----------------------------------------------------------------------- */

  const resetData = () => {

    setData({
      form: {
        ...initialFormState,

        vehicleType:
          initialVehicleType,
      },

      meta:
        initialMetaState,
    });
  };

  /* ----------------------------------------------------------------------- */
  /*                                PROVIDER                                 */
  /* ----------------------------------------------------------------------- */

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

/* ========================================================================== */
/*                                   HOOK                                     */
/* ========================================================================== */

export function useValuation() {

  const context =
    useContext(
      ValuationContext
    );

  if (!context) {

    throw new Error(
      "useValuation must be used inside ValuationProvider"
    );
  }

  return context;
}