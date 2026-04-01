// Section 7: About — people buy from people

import { ShieldCheck } from "lucide-react"
import { FadeIn } from "@/components/common/fade-in"

const stats = [
  { value: "6+", label: "Years in digital marketing" },
  { value: "2 wk", label: "Typical delivery" },
  { value: "100%", label: "Satisfaction guarantee" },
]

export function AboutSection() {
  return (
    <section id="about" className="lp-section bg-muted/20">
      <div className="mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="order-2 lg:order-1 lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[1.35rem] border border-border/80 bg-muted/40 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.2)] lg:mx-0 lg:max-w-none">
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-brand/20 via-muted/50 to-background p-8">
              <div className="flex size-28 items-center justify-center rounded-full border-2 border-brand/25 bg-brand/10">
                <span className="font-heading text-3xl font-semibold text-brand">KP</span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Photo coming soon</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="order-1 lg:order-2 lg:col-span-7">
          <div>
            <p className="lp-kicker mb-3">About</p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.35rem]">
              A marketer who builds websites — not the other way around.
            </h2>
            <div className="mt-8 flex flex-col gap-5 leading-relaxed text-muted-foreground">
              <p>
                I&apos;ve spent 6+ years in digital marketing — running campaigns, analysing
                conversion funnels, and figuring out why people click (or don&apos;t). Along the way,
                I kept noticing the same problem: small businesses with genuinely great products and
                services losing customers to competitors with better websites.
              </p>
              <p>
                So I started building websites that are designed the way a marketer would design
                them. Every page has a goal. Every section earns its place. And the analytics are set
                up from day one so you can see what&apos;s working.
              </p>
              <p>
                Based in Christchurch. Working with small businesses across Canterbury and beyond.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-border/80 py-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-xl font-semibold tabular-nums text-foreground sm:text-2xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
              <span>Satisfaction guarantee on every project</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
