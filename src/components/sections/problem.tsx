"use client"

import {
  AlertCircle,
  Clock,
  Frown,
  PhoneMissed,
  RefreshCw,
  TrendingDown,
} from "lucide-react"
import {
  SoundFamiliarShowcase,
  type SoundFamiliarItem,
} from "@/components/ui/team-section-block-shadcnui"

const painPoints: SoundFamiliarItem[] = [
  {
    icon: AlertCircle,
    tag: "Trust",
    headline: "You apologise for the URL",
    description:
      "You hand out your link and add “ignore the design” — so visitors start skeptical before they even read your offer.",
    gradient: "from-amber-500/12 via-amber-500/5 to-transparent",
  },
  {
    icon: TrendingDown,
    tag: "Conversion",
    headline: "Traffic that doesn’t convert",
    description:
      "You’re sending people from Google, ads, or socials to a page with no clear next step — so clicks never turn into calls or bookings.",
    gradient: "from-rose-500/12 via-rose-500/5 to-transparent",
  },
  {
    icon: Clock,
    tag: "Leads",
    headline: "Flying blind",
    description:
      "No GA4, no conversion tracking—so you can’t tell what’s working. You’re guessing while the site quietly underperforms.",
    gradient: "from-primary/15 via-primary/5 to-transparent",
  },
  {
    icon: PhoneMissed,
    tag: "Friction",
    headline: "Contact details buried",
    description:
      "Hours, phone, or booking links are hard to find on mobile. People bounce — and you only hear about it when someone actually tells you.",
    gradient: "from-sky-500/12 via-sky-500/5 to-transparent",
  },
  {
    icon: Frown,
    tag: "Credibility",
    headline: "Template or DIY fatigue",
    description:
      "You used a generic builder or a tired theme. It looks like everyone else’s — not like a business you’d trust with real money.",
    gradient: "from-orange-500/12 via-orange-500/5 to-transparent",
  },
  {
    icon: RefreshCw,
    tag: "Momentum",
    headline: "Stuck on the backlog",
    description:
      "A redesign or first launch keeps slipping. Every week without a proper site is a week where sharper competitors win the enquiry.",
    gradient: "from-emerald-500/12 via-emerald-500/5 to-transparent",
  },
]

export function ProblemSection() {
  return <SoundFamiliarShowcase items={painPoints} />
}
