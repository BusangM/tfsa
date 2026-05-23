"use client";

import { TFSA_LIMITS } from "@/types/tfsa";
import { formatZAR } from "@/lib/utils";
import { useSimpleMode } from "@/context/simple-mode-context";

interface ContributionRoomProps {
  remainingAnnual: number;
  remainingLifetime: number;
}

export function ContributionRoom({
  remainingAnnual,
  remainingLifetime,
}: ContributionRoomProps) {
  const { simpleMode } = useSimpleMode();
  const annualPct =
    ((TFSA_LIMITS.annualContribution - remainingAnnual) /
      TFSA_LIMITS.annualContribution) *
    100;
  const lifetimePct =
    ((TFSA_LIMITS.lifetimeContribution - remainingLifetime) /
      TFSA_LIMITS.lifetimeContribution) *
    100;

  return (
    <div className="space-y-4 rounded-xl bg-[var(--color-muted)] p-4">
      <p className="text-sm font-medium">
        {simpleMode ? "Room left to put in" : "Contribution room (estimate)"}
      </p>

      <RoomBar
        label={
          simpleMode
            ? "This year"
            : `Annual limit (${formatZAR(TFSA_LIMITS.annualContribution)})`
        }
        usedPct={Math.min(100, annualPct)}
        remaining={remainingAnnual}
      />
      <RoomBar
        label={simpleMode ? "Your whole life" : "Lifetime limit (R500,000)"}
        usedPct={Math.min(100, lifetimePct)}
        remaining={remainingLifetime}
      />

      <p className="text-xs text-[var(--color-muted-foreground)]">
        {simpleMode
          ? "These numbers are guesses based on what you typed. Check your real TFSA statements too."
          : "Based on your inputs only — always confirm with your provider and SARS records."}
      </p>
    </div>
  );
}

function RoomBar({
  label,
  usedPct,
  remaining,
}: {
  label: string;
  usedPct: number;
  remaining: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span className="font-medium">{formatZAR(remaining)} left</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-card)]">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
          style={{ width: `${usedPct}%` }}
        />
      </div>
    </div>
  );
}
