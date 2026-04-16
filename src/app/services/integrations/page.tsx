import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Integrations & add-ons",
  description:
    "How Scalr prices website builds, integration add-ons, and standalone sprints — booking tools, analytics, Shopify apps, and more.",
  alternates: {
    canonical: `${siteConfig.url}/services/integrations`,
  },
  openGraph: {
    url: `${siteConfig.url}/services/integrations`,
    title: "Integrations & add-ons",
    description:
      "How Scalr prices website builds, integration add-ons, and standalone sprints — booking tools, analytics, Shopify apps, and more.",
  },
}

export default function IntegrationsPage() {
  const pitch = siteConfig.integrationsPitch

  return (
    <div
      className={cn(
        "flex min-h-[100dvh] flex-col",
        "pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
      )}
    >
      <SiteHeader />
      <main className="flex-1">
        <article className="lp-section border-b border-border/40 bg-muted/15">
          <div className="lp-shell max-w-3xl">
            <p className="lp-kicker mb-3">{pitch.kicker}</p>
            <h1 className="lp-title text-balance">{pitch.title}</h1>
            <p className="lp-lead mt-4 text-pretty leading-relaxed">{pitch.lead}</p>
            <div className="mt-8 space-y-8">
              {pitch.bullets.map((b) => (
                <div key={b.title}>
                  <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {b.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-border/70 bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                From-prices on the pricing page
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every add-on module and standalone sprint is listed with NZD from-prices alongside
                your packages. Half-day and full-day blocks apply when the work is best scoped as
                time (discovery or multi-tool days); the hourly rate applies to agreed change orders
                and ad-hoc work — see the FAQ.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="cta">
                  <Link href="/#pricing-integrations">View add-ons &amp; sprints</Link>
                </Button>
                <Button asChild variant="secondary" size="cta">
                  <Link href="/#contact">Start a brief</Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
