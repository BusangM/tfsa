"use client";

import { useSimpleMode } from "@/context/simple-mode-context";
import { Button } from "@/components/ui/button";
import type { AppView } from "@/types/tfsa";
import { BookOpen, Calculator } from "lucide-react";
import { IKAGENG_NAME, IKAGENG_TAGLINE } from "@/content/ikageng";

interface HeroSectionProps {
  onNavigate: (view: AppView) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const { simpleMode } = useSimpleMode();

  return (
    <section className="mx-auto max-w-2xl space-y-8 py-4 sm:py-8">
      <p className="text-sm text-[var(--color-muted-foreground)]">
        Meet{" "}
        <span className="font-medium text-[var(--color-primary)]">
          {IKAGENG_NAME}
        </span>{" "}
        — {IKAGENG_TAGLINE.toLowerCase()}. Look for the floating leaf in the
        corner; tap it anytime for a quick, friendly rundown of the page you&apos;re
        on.
      </p>

      <div className="space-y-4">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {simpleMode ? (
            <>
              Learn about TFSAs
              <span className="block text-[var(--color-primary)]">
                one step at a time
              </span>
            </>
          ) : (
            <>
              Your calm guide to
              <span className="block text-[var(--color-primary)]">
                tax-free savings in South Africa
              </span>
            </>
          )}
        </h2>

        <p className="text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          {simpleMode
            ? "Pick a lesson from the menu, or try the calculator when you're ready. No rush — learn first, numbers second."
            : "Work through short lessons in the sidebar, then use the calculator when you want to model your own numbers. Built for beginners, not traders."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onNavigate("learn")}
          className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-left shadow-sm transition-shadow hover:shadow-md"
        >
          <BookOpen
            className="h-8 w-8 text-[var(--color-primary)]"
            aria-hidden
          />
          <h3 className="mt-4 text-lg font-semibold">
            {simpleMode ? "Start learning" : "Start with lessons"}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            {simpleMode
              ? "Six short topics about TFSAs, limits, and growth."
              : "Six focused topics — one at a time, with official sources."}
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-[var(--color-primary)] group-hover:underline">
            Open lessons →
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("calculate")}
          className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-left shadow-sm transition-shadow hover:shadow-md"
        >
          <Calculator
            className="h-8 w-8 text-[var(--color-primary)]"
            aria-hidden
          />
          <h3 className="mt-4 text-lg font-semibold">
            {simpleMode ? "Try the calculator" : "Open the calculator"}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            {simpleMode
              ? "Slide numbers around and see what might happen."
              : "Model contributions, limits, and growth — estimates only."}
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-[var(--color-primary)] group-hover:underline">
            Calculate →
          </span>
        </button>
      </div>

      <div className="rounded-xl border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-4 py-3">
        <p className="text-sm leading-relaxed">
          <span className="font-medium text-[var(--color-foreground)]">
            {simpleMode ? "About inflation: " : "Don't skip inflation — "}
          </span>
          {simpleMode
            ? "Prices rise over time. See the Inflation section in the menu after you've tried the calculator."
            : "Nominal growth can look impressive while buying power lags. Use the dedicated Inflation section in the sidebar — with links to Stats SA and the Reserve Bank."}
        </p>
        <Button
          variant="ghost"
          className="mt-1 h-auto p-0 text-[var(--color-primary)]"
          onClick={() => onNavigate("inflation")}
        >
          {simpleMode ? "Go to inflation" : "Explore inflation & purchasing power →"}
        </Button>
      </div>
    </section>
  );
}
