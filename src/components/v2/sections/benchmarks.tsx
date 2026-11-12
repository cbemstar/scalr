import { ArrowUpRight } from "lucide-react"

import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { NumberTicker } from "@/components/v2/craftwork/number-ticker"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"

export function V2Benchmarks() {
  const { benchmarks } = v2
  return (
    <section aria-labelledby="benchmarks-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="benchmarks-title" index="03" kicker={benchmarks.kicker} title={benchmarks.title} />

        <dl className="mt-14 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
          {benchmarks.items.map((item, i) => (
            <BlurFade
              key={item.label}
              inView
              delay={i * 0.08}
              className="flex flex-col justify-between gap-10 border-r border-b border-border p-6 sm:p-8"
            >
              <div className="flex flex-col gap-4">
                <dt className="sr-only">{item.label}</dt>
                <dd className="v2-display text-5xl font-medium tracking-tight sm:text-6xl">
                  {"prefix" in item && <span className="text-[0.55em] align-top text-muted-foreground">{item.prefix}</span>}
                  <NumberTicker value={item.value} decimalPlaces={item.decimals} locale="en-NZ" delay={0.1 + i * 0.1} />
                  {"suffix" in item && <span className="text-brand">{item.suffix}</span>}
                </dd>
                <p aria-hidden className="text-pretty text-foreground/80">{item.label}</p>
              </div>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-1 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {item.source}
                <ArrowUpRight aria-hidden className="size-3 shrink-0" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </BlurFade>
          ))}
        </dl>
        <p className="mt-6 max-w-2xl text-sm text-muted-foreground">{benchmarks.footnote}</p>
      </div>
    </section>
  )
}
