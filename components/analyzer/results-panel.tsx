"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from "@/components/ui/empty"
import { VerdictCard } from "@/components/analyzer/verdict-card"
import { IssueList } from "@/components/analyzer/issue-list"
import { FixedCodeView } from "@/components/analyzer/fixed-code-view"
import { BugIcon, ScanSearchIcon, RotateCcwIcon, CircleAlertIcon } from "lucide-react"
import type { AnalyzeResponse } from "@/types/analysis"

interface ResultsPanelProps {
  status: "idle" | "loading" | "success" | "error"
  result: AnalyzeResponse | null
  code: string
  errorMessage?: string
  onRetry: () => void
  onSelectLine: (line: number) => void
}

export function ResultsPanel({ status, result, code, errorMessage, onRetry, onSelectLine }: ResultsPanelProps) {
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4">
        <div className="shimmer-surface h-36 w-full rounded-2xl" />
        <div className="shimmer-surface h-24 w-full rounded-xl" />
        <div className="shimmer-surface h-24 w-full rounded-xl" />
      </div>
    )
  }

  if (status === "error") {
    return (
      <Empty className="glass-card rounded-2xl border border-dashed border-destructive/30">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
            <CircleAlertIcon />
          </EmptyMedia>
          <EmptyTitle>Analysis failed</EmptyTitle>
          <EmptyDescription>{errorMessage ?? "Something went wrong while analyzing your code."}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={onRetry} variant="outline" size="sm">
            <RotateCcwIcon data-icon="inline-start" />
            Retry
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  if (status === "idle" || !result) {
    return (
      <Empty className="glass-card rounded-2xl">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-indigo-500/10 text-indigo-500">
            <ScanSearchIcon />
          </EmptyMedia>
          <EmptyTitle>No analysis yet</EmptyTitle>
          <EmptyDescription>
            Paste or upload source code on the left, then click &quot;Analyze Code&quot; to get a bug report.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <VerdictCard result={result} />

      {result.bugs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          <h3 className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <BugIcon className="size-4 text-muted-foreground" />
            Detected issues ({result.bugs.length})
          </h3>
          <IssueList bugs={result.bugs} onSelect={onSelectLine} />
        </motion.div>
      )}

      {result.fixed_code && <FixedCodeView originalCode={code} fixedCode={result.fixed_code} />}
    </div>
  )
}
