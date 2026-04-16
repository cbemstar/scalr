import { FadeIn } from "@/components/common/fade-in"
import { VercepProcessShowcase } from "@/components/sections/vercep-process-showcase"
import { ClientJourneyTimeline } from "@/components/ui/client-journey-timeline"
import type { VercepFeatureItem } from "@/components/ui/vercep-feature-1"
import { siteConfig } from "@/config/site"

const steps: VercepFeatureItem[] = [
  {
    step: "01",
    icon: "phone",
    title: "Get in touch",
    description:
      "A short chat by phone or email — your situation, what you need, and which package fits. No pressure, no pitch.",
  },
  {
    step: "02",
    icon: "pencil",
    title: "We Build",
    description: siteConfig.processSection.step02BuildDescription,
  },
  {
    step: "03",
    icon: "launch",
    title: "You Launch",
    description: siteConfig.processSection.step03LaunchDescription,
  },
]

/** Questions prospects often ask — used in the marquee bands above the three steps. */
const processMarqueeItems = [
  "How do I get more enquiries from my website?",
  "Will my site work on phones?",
  "How much does a small business website cost in NZ?",
  "Do you handle hosting and the domain?",
  "How long until I can go live?",
  "Will Google show my business in local search?",
  "Can I update the site myself after launch?",
  "What if I don't have professional photos yet?",
  "Do you set up analytics and contact forms?",
  "Is there ongoing support after launch?",
  "Which package is right for a tradie or café?",
  "How do I know visitors will know what to do next?",
]

export function HowItWorksSection() {
  return (
    <section id="how-we-work" className="lp-section bg-muted/20">
      <div className="lp-shell">
        <FadeIn>
          <VercepProcessShowcase
            eyebrow="The process"
            title="Three steps. No tech overwhelm."
            description="No chasing you for content for months on end. We filter out the noise, focus on what matters for New Zealand small businesses, and get you live without the usual agency runaround."
            marqueeItems={processMarqueeItems}
            steps={steps}
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <ClientJourneyTimeline
            className="mt-14"
            kicker={siteConfig.processSection.clientOnboarding.kicker}
            title={siteConfig.processSection.clientOnboarding.title}
            lead={siteConfig.processSection.clientOnboarding.lead}
            items={siteConfig.processSection.clientOnboarding.items}
          />
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="mt-10 max-w-2xl text-base text-muted-foreground md:text-lg">
            {siteConfig.processSection.closingLineBeforeEmphasis}{" "}
            <span className="font-semibold text-foreground">
              {siteConfig.processSection.closingLineEmphasis}
            </span>
            {siteConfig.processSection.closingLineAfterEmphasis}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
