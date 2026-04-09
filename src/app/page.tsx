// Main landing page — 10-section sales page structure
// Each section is a separate component in src/components/sections/
// Import and wire up sections here as they're built out

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero";
import { TrustSignalSection } from "@/components/sections/trust-signal-section";
import { PlatformsLogoCloud } from "@/components/sections/platforms-logo-cloud";
import { ProblemSection } from "@/components/sections/problem";
import { DreamStateSection } from "@/components/sections/dream-state";
import { SolutionSection } from "@/components/sections/solution";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { HowStudioWorksSection } from "@/components/sections/how-studio-works";
import { PortfolioSection } from "@/components/sections/portfolio";
import { AboutSection } from "@/components/sections/about";
import { PricingSection } from "@/components/sections/pricing";
import { FAQSection } from "@/components/sections/faq";
import { FinalCTASection } from "@/components/sections/final-cta";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        "flex min-h-[100dvh] flex-col",
        "pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
      )}
    >
      <SiteHeader />
      <main className="flex-1">
        {/* Section 1: Hero — stop the scroll, drive one action */}
        <HeroSection />

        <TrustSignalSection />

        <PlatformsLogoCloud />

        {/* Section 2: Problem Agitation — make the prospect feel seen */}
        <ProblemSection />

        {/* Section 3: Dream State — paint the "after" picture */}
        <DreamStateSection />

        {/* Section 4: Solution / Packages — what they GET, not what you DO */}
        <SolutionSection />

        {/* Section 5: How It Works — 3 steps, remove complexity */}
        <HowItWorksSection />

        {/* Section 5b: How Scalr works (features grid) */}
        <HowStudioWorksSection />

        {/* Section 6: Portfolio / Social Proof */}
        <PortfolioSection />

        {/* Section 7: About — people buy from people */}
        <AboutSection />

        {/* Section 8: Pricing — transparent 3-tier with Standard highlighted */}
        <PricingSection />

        {/* Section 9: FAQ — preempt every objection */}
        <FAQSection />

        {/* Section 10: Final CTA — last chance to convert */}
        <FinalCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
