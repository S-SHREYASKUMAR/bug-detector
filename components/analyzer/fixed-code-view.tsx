"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDownIcon, CopyIcon, CheckIcon, SparklesIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FixedCodeViewProps {
  originalCode: string
  fixedCode: string
}

export function FixedCodeView({ originalCode, fixedCode }: FixedCodeViewProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const originalLines = originalCode.split("\n")
  const fixedLines = fixedCode.split("\n")

  async function handleCopy() {
    await navigator.clipboard.writeText(fixedCode)
    setCopied(true)
    toast.success("Fixed code copied to clipboard")
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="glass-card overflow-hidden rounded-2xl">
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 px-4 py-3 text-sm font-medium transition-colors hover:bg-accent/40">
        <span className="flex items-center gap-1.5">
          <SparklesIcon className="size-4 text-indigo-400" />
          Suggested fixed code
        </span>
        <ChevronDownIcon className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t border-white/10">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">
          <p className="text-xs text-muted-foreground">Diff-style preview — removed lines in red, added lines in green.</p>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
            Copy
          </Button>
        </div>
        <pre className="max-h-72 overflow-auto bg-black/20 p-3 font-mono text-xs leading-relaxed">
          {originalLines.map((line, i) => (
            <div key={`old-${i}`} className="bg-red-500/10 px-2 text-red-700 dark:text-red-400">
              <span className="select-none text-red-500/60">- </span>
              {line || " "}
            </div>
          ))}
          {fixedLines.map((line, i) => (
            <div key={`new-${i}`} className="bg-emerald-500/10 px-2 text-emerald-700 dark:text-emerald-400">
              <span className="select-none text-emerald-500/60">+ </span>
              {line || " "}
            </div>
          ))}
        </pre>
      </CollapsibleContent>
    </Collapsible>
  )
}
