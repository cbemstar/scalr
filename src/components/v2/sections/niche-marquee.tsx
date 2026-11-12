import { Asterisk } from "lucide-react"

import { Marquee } from "@/components/v2/craftwork/marquee"
import { v2 } from "@/config/site-v2"

export function V2NicheMarquee() {
  return (
    <section aria-label="Who I work with" className="border-y border-border bg-card/60 py-5">
      <p className="sr-only">I build websites for: {v2.niches.join(", ")}.</p>
      <Marquee pauseOnHover className="[--duration:45s] [--gap:2.5rem]" aria-hidden>
        {v2.niches.map((niche) => (
          <span
            key={niche}
            className="v2-display flex items-center gap-10 text-2xl font-medium whitespace-nowrap text-foreground/80 sm:text-3xl"
          >
            {niche}
            <Asterisk aria-hidden className="size-6 text-brand" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
