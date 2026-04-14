"use client"

/**
 * Scroll-linked vertical timeline — pattern adapted from Aceternity UI (shadcn registry @aceternity/timeline),
 * restyled for Scalr tokens (no hardcoded marketing copy).
 * @see https://ui.aceternity.com/components/timeline
 */
import { motion, useScroll, useTransform } from "motion/react"
import { useLayoutEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export type ClientJourneyItem = {
  title: string
  body: string
}

export type ClientJourneyTimelineProps = {
  kicker: string
  title: string
  lead: string
  items: readonly ClientJourneyItem[]
  className?: string
}

export function ClientJourneyTimeline({
  kicker,
  title,
  lead,
  items,
  className,
}: ClientJourneyTimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setHeight(el.getBoundingClientRect().height)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [items])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 35%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.12], [0, 1])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-[1.75rem] border border-border/80 bg-gradient-to-b from-muted/40 via-background to-background shadow-sm sm:rounded-[2rem]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(color-mix(in oklch, var(--primary) 18%, transparent) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative px-5 py-8 sm:px-8 sm:py-10 md:px-10">
        <p className="lp-kicker mb-3">{kicker}</p>
        <h3 className="lp-title max-w-3xl text-balance">{title}</h3>
        <p className="lp-lead mt-4 max-w-2xl text-pretty">{lead}</p>
      </div>

      <div ref={ref} className="relative px-4 pb-10 pt-2 md:px-8 md:pb-14">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="flex justify-start pt-8 md:gap-10 md:pt-14 first:pt-2 first:md:pt-6"
          >
            <div className="sticky top-28 z-40 flex max-w-xs flex-col items-center self-start md:top-32 md:max-w-sm md:w-full md:flex-row lg:max-w-md">
              <div className="absolute left-3 flex size-10 items-center justify-center rounded-full border border-border/80 bg-background shadow-sm md:left-3">
                <span className="font-mono text-xs font-semibold tabular-nums text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h4 className="hidden max-w-[12rem] font-heading text-lg font-semibold leading-snug tracking-tight text-muted-foreground md:block md:pl-20 md:text-xl">
                {item.title}
              </h4>
            </div>

            <div className="relative w-full pl-20 pr-2 md:pl-4 md:pr-0">
              <h4 className="mb-3 font-heading text-xl font-semibold tracking-tight text-foreground md:hidden">
                {item.title}
              </h4>
              <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.body}
              </p>
            </div>
          </div>
        ))}

        <div
          style={{ height: height > 0 ? `${height}px` : "100%" }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)] md:left-8"
          aria-hidden
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-primary via-primary/70 to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
