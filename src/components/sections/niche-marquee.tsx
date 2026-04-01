"use client"

import { useSyncExternalStore } from "react"
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const extraPhrases = [
  "GA4 & conversion tracking",
  "2-week delivery",
  "Christchurch-based",
  "Transparent pricing",
  "SEO-ready structure",
  "Mobile-first builds",
]

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {}
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", onStoreChange)
      return () => mq.removeEventListener("change", onStoreChange)
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    () => false
  )
}

export function NicheMarquee() {
  const items = [...siteConfig.niches, ...extraPhrases]
  const reduceMotion = usePrefersReducedMotion()

  if (reduceMotion) {
    return (
      <section
        aria-label="Services and focus areas"
        className="border-y border-border/60 bg-muted/30 py-4"
      >
        <div className="container mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 px-4">
          {items.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  i % 3 === 0 && "bg-brand/80",
                  i % 3 === 1 && "bg-brand/50",
                  i % 3 === 2 && "bg-foreground/25"
                )}
                aria-hidden
              />
              {label}
            </span>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      aria-label="Services and focus areas"
      className="relative border-y border-border/60 bg-muted/30 py-3"
    >
      <Marquee className="py-1">
        <MarqueeFade side="left" className="from-muted/90" />
        <MarqueeFade side="right" className="from-muted/90" />
        <MarqueeContent speed={38} gradient={false} pauseOnHover>
          {items.map((label, i) => (
            <MarqueeItem
              key={`${label}-${i}`}
              className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  i % 3 === 0 && "bg-brand/80",
                  i % 3 === 1 && "bg-brand/50",
                  i % 3 === 2 && "bg-foreground/25"
                )}
                aria-hidden
              />
              {label}
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </section>
  )
}
