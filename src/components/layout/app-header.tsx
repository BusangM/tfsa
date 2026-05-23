"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useSimpleMode } from "@/context/simple-mode-context";
import { useTheme } from "@/context/theme-context";
import { AppLogo } from "@/components/layout/app-logo";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export function AppHeader({ onMenuToggle, showMenuButton }: AppHeaderProps) {
  const { simpleMode, setSimpleMode } = useSimpleMode();
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/60 bg-[var(--color-background)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMenuToggle}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <AppLogo />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              resolvedTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1.5">
            <Label
              htmlFor="simple-mode"
              className="cursor-pointer text-xs font-medium"
            >
              {simpleMode ? "Simple words" : "Plain language"}
            </Label>
            <Switch
              id="simple-mode"
              checked={simpleMode}
              onCheckedChange={setSimpleMode}
              aria-label="Toggle simpler explanations"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
