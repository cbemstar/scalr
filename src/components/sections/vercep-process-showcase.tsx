"use client"

import { Badge } from "@/components/ui/badge"
import { Marquee } from "@/components/ui/marquee"
import type { VercepFeatureItem } from "@/components/ui/vercep-feature-1"
import { VercepFeature1 } from "@/components/ui/vercep-feature-1"
import { cn } from "@/lib/utils"

export type VercepProcessShowcaseProps = {
  /** Small caps label above the title (e.g. “The process”). */
  eyebrow?: string
  title: string
  description: string
  /** Short lines shown in the three marquee bands (e.g. common questions). */
  marqueeItems: string[]
  steps: VercepFeatureItem[]
  className?: string
}

function splitMarqueeItems(items: string[]) {
  const n = items.length
  const a = Math.ceil(n / 3)
  const b = Math.ceil((n * 2) / 3)
  return {
    m1: items.slice(0, a),
    m2: items.slice(a, b),
    m3: items.slice(b),
  }
}

/**
 * Headline + question marquees + shared VercepFeature1 step grid (matches Solution / site polish).
 */
export function VercepProcessShowcase({
  eyebrow,
  title,
  description,
  marqueeItems,
  steps,
  className,
}: VercepProcessShowcaseProps) {
  const { m1, m2, m3 } = splitMarqueeItems(marqueeItems)

  const badgeClass =
    "shrink-0 rounded-none border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-normal text-foreground"

  /** Edge fades aligned with `lp-section` surfaces that use `bg-muted/20`. */
  const marqueeFade =
    "from-muted/25 to-transparent sm:from-muted/35 sm:w-20"

  return (
    <div className={cn("relative w-full min-w-0", className)}>
      <header className="max-w-2xl">
        {eyebrow ? <p className="lp-kicker mb-3">{eyebrow}</p> : null}
        <h2 className="lp-title text-balance">{title}</h2>
        <p className="lp-lead mt-4 max-w-xl text-pretty">{description}</p>
      </header>

      <div className="mt-10 w-full min-w-0 overflow-hidden rounded-xl">
        <Marquee
          className="[--duration:45s]"
          speed={36}
          fadeClassName={marqueeFade}
        >
          {m1.map((q, i) => (
            <Badge
              key={`m1-${i}-${q.slice(0, 24)}`}
              variant="outline"
              className={badgeClass}
            >
              {q}
            </Badge>
          ))}
        </Marquee>

        <Marquee
          className="mt-3 [--duration:50s]"
          reverse
          speed={32}
          fadeClassName={marqueeFade}
        >
          {m2.map((q, i) => (
            <Badge
              key={`m2-${i}-${q.slice(0, 24)}`}
              variant="outline"
              className={badgeClass}
            >
              {q}
            </Badge>
          ))}
        </Marquee>

        <Marquee
          className="mt-3 [--duration:42s]"
          speed={38}
          fadeClassName={marqueeFade}
        >
          {m3.map((q, i) => (
            <Badge
              key={`m3-${i}-${q.slice(0, 24)}`}
              variant="outline"
              className={badgeClass}
            >
              {q}
            </Badge>
          ))}
        </Marquee>
      </div>

      <VercepFeature1 items={steps} className="mt-12 md:mt-14" />
    </div>
  )
}
