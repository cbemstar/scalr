"use client"

import * as React from "react"
import {
  BarChart3,
  CalendarCheck,
  Globe,
  HeartPulse,
  Mail,
  MapPin,
  MousePointerClick,
  Package,
  Receipt,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Wrench,
} from "lucide-react"

import { AnimatedBeam } from "@/components/v2/craftwork/animated-beam"
import { BentoChecklist } from "@/components/v2/craftwork/bento-checklist"
import {
  BentoCard,
  BentoCardContent,
  BentoCardDescription,
  BentoCardTitle,
  BentoCardVisual,
  BentoGrid,
  BentoLight,
  BentoPanel,
} from "@/components/v2/craftwork/bento-grid"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"
import { cn } from "@/lib/utils"

const BRAND_LIGHT = "[--bento-light:var(--brand)]"

function Node({
  ref,
  label,
  className,
  children,
}: {
  ref: React.Ref<HTMLDivElement>
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="z-10 flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "flex size-12 items-center justify-center rounded-full bg-popover text-muted-foreground shadow-[inset_0_1px_0_var(--highlight)] ring-1 ring-foreground/10 [&_svg]:size-5",
          className
        )}
      >
        {children}
      </div>
      <span className="text-xs whitespace-nowrap text-muted-foreground">{label}</span>
    </div>
  )
}

/** Booking, email, reviews → your site → orders, accounting, insight. */
function IntegrationsBeam() {
  const container = React.useRef<HTMLDivElement>(null)
  const booking = React.useRef<HTMLDivElement>(null)
  const email = React.useRef<HTMLDivElement>(null)
  const reviews = React.useRef<HTMLDivElement>(null)
  const site = React.useRef<HTMLDivElement>(null)
  const orders = React.useRef<HTMLDivElement>(null)
  const accounts = React.useRef<HTMLDivElement>(null)
  const insight = React.useRef<HTMLDivElement>(null)

  return (
    <div
      ref={container}
      role="img"
      aria-label="Diagram: booking, email and review tools connect into your website, which feeds orders, accounting and analytics."
      className="relative flex w-full max-w-xl items-center justify-between px-4 py-8"
    >
      <div className="flex flex-col gap-6">
        <Node ref={booking} label="Bookings"><CalendarCheck /></Node>
        <Node ref={email} label="Email & CRM"><Mail /></Node>
        <Node ref={reviews} label="Reviews"><Star /></Node>
      </div>
      <Node
        ref={site}
        label="Your website"
        className="size-16 bg-brand text-brand-foreground ring-0 [&_svg]:size-7"
      >
        <Globe />
      </Node>
      <div className="flex flex-col gap-6">
        <Node ref={orders} label="Orders"><Package /></Node>
        <Node ref={accounts} label="Accounting"><Receipt /></Node>
        <Node ref={insight} label="Analytics"><BarChart3 /></Node>
      </div>

      <AnimatedBeam containerRef={container} fromRef={booking} toRef={site} curvature={-40} endYOffset={-10} />
      <AnimatedBeam containerRef={container} fromRef={email} toRef={site} delay={0.4} />
      <AnimatedBeam containerRef={container} fromRef={reviews} toRef={site} curvature={40} endYOffset={10} delay={0.8} />
      <AnimatedBeam containerRef={container} fromRef={site} toRef={orders} curvature={-40} startYOffset={-10} delay={1.2} />
      <AnimatedBeam containerRef={container} fromRef={site} toRef={accounts} delay={1.6} />
      <AnimatedBeam containerRef={container} fromRef={site} toRef={insight} curvature={40} startYOffset={10} delay={2} />
    </div>
  )
}

function SearchResultPanel() {
  return (
    <BentoPanel className="w-full max-w-72 p-4 text-left transition-transform duration-500 group-hover/bento-card:-translate-y-1">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin aria-hidden className="size-3.5 text-brand" /> barber near me
      </p>
      <div className="mt-3 flex flex-col gap-1 rounded-xl bg-background/70 p-3 ring-1 ring-foreground/6">
        <p className="text-sm font-medium">Fade & Co. Barbers</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">4.9</span>
          <Star aria-hidden className="size-3 fill-[#d9901a] text-[#d9901a]" /> (184) · Open now
        </p>
        <div className="mt-1 flex gap-1.5 text-[11px]">
          <span className="rounded-full bg-brand px-2 py-0.5 text-brand-foreground">Book</span>
          <span className="rounded-full px-2 py-0.5 ring-1 ring-foreground/15">Website</span>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Sparkles aria-hidden className="size-3" /> Also suggested by AI assistants
      </p>
    </BentoPanel>
  )
}

function StorePanel() {
  return (
    <BentoPanel className="w-full max-w-64 p-4 transition-transform duration-500 group-hover/bento-card:-translate-y-1">
      <div className="flex items-center gap-3">
        <span className="size-12 shrink-0 rounded-lg bg-[radial-gradient(circle_at_30%_30%,#f3c9a8,#c4321b_70%)]" aria-hidden />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Kawakawa balm · 60ml</p>
          <p className="text-xs text-muted-foreground">$34.00 incl. GST</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-background/70 px-3 py-2 text-xs ring-1 ring-foreground/6">
        <span className="flex items-center gap-1.5 text-muted-foreground"><Truck aria-hidden className="size-3.5" /> NZ Post · 1–3 days</span>
        <span className="font-medium">$7.50</span>
      </div>
      <p className="mt-3 flex h-8 items-center justify-center gap-1.5 rounded-full bg-primary text-xs font-medium text-primary-foreground">
        <ShoppingBag aria-hidden className="size-3.5" /> Checkout
      </p>
    </BentoPanel>
  )
}

