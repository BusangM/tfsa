"use client";

import { AlertCircle, AlertTriangle } from "lucide-react";
import { useSimpleMode } from "@/context/simple-mode-context";
import type { LimitWarning } from "@/types/tfsa";

interface LimitWarningsProps {
  warnings: LimitWarning[];
}

export function LimitWarnings({ warnings }: LimitWarningsProps) {
  const { simpleMode } = useSimpleMode();

  if (warnings.length === 0) return null;

  return (
    <div className="space-y-2" role="alert">
      {warnings.map((w, i) => {
        const isError = w.severity === "error";
        const Icon = isError ? AlertCircle : AlertTriangle;
        const message = simpleMode ? w.simpleMessage : w.message;

        return (
          <div
            key={`${w.type}-${i}`}
            className={`flex gap-3 rounded-xl border px-4 py-3 text-sm ${
              isError
                ? "border-red-200 bg-red-50 text-red-900"
                : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p className="leading-relaxed">{message}</p>
          </div>
        );
      })}
    </div>
  );
}
