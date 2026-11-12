"use client"

import { ArrowRight, Check, Mail, MousePointerClick, PanelsTopLeft } from "lucide-react"

import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/v2/craftwork/tabs"
import { TiltCard } from "@/components/v2/craftwork/tilt-card"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"

const ICONS = { webflow: PanelsTopLeft, "google-ads": MousePointerClick, email: Mail } as const

export function V2Services() {
  const { services } = v2
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="services-title" index="01" kicker={services.kicker} title={services.title} lead={services.lead} />

        {/* Overview — three tilt cards (Craftwork / BeUI) */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.items.map((s, i) => {
            const Icon = ICONS[s.id]
            return (
              <BlurFade key={s.id} inView delay={i * 0.08} className="h-full">
                <TiltCard max={5} glare={false} className="h-full rounded-3xl">
                  <a
                    href={`#service-${s.id}`}
                    className="group flex h-full min-h-72 flex-col justify-between gap-10 rounded-3xl border border-border bg-card p-7 transition-colors hover:border-brand/40"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-brand">
                        <Icon aria-hidden className="size-6" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{s.number}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="v2-display text-[1.75rem] font-medium">{s.name}</h3>
                      <p className="text-pretty text-muted-foreground">{s.summary}</p>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                        What&apos;s included
                        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                </TiltCard>
              </BlurFade>
            )
          })}
        </div>

        {/* Detail — tabbed deliverables */}
        <Tabs defaultValue={services.items[0].id} className="mt-20 gap-0 rounded-3xl border border-border bg-card">
          <TabsList
            variant="segmented"
            size="lg"
            aria-label="Service details"
            className="m-3 w-fit max-w-[calc(100%-1.5rem)] overflow-x-auto [scrollbar-width:none]"
          >
            {services.items.map((s) => (
              <TabsTrigger key={s.id} value={s.id} id={`service-${s.id}`} className="scroll-mt-28 px-4">
                <span className="font-mono text-xs opacity-60">{s.number}</span>
                {s.short}
              </TabsTrigger>
            ))}
          </TabsList>
          {services.items.map((s) => (
            <TabsContent
              key={s.id}
              value={s.id}
              className="grid gap-10 border-t border-border p-6 outline-none sm:p-10 lg:grid-cols-12"
            >
              <div className="flex flex-col gap-5 lg:col-span-5">
                <h3 className="v2-display text-4xl font-medium">{s.name}</h3>
                <p className="text-lg text-pretty text-muted-foreground">{s.summary}</p>
                <p className="mt-auto border-l-2 border-brand pl-4 text-lg font-medium text-balance">
                  <span className="v2-serif text-brand">Outcome: </span>
                  {s.outcome}
                </p>
              </div>
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:col-span-7">
                {s.deliverables.map((d, i) => (
                  <li key={d} className="flex items-start gap-3 bg-card p-5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-brand">
                      <Check aria-hidden className="size-3.5" />
                    </span>
                    <span className="text-sm">
                      <span className="mr-2 font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
