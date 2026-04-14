"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import posthog from "posthog-js"

import { FadeIn } from "@/components/common/fade-in"
import { InteractivePricing } from "@/components/ui/pricing"
import type { InteractivePricingPlan } from "@/components/ui/pricing"
import { Switch } from "@/components/ui/switch"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const HOSTING_PRICE: Record<string, number> = {
  landing: 99,
  starter: 99,
  standard: 199,
  premium: 349,
}

const ECOMMERCE_CARE_PRICE: Record<string, number> = {
  "shopify-storefront": 249,
  "shopify-growth": 349,
  "shopify-scale": 449,
  "shopify-pro": 549,
}

function toMarketingPlans(): InteractivePricingPlan[] {
  return siteConfig.packages.map((pkg) => ({
    id: pkg.id,
    name: pkg.name,
    tagline: pkg.tagline,
    buildPrice: pkg.price,
    monthlyPrice: HOSTING_PRICE[pkg.id] ?? 99,
    pages: pkg.pages,
    deliveryDays: pkg.deliveryDays,
    features: [...pkg.features],
    comparison: pkg.comparison,
    paymentTerms: pkg.paymentTerms,
    cta: pkg.cta,
    href: "/#contact",
    isPopular: pkg.popular,
    isSimplest: pkg.id === "landing",
  }))
}

function toCommercePlans(): InteractivePricingPlan[] {
  return siteConfig.ecommercePackages.map((pkg) => ({
    id: pkg.id,
    name: pkg.name,
    tagline: pkg.tagline,
    buildPrice: pkg.price,
    monthlyPrice: ECOMMERCE_CARE_PRICE[pkg.id] ?? 249,
    pages: pkg.pages,
    deliveryDays: pkg.deliveryDays,
    features: [...pkg.features],
    comparison: pkg.comparison,
    paymentTerms: pkg.paymentTerms,
    cta: pkg.cta,
    href: "/#contact",
    isPopular: pkg.popular,
    isSimplest: pkg.id === "shopify-storefront",
  }))
}

export function PricingSection() {
  const [commerceMode, setCommerceMode] = useState(false)

  const plans = useMemo(
    () => (commerceMode ? toCommercePlans() : toMarketingPlans()),
    [commerceMode]
  )

  const carePlans = commerceMode ? siteConfig.ecommerceCarePlans : siteConfig.carePlans

  const priceBook = commerceMode ? "commerce" : "marketing"

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
              {commerceMode ? (
                <>
                  Shopify packages pair a one-time build with optional monthly commerce care — same
                  transparency as standard sites. Your Shopify subscription is separate.
                </>
              ) : (
                <>
                  Every package shows the one-time build cost and the optional monthly hosting fee
                  side by side — flip to ecommerce when you&apos;re ready to sell products online.
                </>
              )}
            </p>
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
              <a
                href={siteConfig.heroStat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
                title={siteConfig.heroStat.titleAttr}
              >
                {siteConfig.heroStat.linkLabel}
              </a>{" "}
              reports that nearly half of NZ businesses don&apos;t have a website, while most
              consumers still see a website as the main way to engage with a business. Fixed scopes
              and prices are for owners who want to close that gap without a quoting runaround.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.04}>
          <div className="mt-8 flex flex-col items-center gap-2">
            <p
              id="pricing-mode-label"
              className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground"
            >
              Pricing for
            </p>
            <div
              className="flex w-full max-w-lg flex-wrap items-center justify-center gap-2 rounded-2xl border border-border/70 bg-muted/20 px-3 py-2.5 shadow-sm sm:gap-3 sm:px-4"
              role="group"
              aria-labelledby="pricing-mode-label"
            >
              <button
                type="button"
                onClick={() => {
                  setCommerceMode(false)
                  posthog.capture("pricing_mode_changed", { mode: "standard_sites" })
                }}
                className={cn(
                  "min-h-9 flex-1 rounded-lg px-3 py-2 text-center text-sm transition-colors sm:flex-none sm:px-4",
                  !commerceMode
                    ? "bg-background font-semibold text-foreground shadow-sm ring-1 ring-border/80"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Standard Sites
              </button>
              <Switch
                id="pricing-mode"
                checked={commerceMode}
                onCheckedChange={(checked) => {
                  setCommerceMode(checked)
                  posthog.capture("pricing_mode_changed", {
                    mode: checked ? "ecommerce" : "standard_sites",
                  })
                }}
                className="shrink-0"
                aria-label={
                  commerceMode
                    ? "Switch to Standard Sites pricing"
                    : "Switch to Ecommerce pricing"
                }
              />
              <button
                type="button"
                onClick={() => {
                  setCommerceMode(true)
                  posthog.capture("pricing_mode_changed", { mode: "ecommerce" })
                }}
                className={cn(
                  "min-h-9 flex-1 rounded-lg px-3 py-2 text-center text-sm transition-colors sm:flex-none sm:px-4",
                  commerceMode
                    ? "bg-background font-semibold text-foreground shadow-sm ring-1 ring-border/80"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Ecommerce
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mt-6">
            <InteractivePricing plans={plans} priceBook={priceBook} />
          </div>
        </FadeIn>

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
                {commerceMode ? "Shopify platform" : "Hosting (custom builds)"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {commerceMode
                  ? siteConfig.platforms.shopify.hostingNote
                  : siteConfig.platforms.default.hostingNote}
              </p>
            </div>
          </div>
        </FadeIn>

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
                  I also build on Webflow. Same build prices — hosting is paid directly to Webflow (
                  {siteConfig.platforms.webflow.tiers.map((t) => `${t.name} $${t.price} USD/mo`).join(
                    ", "
                  )}
                  ). Mention it in your project brief and I&apos;ll walk you through the options.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="mt-10 rounded-xl border border-border/70 bg-background p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-md">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Ongoing support after launch
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {commerceMode ? (
                    <>
                      Commerce care covers theme work, catalogue updates, and troubleshooting on your
                      Shopify store. Platform fees stay with Shopify — this is my retainer only.
                    </>
                  ) : (
                    <>
                      Care plans bundle hosting, updates, and reporting into one monthly fee. No
                      lock-in — cancel anytime.
                    </>
                  )}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {carePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "rounded-lg border border-border/60 bg-muted/20 p-4",
                      "popular" in plan && plan.popular && "border-primary/30 ring-1 ring-primary/10"
                    )}
                  >
                    <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                    <p className="mt-1 font-mono text-lg font-bold tabular-nums text-foreground">
                      ${plan.price}
                      <span className="text-xs font-normal text-muted-foreground">/mo</span>
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                      {plan.features.map((f) => (
                        <li key={f} className="leading-snug">
                          {f}
                        </li>
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
