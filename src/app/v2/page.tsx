// Scalr v2 — Craftwork-built redesign (preview route; v1 stays at "/").
// Copy and stats live in src/config/site-v2.ts. No pricing on this version by design.

import { V2About } from "@/components/v2/sections/about"
import { V2Cta, V2Footer } from "@/components/v2/sections/cta-footer"
import { V2Faq } from "@/components/v2/sections/faq"
import { V2Header } from "@/components/v2/sections/header"
import { V2Hero } from "@/components/v2/sections/hero"
import { V2NicheMarquee } from "@/components/v2/sections/niche-marquee"
import { V2Process } from "@/components/v2/sections/process"
import { V2Redesign } from "@/components/v2/sections/redesign"
import { V2Services } from "@/components/v2/sections/services"
import { V2Stats } from "@/components/v2/sections/stats"

export default function V2Home() {
  return (
    <>
      <V2Header />
      <main id="main" className="flex-1">
        <V2Hero />
        <V2NicheMarquee />
        <V2Stats />
        <V2Services />
        <V2Redesign />
        <V2Process />
        <V2About />
        <V2Faq />
        <V2Cta />
      </main>
      <V2Footer />
    </>
  )
}
