// Section 6: Portfolio — featured case + supporting row (not three equal cards)

import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/common/fade-in"
import { cn } from "@/lib/utils"

const portfolioItems = [
  {
    id: "apex-plumbing",
    title: "Apex Plumbing",
    niche: "Tradie",
    description:
      "Lead-generating site for a Christchurch plumber. Bookings form above the fold, Google Reviews embedded, mobile-optimised for on-site searches.",
    tags: ["Local SEO", "Lead Generation", "Mobile-first"],
    isConcept: true,
    surface: "from-slate-800 via-slate-900 to-[oklch(0.22_0.04_198)]",
  },
  {
    id: "three-palms-cafe",
    title: "Three Palms Café",
    niche: "Hospitality",
    description:
      "Menu-forward site with online table booking and catering enquiry form. Ranked on first page for 'brunch Christchurch' within 8 weeks.",
    tags: ["SEO", "Booking Form", "Menu Design"],
    isConcept: true,
    surface: "from-emerald-900/90 via-teal-900/85 to-[oklch(0.2_0.05_198)]",
  },
  {
    id: "south-island-physio",
    title: "South Island Physio",
    niche: "Health",
    description:
      "Professional, trustworthy design for a physiotherapy practice. Online booking, team profiles, and treatment pages structured for local search.",
    tags: ["Trust Signals", "Online Booking", "Local SEO"],
    isConcept: true,
    surface: "from-stone-800 via-neutral-800 to-[oklch(0.18_0.03_198)]",
  },
] as const

export function PortfolioSection() {
  const [featured, ...rest] = portfolioItems

  return (
    <section id="portfolio" className="lp-section">
      <div className="lp-shell">
        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <p className="lp-kicker mb-3">Portfolio</p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.35rem]">
              Results that speak.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Concept sites built for Christchurch businesses — designed to show you exactly what
              yours could look like.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <article className="group mb-6 overflow-hidden rounded-[1.25rem] border border-border/80 bg-background shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_50px_-28px_rgba(15,23,42,0.15)]">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] min-h-[220px] overflow-hidden lg:aspect-auto lg:min-h-[320px]">
                <div className={cn("flex h-full w-full bg-gradient-to-br opacity-95", featured.surface)} />
                <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
                  <Badge className="border-0 bg-black/45 text-xs text-white backdrop-blur-sm hover:bg-black/45">
                    {featured.niche}
                  </Badge>
                  {featured.isConcept && (
                    <Badge
                      variant="outline"
                      className="border-white/25 bg-white/15 text-xs text-white backdrop-blur-sm"
                    >
                      Concept
                    </Badge>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5">
                  <p className="font-heading text-lg font-semibold text-white">{featured.title}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                <p className="text-sm leading-relaxed text-muted-foreground">{featured.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {featured.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((item, i) => (
            <FadeIn key={item.id} delay={0.06 + i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-border/80 bg-background shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className={cn("h-full w-full bg-gradient-to-br opacity-95", item.surface)} />
                  <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
                    <Badge className="border-0 bg-black/45 text-xs text-white backdrop-blur-sm hover:bg-black/45">
                      {item.niche}
                    </Badge>
                    {item.isConcept && (
                      <Badge
                        variant="outline"
                        className="border-white/25 bg-white/15 text-xs text-white backdrop-blur-sm"
                      >
                        Concept
                      </Badge>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="font-heading text-sm font-semibold text-white">{item.title}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted-foreground">
            All real client work added as projects complete. These concept sites show you exactly
            what yours could look like.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
