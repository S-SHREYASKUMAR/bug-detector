"use client"

import { useEffect, useImperativeHandle, useRef } from "react"
import Editor, { type OnMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { Skeleton } from "@/components/ui/skeleton"
import type { ProgrammingLanguage } from "@/types/analysis"
import { MONACO_LANGUAGE_IDS } from "@/lib/samples"

export interface CodeEditorHandle {
  highlightLine: (line: number) => void
  clearHighlights: () => void
}

interface CodeEditorProps {
  code: string
  language: ProgrammingLanguage
  onChange: (value: string) => void
  handleRef?: React.Ref<CodeEditorHandle>
}

export function CodeEditor({ code, language, onChange, handleRef }: CodeEditorProps) {
  const { resolvedTheme } = useTheme()
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null)
  const monacoRef = useRef<Parameters<OnMount>[1] | null>(null)
  const decorationsRef = useRef<string[]>([])

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco
  }

  useImperativeHandle(
    handleRef,
    () => ({
      highlightLine(line: number) {
        const editor = editorRef.current
        const monaco = monacoRef.current
        if (!editor || !monaco) return

        editor.revealLineInCenter(line)
        editor.setPosition({ lineNumber: line, column: 1 })

        decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
          {
            range: new monaco.Range(line, 1, line, 1),
            options: {
              isWholeLine: true,
              className: "bugsight-line-highlight",
              glyphMarginClassName: "bugsight-glyph-marker",
            },
          },
        ])
      },
      clearHighlights() {
        const editor = editorRef.current
        if (!editor) return
        decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [])
      },
    }),
    [],
  )

  useEffect(() => {
    return () => {
      decorationsRef.current = []
    }
  }, [])

  return (
    <div className="relative size-full overflow-hidden rounded-xl border border-white/10 bg-black/20 ring-1 ring-inset ring-white/5">
      <Editor
        height="100%"
        language={MONACO_LANGUAGE_IDS[language]}
        value={code}
        theme={resolvedTheme === "light" ? "light" : "vs-dark"}
        onChange={(value) => onChange(value ?? "")}
        onMount={handleMount}
        loading={<Skeleton className="size-full rounded-none" />}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: "on",
          glyphMargin: true,
          scrollBeyondLastLine: false,
          padding: { top: 12, bottom: 12 },
          fontFamily: "var(--font-mono, monospace)",
          renderLineHighlight: "line",
          tabSize: 4,
          wordWrap: "on",
        }}
      />
    </div>
  )
}
