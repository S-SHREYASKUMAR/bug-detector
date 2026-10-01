import { ClipboardPasteIcon, BrainCircuitIcon, FileSearchIcon, ArrowRightIcon } from "lucide-react"

const STEPS = [
  {
    icon: ClipboardPasteIcon,
    title: "Paste Code",
    description: "Paste a snippet, upload a file, or load a sample",
  },
  {
    icon: BrainCircuitIcon,
    title: "AI Analysis",
    description: "The ML model scans for defects and patterns",
  },
  {
    icon: FileSearchIcon,
    title: "Bug Report",
    description: "Get a verdict, confidence score, and fix suggestions",
  },
]

export function HowItWorks() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
      {STEPS.map((step, i) => (
        <div key={step.title} className="flex flex-1 items-center gap-2 sm:gap-3">
          <div
            className="glass-card animate-in fade-in slide-in-from-bottom-2 flex flex-1 items-center gap-3 rounded-2xl px-4 py-3.5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 120}ms`, animationFillMode: "backwards" }}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300">
              <step.icon className="size-4.5" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                <span className="mr-1.5 text-xs text-muted-foreground">{i + 1}.</span>
                {step.title}
              </span>
              <span className="text-xs text-muted-foreground">{step.description}</span>
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <ArrowRightIcon className="hidden size-4 shrink-0 text-muted-foreground/60 sm:block" />
          )}
        </div>
      ))}
    </div>
  )
}
