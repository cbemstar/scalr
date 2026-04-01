"use client"

// Section 8: Pricing — comparison first, asymmetric package layout (not 3 equal columns)

import Link from "next/link"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { FadeIn } from "@/components/common/fade-in"
import { siteConfig } from "@/config/site"
import type { Package } from "@/config/site"
import { cn } from "@/lib/utils"

const comparisonRows = [
  {
    label: "DIY (Wix/Squarespace)",
    price: "Free upfront",
    time: "40+ hours of your time",
    quality: "Amateur result that undermines credibility",
    isHighlight: false,
  },
  {
    label: "Agency",
    price: "$5,000–$15,000+",
    time: "Months",
    quality: "Junior handling your account, template theme",
    isHighlight: false,
  },
  {
    label: "This service",
    price: "$1,499–$4,500",
    time: "2 weeks",
    quality: "Built by a marketer, marketing included",
    isHighlight: true,
  },
]

const topBorderClass: Record<string, string> = {
  starter: "bg-border",
  standard: "bg-brand",
  premium: "bg-muted-foreground/80",
}

function PackageCard({
  pkg,
  featured,
}: {
  pkg: Package
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[1.25rem] border bg-background",
        featured
          ? "border-brand/35 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] ring-1 ring-brand/20"
          : "border-border/90 shadow-sm"
      )}
    >
      <div className={cn("h-0.5 w-full", topBorderClass[pkg.id] ?? "bg-border")} />

      {pkg.popular && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <Badge className="rounded-t-none rounded-b-md border-0 bg-brand px-3 text-xs text-brand-foreground">
            Most Popular
          </Badge>
        </div>
      )}

      <div className={cn("flex flex-1 flex-col p-6", featured && "p-7 sm:p-8")}>
        <div className={cn("mb-6", featured && "mb-8")}>
          <p className="font-heading text-lg font-semibold">{pkg.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{pkg.tagline}</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-heading text-3xl font-semibold tabular-nums sm:text-4xl">
              ${pkg.price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">NZD + GST</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {pkg.pages} · {pkg.deliveryDays}
          </p>
        </div>

        <Separator className="mb-5" />

        <ul className="flex flex-1 flex-col gap-2.5 text-sm">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2} />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">{pkg.paymentTerms}</p>
          <a
            href={siteConfig.contact.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                variant: pkg.popular ? "default" : "outline",
                size: "default",
              }),
              "w-full justify-center",
              pkg.popular && "bg-brand text-brand-foreground hover:bg-brand/90"
            )}
          >
            {pkg.cta}
          </a>
        </div>
      </div>
    </div>
  )
}

export function PricingSection() {
  const starter = siteConfig.packages.find((p) => p.id === "starter")!
  const standard = siteConfig.packages.find((p) => p.id === "standard")!
  const premium = siteConfig.packages.find((p) => p.id === "premium")!

  return (
    <section id="pricing" className="lp-section bg-muted/25">
      <div className="lp-shell">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="lp-kicker mb-3">Pricing</p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.35rem]">
              Clear prices. No surprises.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Most Christchurch web agencies won&apos;t show you their prices until you&apos;ve sat
              through a 45-minute sales call. That&apos;s not how I work.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mb-14 overflow-hidden rounded-[1.25rem] border border-border/80 bg-background">
            <div className="border-b bg-muted/40 px-5 py-3">
              <p className="lp-kicker">How your options compare</p>
            </div>
            <div className="divide-y divide-border/80">
              {comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className={cn(
                    "grid grid-cols-1 items-start gap-3 px-5 py-4 text-sm sm:grid-cols-4 sm:items-center sm:gap-4",
                    row.isHighlight && "bg-brand/[0.06]"
                  )}
                >
                  <span className={cn("font-medium", row.isHighlight && "text-brand")}>
                    {row.isHighlight && <span className="mr-1.5 text-brand">→</span>}
                    {row.label}
                  </span>
                  <span
                    className={cn(
                      "text-muted-foreground",
                      row.isHighlight && "font-medium text-foreground"
                    )}
                  >
                    {row.price}
                  </span>
                  <span
                    className={cn(
                      "hidden text-muted-foreground sm:block",
                      row.isHighlight && "font-medium text-foreground"
                    )}
                  >
                    {row.time}
                  </span>
                  <span
                    className={cn(
                      "hidden text-muted-foreground md:block",
                      row.isHighlight && "text-foreground"
                    )}
                  >
                    {row.quality}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Asymmetric: Standard featured left; Starter + Premium stacked right */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <FadeIn className="order-1 lg:col-span-7">
            <PackageCard pkg={standard} featured />
          </FadeIn>
          <div className="order-2 flex flex-col gap-6 lg:col-span-5">
            <FadeIn delay={0.05}>
              <PackageCard pkg={starter} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <PackageCard pkg={premium} />
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.15}>
          <div className="mt-14 rounded-[1.25rem] border border-border/80 bg-background p-6 text-center shadow-sm sm:p-8">
            <p className="font-medium">Need ongoing support after launch?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Care plans from $99/month — hosting, updates, and monitoring so you never have to think
              about it.
            </p>
            <Link
              href="#faq"
              className="mt-4 inline-block text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              See what&apos;s included
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
