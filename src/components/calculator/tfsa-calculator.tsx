"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { useSimpleMode } from "@/context/simple-mode-context";
import { useCalculator } from "@/context/calculator-context";
import { formatZAR, formatPercent } from "@/lib/utils";
import { TFSA_LIMITS } from "@/types/tfsa";
import { TFSA_SOURCE_LINKS } from "@/content/sources";
import { SourceLinks } from "@/components/ui/source-links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { GrowthChart } from "@/components/charts/growth-chart";
import { LimitWarnings } from "./limit-warnings";
import { ContributionRoom } from "./contribution-room";
import { MilestoneCards } from "./milestone-cards";
function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  prefix,
  max,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  max?: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {hint && (
        <p className="text-xs text-[var(--color-muted-foreground)]">{hint}</p>
      )}
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--color-muted-foreground)]">
            {prefix}
          </span>
        )}
        <Input
          id={id}
          type="number"
          min={0}
          max={max}
          className={prefix ? "pl-8" : undefined}
          value={value || ""}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        />
      </div>
    </div>
  );
}

export function TfsaCalculator() {
  const { simpleMode } = useSimpleMode();
  const { inputs, result, updateInput } = useCalculator();
  const [showRealOnChart, setShowRealOnChart] = useState(false);

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[var(--color-primary)]">
          <Calculator className="h-5 w-5" aria-hidden />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Calculator
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {simpleMode ? "Play with numbers" : "TFSA growth calculator"}
        </h2>
        <p className="leading-relaxed text-[var(--color-muted-foreground)]">
          {simpleMode
            ? "Move the sliders and see what might happen. These are guesses, not promises."
            : "Explore how regular contributions and compounding could grow over time. Estimates only — not advice."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {simpleMode ? "Your plan" : "Your inputs"}
            </CardTitle>
            <CardDescription>
              Annual limit: {formatZAR(TFSA_LIMITS.annualContribution)} ·
              Lifetime: {formatZAR(TFSA_LIMITS.lifetimeContribution)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <NumberField
              id="monthly"
              label={simpleMode ? "Each month you add" : "Monthly contribution"}
              hint={`Max ~${formatZAR(TFSA_LIMITS.annualContribution / 12)}/month to stay under annual cap`}
              prefix="R"
              value={inputs.monthlyContribution}
              onChange={(v) => updateInput("monthlyContribution", v)}
              max={TFSA_LIMITS.annualContribution}
            />
            <NumberField
              id="annual-extra"
              label={simpleMode ? "Extra once this year" : "Extra annual contribution (this year)"}
              prefix="R"
              value={inputs.annualContribution}
              onChange={(v) => updateInput("annualContribution", v)}
              max={TFSA_LIMITS.annualContribution}
            />
            <NumberField
              id="current"
              label={simpleMode ? "Already saved" : "Current TFSA balance"}
              prefix="R"
              value={inputs.currentBalance}
              onChange={(v) => updateInput("currentBalance", v)}
            />

            <div className="space-y-2">
              <Label>
                {simpleMode ? "Growth per year (guess)" : "Expected annual return (%)"}
              </Label>
              <Slider
                value={[inputs.expectedAnnualReturn]}
                onValueChange={([v]) => updateInput("expectedAnnualReturn", v)}
                min={4}
                max={14}
                step={0.5}
              />
              <p className="text-center text-sm font-medium">
                {formatPercent(inputs.expectedAnnualReturn)}
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)]">
                Historical equity returns vary widely. Use conservative guesses for planning.
              </p>
            </div>

            <div className="space-y-2">
              <Label>{simpleMode ? "How many years" : "Years invested"}</Label>
              <Slider
                value={[inputs.yearsInvested]}
                onValueChange={([v]) => updateInput("yearsInvested", v)}
                min={1}
                max={40}
                step={1}
              />
              <p className="text-center text-sm font-medium">
                {inputs.yearsInvested} years
              </p>
            </div>

            <LimitWarnings warnings={result.limitWarnings} />
            <ContributionRoom
              remainingAnnual={result.remainingAnnualRoom}
              remainingLifetime={result.remainingLifetimeRoom}
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <motion.div
            layout
            className="grid gap-3 sm:grid-cols-2"
          >
            <ResultCard
              label={simpleMode ? "Maybe one day" : "Estimated future value"}
              value={formatZAR(result.futureValue)}
              large
            />
            <ResultCard
              label={simpleMode ? "Like today's money" : "Inflation-adjusted"}
              value={formatZAR(result.realFutureValue)}
            />
            <ResultCard
              label={simpleMode ? "You put in" : "Total contributions"}
              value={formatZAR(result.totalContributions)}
            />
            <ResultCard
              label={simpleMode ? "Extra from growth" : "Estimated growth"}
              value={formatZAR(result.totalGrowth)}
            />
          </motion.div>

          <Card className="bg-[var(--color-accent)]/50">
            <CardContent className="p-4">
              <p className="text-sm">
                <span className="font-medium">
                  {simpleMode ? "Tax you might skip: " : "Illustrative tax savings on growth: "}
                </span>
                {formatZAR(result.estimatedTaxSavings)}
              </p>
              <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                Assumes ~27% tax on growth in a taxable account. Your situation may differ.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
          <div>
            <CardTitle>
              {simpleMode ? "Watch it grow" : "Compounding over time"}
            </CardTitle>
            <CardDescription>
              {simpleMode
                ? "Green = growth. Grey = money you added."
                : "Stacked view: contributions vs investment growth"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="real-chart" className="text-xs">
              Show inflation-adjusted line
            </Label>
            <Switch
              id="real-chart"
              checked={showRealOnChart}
              onCheckedChange={setShowRealOnChart}
            />
          </div>
        </CardHeader>
        <CardContent>
          <GrowthChart
            projections={result.yearlyProjections}
            showRealValue={showRealOnChart}
          />
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          {simpleMode ? "Big moments" : "Milestone simulation"}
        </h3>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {simpleMode
            ? "Compounding starts slow, then speeds up — like a snowball."
            : "Compounding often feels slow early on, then accelerates as your balance grows."}
        </p>
        <MilestoneCards milestones={result.milestones} />
      </div>

      <p className="rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)]/50 px-4 py-3 text-sm text-[var(--color-muted-foreground)]">
        {simpleMode
          ? "Want to see how inflation changes what your money can buy? Open Inflation in the menu."
          : "For purchasing-power analysis, open the Inflation section in the sidebar — it uses these same inputs."}
      </p>

      <SourceLinks sources={TFSA_SOURCE_LINKS} compact />
    </section>
  );
}

function ResultCard({
  label,
  value,
  large,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm">
      <p className="text-xs font-medium text-[var(--color-muted-foreground)]">
        {label}
      </p>
      <p
        className={`mt-1 font-bold text-[var(--color-primary)] ${
          large ? "text-2xl sm:text-3xl" : "text-xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
