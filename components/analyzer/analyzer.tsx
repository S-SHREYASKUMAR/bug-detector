"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { CodePanel } from "@/components/analyzer/code-panel"
import { ResultsPanel } from "@/components/analyzer/results-panel"
import { HistoryDrawer } from "@/components/analyzer/history-drawer"
import type { CodeEditorHandle } from "@/components/analyzer/code-editor"
import { analyzeCode } from "@/lib/api"
import { addHistoryEntry } from "@/lib/history"
import type { AnalyzeResponse, HistoryEntry, ProgrammingLanguage } from "@/types/analysis"

type Status = "idle" | "loading" | "success" | "error"

export function Analyzer() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState<ProgrammingLanguage>("c")
  const [status, setStatus] = useState<Status>("idle")
  const [result, setResult] = useState<AnalyzeResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0)
  const [mobileTab, setMobileTab] = useState("code")

  const editorHandleRef = useRef<CodeEditorHandle>(null)

  async function handleAnalyze() {
    if (code.trim().length === 0) return
    setStatus("loading")
    setErrorMessage(undefined)
    editorHandleRef.current?.clearHighlights()

    try {
      // Calls the ML backend via lib/api.ts (POST /analyze on NEXT_PUBLIC_API_URL)
      const response = await analyzeCode(code, language)
      setResult(response)
      setStatus("success")
      setMobileTab("results")
      addHistoryEntry(code, language, response)
      setHistoryRefreshKey((k) => k + 1)
      toast.success(response.is_defective ? "Defects detected" : "Code looks clean", {
        description: `${Math.round(response.confidence * 100)}% confidence`,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred"
      setErrorMessage(message)
      setStatus("error")
      toast.error("Analysis failed", { description: message })
    }
  }

  function handleClear() {
    setCode("")
    setResult(null)
    setStatus("idle")
    editorHandleRef.current?.clearHighlights()
  }

  function handleSelectLine(line: number) {
    editorHandleRef.current?.highlightLine(line)
    setMobileTab("code")
  }

  function handleHistorySelect(entry: HistoryEntry) {
    setCode(entry.code)
    setLanguage(entry.language)
    setResult(entry.result)
    setStatus("success")
    setErrorMessage(undefined)
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 pb-10 sm:px-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Code Analyzer</h1>
          <p className="text-sm text-muted-foreground">Paste source code and get an instant AI bug report.</p>
        </div>
        <HistoryDrawer onSelect={handleHistorySelect} refreshKey={historyRefreshKey} />
      </div>

      {/* Mobile: tab switcher (controls which panel below is visible) */}
      <Tabs value={mobileTab} onValueChange={setMobileTab} className="lg:hidden">
        <TabsList className="w-full">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Single panel tree for both breakpoints: on mobile the inactive tab's panel is hidden via CSS,
          on desktop both panels always render side by side. This avoids mounting two Monaco editors. */}
      <div className="flex-1 gap-5 lg:grid lg:grid-cols-2">
        <div
          className={cn(
            "h-[460px] lg:h-[calc(100vh-11.5rem)] lg:min-h-[520px]",
            mobileTab !== "code" && "hidden lg:block",
          )}
        >
          <CodePanel
            code={code}
            language={language}
            isAnalyzing={status === "loading"}
            editorHandleRef={editorHandleRef}
            onCodeChange={setCode}
            onLanguageChange={setLanguage}
            onAnalyze={handleAnalyze}
            onClear={handleClear}
          />
        </div>
        <div
          className={cn(
            "mt-3 lg:mt-0 lg:h-[calc(100vh-11.5rem)] lg:min-h-[520px] lg:overflow-y-auto lg:pr-1",
            mobileTab !== "results" && "hidden lg:block",
          )}
        >
          <ResultsPanel
            status={status}
            result={result}
            code={code}
            errorMessage={errorMessage}
            onRetry={handleAnalyze}
            onSelectLine={handleSelectLine}
          />
        </div>
      </div>
    </div>
  )
}