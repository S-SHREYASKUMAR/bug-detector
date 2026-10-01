export type ProgrammingLanguage =  "c" | "cpp"

export type BugSeverity = "low" | "medium" | "high"

export interface Bug {
  line: number
  type: string
  severity: BugSeverity
  message: string
  suggestion: string
}

export interface AnalyzeRequest {
  code: string
  language: ProgrammingLanguage
}

export interface AnalyzeResponse {
  is_defective: boolean
  /** Confidence score from 0 to 1 */
  confidence: number
  bugs: Bug[]
  fixed_code: string | null
}

export interface HistoryEntry {
  id: string
  timestamp: number
  language: ProgrammingLanguage
  code: string
  result: AnalyzeResponse
}
