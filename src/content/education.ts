import type { EducationalCard, LessonSection } from "@/types/tfsa";

function section(
  heading: string,
  simpleHeading: string,
  paragraphs: string[],
  simpleParagraphs: string[]
): LessonSection {
  return { heading, simpleHeading, paragraphs, simpleParagraphs };
}

export const EDUCATION_CARDS: EducationalCard[] = [
  {
    id: "what-is-tfsa",
    title: "What is a TFSA?",
    simpleTitle: "What's this special savings account?",
    icon: "PiggyBank",
    body: "A Tax-Free Savings Account (TFSA) is a government-approved account type in South Africa. Returns earned inside it — interest, dividends, and capital growth — are not taxed while they stay in the account.",
    simpleBody:
      "A TFSA is a special savings account the government created. When money grows inside, you don't pay tax on that growth.",
    analogy:
      "Think of it like a greenhouse for your plants: the sun (returns) still shines, but you keep all the fruit without handing some to the tax office.",
    simpleAnalogy:
      "Imagine planting seeds in a magic garden where nobody takes a piece of your harvest.",
    sections: [
      section(
        "The basic idea",
        "What it really is",
        [
          "A TFSA is not one specific bank product with a fixed interest rate. It is a **tax wrapper** — a label SARS recognises. Banks, stockbrokers, and insurers can offer TFSA versions of savings accounts, unit trusts, ETFs, and other approved investments.",
          "You still choose the underlying investment (cash, bonds, shares via an ETF, etc.). The TFSA rules decide how contributions and tax on growth are treated.",
        ],
        [
          "A TFSA isn't one exact product. It's a special label the government puts on certain accounts.",
          "Your bank or broker still offers the actual savings or investment — the TFSA part means tax rules are different.",
        ]
      ),
      section(
        "What is tax-free, exactly?",
        "What 'no tax' means",
        [
          "Inside a TFSA you generally do **not** pay income tax on interest, dividends tax on distributions, or capital gains tax when you sell (while amounts remain within the account rules).",
          "Withdrawals are also not taxed when you take money out — but once withdrawn, that contribution room does **not** come back (see SARS rules on replacements).",
        ],
        [
          "Growth inside usually isn't taxed — no tax on interest, dividends, or profit when you sell inside the account.",
          "When you take money out, you don't pay tax on the withdrawal — but you can't put that same amount back in later (there's a lifetime cap).",
        ]
      ),
      section(
        "TFSA vs normal savings",
        "How is it different?",
        [
          "A normal savings account may pay interest that counts toward your annual interest exemption — and amounts above that can be taxed. Investments outside a TFSA may trigger dividends tax, capital gains on sales, and other rules.",
          "A TFSA simplifies the tax picture for long-term savers who stay within contribution limits. It does **not** remove market risk — if markets fall, your balance can still drop.",
        ],
        [
          "Normal accounts can mean tax on interest or investment gains. A TFSA skips much of that tax inside the account.",
          "But your money can still go down if markets fall — tax-free doesn't mean risk-free.",
        ]
      ),
      section(
        "Who is it for?",
        "Should you use one?",
        [
          "TFSAs suit people building long-term savings — emergency funds in cash TFSAs, or growth assets for goals 10+ years away. They are less suited as a trading account or for money you need next month.",
          "You must be a South African taxpayer (or meet provider requirements) and report contributions correctly. Providers submit info to SARS, but **you** are responsible for not exceeding limits across all accounts.",
        ],
        [
          "Good for long-term goals — not for money you need tomorrow.",
          "You must track how much you've put in across all your TFSAs so you don't go over the limits.",
        ]
      ),
    ],
    keyTakeaways: [
      "A TFSA is a tax wrapper, not a single investment product.",
      "Growth and qualifying withdrawals are tax-free inside the rules.",
      "You choose the underlying investment; market risk remains.",
      "Track contributions across all TFSAs you hold.",
    ],
    simpleKeyTakeaways: [
      "It's a special tax-free label on certain accounts.",
      "Growth inside isn't taxed if you follow the rules.",
      "Your money can still go up or down.",
      "Don't put in more than the yearly or lifetime limits.",
    ],
    sourceKeys: ["sarsTfsa"],
  },
  {
    id: "why-tax-free",
    title: "Why does tax-free matter?",
    simpleTitle: "Why is 'no tax' a big deal?",
    icon: "Shield",
    body: "Tax on investment returns reduces how much stays invested. Over decades, that drag compounds. A TFSA lets more of each rand of growth remain in the account to earn future returns.",
    simpleBody:
      "When tax takes some of your growth, less money stays working for you. Over many years, a TFSA can leave more in the pot.",
    analogy:
      "It's like running a race without carrying extra weight in your backpack.",
    simpleAnalogy:
      "It's like keeping all your birthday money instead of giving some away.",
    sections: [
      section(
        "The hidden cost of tax drag",
        "Tax eats growth",
        [
          "Suppose your investment earns 10% one year. If part of that return is taxed, only the **after-tax** portion compounds next year. Over 20–30 years, the gap between taxed and tax-free compounding can be large — especially as balances grow.",
          "This is often more important than finding an extra 0.5% return, because tax applies every year on the full stack of past growth (depending on account type).",
        ],
        [
          "If tax takes a slice each year, less money rolls forward to earn more next year.",
          "Over decades, that missing slice adds up to a much smaller pile.",
        ]
      ),
      section(
        "Dividends and capital gains",
        "Different types of tax",
        [
          "Outside a TFSA, you might pay dividends tax on distributions and capital gains tax when you sell at a profit (subject to annual exclusions and your circumstances).",
          "Inside a TFSA, those taxes generally don't apply to amounts while they remain within the account structure — that's the policy goal: encourage household saving.",
        ],
        [
          "Outside a TFSA, dividends and profits when you sell can be taxed.",
          "Inside, those taxes usually don't apply — that's why the government created it.",
        ]
      ),
      section(
        "It adds up slowly, then quickly",
        "Why time matters",
        [
          "In early years, tax savings might look small in rand terms. After 15–25 years of regular contributions, the **cumulative** tax avoided on growth can become substantial — particularly if you reinvest everything.",
          "Use the calculator to model growth, then open the Inflation section to see whether real purchasing power keeps pace.",
        ],
        [
          "At first, tax savings look tiny. After many years of adding money, they can be huge.",
          "Always check inflation too — a big number might not buy as much later.",
        ]
      ),
    ],
    keyTakeaways: [
      "Tax drag reduces compounding every year.",
      "TFSAs shelter dividends and growth from several taxes inside the account.",
      "Benefits grow with time and consistent contributions.",
      "Pair nominal growth with inflation awareness.",
    ],
    simpleKeyTakeaways: [
      "Tax slows how fast money grows.",
      "TFSAs help you keep more of the growth.",
      "Waiting longer makes the difference bigger.",
      "Check inflation on the Inflation page.",
    ],
    sourceKeys: ["sarsTfsa", "treasuryBudget"],
  },
  {
    id: "exceed-limit",
    title: "What if I exceed the limit?",
    simpleTitle: "What if I put in too much?",
    icon: "AlertTriangle",
    body: "SARS sets an annual contribution limit (R46,000 from 1 March 2026) and a lifetime limit (R500,000). Contributing more triggers a 40% tax on the excess — one of the stiffest penalties in personal tax.",
    simpleBody:
      "There's a max per year and over your whole life. Too much in one year means a 40% penalty on the extra.",
    analogy:
      "Like filling a cup past the rim — the overflow spills out and can make a mess (penalties).",
    simpleAnalogy:
      "Like pouring too much juice in a glass — the extra spills and you might get in trouble.",
    sections: [
      section(
        "The two limits",
        "Two caps to know",
        [
          "**Annual limit:** The total **new money** you put into all TFSAs combined in one tax year (1 March – 28/29 February) cannot exceed R46,000 from the 2027 year of assessment onward (R36,000 for earlier years).",
          "**Lifetime limit:** Total contributions over your life cannot exceed R500,000. Growth above R500,000 of contributions does not count toward the cap — only money you put in does.",
        ],
        [
          "Each tax year you can only put in so much across **all** your TFSAs (R46,000 from March 2026).",
          "Over your whole life, you can only put in R500,000 total — growth on top doesn't count toward that cap.",
        ]
      ),
      section(
        "The 40% penalty",
        "What happens if you go over",
        [
          "If you contribute R10,000 more than allowed in a year, SARS can levy **40% tax on that R10,000 excess** — R4,000 tax, regardless of whether your investments made money.",
          "The penalty applies to contributions, not investment losses. This is why tracking every deposit across providers matters.",
        ],
        [
          "Go R10,000 over the limit and you might owe 40% on that extra — R4,000 tax.",
          "You pay even if your investments lost money — it's about how much you put in.",
        ]
      ),
      section(
        "Multiple accounts",
        "More than one TFSA",
        [
          "You may hold several TFSAs (e.g. bank cash TFSA + broker ETF TFSA). SARS aggregates **all** of them. R20,000 in one and R30,000 in another equals R50,000 — R4,000 over the annual cap.",
          "Providers report to SARS, but reconciliation can lag. Keep your own spreadsheet or use provider dashboards.",
        ],
        [
          "All your TFSAs count together. Two accounts don't mean double the limit.",
          "Write down every deposit so you don't accidentally go over.",
        ]
      ),
      section(
        "Withdrawals and room",
        "Taking money out",
        [
          "You can withdraw anytime, but **withdrawn contributions do not restore lifetime room**. If you've used R200,000 of lifetime room and withdraw R50,000, you still only have R300,000 room left — not R350,000.",
          "Plan TFSAs for long-term goals rather than treating them like a current account.",
        ],
        [
          "If you take money out, you don't get that space back in your lifetime limit.",
          "Use a TFSA for long-term saving, not everyday spending.",
        ]
      ),
    ],
    keyTakeaways: [
      "Annual cap R46,000 (from Mar 2026); lifetime cap R500,000.",
      "40% tax on excess contributions — very punitive.",
      "All TFSAs count together toward limits.",
      "Withdrawals don't restore lifetime contribution room.",
    ],
    simpleKeyTakeaways: [
      "Don't pass R46,000 per year or R500,000 lifetime.",
      "Too much = 40% penalty on the extra.",
      "Every TFSA you have shares one limit.",
      "Taking money out doesn't give room back.",
    ],
    sourceKeys: ["sarsTfsa", "sarsBudget2026"],
  },
  {
    id: "compound-growth",
    title: "What is compound growth?",
    simpleTitle: "How does money make more money?",
    icon: "TrendingUp",
    body: "Compound growth means earning returns on your original money **and** on returns you've already earned. The effect starts slowly, then accelerates — like a tree adding rings each year.",
    simpleBody:
      "You earn on your money and on the money you already earned. It starts slow, then gets faster.",
    analogy:
      "A snowball rolling downhill picks up more snow as it grows — that's compounding.",
    simpleAnalogy:
      "Like a snowball rolling down a hill — it gets bigger and bigger faster.",
    sections: [
      section(
        "Simple vs compound",
        "Two kinds of growth",
        [
          "**Simple growth:** You earn only on your starting amount. R10,000 at 10% simple = R1,000 every year, always on R10,000.",
          "**Compound growth:** Each year's return stays in the pot. Year 1: R10,000 → R11,000. Year 2: 10% on R11,000 = R1,100. The base keeps growing.",
        ],
        [
          "Simple: you only earn on what you started with.",
          "Compound: each year's gain stays in, so next year you earn on a bigger pile.",
        ]
      ),
      section(
        "Why the curve bends",
        "The hockey stick",
        [
          "Early years: contributions you make are a large share of the total balance, so market returns feel modest. Later years: the balance is bigger, so the **same percentage** return equals more rands.",
          "That's why starting earlier often matters more than investing a bit more later — time in market drives compounding cycles.",
        ],
        [
          "At first, your deposits are most of the total. Later, returns on a big balance add more than your deposits.",
          "Starting earlier usually beats waiting and putting in more later.",
        ]
      ),
      section(
        "Regular contributions",
        "Adding every month",
        [
          "Monthly contributions add new seeds to the tree. Even small amounts — R500 or R1,000 a month — build habit and reduce the temptation to time the market.",
          "The calculator shows how monthly deposits plus growth stack over time. Try lowering the return assumption to see a more conservative picture.",
        ],
        [
          "Adding something every month helps a lot over time.",
          "Use the calculator to see how monthly savings might grow — try a lower return to be careful.",
        ]
      ),
      section(
        "Compounding is not guaranteed",
        "Reality check",
        [
          "Compounding works on **positive** returns. In bad years, balances can shrink — you compound losses too. Diversification and long horizons reduce (but don't remove) that risk.",
          "Fees also compound against you. Low-cost ETFs and fee-aware providers help keep more growth in your account.",
        ],
        [
          "If investments lose money, compounding works against you too.",
          "Fees also eat growth — cheaper options leave more in your pocket.",
        ]
      ),
    ],
    keyTakeaways: [
      "Compound = returns on returns; time is a major driver.",
      "Early years feel slow; later years accelerate in rand terms.",
      "Regular contributions reinforce the effect.",
      "Negative years and fees also compound — plan conservatively.",
    ],
    simpleKeyTakeaways: [
      "Money makes money on money already earned.",
      "It speeds up after many years.",
      "Keep adding when you can.",
      "Bad years and fees hurt too — be realistic.",
    ],
  },
  {
    id: "what-is-etf",
    title: "What is an ETF?",
    simpleTitle: "What's an ETF? (easy version)",
    icon: "Layers",
    body: "An Exchange-Traded Fund (ETF) is a listed fund that holds many assets — often hundreds of shares — which you buy in one transaction on the JSE. Many TFSA investors use ETFs for broad, low-cost exposure.",
    simpleBody:
      "An ETF is many investments bundled together. You buy one unit and own a tiny slice of everything in the basket.",
    analogy:
      "Instead of betting on one horse, you own a small slice of the whole race.",
    simpleAnalogy:
      "Instead of one flavour of ice cream, you get a little of every flavour in one cup.",
    sections: [
      section(
        "What's inside an ETF?",
        "The basket",
        [
          "ETFs track an index (e.g. Top 40 companies) or a theme (property, bonds). The fund manager publishes a fact sheet listing holdings and weightings.",
          "When you buy 1 unit, you indirectly own a proportional share of each underlying asset — diversification without buying 40 separate shares.",
        ],
        [
          "An ETF holds lots of shares or bonds following a list (an index).",
          "One purchase spreads your money across all of them.",
        ]
      ),
      section(
        "ETFs on the JSE",
        "How you buy them",
        [
          "ETFs trade on the stock exchange like shares, during market hours. You'll need a brokerage account (many offer TFSA wrappers).",
          "You'll pay brokerage fees per trade and an annual **total expense ratio (TER)** — often lower than actively managed unit trusts for similar exposure.",
        ],
        [
          "You buy ETFs through a broker, like buying shares.",
          "There's a small yearly fee (TER) and sometimes a fee per trade.",
        ]
      ),
      section(
        "Why use ETFs in a TFSA?",
        "Fits long-term goals",
        [
          "TFSAs reward patience. Broad equity ETFs suit 10+ year horizons; bond or cash ETFs suit shorter goals or ballast in a portfolio.",
          "Tax-free status applies to dividends and growth inside the TFSA — ETF distributions and price gains benefit from the wrapper (within limits).",
        ],
        [
          "For long goals, many people use share ETFs. For shorter goals, cash or bond ETFs might fit.",
          "Inside a TFSA, ETF growth and dividends aren't taxed like outside.",
        ]
      ),
      section(
        "Risks to understand",
        "Not risk-free",
        [
          "ETF prices move daily. An equity ETF can fall 20–30% in a bad year. **Past index performance does not guarantee future results.**",
          "Read the minimum disclosure document (MDD) before investing. Match the ETF to your time horizon and comfort with volatility.",
        ],
        [
          "ETF prices go up and down. You can lose money, especially in the short term.",
          "Read the fund documents and pick something that fits how long you're investing.",
        ]
      ),
    ],
    keyTakeaways: [
      "ETFs bundle many assets; one trade = instant diversification.",
      "Listed on the JSE; bought via a broker in or outside a TFSA.",
      "TER and trading costs matter — compare providers.",
      "Market risk remains; match ETF type to your timeline.",
    ],
    simpleKeyTakeaways: [
      "One buy = many companies at once.",
      "You need a broker account.",
      "Fees matter — compare options.",
      "Prices can fall — think long term.",
    ],
  },
  {
    id: "long-term",
    title: "Why long-term investing matters",
    simpleTitle: "Why wait a long time?",
    icon: "Clock",
    body: "Short-term markets are noisy. Over decades, disciplined investing in diversified assets has historically rewarded patience — though past performance never guarantees the future. TFSAs are designed for that long arc.",
    simpleBody:
      "Markets bounce around in the short term. Over many years, staying invested often works better than jumping in and out.",
    analogy:
      "Planting a tree: you water it for years before shade arrives — but the roots grow strongest with time.",
    simpleAnalogy:
      "Like growing a tree — you won't sit in its shade tomorrow, but one day it's huge.",
    sections: [
      section(
        "Volatility vs time",
        "Ups and downs",
        [
          "Share prices react to news, earnings, and global events — daily swings are normal. Over 10–20 years, those daily moves matter less than **earnings growth** and **dividends reinvested**.",
          "Investors who panic-sell after drops often crystallise losses. Those who stay invested (if the underlying thesis holds) have historically recovered from many major downturns — but recovery timing is uncertain.",
        ],
        [
          "Prices jump daily. Over many years, the big picture matters more than one bad week.",
          "Selling when scared often locks in losses. Waiting has often helped — but it's not guaranteed.",
        ]
      ),
      section(
        "Rand-cost averaging",
        "Investing regularly",
        [
          "Putting in a fixed amount each month means you buy more units when prices are low and fewer when high — smoothing your average entry price over time.",
          "This doesn't remove risk, but it builds discipline and reduces the pressure to pick the \"perfect\" day.",
        ],
        [
          "Adding the same amount each month means you sometimes buy when prices are cheaper.",
          "It helps you stick to a plan without guessing the best day.",
        ]
      ),
      section(
        "TFSA + long horizon",
        "Why they fit together",
        [
          "Contribution limits mean TFSAs are precious tax space — best used for money you won't need for years. Pair with realistic return assumptions and an inflation check.",
          "If you might need the cash within 2–3 years, consider whether a cash TFSA or non-invested emergency fund is more appropriate than an equity ETF.",
        ],
        [
          "TFSA space is limited — use it for money you can leave for years.",
          "Money you need soon might belong in cash, not risky shares.",
        ]
      ),
      section(
        "Ikageng's reminder",
        "Growing together",
        [
          "Building wealth is communal in spirit — \"Ikageng\" means let's build each other. Learn steadily, avoid shortcuts, and verify important decisions with qualified professionals.",
          "This app teaches and illustrates; it does not replace personalised financial advice.",
        ],
        [
          "Ikageng means let's build each other. Learn step by step and ask a real adviser for big decisions.",
          "This app teaches — it doesn't tell you exactly what to buy.",
        ]
      ),
    ],
    keyTakeaways: [
      "Time helps smooth short-term volatility; it is not a guarantee.",
      "Regular contributions build habit and average entry.",
      "Match TFSA investments to when you'll need the money.",
      "Verify decisions with official sources and advisers.",
    ],
    simpleKeyTakeaways: [
      "Long time = less focus on daily scares.",
      "Keep adding when you can.",
      "Don't put short-term money in risky investments.",
      "Ask a real adviser for personal advice.",
    ],
  },
];

export function getEducationCard(id: string) {
  return EDUCATION_CARDS.find((c) => c.id === id);
}
