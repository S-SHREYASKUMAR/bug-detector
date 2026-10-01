import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TargetIcon, BrainCircuitIcon, LayersIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "About — BugSight AI",
  description: "Project overview, problem statement, and approach behind BugSight AI.",
}

const TEAM = [
  { name: "Member One", role: "ML Model & Training", initials: "M1" },
  { name: "Member Two", role: "Backend & API", initials: "M2" },
  { name: "Member Three", role: "Frontend & UX", initials: "M3" },
  { name: "Member Four", role: "Dataset & Evaluation", initials: "M4" },
]

const APPROACH_STEPS = [
  "Source code is tokenized and parsed into an abstract syntax representation.",
  "Hand-crafted and learned features are extracted (control flow, variable usage, complexity metrics).",
  "A trained classifier scores the snippet for defect likelihood and bug category.",
  "Line-level attention/heuristics surface the specific lines and bug types driving the verdict.",
]

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="hero-mesh" />
      <SiteHeader />
      <main className="relative z-10 mx-auto flex max-w-4xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6">
        <section className="flex flex-col gap-3">
          <Badge variant="secondary" className="w-fit border border-white/10 bg-white/5">
            Academic Project
          </Badge>
          <h1 className="font-display text-balance text-3xl tracking-tight">
            About <em className="text-primary">BugSight AI</em>
          </h1>
          <p className="max-w-2xl text-balance text-muted-foreground">
            BugSight AI is an academic project exploring AI-based programming bug detection. It demonstrates how a
            machine learning model can analyze source code and flag defective or incorrect logic before it ever
            reaches production.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <Card className="glass-card rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TargetIcon className="size-4 text-primary" />
                <CardTitle className="text-base">Problem statement</CardTitle>
              </div>
              <CardDescription>Why this project exists</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Manual code review is slow and error-prone, and static analyzers often rely on rigid, rule-based
              patterns that miss subtle logic errors. This project investigates whether a machine learning model
              trained on labeled code samples can detect defective or incorrect source code more flexibly —
              surfacing syntax errors, logic errors, runtime risks, security vulnerabilities, and more — and explain
              its findings in a way developers can act on.
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BrainCircuitIcon className="size-4 text-primary" />
                <CardTitle className="text-base">Model &amp; approach</CardTitle>
              </div>
              <CardDescription>Placeholder — built by the ML team</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
                {APPROACH_STEPS.map((step, i) => (
                  <li key={step} className="flex gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <LayersIcon className="size-4 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">How the frontend connects</h2>
          </div>
          <Card className="glass-card rounded-2xl">
            <CardContent className="text-sm text-muted-foreground">
              This interface sends code to <code className="rounded bg-muted px-1 py-0.5 text-xs">POST /analyze</code>{" "}
              on the backend defined by{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">NEXT_PUBLIC_API_URL</code>, and renders whatever
              verdict, confidence score, and bug list the model returns. See{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/api.ts</code> for the integration point.
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-4 pb-10">
          <h2 className="text-lg font-semibold tracking-tight">Team</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {TEAM.map((member) => (
              <Card key={member.name} className="glass-card rounded-2xl transition-transform hover:-translate-y-0.5">
                <CardContent className="flex items-center gap-3">
                  <Avatar className="size-10 border border-white/10">
                    <AvatarFallback className="bg-primary/15 text-primary">{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}