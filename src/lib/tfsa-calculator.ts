import {
  TFSA_LIMITS,
  type CalculatorInputs,
  type CalculatorResult,
  type LimitWarning,
  type MilestoneEstimate,
  type YearProjection,
} from "@/types/tfsa";

const MILESTONES = [
  { amount: 10_000, label: "First R10,000" },
  { amount: 100_000, label: "First R100,000" },
  { amount: 1_000_000, label: "First R1 million" },
] as const;

/** Estimated marginal tax rate for illustrative tax-savings (user-editable later) */
const DEFAULT_TAX_RATE = 0.27;

/**
 * Project TFSA growth year-by-year with monthly contributions.
 * Uses standard compound growth with monthly compounding.
 */
export function calculateTFSA(inputs: CalculatorInputs): CalculatorResult {
  const {
    monthlyContribution,
    annualContribution,
    expectedAnnualReturn,
    yearsInvested,
    currentBalance,
    inflationRate,
  } = inputs;

  const monthlyRate = expectedAnnualReturn / 100 / 12;
  const inflationFactor = 1 + inflationRate / 100;
  const yearlyProjections: YearProjection[] = [];
  let balance = currentBalance;
  let cumulativeContributions = currentBalance;

  const limitWarnings = buildLimitWarnings(inputs);

  for (let year = 1; year <= yearsInvested; year++) {
    const yearContribution =
      monthlyContribution * 12 + (year === 1 ? annualContribution : 0);

    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }
    if (year === 1 && annualContribution > 0) {
      balance += annualContribution;
    }

    cumulativeContributions += yearContribution;
    const growth = balance - cumulativeContributions - currentBalance;
    const realBalance = balance / Math.pow(inflationFactor, year);

    yearlyProjections.push({
      year,
      contributions: cumulativeContributions,
      balance: Math.round(balance),
      growth: Math.round(Math.max(0, growth)),
      realBalance: Math.round(realBalance),
      cumulativeContributions: Math.round(cumulativeContributions),
    });
  }

  const futureValue = Math.round(balance);
  const realFutureValue = Math.round(
    balance / Math.pow(inflationFactor, yearsInvested)
  );
  const totalContributions =
    currentBalance +
    monthlyContribution * 12 * yearsInvested +
    annualContribution;
  const totalGrowth = Math.max(0, futureValue - totalContributions);

  // Illustrative: tax saved on growth if it were in a taxable account
  const estimatedTaxSavings = Math.round(
    totalGrowth * DEFAULT_TAX_RATE
  );

  const remainingAnnualRoom = Math.max(
    0,
    TFSA_LIMITS.annualContribution -
      (monthlyContribution * 12 + annualContribution)
  );
  const remainingLifetimeRoom = Math.max(
    0,
    TFSA_LIMITS.lifetimeContribution - totalContributions
  );

  const milestones = estimateMilestones(
    yearlyProjections,
    currentBalance
  );

  return {
    futureValue,
    realFutureValue,
    totalContributions: Math.round(totalContributions),
    totalGrowth,
    estimatedTaxSavings,
    yearlyProjections,
    limitWarnings,
    remainingAnnualRoom,
    remainingLifetimeRoom,
    milestones,
  };
}

function buildLimitWarnings(inputs: CalculatorInputs): LimitWarning[] {
  const warnings: LimitWarning[] = [];
  const annualTotal =
    inputs.monthlyContribution * 12 + inputs.annualContribution;

  if (annualTotal > TFSA_LIMITS.annualContribution) {
    warnings.push({
      type: "annual",
      severity: "error",
      message: `Your planned contributions (R${annualTotal.toLocaleString()}) exceed the annual limit of R${TFSA_LIMITS.annualContribution.toLocaleString()}. SARS may charge a penalty of 40% on excess amounts.`,
      simpleMessage:
        "You're trying to put in more than the rules allow this year. You might have to pay a big penalty on the extra money.",
    });
  } else if (annualTotal > TFSA_LIMITS.annualContribution * 0.9) {
    warnings.push({
      type: "annual",
      severity: "warning",
      message: `You're close to the annual limit (R${TFSA_LIMITS.annualContribution.toLocaleString()}).`,
      simpleMessage:
        "You're almost at the max you can put in this year. Slow down a bit so you don't go over.",
    });
  }

  const projectedLifetime =
    inputs.currentBalance +
    annualTotal * inputs.yearsInvested;

  if (projectedLifetime > TFSA_LIMITS.lifetimeContribution) {
    warnings.push({
      type: "lifetime",
      severity: "error",
      message: `Your projected lifetime contributions may exceed R${TFSA_LIMITS.lifetimeContribution.toLocaleString()}. Once you reach the lifetime cap, you cannot add more (but your money can keep growing).`,
      simpleMessage:
        "Over your whole life, there's a limit on how much you can put in. You might hit that cap before your plan ends.",
    });
  }

  return warnings;
}

function estimateMilestones(
  projections: YearProjection[],
  startingBalance: number
): MilestoneEstimate[] {
  return MILESTONES.map(({ amount, label }) => {
    if (startingBalance >= amount) {
      return { amount, label, yearsToReach: 0, reached: true };
    }
    const idx = projections.findIndex((p) => p.balance >= amount);
    return {
      amount,
      label,
      yearsToReach: idx >= 0 ? projections[idx].year : null,
      reached: idx >= 0,
    };
  });
}

/** Default calculator inputs for first load */
export function getDefaultInputs(): CalculatorInputs {
  return {
    monthlyContribution: 1500,
    annualContribution: 0,
    expectedAnnualReturn: 10,
    yearsInvested: 25,
    currentBalance: 0,
    inflationRate: 5,
  };
}
