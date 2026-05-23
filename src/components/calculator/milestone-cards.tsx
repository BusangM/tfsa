"use client";

import { motion } from "framer-motion";
import { Flag, Rocket, Star } from "lucide-react";
import { useSimpleMode } from "@/context/simple-mode-context";
import { formatZAR } from "@/lib/utils";
import type { MilestoneEstimate } from "@/types/tfsa";

const ICONS = [Flag, Star, Rocket];

interface MilestoneCardsProps {
  milestones: MilestoneEstimate[];
}

export function MilestoneCards({ milestones }: MilestoneCardsProps) {
  const { simpleMode } = useSimpleMode();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {milestones.map((m, i) => {
        const Icon = ICONS[i] ?? Flag;
        return (
          <motion.div
            key={m.amount}
            layout
            className="rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2 text-[var(--color-primary)]">
              <Icon className="h-4 w-4" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Milestone
              </span>
            </div>
            <p className="font-semibold">{m.label}</p>
            {m.reached ? (
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                {simpleMode
                  ? "You already passed this! 🎉"
                  : "You've already reached this level."}
              </p>
            ) : m.yearsToReach != null ? (
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                {simpleMode
                  ? `About ${m.yearsToReach} years on this plan`
                  : `Estimated ~${m.yearsToReach} years at your current inputs`}
              </p>
            ) : (
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                {simpleMode
                  ? "Keep going — this takes longer on this plan"
                  : "Not reached within your selected timeline — try more time or contributions."}
              </p>
            )}
            <p className="mt-2 text-lg font-bold text-[var(--color-primary)]">
              {formatZAR(m.amount)}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
