"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { calculateTFSA, getDefaultInputs } from "@/lib/tfsa-calculator";
import type { CalculatorInputs, CalculatorResult } from "@/types/tfsa";

interface CalculatorContextValue {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
  updateInput: <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => void;
  result: CalculatorResult;
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputs] = useState<CalculatorInputs>(getDefaultInputs);
  const result = useMemo(() => calculateTFSA(inputs), [inputs]);

  const updateInput = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => setInputs((prev) => ({ ...prev, [key]: value }));

  return (
    <CalculatorContext.Provider
      value={{ inputs, setInputs, updateInput, result }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx) {
    throw new Error("useCalculator must be used within CalculatorProvider");
  }
  return ctx;
}
