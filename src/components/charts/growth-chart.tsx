"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { useSimpleMode } from "@/context/simple-mode-context";
import { formatZAR } from "@/lib/utils";
import type { YearProjection } from "@/types/tfsa";

interface GrowthChartProps {
  projections: YearProjection[];
  showRealValue: boolean;
}

export function GrowthChart({ projections, showRealValue }: GrowthChartProps) {
  const { simpleMode } = useSimpleMode();

  const data = useMemo(
    () =>
      projections.map((p) => ({
        year: p.year,
        contributions: p.cumulativeContributions,
        growth: Math.max(0, p.balance - p.cumulativeContributions),
        balance: p.balance,
        realBalance: p.realBalance,
      })),
    [projections]
  );

  if (data.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-72 w-full sm:h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d6a5a" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2d6a5a" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94b8a8" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#94b8a8" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4e4de" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#5c7269" }}
            tickLine={false}
            axisLine={false}
            label={{
              value: simpleMode ? "Years" : "Years invested",
              position: "insideBottom",
              offset: -4,
              fontSize: 11,
              fill: "#5c7269",
            }}
          />
          <YAxis
            tickFormatter={(v) => formatZAR(v, true)}
            tick={{ fontSize: 11, fill: "#5c7269" }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatZAR(value),
              name === "contributions"
                ? simpleMode
                  ? "You put in"
                  : "Contributions"
                : simpleMode
                  ? "Growth"
                  : "Investment growth",
            ]}
            labelFormatter={(y) =>
              simpleMode ? `Year ${y}` : `Year ${y}`
            }
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #d4e4de",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            formatter={(value) =>
              value === "contributions"
                ? simpleMode
                  ? "Money you added"
                  : "Your contributions"
                : simpleMode
                  ? "Money that grew"
                  : "Growth"
            }
          />
          <Area
            type="monotone"
            dataKey="contributions"
            stackId="1"
            stroke="#94b8a8"
            fill="url(#contribGrad)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="growth"
            stackId="1"
            stroke="#2d6a5a"
            fill="url(#growthGrad)"
            strokeWidth={2}
          />
          {showRealValue && (
            <Area
              type="monotone"
              dataKey="realBalance"
              stroke="#c45c4a"
              fill="none"
              strokeWidth={2}
              strokeDasharray="6 4"
              name="realBalance"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
