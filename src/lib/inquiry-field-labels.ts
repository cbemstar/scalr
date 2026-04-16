/**
 * Maps inquiry form internal values to human-readable strings for Airtable (and support).
 * Keep in sync with `src/components/ui/multistep-form.tsx` option values.
 */

import { siteConfig } from "@/config/site"

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  "cafe-bakery": "Café or Bakery",
  "barber-salon": "Barber or Salon",
  "tradie-contractor": "Tradie / Contractor",
  "retail-shop": "Retail or Local Shop",
  "restaurant-bar": "Restaurant or Bar",
  "health-wellness": "Health & Wellness",
  "professional-services": "Professional Services",
  other: "Something else",
  "not-sure": "Not sure — help me decide",
}

const NOT_APPLICABLE_INTEGRATION =
  "Not applicable (integration / standalone project)"

const PLATFORM_LABELS: Record<string, string> = {
  webflow: "Webflow",
  wordpress: "WordPress",
  shopify: "Shopify",
  nextjs: "Custom build (Next.js)",
  unsure: "I don't know — recommend for me",
  "n/a-integrations": NOT_APPLICABLE_INTEGRATION,
}

const CONTENT_LABELS: Record<string, string> = {
  ready: "Yes, I can provide content and images",
  partial: "Some content is ready, some needs work",
  none: "No, I need full content support",
  "not-sure": "Not sure yet — I'll need guidance",
  "n/a-integrations": NOT_APPLICABLE_INTEGRATION,
}

const COPY_LABELS: Record<string, string> = {
  "have-copy": "I already have website copy",
  "need-help": "I need copywriting support",
  unsure: "I don't know yet — advise me",
  "n/a-integrations": NOT_APPLICABLE_INTEGRATION,
}

const TIMELINE_LABELS: Record<string, string> = {
  asap: "As soon as possible",
  "2-weeks": "Within 2 weeks",
  "1-month": "Within a month",
  flexible: "No rush — flexible",
  "not-sure": "Not sure — advise me when we talk",
}

const CURRENT_SITE_LABELS: Record<string, string> = {
  none: "I don't have a website yet",
  outdated: "I have one but it's outdated",
  rebuild: "I have one but want a full rebuild",
  webflow: "I have a Webflow site",
  unsure: "Not sure what I need",
}

/** Label when the lead did not pick a specific package tier */
const PACKAGE_INTEREST_UNSURE_LABEL =
  "Not sure yet — recommend a package for me"

export function labelBusinessType(value: string): string {
  return BUSINESS_TYPE_LABELS[value] ?? value
}

export function labelPackageInterest(value: string): string {
  if (value === "unsure") return PACKAGE_INTEREST_UNSURE_LABEL
  if (value.startsWith("integration:")) {
    const rest = value.slice("integration:".length)
    if (rest === "unsure") return "Standalone / integration work — recommend a sprint for me"
    const sprint = siteConfig.standaloneSprints.find((s) => s.id === rest)
    return sprint
      ? `Standalone sprint · ${sprint.name}`
      : `Standalone / integration · ${rest}`
  }
  if (value.startsWith("standard:")) {
    const id = value.slice("standard:".length)
    const pkg = siteConfig.packages.find((p) => p.id === id)
    return pkg ? `Standard site · ${pkg.name}` : value
  }
  if (value.startsWith("shopify:")) {
    const id = value.slice("shopify:".length)
    const pkg = siteConfig.ecommercePackages.find((p) => p.id === id)
    return pkg ? `Shopify · ${pkg.name}` : value
  }
  return value
}

export function labelPlatformPreference(value: string): string {
  return PLATFORM_LABELS[value] ?? value
}

export function labelContentReadiness(value: string): string {
  return CONTENT_LABELS[value] ?? value
}

export function labelCopywritingSupport(value: string): string {
  return COPY_LABELS[value] ?? value
}

export function labelTimeline(value: string): string {
  return TIMELINE_LABELS[value] ?? value
}

export function labelCurrentSite(value: string): string {
  return CURRENT_SITE_LABELS[value] ?? value
}
