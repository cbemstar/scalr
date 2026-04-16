// Section 3: Dream State — scroll-synced outcomes slider (client shell in dream-state-view)

import { DreamStateView } from "@/components/sections/dream-state-view"
import type { DreamOutcome } from "@/components/sections/dream-state-tabs"

const outcomes = [
  {
    headline: "Enquiries while you sleep",
    description:
      "When forms and booking paths work, you’re not the bottleneck for the first step — visitors can reach you on their timeline, not only yours.",
    takeaway:
      "The site handles the first touch; you still own the conversation and the close.",
  },
  {
    headline: "A site you're proud to share",
    description:
      "Send people somewhere that reflects how you actually work — first impressions that support trust, not undermine it.",
    takeaway:
      "The link becomes part of your pitch — not a disclaimer you rush past.",
  },
  {
    headline: "Credibility that keeps you in the running",
    description:
      "People compare you online before they compare quotes — looking established helps you stay in the conversation.",
    takeaway:
      "A clear, credible site improves your odds; it doesn’t replace proof, pricing, or how you deliver.",
  },
  {
    headline: "Landing pages that match the click",
    description:
      "When traffic from ads or search hits a page aligned with what they expected, you waste less attention — whether or not you’re running campaigns yourself.",
    takeaway:
      "Message-match helps; volume and cost still sit with your traffic sources and budget.",
  },
  {
    headline: "Fewer repetitive questions",
    description:
      "When the basics are answered clearly, calls and bookings can start warmer — with less time spent on the same explanations.",
    takeaway:
      "Good structure supports better conversations; it doesn’t guarantee a full pipeline on its own.",
  },
] satisfies DreamOutcome[]

export function DreamStateSection() {
  return <DreamStateView outcomes={outcomes} />
}
