"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { LightbulbIcon, MapPinIcon } from "lucide-react"
import type { Bug, BugSeverity } from "@/types/analysis"
import { cn } from "@/lib/utils"

interface IssueListProps {
  bugs: Bug[]
  onSelect: (line: number) => void
}

const SEVERITY_STYLES: Record<BugSeverity, string> = {
  low: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  high: "bg-red-500/10 text-red-600 dark:text-red-400",
}

const SEVERITY_BORDER: Record<BugSeverity, string> = {
  low: "before:bg-blue-500",
  medium: "before:bg-amber-500",
  high: "before:bg-red-500",
}

export function IssueList({ bugs, onSelect }: IssueListProps) {
  if (bugs.length === 0) return null

  return (
    <ul className="flex flex-col gap-2">
      {bugs.map((bug, i) => (
        <motion.li
          key={`${bug.line}-${bug.type}-${i}`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.4) }}
        >
          <button
            type="button"
            onClick={() => onSelect(bug.line)}
            className={cn(
              "glass-card relative w-full overflow-hidden rounded-xl p-3.5 pl-4 text-left transition-all before:absolute before:inset-y-0 before:left-0 before:w-1 hover:border-white/20 hover:bg-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              SEVERITY_BORDER[bug.severity],
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground">
                <MapPinIcon className="size-3" />
                Line {bug.line}
              </span>
              <span className="text-sm font-medium text-foreground">{bug.type}</span>
              <Badge className={cn("ml-auto h-5 rounded-md capitalize", SEVERITY_STYLES[bug.severity])} variant="ghost">
                {bug.severity}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{bug.message}</p>
            <div className="mt-2 flex items-start gap-1.5 rounded-md bg-muted/50 p-2 text-xs text-foreground/80">
              <LightbulbIcon className="mt-0.5 size-3.5 shrink-0 text-amber-500" />
              <span>{bug.suggestion}</span>
            </div>
          </button>
        </motion.li>
      ))}
    </ul>
  )
}
