import type { InflationExample } from "@/types/tfsa";

/**
 * SA inflation context for education.
 * CPI is measured by Stats SA; SARB targets 3–6% headline CPI (midpoint 4.5%).
 */
export const SA_INFLATION_CONTEXT = {
  /** Midpoint of SARB 3–6% target band — used as a planning default */
  longTermAverage: 5.5,
  sarbTargetLow: 3,
  sarbTargetHigh: 6,
  description:
    "Inflation means the same rand buys less over time. In South Africa, headline CPI is published monthly by Statistics South Africa. The Reserve Bank aims to keep inflation between 3% and 6%. Over the long run, many planners use roughly 5–6% when stress-testing savings — but actual inflation jumps around year to year.",
  simpleDescription:
    "Things usually get a bit more expensive each year. In South Africa, prices are tracked by Stats SA, and the Reserve Bank tries to keep inflation from running too high. When you plan for the future, it's smart to ask: will my savings grow faster than prices?",
  whyItMatters:
    "If your investments only match inflation, your wealth isn't really growing in buying power. If returns are below inflation, you're going backwards — even if the number on your statement looks bigger.",
  simpleWhyItMatters:
    "If prices rise faster than your money grows, you can afford less later — even with a bigger number on screen.",
} as const;

export const INFLATION_EXAMPLES: InflationExample[] = [
  {
    item: "Loaf of bread (white, approx.)",
    thenPrice: 5,
    nowPrice: 18,
    yearThen: 2005,
    yearNow: 2024,
    sourceNote: "Illustrative retail range; actual prices vary by brand and province",
    sourceHref:
      "https://www.statssa.gov.za/?page_id=1854&PPN=P0141",
  },
  {
    item: "Petrol (95 octane, per litre)",
    thenPrice: 6,
    nowPrice: 23,
    yearThen: 2005,
    yearNow: 2024,
    sourceNote: "Illustrative pump prices; driven by oil, rand, and levies",
    sourceHref: "https://www.dmre.gov.za/",
  },
  {
    item: "Rent (1-bed flat, major metro, approx.)",
    thenPrice: 3500,
    nowPrice: 8500,
    yearThen: 2010,
    yearNow: 2024,
    sourceNote: "Broad illustrative range; actual rent varies widely",
    sourceHref:
      "https://www.statssa.gov.za/?page_id=1854&PPN=P0141",
  },
];

export function toRealValue(
  nominalAmount: number,
  years: number,
  inflationRatePercent: number
): number {
  const factor = Math.pow(1 + inflationRatePercent / 100, years);
  return Math.round(nominalAmount / factor);
}

export function realReturn(
  nominalReturnPercent: number,
  inflationPercent: number
): number {
  return (
    ((1 + nominalReturnPercent / 100) / (1 + inflationPercent / 100) - 1) *
    100
  );
}
