import type { AnalyzeResponse, HistoryEntry, ProgrammingLanguage } from "@/types/analysis"

const STORAGE_KEY = "bugsight:history"
const MAX_ENTRIES = 25

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as HistoryEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function addHistoryEntry(
  code: string,
  language: ProgrammingLanguage,
  result: AnalyzeResponse,
): HistoryEntry {
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
    language,
    code,
    result,
  }

  if (typeof window !== "undefined") {
    const next = [entry, ...getHistory()].slice(0, MAX_ENTRIES)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return entry
}

export function clearHistory() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(STORAGE_KEY)
}
