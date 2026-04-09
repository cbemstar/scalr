import { FadeIn } from "@/components/common/fade-in"
import { VercepProcessShowcase } from "@/components/sections/vercep-process-showcase"
import type { VercepFeatureItem } from "@/components/ui/vercep-feature-1"

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
    description:
      "You get a mockup first. Once you're happy with the direction, we build the full site — delivered in 2–3 weeks.",
  },
  {
    step: "03",
    icon: "launch",
    title: "You Launch",
    description:
      "Training session included so you can make simple updates yourself. GA4, SEO, and conversion tracking already set up.",
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
  "How do I know the site will convert visitors?",
]

export function HowItWorksSection() {
  return (
    <section id="how-we-work" className="lp-section bg-muted/20">
      <div className="lp-shell">
        <FadeIn>
          <VercepProcessShowcase
            eyebrow="The process"
            title="Three steps. No tech overwhelm."
            description="No chasing you for content for months on end. We filter out the noise, focus on what matters for Christchurch small businesses, and get you live without the usual agency runaround."
            marqueeItems={processMarqueeItems}
            steps={steps}
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-12 max-w-2xl text-base text-muted-foreground md:text-lg">
            From first conversation to live website:{" "}
            <span className="font-semibold text-foreground">2 weeks. Not months.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
