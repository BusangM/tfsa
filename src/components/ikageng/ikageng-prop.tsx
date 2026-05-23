"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import type { IkagengProp } from "@/content/ikageng";
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  Clock,
  Coins,
  Layers,
  PiggyBank,
  Shield,
  ShoppingBasket,
  Sprout,
  TrendingUp,
} from "lucide-react";

const PROP_MAP: Record<IkagengProp, ComponentType<{ className?: string }>> = {
  seedling: Sprout,
  piggy: PiggyBank,
  shield: Shield,
  warning: AlertTriangle,
  chart: TrendingUp,
  layers: Layers,
  clock: Clock,
  calculator: Calculator,
  basket: ShoppingBasket,
  coins: Coins,
  book: BookOpen,
};

export function IkagengPropBadge({ prop }: { prop: IkagengProp }) {
  const Icon = PROP_MAP[prop] ?? Sprout;

  return (
    <motion.div
      className="absolute -right-0.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-card)] bg-[var(--color-warning)] text-[var(--color-warning-foreground)] shadow-md"
      animate={{ rotate: [-4, 4, -4], y: [0, -2, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <Icon className="h-3.5 w-3.5" />
    </motion.div>
  );
}
