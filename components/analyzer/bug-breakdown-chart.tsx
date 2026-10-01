"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { Bug } from "@/types/analysis"

interface BugBreakdownChartProps {
  bugs: Bug[]
}

const COLORS = ["#818cf8", "#a78bfa", "#f472b6", "#fb923c", "#34d399", "#60a5fa"]

export function BugBreakdownChart({ bugs }: BugBreakdownChartProps) {
  const counts = new Map<string, number>()
  for (const bug of bugs) {
    counts.set(bug.type, (counts.get(bug.type) ?? 0) + 1)
  }

  const data = Array.from(counts.entries()).map(([type, count], i) => ({
    type,
    count,
    fill: COLORS[i % COLORS.length],
  }))

  const chartConfig = Object.fromEntries(
    data.map((d) => [d.type, { label: d.type, color: d.fill }]),
  ) satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[180px]">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="type" hideLabel />} />
        <Pie
          data={data}
          dataKey="count"
          nameKey="type"
          innerRadius={45}
          outerRadius={70}
          strokeWidth={2}
          isAnimationActive
          animationDuration={500}
        >
          {data.map((entry) => (
            <Cell key={entry.type} fill={entry.fill} stroke="var(--card)" />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
