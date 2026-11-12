import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { NumberTicker } from "@/components/v2/craftwork/number-ticker"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"
import { cn } from "@/lib/utils"

/**
 * Problem — name the visitor's pains in their own words, one per service, so
 * they recognise themselves before we talk about us.
 */
export function V2Problem() {
  const { problem } = v2
  return (
    <section id="problem" aria-labelledby="problem-title" className="scroll-mt-20 border-t border-border bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="problem-title" index="01" kicker={problem.kicker} title={problem.title} />
        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {problem.items.map((item, i) => (
            <li key={item.tag}>
              <BlurFade inView delay={i * 0.1} className="flex h-full flex-col gap-5 rounded-3xl border border-border bg-background p-7">
                <span className="w-fit rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {item.tag}
                </span>
                <h3 className="v2-display text-2xl font-medium text-balance">“{item.title}”</h3>
                <p className="text-pretty text-muted-foreground">{item.body}</p>
              </BlurFade>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/**
 * Stakes — make the cost of doing nothing concrete. A 100-click grid where
 * ~8 convert (the industry average) shows the leak at a glance.
 */
export function V2Stakes() {
  const { stakes } = v2
  const converted = 8
  return (
    <section aria-labelledby="stakes-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="stakes-title" index="02" kicker={stakes.kicker} title={stakes.title} lead={stakes.lead} />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center">
          <BlurFade inView className="lg:col-span-4 lg:col-start-4">
            <figure className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <div
                role="img"
                aria-label="Illustration: of 100 paid clicks, about 8 convert and 92 leave."
                className="grid grid-cols-10 gap-1.5 sm:gap-2"
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "aspect-square rounded-[4px]",
                      i < converted ? "bg-brand" : "bg-foreground/10"
                    )}
                  />
                ))}
              </div>
              <figcaption className="mt-5 flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-2"><span aria-hidden className="size-2.5 rounded-[3px] bg-brand" /> Enquire or buy</span>
                <span className="flex items-center gap-2 text-muted-foreground"><span aria-hidden className="size-2.5 rounded-[3px] bg-foreground/15" /> Leave</span>
              </figcaption>
            </figure>
          </BlurFade>

          <div className="lg:col-span-4 lg:col-start-9">
          <dl className="flex flex-col divide-y divide-border border-y border-border">
            {stakes.benchmarks.map((b, i) => (
              <div key={b.label} className="flex flex-col gap-1 py-5">
                <dt className="order-2 text-sm text-muted-foreground">
                  {b.label} ·{" "}
                  <a href={b.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
                    {b.source}<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dt>
                <dd className="v2-display order-1 text-4xl font-medium">
                  {"prefix" in b && <span className="text-[0.55em] align-top text-muted-foreground">{b.prefix}</span>}
                  <NumberTicker value={b.value} decimalPlaces={b.decimals} locale="en-NZ" delay={i * 0.1} />
                  {"suffix" in b && <span className="text-brand">{b.suffix}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="py-4 text-xs text-muted-foreground">{stakes.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
