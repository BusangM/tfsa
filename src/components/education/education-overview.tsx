"use client";

import { useSimpleMode } from "@/context/simple-mode-context";
import { EDUCATION_CARDS } from "@/content/education";
import { TFSA_SOURCE_LINKS } from "@/content/sources";
import { SourceLinks } from "@/components/ui/source-links";
import {
  AlertTriangle,
  Clock,
  Layers,
  PiggyBank,
  Shield,
  TrendingUp,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  PiggyBank,
  Shield,
  AlertTriangle,
  TrendingUp,
  Layers,
  Clock,
};

interface EducationOverviewProps {
  onSelectTopic: (id: string) => void;
}

export function EducationOverview({ onSelectTopic }: EducationOverviewProps) {
  const { simpleMode } = useSimpleMode();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {simpleMode ? "Lessons" : "Learning path"}
        </h2>
        <p className="text-[var(--color-muted-foreground)]">
          {simpleMode
            ? "Tap one topic. Read it slowly. Move on when it makes sense."
            : "Choose one topic from the list. Each lesson stands alone — work through them in any order."}
        </p>
      </header>

      <ul className="space-y-2">
        {EDUCATION_CARDS.map((card, index) => {
          const Icon = ICON_MAP[card.icon] ?? PiggyBank;
          const title = simpleMode ? card.simpleTitle : card.title;

          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => onSelectTopic(card.id)}
                className="flex w-full items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-left transition-colors hover:border-[var(--color-primary)]/40"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-secondary)] text-sm font-medium text-[var(--color-primary)]">
                  {index + 1}
                </span>
                <Icon
                  className="h-5 w-5 shrink-0 text-[var(--color-muted-foreground)]"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 font-medium">{title}</span>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)]"
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>

      <SourceLinks sources={TFSA_SOURCE_LINKS} />
    </div>
  );
}
