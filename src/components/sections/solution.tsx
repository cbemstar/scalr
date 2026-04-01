import { BarChart2, Eye, TrendingUp } from "lucide-react"
import { FadeIn } from "@/components/common/fade-in"

const pillars = [
  {
    icon: TrendingUp,
    title: "Conversion-focused design",
    copy: "Every page is built around one goal: turning visitors into enquiries, bookings, or calls. Not just something that looks nice.",
  },
  {
    icon: BarChart2,
    title: "Marketing included as standard",
    copy: "GA4, Google Search Console, conversion tracking, and basic SEO architecture come standard. Your site is a revenue tool, not a digital brochure.",
  },
  {
    icon: Eye,
    title: "Transparent pricing",
    copy: "No quoting games. No surprise invoices. Three clear packages with everything included — published right here on this page.",
  },
]

export function SolutionSection() {
  return (
    <section id="services" className="lp-section">
      <div className="lp-shell">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="lp-kicker">Why this works</p>
            <h2 className="lp-title mt-3">
              Not a web designer who knows some marketing.
            </h2>
            <p className="lp-lead">
              A marketer who builds websites designed to generate leads and revenue. There&apos;s a
              meaningful difference — and you&apos;ll feel it in your enquiry rate.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <FadeIn key={pillar.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-border/80 bg-background p-6 shadow-sm">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                    <Icon className="size-[18px]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.copy}</p>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
