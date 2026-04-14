import type { ReactNode } from "react"
import Link from "next/link"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type LegalPageShellProps = {
  title: string
  /** Short intro under the title */
  lead?: string
  children: ReactNode
  className?: string
}

export function LegalPageShell({ title, lead, children, className }: LegalPageShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-[100dvh] flex-col",
        "pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
      )}
    >
      <SiteHeader />
      <main className="lp-hero-surface flex-1">
        <div className="lp-section">
          <div className="lp-shell max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground">
              <Link
                href="/"
                className="underline-offset-2 transition-colors hover:text-foreground hover:underline"
              >
                Home
              </Link>
              <span className="mx-2 opacity-50" aria-hidden>
                /
              </span>
              <span className="text-foreground">{title}</span>
            </nav>

            <header className="mb-10 max-w-2xl">
              <p className="lp-kicker mb-3">{siteConfig.name} · Legal</p>
              <h1 className="lp-title">{title}</h1>
              {lead ? <p className="lp-lead mt-4">{lead}</p> : null}
            </header>

            <article className={cn("legal-prose", className)}>{children}</article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
