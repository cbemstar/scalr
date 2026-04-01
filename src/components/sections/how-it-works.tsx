import { Pencil, Phone, Rocket } from "lucide-react"
import { FadeIn } from "@/components/common/fade-in"

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Book a Free Call",
    description:
      "15 minutes. We look at your current situation, what you need, and which package fits. No pressure, no pitch.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "We Build",
    description:
      "You get a mockup first. Once you're happy with the direction, we build the full site — delivered in 2–3 weeks.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "You Launch",
    description:
      "Training session included so you can make simple updates yourself. GA4, SEO, and conversion tracking already set up.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="process" className="lp-section bg-muted/20">
      <div className="lp-shell">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="lp-kicker">The process</p>
            <h2 className="lp-title mt-3">Three steps. No tech overwhelm.</h2>
            <p className="lp-lead">
              No chasing you for content for months on end.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <FadeIn key={step.number} delay={i * 0.06}>
                <article className="h-full rounded-2xl border border-border/80 bg-background p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-sm text-brand">{step.number}</span>
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted/70 text-muted-foreground">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.15}>
          <p className="mt-12 text-sm text-muted-foreground">
            From first call to live website:{" "}
            <span className="font-semibold text-foreground">2 weeks. Not months.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
