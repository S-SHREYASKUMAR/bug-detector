"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { CodeEditor, type CodeEditorHandle } from "@/components/analyzer/code-editor"
import { PlayIcon, Trash2Icon, UploadIcon, FileCodeIcon, ChevronDownIcon } from "lucide-react"
import type { ProgrammingLanguage } from "@/types/analysis"
import { LANGUAGE_LABELS, LANGUAGE_FILE_EXTENSIONS, SAMPLE_SNIPPETS } from "@/lib/samples"

const LANGUAGE_OPTIONS: ProgrammingLanguage[] = ["c", "cpp"]
const ALL_FILE_EXTENSIONS = Object.values(LANGUAGE_FILE_EXTENSIONS).flat()

interface CodePanelProps {
  code: string
  language: ProgrammingLanguage
  isAnalyzing: boolean
  editorHandleRef: React.Ref<CodeEditorHandle>
  onCodeChange: (value: string) => void
  onLanguageChange: (value: ProgrammingLanguage) => void
  onAnalyze: () => void
  onClear: () => void
}

export function CodePanel({
  code,
  language,
  isAnalyzing,
  editorHandleRef,
  onCodeChange,
  onLanguageChange,
  onAnalyze,
  onClear,
}: CodePanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const lineCount = code.length === 0 ? 0 : code.split("\n").length
  const charCount = code.length

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    onCodeChange(text)
    e.target.value = ""
  }

  return (
    <div className="glass-card flex h-full flex-col gap-0 overflow-hidden rounded-2xl shadow-sm">
      {/* Window chrome header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <Select value={language} onValueChange={(v) => onLanguageChange(v as ProgrammingLanguage)}>
            <SelectTrigger className="h-8 w-40 border-white/10 bg-white/5">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {LANGUAGE_OPTIONS.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {LANGUAGE_LABELS[lang]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={ALL_FILE_EXTENSIONS.join(",")}
            className="hidden"
            onChange={handleFileChange}
            aria-label="Upload source file"
          />
          <Button variant="outline" size="sm" className="border-white/10 bg-white/5" onClick={() => fileInputRef.current?.click()}>
            <UploadIcon data-icon="inline-start" />
            Upload
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>
              <FileCodeIcon data-icon="inline-start" />
              Load sample
              <ChevronDownIcon data-icon="inline-end" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Samples for {LANGUAGE_LABELS[language]}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SAMPLE_SNIPPETS[language].map((sample) => (
                  <DropdownMenuItem key={sample.id} onClick={() => onCodeChange(sample.code)}>
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${sample.kind === "buggy" ? "bg-red-500" : "bg-emerald-500"}`}
                    />
                    {sample.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="min-h-0 flex-1 p-2.5">
        <CodeEditor code={code} language={language} onChange={onCodeChange} handleRef={editorHandleRef} />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-3 text-xs text-muted-foreground">
        <span className="font-mono">
          {lineCount} line{lineCount === 1 ? "" : "s"} · {charCount} char{charCount === 1 ? "" : "s"}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClear} disabled={code.length === 0 || isAnalyzing}>
            <Trash2Icon data-icon="inline-start" />
            Clear
          </Button>
          <Button
            size="sm"
            onClick={onAnalyze}
            disabled={code.trim().length === 0 || isAnalyzing}
            className={cn(
              "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_0_20px_-6px_var(--color-indigo-500)] transition-all hover:from-indigo-400 hover:to-violet-400",
              isAnalyzing && "glow-pulse",
            )}
          >
            {isAnalyzing ? <Spinner data-icon="inline-start" /> : <PlayIcon data-icon="inline-start" />}
            {isAnalyzing ? "Analyzing..." : "Analyze Code"}
          </Button>
        </div>
      </div>
    </div>
  )
}