const BARS = [38, 52, 46, 61, 58, 74, 88]

function AnalyticsPanel() {
  return (
    <BentoPanel className="w-full max-w-64 p-4 transition-transform duration-500 group-hover/bento-card:-translate-y-1">
      <div className="flex items-baseline justify-between">
        <p className="text-xs text-muted-foreground">Enquiries · last 7 weeks</p>
        <p className="text-xs font-medium text-brand">+131%</p>
      </div>
      <div className="mt-4 flex h-20 items-end gap-1.5" aria-hidden>
        {BARS.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className={cn("flex-1 rounded-t-md", i === BARS.length - 1 ? "bg-brand" : "bg-foreground/12")}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><MousePointerClick aria-hidden className="size-3" /> Forms</span>
        <span className="flex items-center gap-1"><CalendarCheck aria-hidden className="size-3" /> Bookings</span>
        <span className="flex items-center gap-1"><HeartPulse aria-hidden className="size-3" /> Calls</span>
      </div>
    </BentoPanel>
  )
}

function CarePanel() {
  const items = ["Plugin & content updates", "Monthly speed check", "SEO health report", "Small improvements"]
  return (
    <BentoPanel className="w-full max-w-64 p-4 transition-transform duration-500 group-hover/bento-card:-translate-y-1">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Wrench aria-hidden className="size-3.5" /> This month</p>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-2">
            <span className={cn("size-1.5 rounded-full", i < 3 ? "bg-brand" : "bg-foreground/25")} aria-hidden />
            <span className={i < 3 ? "" : "text-muted-foreground"}>{item}</span>
          </li>
        ))}
      </ul>
    </BentoPanel>
  )
}

export function V2Services() {
  const { services } = v2
  const s = services.items
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="services-title" kicker={services.kicker} title={services.title} lead={services.lead} />

        <BentoGrid className="mt-14 auto-rows-auto">
          <BentoCard className={cn("md:col-span-3", BRAND_LIGHT)}>
            <BentoLight />
            <BentoCardVisual>
              <BentoChecklist items={[...s.websites.checklist]} />
            </BentoCardVisual>
            <BentoCardContent>
              <BentoCardTitle className="v2-display text-2xl">{s.websites.title}</BentoCardTitle>
              <BentoCardDescription>{s.websites.body}</BentoCardDescription>
            </BentoCardContent>
          </BentoCard>

          <BentoCard className={cn("md:col-span-3", BRAND_LIGHT)}>
            <BentoLight />
            <BentoCardVisual>
              <IntegrationsBeam />
            </BentoCardVisual>
            <BentoCardContent>
              <BentoCardTitle className="v2-display text-2xl">{s.integrations.title}</BentoCardTitle>
              <BentoCardDescription>{s.integrations.body}</BentoCardDescription>
              <p className="mt-2 text-xs text-muted-foreground">
                Including {s.integrations.tools.join(" · ")}
              </p>
            </BentoCardContent>
          </BentoCard>

          <BentoCard>
            <BentoLight />
            <BentoCardVisual><SearchResultPanel /></BentoCardVisual>
            <BentoCardContent>
              <BentoCardTitle className="v2-display text-xl">{s.seo.title}</BentoCardTitle>
              <BentoCardDescription>{s.seo.body}</BentoCardDescription>
            </BentoCardContent>
          </BentoCard>

          <BentoCard>
            <BentoLight />
            <BentoCardVisual><StorePanel /></BentoCardVisual>
            <BentoCardContent>
              <BentoCardTitle className="v2-display text-xl">{s.shopify.title}</BentoCardTitle>
              <BentoCardDescription>{s.shopify.body}</BentoCardDescription>
            </BentoCardContent>
          </BentoCard>

          <BentoCard>
            <BentoLight />
            <BentoCardVisual><AnalyticsPanel /></BentoCardVisual>
            <BentoCardContent>
              <BentoCardTitle className="v2-display text-xl">{s.analytics.title}</BentoCardTitle>
              <BentoCardDescription>{s.analytics.body}</BentoCardDescription>
            </BentoCardContent>
          </BentoCard>

          <BentoCard className="min-h-0 md:col-span-6 md:grid md:grid-cols-2 md:items-center">
            <BentoLight className="md:left-1/2" />
            <BentoCardContent className="order-2 md:order-1 md:p-10">
              <BentoCardTitle className="v2-display text-2xl">{s.care.title}</BentoCardTitle>
              <BentoCardDescription className="max-w-md text-base">{s.care.body}</BentoCardDescription>
            </BentoCardContent>
            <div className="order-1 flex items-center justify-center p-6 md:order-2 md:p-10">
              <CarePanel />
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  )
}
