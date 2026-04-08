import { FadeIn } from "@/components/common/fade-in"
import { Features } from "@/components/blocks/features-8"

export function HowStudioWorksSection() {
  return (
    <section id="studio-approach" className="lp-section bg-muted/25">
      <div className="lp-shell">
        <FadeIn>
          <div className="lp-section-intro max-w-2xl">
            <p className="lp-kicker mb-3">How we work</p>
            <h2 className="lp-title text-balance">How Scalr works</h2>
            <p className="lp-lead mt-4 text-pretty">
              Clear expectations — what we optimise for, and what we don&apos;t offer.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-10 md:mt-14">
          <Features />
        </FadeIn>
      </div>
    </section>
  )
}
