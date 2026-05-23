/** Authoritative and educational links — verify periodically. */
export interface SourceLink {
  label: string;
  href: string;
  publisher: string;
}

export const SOURCES = {
  sarsTfsa: {
    label: "SARS — Tax-free investments",
    href: "https://www.sars.gov.za/types-of-tax/personal-income-tax/tax-free-investments/",
    publisher: "SARS",
  },
  sarsBudget2026: {
    label: "National Treasury — Budget Review 2026",
    href: "https://www.treasury.gov.za/documents/national%20budget/2026/review/",
    publisher: "National Treasury",
  },
  statsSaCpi: {
    label: "Statistics South Africa — CPI",
    href: "https://www.statssa.gov.za/?page_id=1854&PPN=P0141",
    publisher: "Stats SA",
  },
  statsSaInflation: {
    label: "Stats SA — Inflation (P0141)",
    href: "https://www.statssa.gov.za/?p=1416",
    publisher: "Stats SA",
  },
  sarbMonetaryPolicy: {
    label: "SARB — Monetary policy & inflation target",
    href: "https://www.resbank.co.za/en/home/what-we-do/monetary-policy",
    publisher: "South African Reserve Bank",
  },
  sarbInflationTarget: {
    label: "SARB — Why we target inflation",
    href: "https://www.resbank.co.za/en/home/what-we-do/monetary-policy/why-we-target-inflation",
    publisher: "South African Reserve Bank",
  },
  treasuryBudget: {
    label: "National Treasury — Budget documents",
    href: "https://www.treasury.gov.za/documents/national%20budget/default.aspx",
    publisher: "National Treasury",
  },
} as const satisfies Record<string, SourceLink>;

export const INFLATION_SOURCE_LINKS: SourceLink[] = [
  SOURCES.statsSaCpi,
  SOURCES.statsSaInflation,
  SOURCES.sarbMonetaryPolicy,
  SOURCES.sarbInflationTarget,
];

export const TFSA_SOURCE_LINKS: SourceLink[] = [
  SOURCES.sarsTfsa,
  SOURCES.sarsBudget2026,
];
