import { SparklesIcon, ArrowDownIcon, ZapIcon, ShieldCheckIcon, WrenchIcon } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { HowItWorks } from "@/components/how-it-works"
import { Analyzer } from "@/components/analyzer/analyzer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-24">
        <div className="hero-mesh" />
        <div className="bg-grid" />
        <div className="float-slow pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div
          className="float-slow pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-violet-500/20 blur-3xl"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <span className="glass-card animate-in fade-in slide-in-from-bottom-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-indigo-300 duration-500">
            <SparklesIcon className="size-3.5" />
            AI-based programming bug detection
          </span>

          <h1 className="animate-in fade-in slide-in-from-bottom-3 text-balance text-4xl font-semibold tracking-tight duration-700 sm:text-6xl lg:text-7xl">
            Find the bugs <span className="gradient-text">before they find you</span>
          </h1>

          <p className="animate-in fade-in slide-in-from-bottom-3 max-w-2xl text-balance text-base text-muted-foreground delay-150 duration-700 sm:text-lg">
            Paste or upload your C or C++ code and let the model surface defects, explain why they matter, and
            suggest a fix, line by line.
          </p>

          <div
            className="animate-in fade-in slide-in-from-bottom-3 flex flex-col items-center gap-4 duration-700"
            style={{ animationDelay: "250ms", animationFillMode: "backwards" }}
          >
            <a
              href="#analyzer"
              className="cta-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white"
            >
              Start analyzing
              <ArrowDownIcon className="size-4" />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="chip">
                <ZapIcon className="size-3.5 text-indigo-300" />
                C &amp; C++ support
              </span>
              <span className="chip">
                <ShieldCheckIcon className="size-3.5 text-emerald-300" />
                Line-level detection
              </span>
              <span className="chip">
                <WrenchIcon className="size-3.5 text-violet-300" />
                Suggested fixes
              </span>
            </div>
          </div>

          <div
            className="animate-in fade-in slide-in-from-bottom-3 mt-6 w-full duration-700"
            style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
          >
            <HowItWorks />
          </div>
        </div>
      </section>

      <main id="analyzer" className="flex flex-1 scroll-mt-20 flex-col py-10">
        <Analyzer />
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-muted-foreground">
        BugSight AI · Academic project · AI-based programming bug detection for C and C++
      </footer>
    </div>
  )
}