import { EDUCATION_CARDS } from "@/content/education";
import type { AppView } from "@/types/tfsa";
import {
  BookOpen,
  Calculator,
  Home,
  ShoppingBasket,
  type LucideIcon,
} from "lucide-react";
import {
  AlertTriangle,
  Clock,
  Layers,
  PiggyBank,
  Shield,
  TrendingUp,
} from "lucide-react";

const TOPIC_ICONS: Record<string, LucideIcon> = {
  PiggyBank,
  Shield,
  AlertTriangle,
  TrendingUp,
  Layers,
  Clock,
};

export interface NavItem {
  id: AppView;
  label: string;
  simpleLabel: string;
  icon: LucideIcon;
  group?: "main" | "learn" | "tools";
}

export const MAIN_NAV: NavItem[] = [
  {
    id: "home",
    label: "Home",
    simpleLabel: "Home",
    icon: Home,
    group: "main",
  },
  {
    id: "learn",
    label: "All topics",
    simpleLabel: "All lessons",
    icon: BookOpen,
    group: "learn",
  },
  ...EDUCATION_CARDS.map((card) => ({
    id: `topic-${card.id}` as AppView,
    label: card.title,
    simpleLabel: card.simpleTitle,
    icon: TOPIC_ICONS[card.icon] ?? PiggyBank,
    group: "learn" as const,
  })),
  {
    id: "calculate",
    label: "Calculator",
    simpleLabel: "Calculator",
    icon: Calculator,
    group: "tools",
  },
  {
    id: "inflation",
    label: "Inflation",
    simpleLabel: "Prices & inflation",
    icon: ShoppingBasket,
    group: "tools",
  },
];

export function isTopicView(view: AppView): view is `topic-${string}` {
  return view.startsWith("topic-");
}

export function topicIdFromView(view: AppView): string | null {
  if (!isTopicView(view)) return null;
  return view.replace("topic-", "");
}
