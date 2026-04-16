"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { Check, Flame, Sparkles } from "lucide-react"
import posthog from "posthog-js"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type PlanComparisonCopy = {
  /** Plain-English — who this package is for */
  pickIf: string
  /** Plain-English — what they walk away with */
  youGet: string
  /** Plain-English — support and what happens after go-live */
  afterLaunch: string
}

export type InteractivePricingPlan = {
  /** Stable key when switching between price books */
  id?: string
  name: string
  tagline: string
  buildPrice: number
  monthlyPrice: number
  pages: string
  deliveryDays: string
  features: string[]
  /** Short sentences for the main comparison — avoids long checkmark lists */
  comparison: PlanComparisonCopy
  paymentTerms: string
  cta: string
  href: string
  isPopular?: boolean
  isSimplest?: boolean
}

export interface InteractivePricingProps {
  plans: InteractivePricingPlan[]
  /** Marketing sites vs Shopify — adjusts labels (hosting vs commerce care). */
  priceBook?: "marketing" | "commerce"
}

const nzd = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** Unique feature rows in stable order (first-seen across plans). */
function orderedUnionFeatures(plans: InteractivePricingPlan[]): string[] {
  const seen = new Set<string>()
  const order: string[] = []
  for (const plan of plans) {
    for (const f of plan.features) {
      if (!seen.has(f)) {
        seen.add(f)
        order.push(f)
      }
    }
  }
  return order
}

function comparisonRowTitles(priceBook: "marketing" | "commerce"): PlanComparisonCopy {
  if (priceBook === "commerce") {
    return {
      pickIf: "Pick this if…",
      youGet: "When we're done, your shop can…",
      afterLaunch: "After launch…",
    }
  }
  return {
    pickIf: "Pick this if…",
    youGet: "When we're done, you have…",
    afterLaunch: "After launch…",
  }
}

