import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format ZAR currency for display */
export function formatZAR(amount: number, compact = false): string {
  if (compact && Math.abs(amount) >= 1_000_000) {
    return `R${(amount / 1_000_000).toFixed(1)}m`;
  }
  if (compact && Math.abs(amount) >= 10_000) {
    return `R${(amount / 1_000).toFixed(0)}k`;
  }
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format percentage */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}
