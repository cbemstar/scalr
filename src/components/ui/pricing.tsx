"use client"

import { motion, useSpring } from "framer-motion"
import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Check, Flame, Sparkles } from "lucide-react"
import NumberFlow from "@number-flow/react"
import posthog from "posthog-js"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShineBorder } from "@/components/ui/shine-border"
import { cn } from "@/lib/utils"

function useMediaQuery(query: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }
    const result = matchMedia(query)
    result.addEventListener("change", onChange)
    setValue(result.matches)
    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value
}

type StarData = {
  top: number
  left: number
  width: number
  height: number
  duration: number
  delay: number
}

function Star({
  data,
  mousePosition,
  containerRef,
}: {
  data: StarData
  mousePosition: { x: number | null; y: number | null }
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const initialPos = { top: `${data.top}%`, left: `${data.left}%` }

  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 }
  const springX = useSpring(0, springConfig)
  const springY = useSpring(0, springConfig)

  useEffect(() => {
    if (
      !containerRef.current ||
      mousePosition.x === null ||
      mousePosition.y === null
    ) {
      springX.set(0)
      springY.set(0)
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const starX = containerRect.left + (data.left / 100) * containerRect.width
    const starY = containerRect.top + (data.top / 100) * containerRect.height

    const deltaX = mousePosition.x - starX
    const deltaY = mousePosition.y - starY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const radius = 600

    if (distance < radius) {
      const force = 1 - distance / radius
      springX.set(deltaX * force * 0.5)
      springY.set(deltaY * force * 0.5)
    } else {
      springX.set(0)
      springY.set(0)
    }
  }, [mousePosition, data, containerRef, springX, springY])

  return (
    <motion.div
      className="absolute rounded-full bg-foreground"
      style={{
        top: initialPos.top,
        left: initialPos.left,
        width: `${data.width}px`,
        height: `${data.height}px`,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: data.duration, repeat: Infinity, delay: data.delay }}
    />
  )
}

function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null }
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [stars, setStars] = useState<StarData[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 56 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        width: 1 + Math.random() * 2,
        height: 1 + Math.random() * 2,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      }))
    )
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
      {stars.map((star, i) => (
        <Star
          key={`star-${i}`}
          data={star}
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
      ))}
    </div>
  )
}

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

export function InteractivePricing({
  plans,
  priceBook = "marketing",
}: InteractivePricingProps) {
  const isCommerce = priceBook === "commerce"
  const monthlyRowLabel = isCommerce ? "Commerce care / mo" : "Hosting & support / mo"
  const comparisonLabels = useMemo(() => comparisonRowTitles(priceBook), [priceBook])

  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState<{
    x: number | null
    y: number | null
  }>({ x: null, y: null })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: null, y: null })}
      className="relative w-full overflow-hidden rounded-[1.25rem] border border-border/80 bg-background py-8 sm:py-10"
    >
      <InteractiveStarfield mousePosition={mousePosition} containerRef={containerRef} />
      <div className="relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch xl:gap-x-3 xl:gap-y-6">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id ?? plan.name}
              plan={plan}
              index={index}
              priceBook={priceBook}
            />
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
              How to pick a plan — simple comparison
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 sm:px-5">
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Start with the three plain-English rows (who it fits, what you get, what happens after launch).
                Open the technical checklist only if you want every line item spelled out — most people do not
                need it to choose.
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
                    Full technical checklist (line by line)
                    <span className="text-xs font-normal text-muted-foreground group-open:hidden">Show</span>
                    <span className="hidden text-xs font-normal text-muted-foreground group-open:inline">Hide</span>
                  </span>
                </summary>
                <div className="border-t border-border/60 px-3 pb-4 pt-3 sm:px-4">
                  <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                    Same information as in a proposal — useful if you are comparing nitty-gritty inclusions.
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
              All prices in NZD. Commerce care is optional — cancel anytime. Your Shopify subscription,
              transaction fees, and paid apps are paid directly to Shopify and app vendors.
            </>
          ) : (
            <>All prices in NZD. Hosting is optional — cancel anytime.</>
          )}
        </p>
      </div>
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

