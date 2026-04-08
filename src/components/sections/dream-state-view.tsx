"use client"

import { DreamStateTabs, type DreamOutcome } from "@/components/sections/dream-state-tabs"

export function DreamStateView({ outcomes }: { outcomes: DreamOutcome[] }) {
  return (
    <section
      id="dream"
      className="relative scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] bg-foreground px-4 py-20 text-background sm:px-6 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 left-1/4 size-[600px] rounded-full bg-primary/[0.12] blur-[130px]" />
        <div className="absolute right-0 bottom-0 size-[400px] rounded-full bg-primary/[0.08] blur-[100px]" />
      </div>

      <div className="lp-shell relative z-10">
        <DreamStateTabs outcomes={outcomes} />
      </div>
    </section>
  )
}
