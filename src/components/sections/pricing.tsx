"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import posthog from "posthog-js"

import { FadeIn } from "@/components/common/fade-in"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { InteractivePricing } from "@/components/ui/pricing"
import type { InteractivePricingPlan } from "@/components/ui/pricing"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { pricingHash, siteConfig } from "@/config/site"
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

const CARE_HASH = pricingHash.care.replace("#", "")
const COMMERCE_HASH = pricingHash.commerce.replace("#", "")

function scrollPricingTarget(raw: string) {
  const id = raw === CARE_HASH ? "pricing-care" : "pricing"
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function PricingSection() {
  const [commerceMode, setCommerceMode] = useState(false)

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | undefined

    function applyHash() {
      const raw = window.location.hash.replace(/^#/, "")
      if (!raw.startsWith("pricing")) return

      setCommerceMode(raw === COMMERCE_HASH)

      if (scrollTimer) clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        scrollPricingTarget(raw)
      }, 60)
    }

    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => {
      window.removeEventListener("hashchange", applyHash)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  const plans = useMemo(
    () => (commerceMode ? toCommercePlans() : toMarketingPlans()),
    [commerceMode]
  )

  const carePlans = commerceMode ? siteConfig.ecommerceCarePlans : siteConfig.carePlans

  const priceBook = commerceMode ? "commerce" : "marketing"

  return (
    <section id="pricing" className="scroll-mt-24 lp-section bg-muted/25">
      <div className="lp-shell">
        <FadeIn>
          <div className="lp-section-intro max-w-2xl">
            <p className="lp-kicker mb-3">Pricing</p>
            <h2 className="lp-title text-balance">Build fee + optional monthly care. No surprises.</h2>
            <p className="lp-lead mt-4 max-w-xl text-pretty">
              {commerceMode ? (
                <>
                  One-time Shopify build, optional commerce care. Your Shopify plan and apps stay on
                  your bill with Shopify — we only price the work we do.
                </>
              ) : (
                <>
                  Each card shows build cost and optional hosting side by side. Switch to Ecommerce
                  when you need a store, not a brochure site.
                </>
              )}
            </p>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
              {siteConfig.pricingFraming.timingNote}{" "}
              <Link href="/#faq" className="font-medium text-foreground underline-offset-4 hover:underline">
                FAQ
              </Link>{" "}
              has scope, SEO depth, and change-order detail if you need it.
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
          <div className="mt-10 grid gap-5 md:grid-cols-3">
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

            <div
              id="pricing-webflow"
              className="flex flex-col gap-3 rounded-xl border-2 border-primary/25 bg-primary/[0.04] p-5 ring-1 ring-primary/10"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/platforms/color/webflow.svg"
                  alt=""
                  width={88}
                  height={24}
                  className="h-5 w-auto opacity-90 dark:brightness-0 dark:invert"
                />
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Also available on Webflow
                </p>
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                Same build prices — you pay Webflow hosting directly (
                {siteConfig.platforms.webflow.tiers.map((t) => `${t.name} $${t.price} USD/mo`).join(
                  ", "
                )}
                ). Mention it in your project brief.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.13}>
          <div id="pricing-integrations" className="mt-10 scroll-mt-24">
            <Accordion type="single" collapsible className="rounded-2xl border border-border/70 bg-background">
              <AccordionItem value="addons" className="border-0 px-1">
                <AccordionTrigger className="px-4 py-4 text-left text-sm font-semibold hover:no-underline sm:px-5 sm:text-base">
                  <span className="pr-2">
                    Add-ons, integrations &amp; standalone work{" "}
                    <span className="block text-xs font-normal text-muted-foreground sm:inline sm:pl-1">
                      (optional — open if you need from-prices)
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 sm:px-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We recommend the right tool for your industry and set it up as a fixed-price add-on —
                    no open-ended hourly.{" "}
                    <Link
                      href="/services/integrations"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      How we package integrations
                    </Link>
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Time blocks:</span> half-day from $
                    {siteConfig.billingRates.halfDayFrom.toLocaleString()} NZD · full day from $
                    {siteConfig.billingRates.dayFrom.toLocaleString()} NZD. Ad-hoc $
                    {siteConfig.billingRates.hourly}/hr — see FAQ.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {siteConfig.integrationModules.map((m) => (
                      <div
                        key={m.id}
                        className="rounded-xl border border-border/60 bg-muted/10 p-3 sm:p-4"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-sm font-semibold text-foreground">{m.label}</p>
                          <p className="font-mono text-sm font-semibold tabular-nums text-primary">
                            from ${m.fromPrice.toLocaleString()}
                          </p>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{m.outcome}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-border/60 pt-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Standalone (no new site)
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Wiring tools only — fixed deliverables, not a full site build.
                    </p>
                    <ul className="mt-3 space-y-2">
                      {siteConfig.standaloneSprints.map((s) => (
                        <li
                          key={s.id}
                          className="flex flex-col gap-0.5 rounded-lg border border-border/50 bg-muted/10 px-3 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3"
                        >
                          <div>
                            <span className="font-medium text-foreground">{s.name}</span>
                            <span className="text-muted-foreground"> — {s.tagline}</span>
                          </div>
                          <p className="shrink-0 font-mono text-sm font-semibold tabular-nums text-primary">
                            from ${s.fromPrice.toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div
            id="pricing-care"
            className="mt-10 scroll-mt-24 rounded-xl border border-border/70 bg-background p-6"
          >
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
