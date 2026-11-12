// Scalr v2 — agency positioning: Webflow, Google Ads, email. Preview route; v1 stays at "/".
// Copy and benchmarks live in src/config/site-v2.ts. No pricing on this version by design.

import { V2Approach, V2Compare } from "@/components/v2/sections/approach"
import { V2Benchmarks } from "@/components/v2/sections/benchmarks"
import { V2Cta, V2Footer } from "@/components/v2/sections/cta-footer"
import { V2Faq } from "@/components/v2/sections/faq"
import { V2Founder } from "@/components/v2/sections/founder"
import { V2Header } from "@/components/v2/sections/header"
import { V2Hero } from "@/components/v2/sections/hero"
import { V2Platforms } from "@/components/v2/sections/platforms"
import { V2Services } from "@/components/v2/sections/services"
import { V2System } from "@/components/v2/sections/system"

export default function V2Home() {
  return (
    <>
      <V2Header />
      <main id="main" className="flex-1">
        <V2Hero />
        <V2Platforms />
        <V2Services />
        <V2System />
        <V2Benchmarks />
        <V2Approach />
        <V2Compare />
        <V2Founder />
        <V2Faq />
        <V2Cta />
      </main>
      <V2Footer />
    </>
  )
}
