"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface SimpleModeContextValue {
  simpleMode: boolean;
  setSimpleMode: (value: boolean) => void;
  toggleSimpleMode: () => void;
}

const SimpleModeContext = createContext<SimpleModeContextValue | null>(null);

export function SimpleModeProvider({ children }: { children: ReactNode }) {
  const [simpleMode, setSimpleMode] = useState(false);

  return (
    <SimpleModeContext.Provider
      value={{
        simpleMode,
        setSimpleMode,
        toggleSimpleMode: () => setSimpleMode((v) => !v),
      }}
    >
      {children}
    </SimpleModeContext.Provider>
  );
}

export function useSimpleMode() {
  const ctx = useContext(SimpleModeContext);
  if (!ctx) {
    throw new Error("useSimpleMode must be used within SimpleModeProvider");
  }
  return ctx;
}
