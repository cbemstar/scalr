import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller"
import type { LogoGridItem } from "@/components/ui/logo-cloud-2"

/**
 * Full-colour brand SVGs (local files under /public/logos/platforms/color).
 * Webflow, JS, WordPress, Shopify from SVGL; React from Wikimedia; Next.js from Simple Icons (monochrome mark).
 * Mailchimp: official stacked lockup PNG (Freddie + wordmark; light background; per Mailchimp brand assets — do not alter).
 * Additional marks from Simple Icons where available; Finsweet as local wordmark SVG.
 */
export const PLATFORM_LOGOS: LogoGridItem[] = [
  { src: "/logos/platforms/color/webflow.svg", alt: "Webflow" },
  { src: "/logos/platforms/color/javascript.svg", alt: "JavaScript" },
  { src: "/logos/platforms/color/react.svg", alt: "React" },
  { src: "/logos/platforms/color/nextjs.svg", alt: "Next.js" },
  { src: "/logos/platforms/color/wordpress.svg", alt: "WordPress" },
  { src: "/logos/platforms/color/shopify.svg", alt: "Shopify" },
  { src: "/logos/platforms/color/squarespace.svg", alt: "Squarespace" },
  { src: "/logos/platforms/color/wix.svg", alt: "Wix" },
  { src: "/logos/platforms/color/hubspot.svg", alt: "HubSpot" },
  { src: "/logos/platforms/color/mailchimp.png", alt: "Mailchimp" },
  { src: "/logos/platforms/color/loops.svg", alt: "Loops" },
  { src: "/logos/platforms/color/vercel.svg", alt: "Vercel" },
  { src: "/logos/platforms/color/finsweet.svg", alt: "Finsweet" },
  { src: "/logos/platforms/color/anthropic.svg", alt: "Claude Code" },
  { src: "/logos/platforms/color/cursor.svg", alt: "Cursor" },
]

export const PLATFORM_LABELS = PLATFORM_LOGOS.map((l) => l.alt)

export function PlatformsLogoCloud() {
  return (
    <div className="lp-section-band border-y border-border/60 bg-muted/30">
      <div className="lp-shell px-4 sm:px-6">
        <MarqueeLogoScroller
          className="border-0 bg-transparent shadow-none rounded-none"
          description="From visual builders to custom stacks — we ship on the tools that fit your business."
          logos={PLATFORM_LOGOS}
          speed="slow"
          title="Websites built on leading platforms"
        />
      </div>
    </div>
  )
}