function PlanComparisonMobileCards({
  plans,
  monthlyRowLabel,
  rowTitles,
}: {
  plans: InteractivePricingPlan[]
  monthlyRowLabel: string
  rowTitles: PlanComparisonCopy
}) {
  return (
    <div className="flex flex-col gap-4" role="list">
      <p className="sr-only">
        Each plan is listed in its own card. Compare prices, plain-English fit, then open the technical
        checklist if you need it.
      </p>
      {plans.map((plan) => (
        <div
          key={plan.id ?? plan.name}
          role="listitem"
          className={cn(
            "rounded-xl border border-border/70 bg-background/90 p-4 shadow-sm",
            plan.isPopular && "border-primary/35 bg-primary/5 ring-1 ring-primary/15"
          )}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3">
            <h3 className="font-heading text-base font-semibold text-primary">{plan.name}</h3>
            {plan.isPopular ? (
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Recommended
              </span>
            ) : null}
          </div>
          <dl className="mt-3 divide-y divide-border/40 text-sm text-muted-foreground">
            <div className="flex items-baseline justify-between gap-3 py-2.5 first:pt-0">
              <dt className="text-foreground">One-time build</dt>
              <dd className="font-mono tabular-nums text-foreground">{nzd.format(plan.buildPrice)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 py-2.5">
              <dt className="text-foreground">{monthlyRowLabel}</dt>
              <dd className="font-mono tabular-nums text-foreground">{nzd.format(plan.monthlyPrice)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 py-2.5">
              <dt className="text-foreground">Size (rough guide)</dt>
              <dd className="text-right text-foreground">{plan.pages}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 py-2.5">
              <dt className="text-foreground">Typical timeline</dt>
              <dd className="text-right text-foreground">{plan.deliveryDays}</dd>
            </div>
            <div className="flex flex-col gap-1 py-2.5">
              <dt className="text-foreground">Payment</dt>
              <dd className="text-xs leading-snug text-muted-foreground">{plan.paymentTerms || "—"}</dd>
            </div>
          </dl>
          <div className="mt-4 space-y-3 border-t border-border/50 pt-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{rowTitles.pickIf}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">{plan.comparison.pickIf}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{rowTitles.youGet}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">{plan.comparison.youGet}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                {rowTitles.afterLaunch}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">{plan.comparison.afterLaunch}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PlanComparisonSimpleTable({
  plans,
  monthlyRowLabel,
  rowTitles,
}: {
  plans: InteractivePricingPlan[]
  monthlyRowLabel: string
  rowTitles: PlanComparisonCopy
}) {
  return (
    <div className="isolate overflow-x-auto overscroll-x-contain rounded-xl border border-border/70 bg-muted/10 [-webkit-overflow-scrolling:touch]">
      <table className="w-full min-w-[36rem] border-collapse text-left text-xs sm:text-sm">
        <caption className="sr-only">Compare plans using plain language, then open the checklist for details</caption>
        <thead>
          <tr className="border-b border-border/80 bg-muted/40">
            <th
              scope="col"
              className="sticky left-0 z-20 min-w-[10rem] border-r border-border/60 bg-muted/40 px-3 py-3 text-left font-semibold text-foreground shadow-[4px_0_12px_-4px_rgba(0,0,0,0.12)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.35)]"
            >
              Topic
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id ?? plan.name}
                scope="col"
                className={cn(
                  "min-w-[11rem] px-3 py-3 text-center font-heading font-semibold text-primary",
                  plan.isPopular && "bg-primary/5 text-primary"
                )}
              >
                {plan.name}
                {plan.isPopular ? (
                  <span className="mt-1 block text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                    Recommended
                  </span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/60 bg-background/80">
            <th
              scope="row"
              className="sticky left-0 z-20 border-r border-border/60 bg-background/95 px-3 py-2.5 text-left font-medium text-foreground shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.3)]"
            >
              One-time build
            </th>
            {plans.map((plan) => (
              <td key={plan.id ?? plan.name} className="px-3 py-2.5 text-center font-mono tabular-nums text-foreground">
                {nzd.format(plan.buildPrice)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/60">
            <th
              scope="row"
              className="sticky left-0 z-20 border-r border-border/60 bg-background/95 px-3 py-2.5 text-left font-medium text-foreground shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.3)]"
            >
              {monthlyRowLabel}
            </th>
            {plans.map((plan) => (
              <td key={plan.id ?? plan.name} className="px-3 py-2.5 text-center font-mono tabular-nums text-foreground">
                {nzd.format(plan.monthlyPrice)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/60">
            <th
              scope="row"
              className="sticky left-0 z-20 border-r border-border/60 bg-background/95 px-3 py-2.5 text-left font-medium text-foreground shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.3)]"
            >
              Size (rough guide)
            </th>
            {plans.map((plan) => (
              <td key={plan.id ?? plan.name} className="px-3 py-2.5 text-center text-foreground">
                {plan.pages}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/60">
            <th
              scope="row"
              className="sticky left-0 z-20 border-r border-border/60 bg-background/95 px-3 py-2.5 text-left font-medium text-foreground shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.3)]"
            >
              Typical timeline
            </th>
            {plans.map((plan) => (
              <td key={plan.id ?? plan.name} className="px-3 py-2.5 text-center text-foreground">
                {plan.deliveryDays}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/60">
            <th
              scope="row"
              className="sticky left-0 z-20 border-r border-border/60 bg-background/95 px-3 py-2.5 text-left font-medium text-foreground shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.3)]"
            >
              Payment
            </th>
            {plans.map((plan) => (
              <td key={plan.id ?? plan.name} className="max-w-[13rem] px-3 py-2.5 text-center text-xs leading-snug text-foreground">
                {plan.paymentTerms || "—"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/60 bg-primary/[0.03]">
            <th
              scope="row"
              className="sticky left-0 z-20 align-top border-r border-border/60 bg-background/95 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-primary shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.3)] sm:text-[11px]"
            >
              {rowTitles.pickIf}
            </th>
            {plans.map((plan) => (
              <td
                key={plan.id ?? plan.name}
                className="px-3 py-2.5 text-left text-xs leading-relaxed text-foreground sm:text-sm"
              >
                {plan.comparison.pickIf}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/60 bg-primary/[0.03]">
            <th
              scope="row"
              className="sticky left-0 z-20 align-top border-r border-border/60 bg-background/95 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-primary shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.3)] sm:text-[11px]"
            >
              {rowTitles.youGet}
            </th>
            {plans.map((plan) => (
              <td
                key={plan.id ?? plan.name}
                className="px-3 py-2.5 text-left text-xs leading-relaxed text-foreground sm:text-sm"
              >
                {plan.comparison.youGet}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/40 bg-primary/[0.03]">
            <th
              scope="row"
              className="sticky left-0 z-20 align-top border-r border-border/60 bg-background/95 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-primary shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.3)] sm:text-[11px]"
            >
              {rowTitles.afterLaunch}
            </th>
            {plans.map((plan) => (
              <td
                key={plan.id ?? plan.name}
                className="px-3 py-2.5 text-left text-xs leading-relaxed text-foreground sm:text-sm"
              >
                {plan.comparison.afterLaunch}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function PlanComparisonFeatureMatrix({ plans }: { plans: InteractivePricingPlan[] }) {
  const featureRows = useMemo(() => orderedUnionFeatures(plans), [plans])

  return (
    <div className="isolate overflow-x-auto overscroll-x-contain rounded-xl border border-border/70 bg-muted/5 [-webkit-overflow-scrolling:touch]">
      <table className="w-full min-w-[36rem] border-collapse text-left text-xs sm:text-sm">
        <caption className="sr-only">Detailed line-by-line checklist per plan</caption>
        <thead>
          <tr className="border-b border-border/80 bg-muted/40">
            <th
              scope="col"
              className="sticky left-0 z-20 min-w-[10rem] border-r border-border/60 bg-muted/40 px-3 py-3 text-left font-semibold text-foreground shadow-[4px_0_12px_-4px_rgba(0,0,0,0.12)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.35)]"
            >
              Line item
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id ?? plan.name}
                scope="col"
                className={cn(
                  "px-3 py-3 text-center font-heading font-semibold text-primary",
                  plan.isPopular && "bg-primary/5 text-primary"
                )}
              >
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {featureRows.map((feature) => (
            <tr key={feature} className="border-b border-border/40 last:border-0">
              <th
                scope="row"
                className="sticky left-0 z-20 max-w-[14rem] border-r border-border/60 bg-background/95 px-3 py-2 text-left text-xs font-normal leading-snug text-foreground shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.3)] sm:text-sm"
              >
                {feature}
              </th>
              {plans.map((plan) => {
                const included = plan.features.includes(feature)
                return (
                  <td key={plan.id ?? plan.name} className="px-3 py-2 text-center">
                    {included ? (
                      <Check className="mx-auto size-4 text-primary" aria-label="Included" />
                    ) : (
                      <span className="text-muted-foreground/50" aria-label="Not included">
                        —
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function badgeForPlan(plan: InteractivePricingPlan) {
  if (plan.isPopular) {
    return (
      <Badge
        variant="default"
        className="h-6 w-fit shrink-0 gap-1 px-2 py-0.5 text-xs font-medium [&>svg]:size-3.5"
      >
        <Flame className="size-3.5" aria-hidden />
        Recommend
      </Badge>
    )
  }
  if (plan.isSimplest) {
    return (
      <Badge
        variant="outline"
        className="h-6 w-fit shrink-0 gap-1 px-2 py-0.5 text-xs font-medium [&>svg]:size-3.5"
      >
        <Sparkles className="size-3.5" aria-hidden />
        Start here
      </Badge>
    )
  }
  return null
}

export function InteractivePricing({ plans, priceBook = "marketing" }: InteractivePricingProps) {
  const isCommerce = priceBook === "commerce"
  const monthlyRowLabel = isCommerce ? "Commerce care / mo" : "Hosting & support / mo"
  const comparisonLabels = useMemo(() => comparisonRowTitles(priceBook), [priceBook])

  return (
    <div className="w-full rounded-[1.25rem] border border-border/80 bg-background py-8 sm:py-10">
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {plans.map((plan) => (
            <Card
              key={plan.id ?? plan.name}
              className={cn(
                "flex h-full flex-col rounded-2xl border p-5 shadow-sm sm:p-6",
                plan.isPopular
                  ? "border-primary/40 ring-1 ring-primary/20"
                  : "border-border/80 bg-card ring-1 ring-foreground/5"
              )}
            >
              <CardContent className="flex flex-1 flex-col gap-4 p-0">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {plan.name}
                  </CardTitle>
                  {badgeForPlan(plan)}
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {plan.pages} · {plan.deliveryDays}
                </p>
                <p className="text-sm leading-snug text-muted-foreground">{plan.tagline}</p>
                <div className="space-y-1 border-t border-border/60 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Build
                  </p>
                  <p className="font-mono text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
                    {nzd.format(plan.buildPrice)}
                    <span className="ml-1 text-xs font-normal text-muted-foreground sm:text-sm">one-time</span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {isCommerce ? "Commerce care" : "Hosting & support"}
                  </p>
                  <p className="font-mono text-xl font-semibold tabular-nums text-foreground sm:text-2xl">
                    {nzd.format(plan.monthlyPrice)}
                    <span className="ml-1 text-xs font-normal text-muted-foreground sm:text-sm">
                      {isCommerce ? "/mo · Shopify billed separately" : "/mo · cancel anytime"}
                    </span>
                  </p>
                </div>
                <Button
                  asChild
                  variant={plan.isPopular ? "default" : "secondary"}
                  className="mt-auto h-10 w-full text-sm"
                >
                  <Link
                    href={plan.href}
                    onClick={() =>
                      posthog.capture("pricing_cta_clicked", {
                        plan_name: plan.name,
                        plan_price: plan.buildPrice,
                        price_book: priceBook,
                      })
                    }
                  >
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-8 rounded-2xl border border-border/70 bg-muted/15"
          onValueChange={(value) => {
            if (value === "compare") {
              posthog.capture("pricing_comparison_opened", { price_book: priceBook })
            }
          }}
        >
          <AccordionItem value="compare" className="border-0">
            <AccordionTrigger className="px-4 py-4 text-sm font-semibold hover:no-underline sm:px-5 sm:text-base">
              Compare plans (optional)
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 sm:px-5">
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Three rows cover who each plan fits and what happens after launch. Open the checklist only if you
                need every line item.
              </p>
              <div className="md:hidden">
                <PlanComparisonMobileCards
                  plans={plans}
                  monthlyRowLabel={monthlyRowLabel}
                  rowTitles={comparisonLabels}
                />
              </div>
              <div className="hidden md:block">
                <PlanComparisonSimpleTable
                  plans={plans}
                  monthlyRowLabel={monthlyRowLabel}
                  rowTitles={comparisonLabels}
                />
              </div>

              <details className="group mt-6 rounded-xl border border-border/60 bg-muted/10">
                <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    Full technical checklist
                    <span className="text-xs font-normal text-muted-foreground group-open:hidden">Show</span>
                    <span className="hidden text-xs font-normal text-muted-foreground group-open:inline">Hide</span>
                  </span>
                </summary>
                <div className="border-t border-border/60 px-3 pb-4 pt-3 sm:px-4">
                  <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                    Same detail as a proposal — useful when comparing inclusions line by line.
                  </p>
                  <PlanComparisonFeatureMatrix plans={plans} />
                </div>
              </details>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
          {isCommerce ? (
            <>
              All prices in NZD. Commerce care is optional — cancel anytime. Your Shopify subscription, transaction
              fees, and paid apps are paid directly to Shopify and app vendors.
            </>
          ) : (
            <>All prices in NZD. Hosting is optional — cancel anytime.</>
          )}
        </p>
      </div>
    </div>
  )
}
