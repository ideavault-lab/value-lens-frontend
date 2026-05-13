"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
type SelectOption = {
  id: string;
  name: string;
};

type VehicleTypeOption = {
  slug: string;
  name: string;
};

export type ValuationState = {

  vehicleType: VehicleTypeOption | null;

  brand: SelectOption | null;

  model: SelectOption | null;

  city: SelectOption | null;

  variant: SelectOption | null;

  fuelType: SelectOption | null;

  transmission: SelectOption | null;
  
condition: SelectOption | null;

  ownership: SelectOption | null;

  year: number | null;

  mileage: number | null;
};

type ValuationContextType = {

  data: ValuationState;

  updateData: (
    values: Partial<ValuationState>
  ) => void;

  resetData: () => void;
};

const initialState: ValuationState = {

  vehicleType: null,

  brand: null,

  model: null,

  year: null,

  fuelType: null,

  transmission: null,

  mileage: null,

  condition: null,

  ownership: null,

  city: null,

  variant: null,
};

const ValuationContext =
  createContext<
    ValuationContextType | undefined
  >(undefined);

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
      ...initialState,
      vehicleType : vehicleType ? {
        slug: vehicleType,
        name: vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1),
      } : null,
    });

  const updateData = (
    values: Partial<ValuationState>
  ) => {

    setData((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const resetData = () => {

    setData({
      ...initialState,
      vehicleType : vehicleType ? {
        slug: vehicleType,
        name: vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1),
      } : null,
    });
  };

  return (
    <ValuationContext.Provider
      value={{
        data,
        updateData,
        resetData,
      }}
    >
      {children}
    </ValuationContext.Provider>
  );
}

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