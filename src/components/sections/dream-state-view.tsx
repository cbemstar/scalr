"use client"

import { useRef } from "react"
import { DreamStateTabs, type DreamOutcome } from "@/components/sections/dream-state-tabs"
import { cn } from "@/lib/utils"

/** One viewport-height of scroll runway per outcome while the inner block stays sticky. */
const SCROLL_DVH_PER_TAB = 100

/** Extra bottom room for image captions / carousel controls; page handles safe-area. */
const DOCK_BOTTOM_SAFE =
  "pb-[calc(1rem+env(safe-area-inset-bottom,0px)+2rem)]"

export function DreamStateView({ outcomes }: { outcomes: DreamOutcome[] }) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const pinRef = useRef<HTMLDivElement | null>(null)
  const tabCount = Math.max(1, outcomes.length)

  return (
    <section
      ref={sectionRef}
      id="dream"
      className="relative scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] bg-foreground text-background"
      style={{
        minHeight: `calc(${tabCount} * ${SCROLL_DVH_PER_TAB}dvh)`,
      }}
    >
      {/*
        Do not use overflow-hidden on this section — it breaks position:sticky for descendants.
        Glow clipping stays on the inner wrapper only.
      */}
      <div
        ref={pinRef}
        className={cn(
          "sticky top-0 z-10 flex min-h-dvh w-full flex-col justify-center px-4 pt-20 sm:px-6 sm:pt-24",
          DOCK_BOTTOM_SAFE
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -top-32 left-1/4 size-[600px] rounded-full bg-primary/[0.12] blur-[130px]" />
          <div className="absolute right-0 bottom-0 size-[400px] rounded-full bg-primary/[0.08] blur-[100px]" />
        </div>

        <div className="lp-shell relative z-10">
          <DreamStateTabs
            outcomes={outcomes}
            scrollRootRef={sectionRef}
            scrollPinRef={pinRef}
          />
        </div>
      </div>
    </section>
  )
}
