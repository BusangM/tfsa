import type { SourceLink } from "@/content/sources";

interface SourceLinksProps {
  sources: SourceLink[];
  title?: string;
  compact?: boolean;
}

export function SourceLinks({
  sources,
  title = "Sources & further reading",
  compact = false,
}: SourceLinksProps) {
  if (sources.length === 0) return null;

  return (
    <aside
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)]/50 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <p
        className={`font-medium text-[var(--color-foreground)] ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        {title}
      </p>
      <ul className={`mt-2 space-y-2 ${compact ? "text-xs" : "text-sm"}`}>
        {sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] underline-offset-2 hover:underline"
            >
              {source.label}
            </a>
            <span className="text-[var(--color-muted-foreground)]">
              {" "}
              — {source.publisher}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
