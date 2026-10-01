"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const LINKS = [
  { href: "/", label: "Analyzer" },
  { href: "/#analyzer", label: "History" },
  { href: "/about", label: "About" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-foreground">
          <span className="grid size-[26px] place-items-center rounded-[7px] bg-primary text-sm font-extrabold text-primary-foreground">
            B
          </span>
          BugSight AI
        </Link>

        <nav className="flex items-center gap-7 text-[15px]">
          {LINKS.map((link) => {
            const active =
              (link.href === "/" && pathname === "/") || (link.href === "/about" && pathname === "/about")
            return (
              <Link
                key={link.label}
                href={link.href}
                className={active ? "text-foreground" : "text-muted-foreground transition-colors hover:text-foreground"}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}