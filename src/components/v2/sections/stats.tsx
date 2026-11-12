import { ArrowUpRight } from "lucide-react"

import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { NumberTicker } from "@/components/v2/craftwork/number-ticker"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"

export function V2Stats() {
  const { stats } = v2
  return (
    <section aria-labelledby="stats-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="stats-title" kicker={stats.kicker} title={stats.title} />

        <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((item, i) => (
            <BlurFade
              key={item.label}
              inView
              delay={i * 0.08}
              className="flex flex-col justify-between gap-8 bg-card p-6 sm:p-8"
            >
              <div className="flex flex-col gap-3">
                <dt className="sr-only">{item.label}</dt>
                <dd className="v2-display text-6xl font-semibold text-brand sm:text-7xl">
                  {"prefix" in item && item.prefix}
                  <NumberTicker value={item.value} locale="en-NZ" delay={0.1 + i * 0.1} />
                  {item.suffix}
                </dd>
                <p aria-hidden className="text-base text-pretty text-foreground/85">
                  {item.label}
                </p>
              </div>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-1 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {item.source}
                <ArrowUpRight aria-hidden className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </BlurFade>
          ))}
        </dl>

        <p className="mt-8 max-w-2xl text-lg text-pretty text-muted-foreground">
          {stats.footnote}
        </p>
      </div>
    </section>
  )
}
