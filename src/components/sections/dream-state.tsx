// Section 3: Dream State — scroll-synced outcomes slider (client shell in dream-state-view)

import { DreamStateView } from "@/components/sections/dream-state-view"
import type { DreamOutcome } from "@/components/sections/dream-state-tabs"

const outcomes = [
  {
    headline: "Enquiries while you sleep",
    description:
      "No chasing, no guessing. Your website captures leads 24/7 — bookings and contact forms working while you focus on the job.",
    takeaway:
      "Forms and booking flows do the follow-up so you are not the bottleneck.",
  },
  {
    headline: "A site you're proud to share",
    description:
      "Send every potential customer there without hesitation. First impressions that build trust instantly.",
    takeaway:
      "You stop apologising for the URL — the site becomes part of how you sell.",
  },
  {
    headline: "More credibility than your competitor",
    description:
      "Stop losing jobs to less-experienced businesses who just happen to look more professional online.",
    takeaway:
      "Prospects compare you online before they compare your quote — looking established wins the first cut.",
  },
  {
    headline: "Ads that finally convert",
    description:
      "Traffic from Google and social media lands on a page built to convert. Your ad spend stops going to waste.",
    takeaway:
      "The landing message matches the ad, so clicks turn into enquiries instead of bounces.",
  },
  {
    headline: "Customers who arrive pre-sold",
    description:
      "Your site answers every question and removes every objection. They call or book already confident in you.",
    takeaway:
      "Calls and bookings start with intent — less explaining basics, more closing the right work.",
  },
] satisfies DreamOutcome[]

export function DreamStateSection() {
  return <DreamStateView outcomes={outcomes} />
}
