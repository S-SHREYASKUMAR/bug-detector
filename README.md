# BugSight AI

AI-based programming bug detection frontend. Paste, upload, or load sample source code and get a bug report back: defective or clean, a confidence score, a list of issues with line numbers and suggested fixes, and an optional suggested fix for the whole file.

This repository is **frontend only**. The ML analysis service is built and hosted separately by the backend team.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

- `NEXT_PUBLIC_API_URL` — base URL of the ML backend. The app POSTs to `${NEXT_PUBLIC_API_URL}/analyze`.

If `NEXT_PUBLIC_API_URL` is missing, the app shows a clear error: "Backend not connected. Set NEXT_PUBLIC_API_URL." with a retry button, instead of crashing.

## API contract

**Request** — `POST ${NEXT_PUBLIC_API_URL}/analyze`

```json
{
  "code": "def add(a, b):\n    return a - b",
  "language": "python"
}
```

`language` is one of: `"python" | "java" | "c" | "cpp" | "javascript"`.

**Response** — `200 OK`

```json
{
  "is_defective": true,
  "confidence": 0.87,
  "bugs": [
    {
      "line": 2,
      "type": "Logic Error",
      "severity": "medium",
      "message": "Function is named 'add' but performs subtraction.",
      "suggestion": "Change 'a - b' to 'a + b'."
    }
  ],
  "fixed_code": "def add(a, b):\n    return a + b"
}
```

- `confidence` is a number from `0` to `1`.
- `bugs` may be an empty array — the UI renders the verdict/confidence correctly either way.
- `fixed_code` may be `null` if no fix is available — the "Suggested fix" section is simply omitted.
- The backend must enable **CORS** for the origin this app is served from, or browser requests will be blocked.
- Requests time out client-side after 30 seconds and surface a retry button. Non-2xx responses and network failures are also caught and shown with a retry action.

## How backend teammates connect

1. Build the ML service so it accepts `POST /analyze` with the request/response shapes above.
2. Set `NEXT_PUBLIC_API_URL` to that service's base URL (in `.env.local` locally, or in your hosting provider's environment variables in production).
3. Enable CORS on the backend for this app's origin.
4. That's it — no other frontend code needs to change. The two files that define the integration surface are:
   - `lib/api.ts` — the single function (`analyzeCode`) that calls the backend. All fetch/error/timeout handling lives here.
   - `types/analysis.ts` — the TypeScript types for the request/response contract (`AnalyzeRequest`, `AnalyzeResponse`, `Bug`).

If the response shape ever changes, update both of those files and the rest of the UI (which only reads from `AnalyzeResponse`) keeps working.