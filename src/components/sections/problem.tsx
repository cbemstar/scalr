import { AlertCircle, Clock, Frown, PhoneMissed, RefreshCw, TrendingDown } from "lucide-react"
import { FadeIn } from "@/components/common/fade-in"

const painPoints = [
  {
    icon: AlertCircle,
    headline: "You apologise for it",
    description:
      'You tell someone your website address and immediately add "it\'s a bit outdated" — undermining trust before they even visit.',
  },
  {
    icon: TrendingDown,
    headline: "Losing to competitors",
    description:
      "Your competitor — who you know is less experienced — looks more professional online and wins clients you should be getting.",
  },
  {
    icon: Clock,
    headline: "Ads going nowhere",
    description:
      "You've sent traffic from ads or social media to your site and wondered why no one's converting. The site is the problem.",
  },
  {
    icon: PhoneMissed,
    headline: "Impossible to contact",
    description:
      "A customer told you they couldn't find your phone number or hours. Basic information buried or missing entirely.",
  },
  {
    icon: Frown,
    headline: "DIY cringe",
    description:
      "You built it yourself a few years ago and every time you look at it, you cringe. But you never know where to start fixing it.",
  },
  {
    icon: RefreshCw,
    headline: "Perpetual to-do item",
    description:
      "You've been meaning to sort it out for months. It sits on the list, never at the top, costing you customers every day it stays there.",
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="lp-section bg-muted/20">
      <div className="lp-shell">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="lp-kicker">Sound familiar?</p>
            <h2 className="lp-title mt-3">
              Your website is working against you.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2">
          {painPoints.map((point, i) => {
            const Icon = point.icon
            return (
              <FadeIn key={point.headline} delay={i * 0.04}>
                <article className="rounded-2xl border border-border/80 bg-background p-6">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-muted-foreground">
                    <Icon className="size-[18px]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{point.headline}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </article>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.18}>
          <p className="mx-auto mt-10 max-w-3xl border-l-4 border-brand pl-5 text-base font-medium leading-relaxed sm:text-lg">
            You&apos;re not imagining it. A bad website is actively costing you customers every
            single day.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
