"use client"

import Image from "next/image"
import { InteractivePricing } from "@/components/ui/pricing"
import type { InteractivePricingPlan } from "@/components/ui/pricing"
import { FadeIn } from "@/components/common/fade-in"
import { siteConfig } from "@/config/site"

// Which hosting plan to suggest for each build package
const HOSTING_PRICE: Record<string, number> = {
  landing: 99,
  starter: 99,
  standard: 199,
  premium: 349,
}

function toPlans(): InteractivePricingPlan[] {
  return siteConfig.packages.map((pkg) => ({
    name: pkg.name,
    tagline: pkg.tagline,
    buildPrice: pkg.price,
    monthlyPrice: HOSTING_PRICE[pkg.id] ?? 99,
    pages: pkg.pages,
    deliveryDays: pkg.deliveryDays,
    features: [...pkg.features], // show ALL features — transparency builds trust
    paymentTerms: pkg.paymentTerms,
    cta: pkg.cta,
    href: "#contact",
    isPopular: pkg.popular,
    isSimplest: pkg.id === "landing",
  }))
}

export function PricingSection() {
  return (
    <section id="pricing" className="lp-section bg-muted/25">
      <div className="lp-shell">
        <FadeIn>
          <div className="lp-section-intro max-w-xl">
            <p className="lp-kicker mb-3">Pricing</p>
            <h2 className="lp-title text-balance">
              Everything you see is everything you pay.
            </h2>
            <p className="lp-lead mt-4 max-w-xl text-pretty">
              Every package shows the one-time build cost and the optional monthly
              hosting fee side by side — no toggles, no surprises.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <InteractivePricing plans={toPlans()} />
        </FadeIn>

        {/* What's NOT included — domain & hosting */}
        <FadeIn delay={0.12}>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-border/70 bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Domain name
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {siteConfig.domain.note}
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Hosting (custom builds)
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {siteConfig.platforms.default.hostingNote}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Webflow — separate callout so Webflow seekers spot it quickly */}
        <FadeIn delay={0.14}>
          <div
            id="pricing-webflow"
            className="mt-5 rounded-2xl border-2 border-primary/25 bg-primary/[0.04] p-5 shadow-sm ring-1 ring-primary/10 md:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex shrink-0 items-center gap-3">
                <Image
                  src="/logos/platforms/color/webflow.svg"
                  alt=""
                  width={100}
                  height={28}
                  className="h-7 w-auto opacity-90 dark:brightness-0 dark:invert"
                />
                <span className="hidden rounded-full border border-primary/25 bg-background/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary sm:inline">
                  Webflow
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Prefer Webflow?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  I also build on Webflow. Same build prices — hosting is paid
                  directly to Webflow (
                  {siteConfig.platforms.webflow.tiers.map(
                    (t) => `${t.name} $${t.price} USD/mo`
                  ).join(", ")}
                  ). Mention it in your project brief and I&apos;ll walk you through the
                  options.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Care plans summary */}
        <FadeIn delay={0.16}>
          <div className="mt-10 rounded-xl border border-border/70 bg-background p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-md">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Ongoing support after launch
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Care plans bundle hosting, updates, and reporting into one monthly
                  fee. No lock-in — cancel anytime.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {siteConfig.carePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-lg border border-border/60 bg-muted/20 p-4"
                  >
                    <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                    <p className="mt-1 font-mono text-lg font-bold tabular-nums text-foreground">
                      ${plan.price}
                      <span className="text-xs font-normal text-muted-foreground">/mo</span>
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                      {plan.features.map((f) => (
                        <li key={f} className="leading-snug">{f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
