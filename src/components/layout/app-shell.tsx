"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppFooter } from "@/components/layout/app-footer";
import { HeroSection } from "@/components/layout/hero-section";
import { EducationTopicView } from "@/components/education/education-topic-view";
import { EducationOverview } from "@/components/education/education-overview";
import { TfsaCalculator } from "@/components/calculator/tfsa-calculator";
import { InflationSection } from "@/components/inflation/inflation-section";
import { IkagengCompanion } from "@/components/ikageng/ikageng-companion";
import { IkagengSceneProvider } from "@/context/ikageng-scene-context";
import { CalculatorProvider, useCalculator } from "@/context/calculator-context";
import { EDUCATION_CARDS, getEducationCard } from "@/content/education";
import { topicIdFromView } from "@/lib/navigation";
import type { AppView, IkagengScene } from "@/types/tfsa";
import { Button } from "@/components/ui/button";

function viewToIkagengScene(view: AppView): IkagengScene {
  if (view.startsWith("topic-")) return view as IkagengScene;
  return view;
}

function MainContent({
  activeView,
  onNavigate,
}: {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}) {
  const { inputs, result, updateInput } = useCalculator();
  const topicId = topicIdFromView(activeView);
  const topicCard = topicId ? getEducationCard(topicId) : null;

  if (activeView === "home") {
    return <HeroSection onNavigate={onNavigate} />;
  }

  if (activeView === "learn") {
    return <EducationOverview onSelectTopic={(id) => onNavigate(`topic-${id}`)} />;
  }

  if (topicCard) {
    return (
      <EducationTopicView
        card={topicCard}
        onBack={() => onNavigate("learn")}
        onNext={() => {
          const idx = EDUCATION_CARDS.findIndex((c) => c.id === topicCard.id);
          const next = EDUCATION_CARDS[idx + 1];
          if (next) onNavigate(`topic-${next.id}`);
          else onNavigate("calculate");
        }}
      />
    );
  }

  if (activeView === "calculate") {
    return <TfsaCalculator />;
  }

  if (activeView === "inflation") {
    return (
      <InflationSection
        inflationRate={inputs.inflationRate}
        onInflationChange={(v) => updateInput("inflationRate", v)}
        futureValue={result.futureValue}
        realFutureValue={result.realFutureValue}
        years={inputs.yearsInvested}
        nominalReturn={inputs.expectedAnnualReturn}
        prominent
        onOpenCalculator={() => onNavigate("calculate")}
      />
    );
  }

  return <HeroSection onNavigate={onNavigate} />;
}

function AppShellInner() {
  const [activeView, setActiveView] = useState<AppView>("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navigate = (view: AppView) => {
    setActiveView(view);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ikagengScene = viewToIkagengScene(activeView);

  return (
    <IkagengSceneProvider scene={ikagengScene}>
      <div className="app-gradient flex min-h-screen flex-col">
        <AppHeader
          onMenuToggle={() => setMobileNavOpen((o) => !o)}
          showMenuButton
        />

        <div className="mx-auto flex w-full max-w-6xl flex-1 gap-0 px-0 lg:gap-6 lg:px-6 lg:py-6">
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-[var(--color-border)] bg-[var(--color-sidebar)]">
              <AppSidebar activeView={activeView} onNavigate={navigate} />
            </div>
          </aside>

          {mobileNavOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-black/40"
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
              />
              <aside className="absolute left-0 top-0 h-full w-72 max-w-[85vw] border-r border-[var(--color-border)] bg-[var(--color-sidebar)] pt-20 shadow-xl">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-4"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </Button>
                <AppSidebar activeView={activeView} onNavigate={navigate} />
              </aside>
            </div>
          )}

          <main className="min-w-0 flex-1 px-4 py-6 pb-28 sm:px-6 lg:px-0 lg:py-0 lg:pb-8">
            <MainContent activeView={activeView} onNavigate={navigate} />
          </main>
        </div>

        <AppFooter />
        <IkagengCompanion />
      </div>
    </IkagengSceneProvider>
  );
}

export function AppShell() {
  return (
    <CalculatorProvider>
      <AppShellInner />
    </CalculatorProvider>
  );
}
