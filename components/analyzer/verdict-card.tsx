"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ConfidenceGauge } from "@/components/analyzer/confidence-gauge"
import { BugBreakdownChart } from "@/components/analyzer/bug-breakdown-chart"
import { CircleCheckIcon, TriangleAlertIcon } from "lucide-react"
import type { AnalyzeResponse } from "@/types/analysis"
import { cn } from "@/lib/utils"

interface VerdictCardProps {
  result: AnalyzeResponse
}

export function VerdictCard({ result }: VerdictCardProps) {
  const { is_defective, bugs } = result

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "glass-card relative overflow-hidden rounded-2xl p-5 shadow-sm",
        is_defective ? "verdict-glow-destructive" : "verdict-glow-success",
      )}
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-stretch sm:justify-between sm:gap-6">
        <div className="flex flex-col items-center gap-3 sm:items-start sm:justify-center">
          <Badge
            variant={is_defective ? "destructive" : "default"}
            className={cn(
              "h-8 rounded-full px-3.5 text-sm shadow-sm",
              !is_defective && "bg-emerald-500 text-white dark:bg-emerald-500",
            )}
          >
            {is_defective ? (
              <TriangleAlertIcon data-icon="inline-start" />
            ) : (
              <CircleCheckIcon data-icon="inline-start" />
            )}
            {is_defective ? "Defective" : "Clean"}
          </Badge>
          <p className="max-w-56 text-center text-sm text-muted-foreground sm:text-left">
            {is_defective
              ? `${bugs.length} potential issue${bugs.length === 1 ? "" : "s"} found in this snippet.`
              : "No defects were detected in this snippet."}
          </p>
        </div>

        <div className="h-px w-full bg-white/10 sm:h-auto sm:w-px" />

        <div className="w-40 shrink-0">
          <ConfidenceGauge confidence={result.confidence} isDefective={is_defective} />
        </div>

        {bugs.length > 0 && (
          <>
            <div className="h-px w-full bg-white/10 sm:h-auto sm:w-px" />
            <div className="flex w-full flex-col items-center sm:w-40 sm:shrink-0">
              <BugBreakdownChart bugs={bugs} />
              <p className="mt-1 text-center text-[11px] text-muted-foreground">Bug type breakdown</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
