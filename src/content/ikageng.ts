import type { IkagengScene } from "@/types/tfsa";

export type IkagengProp =
  | "seedling"
  | "piggy"
  | "shield"
  | "warning"
  | "chart"
  | "layers"
  | "clock"
  | "calculator"
  | "basket"
  | "coins"
  | "book";

export interface IkagengNarration {
  greeting: string;
  simpleGreeting: string;
  /** Detailed lecture script for the neural voice */
  speakText: string;
  simpleSpeakText: string;
  prop: IkagengProp;
}

const NARRATIONS: Record<string, IkagengNarration> = {
  home: {
    greeting:
      "Hey — I'm Ikageng, which means 'let's build each other' in Sesotho. That's exactly what this app is about. A TFSA is one of the most powerful financial tools available to South Africans — and most people are sleeping on it. Any growth you earn inside it, whether that's interest, dividends, or capital gains, stays completely in your pocket. Zero tax. Explore any section and tap me whenever you want the friendly rundown.",
    simpleGreeting:
      "Hi! I'm Ikageng. This app helps you learn about a special savings account where you keep ALL your growth — no tax taken away. Pick any section and I'll explain it simply.",
    speakText:
      "Hey there — welcome! I'm Ikageng, which means 'let's build each other' in Sesotho, and that's exactly the spirit of this whole app. A Tax-Free Savings Account is genuinely one of the most powerful financial tools the South African government gives to ordinary people — and yet most South Africans aren't using it, or aren't using it anywhere near its full potential. Here's the core idea: you invest money, it grows through interest or dividends or capital gains, and you pay absolutely zero tax on any of that growth. Not a cent. The government created a legal way for you to keep every single rand of your returns, and we're here to make sure you understand exactly how to make the most of it. Start with the education section if you want to build a strong foundation. Jump to the calculator if you want to see the numbers come to life. And remember — tap me anywhere, anytime, for the friendly version. Let's build something great together!",
    simpleSpeakText:
      "Welcome! I'm Ikageng. This app teaches you about a Tax-Free Savings Account. The special thing about it is: when your money grows inside it, you don't pay any tax on that growth — you keep it all! This app has lessons to help you understand how it works, a calculator to show you what you could save, and an inflation section that shows what your future money is really worth. Let's start learning together, one step at a time!",
    prop: "seedling",
  },

  learn: {
    greeting:
      "Education first — the best investment is in your own understanding. Each topic here unpacks one key piece of the TFSA puzzle, written in plain language with official sources to back it up. Pick whichever one grabs you and we'll go deep. No jargon, no guessing.",
    simpleGreeting:
      "Pick one lesson to read. Start with whichever sounds interesting — there's no wrong order. I'll help explain it as you go.",
    speakText:
      "Welcome to the learn section — and honestly, this is my favourite stop on the whole app. A lot of people skip straight to the calculator without reading the lessons first. I completely understand the temptation — numbers feel concrete and exciting. But here's the truth: understanding WHY compound interest works the way it does, or WHY tax-free growth matters so much over the long run, will make you a far more confident and effective investor. Each topic here unpacks one specific piece of the TFSA picture — from what the account actually is and how the contribution limits work, all the way to what an ETF really is and why patient, long-term thinking consistently beats trying to time the market. Every lesson links to official sources — SARS, Stats SA, and the South African Reserve Bank — because your financial decisions should be grounded in verified facts, not guesswork or social media tips. Take your time, read at your own pace, and come back as often as you like. Which topic calls to you first? Let's dig in together.",
    simpleSpeakText:
      "This section has lessons about saving and investing. Each one explains one idea simply, with real facts from official South African sources. If you're new to this, start with 'What is a TFSA' — it explains everything from the beginning. After that, follow your curiosity. The more you understand about how money works, the better choices you can make. Don't rush — learning is always the best first step!",
    prop: "book",
  },

  calculate: {
    greeting:
      "Calculator mode — adjust your numbers and explore what different contribution amounts and time horizons look like. Watch how the curve changes as you push the years higher. Pay attention to the limit bars too — they show your annual and lifetime contribution room in real time.",
    simpleGreeting:
      "Use the sliders to try different numbers and see what might happen over time. Try making the years longer and watch the graph — it gets exciting!",
    speakText:
      "Welcome to the calculator — where the power of compounding really hits home and often surprises people! Here's how to get the most out of it. Start by setting your monthly contribution — even relatively small amounts add up enormously over time, and you'll see exactly why in a moment. Then adjust the expected annual return rate. Historically, a diversified South African equity ETF has returned somewhere in the range of eight to twelve percent annually over long periods, though past performance never guarantees future results — please keep that in mind. Now set your time horizon, and here's the important part: really push it out. Watch what happens as you move from ten years to twenty years to thirty. See how the curve bends more and more sharply upward? That steepening line is compound interest doing its work — growth building on top of previous growth, not just on your contributions. Pay close attention to the green limit bars at the bottom too. You have forty-six thousand rand of annual contribution room from March twenty-twenty-six, and five hundred thousand rand total over your entire lifetime, across all TFSAs you hold. Once you've had a good look at the numbers, I really encourage you to visit the Inflation section as well. That's where you'll see what your projected future balance is actually worth in today's buying power — and it's often the most eye-opening comparison of all.",
    simpleSpeakText:
      "Move the sliders to choose how much you save each month, how many years you save for, and what yearly return you expect. The graph shows what your money might look like in the future. The big lesson here is: the longer you save, the more your money can grow — not just from what you put in, but from growth building on top of growth. Also check the bars at the bottom — they show how much room you have left before hitting the yearly and lifetime limits. Remember: these are estimates to help you think and plan, not guaranteed predictions!",
    prop: "calculator",
  },

  inflation: {
    greeting:
      "This is the section most people skip — and that's a mistake. A big future number looks exciting until you compare it to what things will actually cost by then. Inflation is the quiet force that erodes purchasing power over time. South Africa's inflation has averaged around five to six percent annually over recent decades. This section shows the difference between your nominal balance and what it could actually buy.",
    simpleGreeting:
      "Prices go up every year — this is called inflation. Here you can see what your future savings might really buy compared to today's prices. It's an important lesson about what big future numbers actually mean.",
    speakText:
      "Okay, inflation — this is the section that genuinely changes how people think about money, and I want to make sure it lands properly. Here's the foundational concept: a rand today is worth more than a rand in twenty years, because prices rise over time. This is called the time value of money. South Africa's inflation has averaged roughly five to six percent annually over recent decades. At five percent annual inflation, prices double approximately every fourteen years. So if your TFSA calculator projects a balance of two million rand in thirty years — which sounds incredible — the honest question to ask is: what will two million rand actually buy in thirty years? That's exactly what this section shows you. It compares your nominal balance — the raw number — against the real value adjusted for inflation. True wealth isn't just about growing your number; it's about growing your purchasing power faster than prices rise. Here's the excellent news: tax-free growth helps enormously with this, because every rand that stays in your TFSA instead of going to SARS is a rand that keeps compounding against inflation on your behalf. Understanding this distinction transforms you from a passive saver into a genuinely informed investor who knows exactly what they're building toward.",
    simpleSpeakText:
      "Every year, things cost a little more — that's inflation. It means the same amount of money buys less in the future than it does today. This section shows the difference between your big future number and what it might actually buy. For example, if something costs one hundred rand today, and prices double in fifteen years, that same thing costs two hundred rand! The goal of saving isn't just to have a big number — it's to have money that still buys what you need. Always think about what your savings are worth in today's terms, not just in future rands.",
    prop: "basket",
  },

  "topic-what-is-tfsa": {
    greeting:
      "A TFSA is a tax wrapper — not a product itself. It's a legal structure the government created to let qualifying growth happen completely tax-free. You still choose what to invest in: cash, bonds, shares, ETFs — the TFSA is just the protective label that shields all of that growth from income tax, dividends tax, and capital gains tax.",
    simpleGreeting:
      "A TFSA is a special type of savings account. The special part: money that grows inside it isn't taxed. You pick where to invest — the TFSA is just a protective cover around your money.",
    speakText:
      "Let's talk about what a TFSA actually is — because there is a very common and costly misconception worth clearing up right away. A Tax-Free Savings Account is NOT a specific investment product. It is a tax structure — a protective wrapper the South African government created specifically to encourage ordinary citizens to invest for the long term. Think of it like a special container. Inside that container you can put almost anything: a money market account, government bonds, listed shares, or exchange-traded funds. Whatever you put in there, any returns it generates — interest payments, dividend income, and capital gains when you sell — are fully exempt from tax. No income tax, no dividends withholding tax, no capital gains tax. You keep every cent of growth. The account must be opened with a SARS-approved provider. These include major banks like Nedbank, FNB, Standard Bank, Absa, and Capitec, as well as dedicated investment platforms like Easy Equities, Sygnia, Allan Gray, and Investec. You are allowed to hold multiple TFSAs at different providers simultaneously — but your combined annual contributions across ALL of them cannot exceed forty-six thousand rand per tax year from March twenty-twenty-six, and your total lifetime contributions cannot exceed five hundred thousand rand. SARS tracks this automatically using your ID number. Stay within those limits and your growth belongs entirely to you.",
    simpleSpeakText:
      "A TFSA is like a special protective box for your savings. You put money in, choose where to invest it — like in shares or savings — and any growth that happens inside is tax-free. You don't give any of it to the government. You can open a TFSA at most major South African banks or investment apps. The rules are simple: you can put in up to forty-six thousand rand per year, and no more than five hundred thousand rand total over your whole life. As long as you stay within those limits, SARS leaves your growth completely alone!",
    prop: "piggy",
  },

  "topic-why-tax-free": {
    greeting:
      "Tax-free growth compounds harder than taxable growth because you keep every rand working for you. Tax drag — the annual cost of giving a slice of returns to SARS — compounds against you just as returns compound for you. Over twenty or thirty years, that difference isn't small. This section shows you exactly why the exemption matters so much.",
    simpleGreeting:
      "When you don't pay tax on your growth, your savings pile up faster. Every rand you keep is a rand that keeps growing. This lesson shows why that matters a lot over many years.",
    speakText:
      "Why does tax-free matter so much? Let me make this completely concrete with numbers. Imagine two investors — let's call them Nomsa and Thabo. Both invest one thousand rand per month for twenty-five years at a ten percent annual return. Nomsa puts her money in a regular taxable investment account and pays eighteen percent dividends withholding tax plus an effective capital gains tax rate of about thirteen percent. Thabo invests in a TFSA and pays exactly zero. After twenty-five years, the difference in their balances runs into hundreds of thousands of rands — not because they invested differently or took different risks, but purely because Thabo kept every cent of his growth compounding forward. This is what financial planners call tax drag — the compounding cost of having a portion of your returns removed each year for tax. Every rand that goes to SARS is a rand that's no longer in your account growing. And that missing rand doesn't just reduce your balance by one rand — over a long enough time horizon, it reduces it by several rands, because you also lose all the future compounding that rand would have generated. The TFSA eliminates this drag entirely. It is the government saying: invest responsibly, invest long-term, and we will completely step aside from your returns. That is an extraordinary offer, and every South African who can afford to save should be taking full advantage of it.",
    simpleSpeakText:
      "Normally, when your savings earn money, the government takes some as tax. In a TFSA, that doesn't happen — you keep everything! This sounds like a small difference, but over many years it adds up to a huge amount. Every rand you keep is one more rand growing your savings. And then that extra rand earns even more. And so on. After twenty or thirty years, the difference between a TFSA and a regular savings account can be hundreds of thousands of rands — just from keeping your growth instead of giving part of it away in tax. That's why a TFSA is such a powerful tool for building wealth over time.",
    prop: "shield",
  },

  "topic-exceed-limit": {
    greeting:
      "The limits are firm and SARS enforces them strictly: R46,000 per tax year and R500,000 lifetime — combined across every TFSA you hold at any provider. Exceed either limit and SARS charges a forty percent penalty tax on the excess amount, every single month until you fix it. Withdrawals do NOT restore your room in the current tax year. Track every contribution carefully.",
    simpleGreeting:
      "Don't put in more than the allowed amount — it causes a big, ongoing fine! The annual limit is R46,000 and the total lifetime limit is R500,000 across all your TFSAs. Be careful and keep your own records.",
    speakText:
      "This is the topic most people wish someone had explained clearly and directly before they made an expensive mistake — so let me be very precise. Your TFSA has two hard limits that apply simultaneously. First: you may contribute no more than forty-six thousand rand in a single tax year, which runs from the first of March to the last day of February. This limit applies across every single TFSA you hold — if you have accounts with two different providers, your total combined deposits into all of them during that tax year cannot exceed forty-six thousand rand. Second: over your entire lifetime, across all TFSAs you have ever held or currently hold, your total cumulative contributions cannot exceed five hundred thousand rand. SARS tracks both of these limits using your ID number. If you exceed either limit — even by accident, even by one rand — SARS imposes a forty percent tax on every rand of the excess, and this penalty continues every month for as long as you remain in excess. That can become extremely expensive very quickly. There are two specific traps people fall into. The first: withdrawal and re-contribution in the same tax year. If you contribute forty-six thousand rand, then withdraw twenty thousand rand, you cannot put that twenty thousand back in during the same tax year — doing so counts as an additional contribution and puts you over the annual limit. Your withdrawn room only resets on the first of March of the following tax year. The second trap: multiple providers. Many people don't realise their annual room is shared across all accounts. Open a new TFSA at a second bank without checking your existing contributions and you can accidentally exceed the limit. Keep your own detailed records — do not rely solely on your provider's records.",
    simpleSpeakText:
      "Your TFSA has two important limits. Per year: you can only put in forty-six thousand rand maximum, across all your TFSAs combined. In total over your lifetime: five hundred thousand rand maximum. If you go over either limit, SARS charges you forty percent tax on the extra money every month until you fix it — that's a big fine that keeps growing! One important trap: if you take money out and then put it back in the same year, it counts as a new contribution. So don't do that without checking your remaining room first. The room only resets in March each new year.",
    prop: "warning",
  },

  "topic-compound-growth": {
    greeting:
      "Compound growth is the most important concept in personal finance. Returns generate more returns — slowly at first, then dramatically. The curve bends upward the longer you stay invested. Time is the key ingredient, and it can't be bought back once it's passed.",
    simpleGreeting:
      "Your money earns extra money, and then that extra money earns even more money. This is called compound growth. The longer you let it happen, the bigger it gets — like a snowball rolling downhill.",
    speakText:
      "Let me talk about compound growth — because understanding this one concept genuinely changes how you see money and time. Here's the core mechanic: you invest a sum of money and it earns a return. In the next period, you earn a return on your original investment AND on the return you already received. Simple enough. But the magic happens over time. In year one, the extra return on your return might feel trivially small. But by year ten, your accumulated returns are substantial — and they're all earning returns too. By year twenty, the curve really bends. By year thirty, it can look almost vertical. There's a useful shortcut called the Rule of 72: divide 72 by your annual return rate to find roughly how many years it takes for your money to double. At eight percent annual return, that's nine years. At twelve percent, it's six years. Your money doubles, then doubles again, then again. Now here's what makes this feel urgent: time cannot be substituted for money. If you start investing at twenty-five and your friend starts at thirty-five, you will likely end up with significantly more money at retirement even if your friend contributes more per month than you do. The early years of compounding create a foundation that later contributions simply cannot replicate. Every month you wait is a month of compounding that's permanently gone. The best time to start was yesterday. The second best time is right now.",
    simpleSpeakText:
      "Imagine a snowball rolling down a snowy hill. It starts small, but as it rolls, it picks up more and more snow and gets bigger and bigger — faster and faster. That's compound growth. Your savings earn extra money. Then that extra money earns even more. The longer you let it run, the bigger it gets. Here's the most important lesson: starting early matters more than starting with a lot of money. Even saving a small amount every month from a young age can grow into a very large amount by the time you retire. The secret ingredient is time — so the sooner you start, the better!",
    prop: "chart",
  },

  "topic-what-is-etf": {
    greeting:
      "An ETF — Exchange-Traded Fund — is a basket of assets you buy as one transaction. A South Africa or global index ETF gives you exposure to dozens or hundreds of companies instantly. They're the most popular TFSA investment vehicle because of their low fees, built-in diversification, and simplicity.",
    simpleGreeting:
      "An ETF lets you buy a little piece of many companies all at once, with one purchase. Instead of betting on one company, you spread your money across many — which reduces your risk significantly.",
    speakText:
      "Let's talk about ETFs — Exchange-Traded Funds — because they've become the go-to vehicle for most long-term TFSA investors, and for very good reasons. Here's the simple version first: instead of buying shares in one specific company, you buy units in a fund that holds shares in many companies — sometimes dozens, sometimes hundreds or even thousands. A JSE Top 40 ETF, for example, gives you exposure to the forty largest companies listed on the Johannesburg Stock Exchange with a single purchase. A global index ETF might give you a slice of thousands of companies across the United States, Europe, Asia, and beyond. Why does this matter so much? Two main reasons. First: diversification. If one company in your basket has a catastrophic year, the others cushion the blow. Putting your entire TFSA into a single company's shares is an enormous concentration of risk. Spreading across many companies through an ETF manages this intelligently. Second: cost. ETFs — particularly passive index-tracking ones — typically charge annual fees of as little as zero-point-two to zero-point-five percent. Actively managed unit trusts might charge two percent or more. That fee difference sounds small, but fees compound against you over time in exactly the same way that returns compound for you. A one-and-a-half percent fee difference over twenty-five years can cost you an astonishing amount of compounding. Always check the total expense ratio before investing. And as always — past performance is not a guarantee of future results. Do your own research on specific ETFs, but understand that the ETF structure itself is one of the most investor-friendly tools ever created.",
    simpleSpeakText:
      "An ETF is like a bundle of many investments sold as one package. When you buy one ETF, you automatically own a tiny piece of many different companies. This is great because if one company does badly, the others can make up for it — you're not putting all your eggs in one basket. ETFs also usually have lower fees than other types of investments, which means more of your money stays working for you. You can find ETFs on most South African investment platforms. They're popular for TFSAs because they're simple, affordable, and spread your risk automatically.",
    prop: "layers",
  },

  "topic-long-term": {
    greeting:
      "Markets move up and down in the short term — sometimes dramatically and without obvious reason. But over fifteen, twenty, thirty years, patient and consistent investors have historically been rewarded. The TFSA is purpose-built for this horizon. Staying the course when things look scary is genuinely hard — but it's where most of the long-term gains are earned.",
    simpleGreeting:
      "Keeping your money invested for many years usually works much better than moving it around. When prices go down, try not to panic — staying invested and waiting is usually the best choice.",
    speakText:
      "Long-term investing is where TFSAs truly shine — and it's also the most psychologically difficult part, because it requires something most of us aren't naturally wired for: patience and composure during periods of uncertainty. Let me be honest with you about what this actually feels like. In any given year, your TFSA balance might drop by ten, fifteen, even thirty percent during a market downturn. That is a genuinely uncomfortable experience — it looks on paper like you're losing money. But if you zoom out to a twenty-year chart of a broad, diversified market index, those drops look like small bumps on a long, relentless upward slope. The historical evidence — and I want to be clear this is history, not a promise about the future — is that time in the market consistently tends to beat attempts to time the market. Investors who panicked and sold during downturns locked in those losses permanently and then very often missed the recovery that followed. The investors who stayed put, kept contributing every month without fail, and simply ignored the short-term noise — those are the investors whose compounding curves bent sharply upward over time. Your TFSA structure actually helps with this patience. Because you know every rand of growth stays completely tax-free, there is a very strong rational argument for simply leaving it alone and letting it work. Ikageng means let's build each other — and sometimes real building requires the courage to be patient. You've genuinely got this.",
    simpleSpeakText:
      "The best results from saving usually come to people who keep their money invested for a long time — ten, twenty, or even thirty years. That's because compound growth needs time to really build up speed. Even when prices go down, it's usually better to keep your money in and wait patiently, rather than taking it out in a panic. Taking money out when prices are low means you lose money and miss the recovery. Think of your TFSA like planting a tree: plant the seed now, water it regularly with contributions, and give it many years to grow into something truly significant. The patience is worth it!",
    prop: "clock",
  },
};

export function getIkagengNarration(scene: IkagengScene): IkagengNarration {
  if (scene in NARRATIONS) return NARRATIONS[scene];
  return NARRATIONS.learn;
}

export const IKAGENG_NAME = "Ikageng";
export const IKAGENG_TAGLINE = "Let's build each other";
