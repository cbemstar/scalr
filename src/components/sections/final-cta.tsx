"use client"

// Section 10: Final CTA — light surface, same structure as hero band

import { buttonVariants } from "@/components/ui/button"
import { FadeIn } from "@/components/common/fade-in"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function FinalCTASection() {
  return (
    <section
      id="contact"
      className="lp-section relative isolate overflow-hidden"
      style={{
        backgroundColor: "oklch(0.985 0.006 260)",
        backgroundImage: `radial-gradient(circle, oklch(0.22 0.03 260 / 0.07) 1px, transparent 1px)`,
        backgroundSize: "26px 26px",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col gap-6 text-left lg:col-span-7">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Ready to start?
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.65rem]">
              Stop losing customers to a website that doesn&apos;t do its job.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Book a free 15-minute call. We&apos;ll look at your current site, talk about what you
              need, and figure out if we&apos;re a good fit. No pressure, no pitch.
            </p>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={siteConfig.contact.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                string="magnetic"
                string-id="final-cta-book"
                string-strength={0.24}
                string-radius={150}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "st-magnetic bg-brand text-brand-foreground shadow-sm hover:bg-brand/90"
                )}
              >
                Book a Free 15-Minute Call
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                string="magnetic"
                string-id="final-cta-email"
                string-strength={0.16}
                string-radius={120}
                className={cn(
                  "st-magnetic inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background/80 px-8 text-base font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-border hover:bg-muted/80"
                )}
              >
                Email me directly
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08} className="lg:col-span-5">
          <div className="rounded-[1.35rem] border border-border/80 bg-card/95 p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Based in
            </p>
            <p className="mt-2 font-heading text-xl font-semibold text-foreground">Christchurch</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Canterbury and New Zealand-wide. All prices in NZD + GST.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
