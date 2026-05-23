"use client";

import { useMemo } from "react";
import { ShoppingBasket, TrendingDown } from "lucide-react";
import { useSimpleMode } from "@/context/simple-mode-context";
import {
  INFLATION_EXAMPLES,
  SA_INFLATION_CONTEXT,
  realReturn,
} from "@/lib/inflation";
import { INFLATION_SOURCE_LINKS } from "@/content/sources";
import { formatZAR, formatPercent } from "@/lib/utils";
import { SourceLinks } from "@/components/ui/source-links";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface InflationSectionProps {
  inflationRate: number;
  onInflationChange: (rate: number) => void;
  futureValue: number;
  realFutureValue: number;
  years: number;
  nominalReturn: number;
  prominent?: boolean;
  onOpenCalculator?: () => void;
}

export function InflationSection({
  inflationRate,
  onInflationChange,
  futureValue,
  realFutureValue,
  years,
  nominalReturn,
  prominent,
  onOpenCalculator,
}: InflationSectionProps) {
  const { simpleMode } = useSimpleMode();
  const real = useMemo(
    () => realReturn(nominalReturn, inflationRate),
    [nominalReturn, inflationRate]
  );

  const gap = futureValue - realFutureValue;
  const gapPercent =
    futureValue > 0 ? Math.round((gap / futureValue) * 100) : 0;

  return (
    <section className="mx-auto max-w-2xl space-y-8">
      {prominent && (
        <div className="rounded-xl border-2 border-[var(--color-primary)]/30 bg-[var(--color-secondary)]/50 p-5">
          <div className="flex items-start gap-3">
            <TrendingDown
              className="mt-0.5 h-6 w-6 shrink-0 text-[var(--color-primary)]"
              aria-hidden
            />
            <div className="space-y-2">
              <p className="font-semibold text-[var(--color-foreground)]">
                {simpleMode
                  ? "The number on paper isn't what you can buy"
                  : "Why inflation belongs in every TFSA plan"}
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {simpleMode
                  ? SA_INFLATION_CONTEXT.simpleWhyItMatters
                  : SA_INFLATION_CONTEXT.whyItMatters}
              </p>
            </div>
          </div>
        </div>
      )}

      <header className="space-y-2">
        <div className="flex items-center gap-2 text-[var(--color-primary)]">
          <ShoppingBasket className="h-5 w-5" aria-hidden />
          <span className="text-sm font-medium">
            {simpleMode ? "Prices & buying power" : "Inflation & purchasing power"}
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {simpleMode
            ? "Will your money keep up with prices?"
            : "Nominal growth vs what you can actually afford"}
        </h2>
        <p className="leading-relaxed text-[var(--color-muted-foreground)]">
          {simpleMode
            ? SA_INFLATION_CONTEXT.simpleDescription
            : SA_INFLATION_CONTEXT.description}
        </p>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {simpleMode
            ? `The Reserve Bank tries to keep inflation between ${SA_INFLATION_CONTEXT.sarbTargetLow}% and ${SA_INFLATION_CONTEXT.sarbTargetHigh}% per year.`
            : `SARB inflation target: ${SA_INFLATION_CONTEXT.sarbTargetLow}%–${SA_INFLATION_CONTEXT.sarbTargetHigh}% (headline CPI, Stats SA).`}
        </p>
      </header>

      <SourceLinks
        sources={INFLATION_SOURCE_LINKS}
        title="Official inflation data & policy"
      />

      <Card className="border-[var(--color-primary)]/25">
        <CardHeader>
          <CardTitle className="text-base">
            {simpleMode
              ? "Your calculator numbers, in today's money"
              : "Linked to your calculator inputs"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {onOpenCalculator && (
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {simpleMode
                ? "These use the same years and growth you set in the calculator."
                : "Figures below use your current calculator scenario. Adjust inputs in the calculator, then return here."}
              {" "}
              <Button
                variant="ghost"
                className="h-auto p-0"
                onClick={onOpenCalculator}
              >
                Open calculator
              </Button>
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <ValueBox
              label={
                simpleMode ? "Future number (on paper)" : "Future value (nominal)"
              }
              value={formatZAR(futureValue)}
              sub={`After ${years} years at your chosen return`}
            />
            <ValueBox
              label={
                simpleMode ? "Feels like today" : "Today's purchasing power"
              }
              value={formatZAR(realFutureValue)}
              sub={`Adjusted for ${inflationRate}% inflation per year`}
              highlight
            />
          </div>

          {gap > 0 && (
            <p className="rounded-lg bg-[var(--color-muted)] px-4 py-3 text-sm">
              {simpleMode ? (
                <>
                  About <strong>{formatZAR(gap)}</strong> of your future total (
                  {gapPercent}%) is &quot;paper growth&quot; that inflation may
                  eat — unless your returns beat price rises.
                </>
              ) : (
                <>
                  Inflation may erode roughly <strong>{formatZAR(gap)}</strong>{" "}
                  ({gapPercent}%) of your nominal outcome in buying-power terms.
                  Beating inflation — not just growing the balance — is the goal
                  of long-term investing.
                </>
              )}
            </p>
          )}

          <p className="text-xs text-[var(--color-muted-foreground)]">
            Real return (estimate): {formatPercent(real)} per year after
            inflation. Illustrative only — not financial advice.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <Label>
          {simpleMode ? "Guess inflation per year" : "Assumed inflation rate (%)"}
        </Label>
        <Slider
          value={[inflationRate]}
          onValueChange={([v]) => onInflationChange(v)}
          min={2}
          max={12}
          step={0.5}
        />
        <p className="text-center text-sm font-medium">{inflationRate}% per year</p>
        <p className="text-xs text-[var(--color-muted-foreground)]">
          Planning default ~{SA_INFLATION_CONTEXT.longTermAverage}% reflects
          long-run SA experience; recent CPI has been lower — check Stats SA for
          current releases.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">
          {simpleMode ? "Prices went up (examples)" : "Illustrative price changes"}
        </h3>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Rounded examples for teaching — not live prices. See sources for
          official CPI data.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {INFLATION_EXAMPLES.map((ex) => (
            <Card key={ex.item}>
              <CardContent className="p-4">
                <p className="font-medium">{ex.item}</p>
                <p className="mt-2 text-sm">
                  <span className="text-[var(--color-muted-foreground)]">
                    {ex.yearThen}:{" "}
                  </span>
                  {formatZAR(ex.thenPrice)}
                </p>
                <p className="text-sm">
                  <span className="text-[var(--color-muted-foreground)]">
                    {ex.yearNow}:{" "}
                  </span>
                  <span className="font-semibold text-[var(--color-primary)]">
                    {formatZAR(ex.nowPrice)}
                  </span>
                </p>
                <p className="mt-2 text-[10px] leading-snug text-[var(--color-muted-foreground)]">
                  {ex.sourceNote}
                </p>
                {ex.sourceHref && (
                  <a
                    href={ex.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[10px] text-[var(--color-primary)] hover:underline"
                  >
                    Reference →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueBox({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        highlight
          ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
          : "bg-[var(--color-muted)]"
      }`}
    >
      <p
        className={`text-xs font-medium ${highlight ? "opacity-80" : "text-[var(--color-muted-foreground)]"}`}
      >
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p
        className={`mt-1 text-xs ${highlight ? "opacity-75" : "text-[var(--color-muted-foreground)]"}`}
      >
        {sub}
      </p>
    </div>
  );
}
