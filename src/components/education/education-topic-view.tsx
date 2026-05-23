"use client";

import {
  AlertTriangle,
  Clock,
  Layers,
  PiggyBank,
  Shield,
  TrendingUp,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { useSimpleMode } from "@/context/simple-mode-context";
import { SOURCES } from "@/content/sources";
import { SourceLinks } from "@/components/ui/source-links";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { EducationalCard } from "@/types/tfsa";

const ICON_MAP: Record<string, LucideIcon> = {
  PiggyBank,
  Shield,
  AlertTriangle,
  TrendingUp,
  Layers,
  Clock,
};

interface EducationTopicViewProps {
  card: EducationalCard;
  onBack: () => void;
  onNext: () => void;
}

export function EducationTopicView({
  card,
  onBack,
  onNext,
}: EducationTopicViewProps) {
  const { simpleMode } = useSimpleMode();
  const Icon = ICON_MAP[card.icon] ?? PiggyBank;

  const title = simpleMode ? card.simpleTitle : card.title;
  const body = simpleMode ? card.simpleBody : card.body;
  const analogy = simpleMode ? card.simpleAnalogy : card.analogy;
  const takeaways = simpleMode ? card.simpleKeyTakeaways : card.keyTakeaways;

  const sources = (card.sourceKeys ?? []).map((key) => SOURCES[key]);

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
        <ArrowLeft className="mr-1 h-4 w-4" />
        All topics
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-secondary)] text-[var(--color-primary)]">
            <Icon className="h-6 w-6" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
            <CardDescription className="mt-3 text-base leading-relaxed text-[var(--color-foreground)]/90">
              <RichText text={body} />
            </CardDescription>
          </div>
        </CardHeader>
        {analogy && (
          <CardContent className="pt-0">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-accent)] px-4 py-3 text-sm text-[var(--color-accent-foreground)]">
              <span className="font-medium">In plain terms: </span>
              <RichText text={analogy} />
            </div>
          </CardContent>
        )}
      </Card>

      <div className="space-y-4">
        {card.sections.map((sec) => (
          <section
            key={sec.heading}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5"
          >
            <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
              {simpleMode ? sec.simpleHeading : sec.heading}
            </h3>
            <div className="mt-3 space-y-3">
              {(simpleMode ? sec.simpleParagraphs : sec.paragraphs).map(
                (para, i) => (
                  <p
                    key={i}
                    className="leading-relaxed text-[var(--color-muted-foreground)]"
                  >
                    <RichText text={para} />
                  </p>
                )
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--color-primary)]/25 bg-[var(--color-secondary)]/40 p-5">
        <h3 className="font-semibold text-[var(--color-foreground)]">
          {simpleMode ? "Remember" : "Key takeaways"}
        </h3>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {takeaways.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      </div>

      {sources.length > 0 && <SourceLinks sources={sources} />}

      <div className="flex justify-end">
        <Button onClick={onNext}>Next topic →</Button>
      </div>
    </article>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
