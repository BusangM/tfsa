# TFSA Guide

A beginner-friendly, mobile-first South African **Tax-Free Savings Account (TFSA)** education and calculator app.

**Philosophy:** Simple, visual, human.

This is **not** a trading platform. It teaches TFSA concepts, models growth, explains limits, and helps users think about inflation — in plain language.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn-style UI primitives (Radix)
- Recharts
- Framer Motion

## Getting started

Requires **Node.js 20+** and npm.

```bash
cd tfsa-learn
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Features:** Sidebar lessons (one topic at a time), separate calculator & inflation sections, dark mode, official source links (SARS, Stats SA, SARB).

### WSL (Windows)

If you develop in WSL against a project under `/mnt/c/...`, `npm install` often breaks native packages (`lightningcss`, `@tailwindcss/oxide`) because of cross-filesystem installs. Use the Linux copy instead:

```bash
# One-time setup (Node 20 + install + production build check)
bash scripts/wsl-setup.sh

# Daily dev: sync from Windows folder → ~/tfsa-learn, then start dev server
bash scripts/wsl-dev.sh
```

Or work entirely inside `~/tfsa-learn` and open that folder in your editor via WSL.

**Do not** mix `npm install` on Windows and `npm run dev` in WSL on the same `node_modules` folder.

## Architecture

```
src/
├── app/                    # Next.js routes & global styles
│   ├── layout.tsx          # Root layout, fonts, SimpleModeProvider
│   ├── page.tsx            # Single-page app shell
│   └── globals.css         # Design tokens & theme
├── components/
│   ├── ui/                 # Reusable primitives (Button, Card, Slider…)
│   ├── layout/             # Header, hero, footer
│   ├── education/          # Educational cards
│   ├── calculator/         # TFSA calculator, limits, milestones
│   ├── charts/             # Growth chart (Recharts)
│   └── inflation/          # Purchasing power section
├── content/
│   └── education.ts        # Copy for explainer cards (normal + simple)
├── context/
│   └── simple-mode-context.tsx   # "Explain like I'm 10" toggle
├── lib/
│   ├── tfsa-calculator.ts  # Core projection & limit logic
│   ├── inflation.ts          # Real value & SA inflation context
│   └── utils.ts              # cn(), formatZAR()
└── types/
    └── tfsa.ts               # Shared TypeScript types & limits
```

### Data flow

1. User adjusts inputs in `TfsaCalculator`.
2. `calculateTFSA()` in `lib/tfsa-calculator.ts` returns projections, warnings, milestones.
3. `GrowthChart` visualises contributions vs growth.
4. `InflationSection` shows nominal vs real (purchasing power) values.
5. `SimpleModeProvider` swaps copy across all sections.

### South African TFSA rules (built-in)

| Rule | Value |
|------|--------|
| Annual contribution limit | R46,000 (from 1 Mar 2026; was R36,000) |
| Lifetime contribution limit | R500,000 |

The app warns when inputs exceed these and shows remaining “room” bars.

## Features (V1)

- **Education cards** — What is a TFSA, tax-free benefits, limits, compounding, ETFs, long-term investing
- **Calculator** — Monthly/annual contributions, return %, years, current balance
- **Growth chart** — Stacked contributions + growth; optional inflation-adjusted line
- **Explain like I'm 10** — Global toggle for ultra-simple copy
- **Milestones** — R10k, R100k, R1m estimates
- **Inflation layer** — Real vs nominal value, slider, illustrative SA price examples

## Disclaimer

All numbers are **illustrative estimates**, not financial advice. Inflation examples use rounded historical reference points labelled as educational — not live market data. Verify TFSA limits and personal tax position with SARS, your provider, and a qualified adviser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |

## Design direction

Calm fintech minimalism — soft cards, sage green palette, generous spacing, Duolingo-meets-Apple clarity. No crypto-bro aesthetics, no dark patterns.
