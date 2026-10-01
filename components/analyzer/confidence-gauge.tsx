"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

interface ConfidenceGaugeProps {
  confidence: number
  isDefective: boolean
}

const chartConfig = {
  confidence: { label: "Confidence" },
} satisfies ChartConfig

export function ConfidenceGauge({ confidence, isDefective }: ConfidenceGaugeProps) {
  const percent = Math.round(confidence * 100)
  const [animatedPercent, setAnimatedPercent] = useState(0)
  const color = isDefective ? "var(--destructive)" : "#10b981"

  useEffect(() => {
    setAnimatedPercent(0)
    const frame = requestAnimationFrame(() => setAnimatedPercent(percent))
    return () => cancelAnimationFrame(frame)
  }, [percent])

  const data = [{ name: "confidence", value: animatedPercent, fill: color }]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[160px]">
      <div
        className="pointer-events-none absolute inset-4 rounded-full blur-xl transition-opacity duration-700"
        style={{ backgroundColor: color, opacity: 0.18 }}
        aria-hidden
      />
      <ChartContainer config={chartConfig} className="aspect-square w-full">
        <RadialBarChart data={data} innerRadius="72%" outerRadius="100%" startAngle={90} endAngle={-270} barSize={10}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar dataKey="value" background={{ fill: "var(--muted)" }} cornerRadius={8} isAnimationActive />
        </RadialBarChart>
      </ChartContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={percent}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn("text-2xl font-semibold tabular-nums", isDefective ? "text-destructive" : "text-emerald-500")}
        >
          {animatedPercent}%
        </motion.span>
        <span className="text-[11px] text-muted-foreground">confidence</span>
      </div>
    </div>
  )
}
