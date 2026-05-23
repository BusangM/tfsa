"use client";

import { useSimpleMode } from "@/context/simple-mode-context";
import { MAIN_NAV, type NavItem } from "@/lib/navigation";
import type { AppView } from "@/types/tfsa";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  className?: string;
}

export function AppSidebar({
  activeView,
  onNavigate,
  className,
}: AppSidebarProps) {
  const { simpleMode } = useSimpleMode();

  const groups = [
    { key: "main", title: null },
    { key: "learn", title: simpleMode ? "Lessons" : "Learn" },
    { key: "tools", title: simpleMode ? "Tools" : "Plan" },
  ] as const;

  return (
    <nav
      className={cn(
        "flex flex-col gap-1 overflow-y-auto p-3",
        className
      )}
      aria-label="Course navigation"
    >
      {groups.map(({ key, title }) => {
        const items = MAIN_NAV.filter((item) => item.group === key);
        if (items.length === 0) return null;

        return (
          <div key={key} className="mb-2">
            {title && (
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                {title}
              </p>
            )}
            <ul className="space-y-0.5">
              {items.map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  simpleMode={simpleMode}
                  active={activeView === item.id}
                  onClick={() => onNavigate(item.id)}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function NavButton({
  item,
  simpleMode,
  active,
  onClick,
}: {
  item: NavItem;
  simpleMode: boolean;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  const label = simpleMode ? item.simpleLabel : item.label;

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
          active
            ? "bg-[var(--color-sidebar-active)] font-medium text-[var(--color-primary)] shadow-sm"
            : "text-[var(--color-sidebar-foreground)] hover:bg-[var(--color-sidebar-active)]/60"
        )}
      >
        <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
}
