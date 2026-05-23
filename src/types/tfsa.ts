/**
 * South African TFSA limits (SARS).
 * Annual limit R46,000 from 1 March 2026 (was R36,000 for 2021–2026 tax years).
 * @see https://www.sars.gov.za/types-of-tax/personal-income-tax/tax-free-investments/
 */
export const TFSA_LIMITS = {
  annualContribution: 46_000,
  lifetimeContribution: 500_000,
  /** Tax year the higher annual limit took effect */
  annualLimitEffectiveFrom: "2026-03-01",
} as const;

export interface CalculatorInputs {
  monthlyContribution: number;
  annualContribution: number;
  expectedAnnualReturn: number;
  yearsInvested: number;
  currentBalance: number;
  inflationRate: number;
}

export interface YearProjection {
  year: number;
  contributions: number;
  balance: number;
  growth: number;
  realBalance: number;
  cumulativeContributions: number;
}

export interface CalculatorResult {
  futureValue: number;
  realFutureValue: number;
  totalContributions: number;
  totalGrowth: number;
  estimatedTaxSavings: number;
  yearlyProjections: YearProjection[];
  limitWarnings: LimitWarning[];
  remainingAnnualRoom: number;
  remainingLifetimeRoom: number;
  milestones: MilestoneEstimate[];
}

export interface LimitWarning {
  type: "annual" | "lifetime";
  severity: "warning" | "error";
  message: string;
  simpleMessage: string;
}

export interface MilestoneEstimate {
  amount: number;
  label: string;
  yearsToReach: number | null;
  reached: boolean;
}

export interface LessonSection {
  heading: string;
  simpleHeading: string;
  paragraphs: string[];
  simpleParagraphs: string[];
}

export interface EducationalCard {
  id: string;
  title: string;
  simpleTitle: string;
  icon: string;
  body: string;
  simpleBody: string;
  analogy?: string;
  simpleAnalogy?: string;
  sections: LessonSection[];
  keyTakeaways: string[];
  simpleKeyTakeaways: string[];
  /** Optional official links for this topic */
  sourceKeys?: Array<keyof typeof import("@/content/sources").SOURCES>;
}

/** Where Ikageng appears — maps to narration + visual props */
export type IkagengScene =
  | "home"
  | "learn"
  | "calculate"
  | "inflation"
  | `topic-${string}`;

export interface InflationExample {
  item: string;
  thenPrice: number;
  nowPrice: number;
  yearThen: number;
  yearNow: number;
  sourceNote: string;
  sourceHref?: string;
}

export type AppView =
  | "home"
  | "learn"
  | "calculate"
  | "inflation"
  | `topic-${string}`;

