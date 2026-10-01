"use client"

import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { HistoryIcon, Trash2Icon, ClockIcon } from "lucide-react"
import { getHistory, clearHistory } from "@/lib/history"
import { LANGUAGE_LABELS } from "@/lib/samples"
import { cn } from "@/lib/utils"
import type { HistoryEntry } from "@/types/analysis"

interface HistoryDrawerProps {
  onSelect: (entry: HistoryEntry) => void
  refreshKey: number
}

export function HistoryDrawer({ onSelect, refreshKey }: HistoryDrawerProps) {
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  useEffect(() => {
    if (open) setEntries(getHistory())
  }, [open, refreshKey])

  function handleClear() {
    clearHistory()
    setEntries([])
  }

  function handleSelect(entry: HistoryEntry) {
    onSelect(entry)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        <HistoryIcon data-icon="inline-start" />
        History
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-white/10 bg-background/95 backdrop-blur-xl sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Analysis history</SheetTitle>
          <SheetDescription>Past analyses stored locally in this browser.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 overflow-y-auto px-4 pb-4">
          {entries.length === 0 ? (
            <Empty className="glass-card rounded-2xl">
              <EmptyHeader>
                <EmptyMedia variant="icon" className="bg-indigo-500/10 text-indigo-500">
                  <ClockIcon />
                </EmptyMedia>
                <EmptyTitle>No history yet</EmptyTitle>
                <EmptyDescription>Analyses you run will appear here for quick recall.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="self-end text-destructive" onClick={handleClear}>
                <Trash2Icon data-icon="inline-start" />
                Clear history
              </Button>
              <ul className="flex flex-col gap-2">
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(entry)}
                      className="glass-card flex w-full flex-col gap-1.5 rounded-xl p-3.5 text-left transition-colors hover:border-white/20 hover:bg-accent/40"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {LANGUAGE_LABELS[entry.language] ?? entry.language}
                        </span>
                        <Badge
                          variant={entry.result.is_defective ? "destructive" : "default"}
                          className={cn(
                            "h-5 rounded-md",
                            !entry.result.is_defective && "bg-emerald-500 text-white dark:bg-emerald-500",
                          )}
                        >
                          {entry.result.is_defective ? "Defective" : "Clean"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{new Date(entry.timestamp).toLocaleString()}</span>
                        <span className="font-mono">{Math.round(entry.result.confidence * 100)}% confidence</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
