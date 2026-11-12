"use client"

import { ArrowRight, Check, Mail, MousePointerClick, PanelsTopLeft } from "lucide-react"

import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { TiltCard } from "@/components/v2/craftwork/tilt-card"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"

const ICONS = { webflow: PanelsTopLeft, "google-ads": MousePointerClick, email: Mail } as const

/**
 * Offer — the three services, each scannable in one glance: what it is, four
 * deliverables, and a way to ask about it. Same order as the visitor's journey.
 */
export function V2Services() {
  const { services, cta } = v2
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="services-title" index="04" kicker={services.kicker} title={services.title} />

        <ul className="mt-16 grid gap-5 lg:grid-cols-3">
          {services.items.map((s, i) => {
            const Icon = ICONS[s.id]
            return (
              <li key={s.id} id={`service-${s.id}`} className="scroll-mt-28">
                <BlurFade inView delay={i * 0.08} className="h-full">
                  <TiltCard max={4} glare={false} className="h-full rounded-3xl">
                    <article className="flex h-full flex-col gap-8 rounded-3xl border border-border bg-card p-7 sm:p-8">
                      <header className="flex items-start justify-between">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-brand">
                          <Icon aria-hidden className="size-6" />
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">{s.number}</span>
                      </header>
                      <div className="flex flex-col gap-3">
                        <h3 className="v2-display text-[1.75rem] font-medium text-balance">{s.name}</h3>
                        <p className="text-pretty text-muted-foreground">{s.summary}</p>
                      </div>
                      <ul className="flex flex-col gap-3 border-t border-border pt-6 text-sm">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-3">
                            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <a href={cta.href} className="group mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                        Ask about {s.short}
                        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </article>
                  </TiltCard>
                </BlurFade>
              </li>
            )
          })}
        </ul>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase sm:w-56 sm:shrink-0">Platforms we work in</p>
          <ul className="flex flex-wrap gap-2 text-sm">
            {services.tools.map((t) => (
              <li key={t} className="rounded-full border border-border bg-card px-3 py-1.5">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
