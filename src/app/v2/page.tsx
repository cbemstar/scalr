// Scalr v2 — Webflow & Google Ads agency. Preview route; v1 stays at "/".
// Copy and benchmarks live in src/config/site-v2.ts.
//
// The page is one argument, read top to bottom. Each section has one job:
//
//  Hero        Promise: who it's for, the outcome, one action. Nothing else
//              competes above the fold (attention is heaviest there).
//  01 Problem  The visitor recognises their own situation, in their words —
//              one pain per service, so relevance comes before our pitch.
//  02 Stakes   The cost of doing nothing, made concrete with sourced averages
//              (92 of 100 paid clicks leave). Urgency without hype.
//  03 Solution We're the guide: one joined-up journey instead of three
//              disconnected suppliers. The funnel diagram shows the idea.
//  04 Services The offer, scannable: three services, four deliverables each.
//  05 Plan     Three simple steps to start, ending on the CTA. Reduces the
//              fear of "what happens if I get in touch?"
//  06 Why us   Proof by comparison — honest, no invented numbers.
//  07 Founder  Authority and a human face; who you'll actually work with.
//     Assure   Risk reversal: no lock-in, you own everything, fixed quotes.
//  08 FAQ      Objections answered before they stop the click (incl. "can
//              you guarantee results?" — honestly, no).
//  Final CTA   Restate the outcome, say exactly what happens next, same CTA
//              wording as the hero.

import { V2Assurances, V2Compare, V2Plan } from "@/components/v2/sections/approach"
import { V2Cta, V2Footer } from "@/components/v2/sections/cta-footer"
import { V2Faq } from "@/components/v2/sections/faq"
import { V2Founder } from "@/components/v2/sections/founder"
import { V2Header } from "@/components/v2/sections/header"
import { V2Hero } from "@/components/v2/sections/hero"
import { V2Problem, V2Stakes } from "@/components/v2/sections/problem"
import { V2Services } from "@/components/v2/sections/services"
import { V2System } from "@/components/v2/sections/system"

export default function V2Home() {
  return (
    <>
      <V2Header />
      <main id="main" className="flex-1">
        <V2Hero />
        <V2Problem />
        <V2Stakes />
        <V2System />
        <V2Services />
        <V2Plan />
        <V2Compare />
        <V2Founder />
        <V2Assurances />
        <V2Faq />
        <V2Cta />
      </main>
      <V2Footer />
    </>
  )
}