function PricingCardBody({
  plan,
  priceBook,
}: {
  plan: InteractivePricingPlan
  priceBook: "marketing" | "commerce"
}) {
  const isCommerce = priceBook === "commerce"
  return (
    <>
      {/*
        Row-aligned layout: fixed min-heights + line-clamp so all four columns share the same
        horizontal “lanes” at xl; bottom block uses mt-auto so CTAs line up when cards stretch.
      */}
      <div className="flex min-h-0 flex-1 flex-col gap-5">
        {/* Row 1: plan name + badge slot */}
        <div className="flex min-h-[3.25rem] shrink-0 items-start justify-between gap-2">
          <CardTitle className="font-heading text-lg font-semibold tracking-tight text-primary sm:text-xl">
            {plan.name}
          </CardTitle>
          {badgeForPlan(plan) ?? (
            <span className="invisible h-6 w-[5.5rem] shrink-0" aria-hidden />
          )}
        </div>

        {/* Row 2: scope · timeline + tagline (clamped so row height matches across cards) */}
        <div className="flex min-h-[7.5rem] shrink-0 flex-col justify-start gap-1.5 sm:min-h-[7.75rem]">
          <span className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/90">
            {plan.pages} · {plan.deliveryDays}
          </span>
          <CardDescription
            title={plan.tagline}
            className="line-clamp-4 text-pretty text-xs leading-snug text-muted-foreground sm:text-sm"
          >
            {plan.tagline}
          </CardDescription>
        </div>

        {/* Row 3: build */}
        <div className="flex min-h-[5.25rem] shrink-0 flex-col justify-end gap-0.5 border-b border-border/50 pb-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Build cost
          </span>
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="font-mono text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
              <NumberFlow
                value={plan.buildPrice}
                format={{
                  style: "currency",
                  currency: "NZD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
              />
            </span>
            <span className="text-xs font-normal text-muted-foreground sm:text-sm">one-time</span>
          </div>
        </div>

        {/* Row 4: monthly care / hosting */}
        <div className="flex min-h-[5rem] shrink-0 flex-col justify-end gap-0.5 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {isCommerce ? "Commerce care" : "Hosting & support"}
          </span>
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="font-mono text-xl font-semibold tabular-nums text-foreground sm:text-2xl">
              <NumberFlow
                value={plan.monthlyPrice}
                format={{
                  style: "currency",
                  currency: "NZD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
              />
            </span>
            <span className="text-xs text-muted-foreground sm:text-sm">
              {isCommerce ? "/mo · Shopify plan separate" : "/mo · cancel anytime"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex w-full min-w-0 shrink-0 flex-col gap-3 pt-1">
        <Separator className="shrink-0" />
        <Button
          asChild
          variant={plan.isPopular ? "default" : "secondary"}
          className="h-10 w-full shrink-0 text-sm"
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
      </div>
    </>
  )
}

function PricingCard({
  plan,
  index,
  priceBook,
}: {
  plan: InteractivePricingPlan
  index: number
  priceBook: "marketing" | "commerce"
}) {
  const isXl = useMediaQuery("(min-width: 1280px)")

  const cardInner = (
    <Card
      className={cn(
        "relative flex h-full min-h-0 flex-col rounded-2xl p-5 shadow-none ring-0 sm:p-6",
        plan.isPopular
          ? "border-0 bg-transparent"
          : "border border-border bg-card shadow-md ring-1 ring-foreground/5"
      )}
    >
      <PricingCardBody plan={plan} priceBook={priceBook} />
    </Card>
  )

  const wrapped =
    plan.isPopular ? (
      <ShineBorder borderWidth={2} duration={5} className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col">
        {cardInner}
      </ShineBorder>
    ) : (
      cardInner
    )

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      whileInView={{
        y: plan.isPopular && isXl ? -8 : 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 22,
        delay: index * 0.08,
      }}
      className="flex h-full min-h-0 flex-col"
    >
      {wrapped}
    </motion.div>
  )
}
