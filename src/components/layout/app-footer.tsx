import { SOURCES } from "@/content/sources";

export function AppFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
      <p className="font-medium text-[var(--color-foreground)]">TFSA Guide</p>
      <p className="mx-auto mt-2 max-w-md leading-relaxed">
        Educational tool only — not financial advice. TFSA rules from{" "}
        <a
          href={SOURCES.sarsTfsa.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] underline-offset-2 hover:underline"
        >
          SARS
        </a>{" "}
        may change. Verify limits with your provider and a qualified adviser.
      </p>
      <p className="mt-4 text-xs">
        Built for South African beginners · Estimates are illustrative
      </p>
    </footer>
  );
}
