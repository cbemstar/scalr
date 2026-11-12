"use client"

import * as React from "react"
import { Inbox, MousePointerClick, PanelsTopLeft, Search, Target } from "lucide-react"

import { AnimatedBeam } from "@/components/v2/craftwork/animated-beam"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"
import { cn } from "@/lib/utils"

const ICONS = [Search, MousePointerClick, PanelsTopLeft, Target, Inbox]
const BEAMS = [[0, 1], [1, 2], [2, 3], [3, 4]] as const

/** The funnel as one connected pipeline: Search → Click → Land → Convert → Nurture. */
export function V2System() {
  const { system } = v2
  const container = React.useRef<HTMLDivElement>(null)
  const r0 = React.useRef<HTMLDivElement>(null)
  const r1 = React.useRef<HTMLDivElement>(null)
  const r2 = React.useRef<HTMLDivElement>(null)
  const r3 = React.useRef<HTMLDivElement>(null)
  const r4 = React.useRef<HTMLDivElement>(null)
  const refs = [r0, r1, r2, r3, r4]

  return (
    <section
      id="system"
      aria-labelledby="system-title"
      className="scroll-mt-20 bg-[var(--v2-ink)] py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="system-title" index="02" kicker={system.kicker} title={system.title} lead={system.lead} inverted />

        <div
          ref={container}
          role="img"
          aria-label={`The funnel: ${system.steps.map((s) => `${s.label} (${s.detail})`).join(", then ")}.`}
          className="relative mt-16 grid grid-cols-5 gap-2 rounded-3xl border border-white/10 bg-white/[0.03] px-2 py-10 sm:px-8 sm:py-14"
        >
          {system.steps.map((step, i) => {
            const Icon = ICONS[i]
            const hub = i === 2
            return (
              <div key={step.label} className="z-10 flex flex-col items-center gap-3 text-center">
                <div
                  ref={refs[i]}
                  className={cn(
                    "flex items-center justify-center rounded-2xl border",
                    hub
                      ? "size-16 border-transparent bg-brand text-brand-foreground shadow-[0_0_40px_-6px_var(--brand)] sm:size-20"
                      : "size-12 border-white/15 bg-[var(--v2-ink)] text-white/80 sm:size-14"
                  )}
                >
                  <Icon aria-hidden className={hub ? "size-7 sm:size-8" : "size-5 sm:size-6"} />
                </div>
                <div>
                  <p className="text-sm font-medium sm:text-base">{step.label}</p>
                  <p className="hidden text-xs text-white/55 sm:block">{step.detail}</p>
                </div>
              </div>
            )
          })}
          {BEAMS.map(([from, to], i) => (
            <AnimatedBeam
              key={i}
              containerRef={container}
              fromRef={refs[from]}
              toRef={refs[to]}
              curvature={i % 2 ? 24 : -24}
              delay={i * 0.6}
              duration={3}
              pathColor="color-mix(in oklab, white 14%, transparent)"
              gradientStartColor="var(--brand)"
              gradientStopColor="#8fa2ff"
            />
          ))}
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-sm sm:grid-cols-3">
          {v2.services.items.map((s) => (
            <a key={s.id} href={`#service-${s.id}`} className="group flex items-center justify-between gap-3 bg-[var(--v2-ink)] px-5 py-4 transition-colors hover:bg-white/[0.04]">
              <span>
                <span className="mr-3 font-mono text-xs text-white/45">{s.number}</span>
                {s.short}
              </span>
              <span aria-hidden className="text-white/40 transition-transform group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
