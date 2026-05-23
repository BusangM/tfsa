import { Sprout } from "lucide-react";

interface AppLogoProps {
  compact?: boolean;
}

export function AppLogo({ compact }: AppLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm"
        aria-hidden
      >
        <Sprout className="h-5 w-5 text-[var(--color-primary)]" strokeWidth={2.25} />
      </div>
      {!compact && (
        <div className="min-w-0 leading-tight">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-muted-foreground)]">
            South Africa
          </p>
          <p className="font-semibold tracking-tight text-[var(--color-foreground)]">
            TFSA Guide
          </p>
        </div>
      )}
    </div>
  );
}
