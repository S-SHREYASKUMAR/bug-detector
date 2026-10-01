import type { AnalyzeRequest, AnalyzeResponse } from "@/types/analysis"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function analyzeCode(
  code: string,
  language: string
): Promise<AnalyzeResponse> {
  if (!API_URL) {
    throw new Error("Backend not connected. Set NEXT_PUBLIC_API_URL.")
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)

  try {
    // BACKEND: POST /analyze with { code, language }
    const body = { code, language } as AnalyzeRequest
    const res = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    if (!res.ok) {
      throw new Error(`Backend returned ${res.status}`)
    }

    return (await res.json()) as AnalyzeResponse
  } finally {
    clearTimeout(timeout)
  }
}