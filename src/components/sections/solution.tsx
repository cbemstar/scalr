import {
  ChartBarStackedIcon,
  FlowIcon,
  Invoice01Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { FadeIn } from "@/components/common/fade-in"

const pillars: {
  icon: IconSvgElement
  title: string
  copy: string
}[] = [
  {
    icon: FlowIcon,
    title: "Structure that supports the next step",
    copy: "Pages are organised so visitors understand who you are, why you matter, and what to do next — that’s what improves the odds of a booking or enquiry. Results still depend on your offer, traffic, and follow-up.",
  },
  {
    icon: ChartBarStackedIcon,
    title: "Foundations that scale by tier",
    copy: "Basic SEO is part of every plan. Deeper SEO architecture, Search Console, and conversion tracking come in on higher tiers where there’s room in scope — check Pricing for the exact split. I’m not bundling a full marketing retainer into the build fee.",
  },
  {
    icon: Invoice01Icon,
    title: "Transparent pricing",
    copy: "No quoting games. No surprise invoices. Standard-site packages and Shopify ecommerce tiers — everything we include is published on this page with a simple comparison.",
  },
]

export function SolutionSection() {
  return (
    <section id="services" className="lp-section">
      <div className="lp-shell">
        <FadeIn>
          <div className="lp-section-intro">
            <p className="lp-kicker mb-3">Why this works</p>
            <h2 className="lp-title text-balance">
              Not a web designer who knows some marketing.
            </h2>
            <p className="lp-lead text-pretty">
              A marketer who builds websites — so structure, messaging, and measurement (where your
              tier includes them) point in the same direction as your business. The build sets you up
              to earn attention and a clearer next step; it doesn’t replace campaigns, ads, or
              day-to-day sales follow-through.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            return (
              <FadeIn key={pillar.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-border/80 bg-background p-6 shadow-sm">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <HugeiconsIcon
                      icon={pillar.icon}
                      size={18}
                      strokeWidth={1.5}
                      className="shrink-0 text-primary"
                      aria-hidden
                    />
                  </div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">{pillar.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {pillar.copy}
                  </p>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
