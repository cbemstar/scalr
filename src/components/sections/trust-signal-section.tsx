"use client"

import { FadeIn } from "@/components/common/fade-in"
import { Testimonials } from "@/components/ui/testimonials"
import { siteConfig } from "@/config/site"

/** InternetNZ / Yabble research strip — below hero so the fold stays light. */
export function TrustSignalSection() {
  const t = siteConfig.trustSection
  const h = siteConfig.heroStat

  return (
    <section
      id="trust-signal"
      className="lp-section border-b border-border/50 bg-muted/20"
      aria-labelledby="trust-signal-heading"
    >
      <div className="lp-shell">
        <FadeIn>
          <div className="mx-auto max-w-6xl">
            <p className="lp-kicker mb-3">{t.kicker}</p>
            <h2 id="trust-signal-heading" className="lp-title max-w-2xl text-balance">
              {t.title}
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">{t.lead}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mt-8">
            <Testimonials
              sourceUrl={h.url}
              sourceLabel={h.linkLabel}
              sourceTitleAttr={h.titleAttr}
              primaryBeforeLink={t.primaryBeforeLink}
              primaryAfterLink={t.primaryAfterLink}
              supporting={t.supporting}
              attributionName={t.attributionName}
              attributionDetail={t.attributionDetail}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
