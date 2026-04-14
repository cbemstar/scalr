// Section 6: Portfolio — featured project + supporting grid (real client work)
// Preview images: pulled from each site’s Open Graph / hero CDN assets (stored under /public/images/portfolio).

import Image from "next/image"
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FadeIn } from "@/components/common/fade-in"
import { cn } from "@/lib/utils"

type PortfolioItem = {
  id: string
  title: string
  href: string
  niche: string
  description: string
  tags: string[]
  /** Local path under public/ */
  imageSrc: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  /**
   * When the asset aspect ratio differs from how the card should present in the grid
   * (e.g. portrait photo in a row of landscape previews), set width/height for this ratio.
   */
  displayAspectWidth?: number
  displayAspectHeight?: number
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "signature-homes",
    title: "Signature Homes",
    href: "https://signature-homes-duplicate.webflow.io/",
    niche: "Home builder",
    description:
      "Showcase site for a home-building brand — clear layouts, strong visuals, and structure built to guide visitors toward enquiry.",
    tags: ["Webflow", "Brand showcase"],
    imageSrc: "/images/portfolio/signature-homes.webp",
    imageAlt: "Signature Homes website — hero imagery of plans and building",
    imageWidth: 960,
    imageHeight: 697,
  },
  {
    id: "madras-square",
    title: "Madras Square",
    href: "https://www.madrassquare.co.nz/",
    niche: "Hospitality",
    description:
      "Restaurant and venue presence with menus, atmosphere, and booking paths that match how people decide where to eat.",
    tags: ["Webflow", "Hospitality"],
    imageSrc: "/images/portfolio/madras-square.png",
    imageAlt: "Madras Square — Open Graph preview from the live site",
    imageWidth: 1200,
    imageHeight: 630,
  },
  {
    id: "ask-for-licensed",
    title: "Ask for Licensed",
    href: "https://www.askforlicensed.co.nz/",
    niche: "Trades & licensing",
    description:
      "Trust-led site for licensed trades — messaging and structure aimed at people comparing providers before they call.",
    tags: ["Webflow", "Lead generation"],
    imageSrc: "/images/portfolio/ask-licensed.png",
    imageAlt: "Ask for Licensed — Open Graph preview from the live site",
    imageWidth: 1200,
    imageHeight: 630,
  },
  {
    id: "made-of-gold",
    title: "Made of Gold",
    href: "https://www.madeofgold.co.nz/",
    niche: "Ecommerce",
    description:
      "Product-led ecommerce experience on Webflow — built to browse, compare, and buy without friction.",
    tags: ["Webflow", "Ecommerce"],
    imageSrc: "/images/portfolio/made-of-gold.jpg",
    imageAlt: "Made of Gold jewellery — product photography from the live store",
    imageWidth: 1080,
    imageHeight: 1620,
    displayAspectWidth: 1200,
    displayAspectHeight: 630,
  },
  {
    id: "the-stash",
    title: "The Stash.xyz",
    href: "https://www.thestash.xyz/",
    niche: "Resources",
    description:
      "A resources directory built with React and Next.js, deployed on Vercel — fast search, clear categories, built to scale.",
    tags: ["Next.js", "Vercel", "Directory"],
    imageSrc: "/images/portfolio/the-stash.png",
    imageAlt: "The Stash — Open Graph image from thestash.xyz",
    imageWidth: 1200,
    imageHeight: 630,
  },
]

function PortfolioMedia({
  item,
  sizes,
  priority,
  className,
}: {
  item: PortfolioItem
  sizes: string
  priority?: boolean
  className?: string
}) {
  const ratio =
    item.displayAspectWidth != null && item.displayAspectHeight != null
      ? item.displayAspectWidth / item.displayAspectHeight
      : item.imageWidth / item.imageHeight

  return (
    <AspectRatio
      ratio={ratio}
      className={cn("overflow-hidden bg-muted", className)}
    >
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
        priority={priority}
      />
    </AspectRatio>
  )
}

function PortfolioTags({ item }: { item: PortfolioItem }) {
  return (
    <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
      {item.tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  )
}

function PortfolioLinkCue() {
  return (
    <p className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors duration-300 group-hover:text-foreground motion-reduce:transition-none">
      Visit Live Site
      <ArrowUpRightIcon
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
        aria-hidden
      />
    </p>
  )
}

function FeaturedPortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-4xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/40"
    >
      <Card className="pt-0 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10 motion-reduce:transform-none motion-reduce:transition-none lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-stretch lg:gap-0 lg:py-0">
        <CardContent className="p-0 lg:row-span-2 lg:min-h-0">
          <PortfolioMedia item={item} sizes="(max-width: 1024px) 100vw, 52vw" priority />
        </CardContent>
        <div className="flex min-h-0 flex-col lg:row-span-2 lg:justify-between">
          <CardHeader className="gap-3 px-6 pt-6 lg:pt-8">
            <CardAction>
              <Badge variant="secondary" className="text-[10px] uppercase tracking-[0.18em]">
                {item.niche}
              </Badge>
            </CardAction>
            <CardTitle className="text-2xl text-balance sm:text-3xl">{item.title}</CardTitle>
            <CardDescription className="text-pretty text-sm leading-relaxed sm:text-base">
              {item.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto flex-wrap items-center justify-between gap-3 px-6 pb-6 pt-0">
            <PortfolioTags item={item} />
            <PortfolioLinkCue />
          </CardFooter>
        </div>
      </Card>
    </a>
  )
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-4xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/40"
    >
      <Card
        size="sm"
        className="pt-0 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/8 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <CardContent className="p-0">
          <PortfolioMedia item={item} sizes="(max-width: 768px) 100vw, 50vw" />
        </CardContent>
        <CardHeader className="gap-3">
          <CardAction>
            <Badge variant="secondary" className="text-[10px] uppercase tracking-[0.18em]">
              {item.niche}
            </Badge>
          </CardAction>
          <CardTitle className="text-lg text-balance">{item.title}</CardTitle>
          <CardDescription className="text-pretty leading-relaxed">{item.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-wrap items-center justify-between gap-3">
          <PortfolioTags item={item} />
          <PortfolioLinkCue />
        </CardFooter>
      </Card>
    </a>
  )
}

export function PortfolioSection() {
  const [featured, ...rest] = portfolioItems

  return (
    <section id="portfolio" className="lp-section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-0 right-0 size-[400px] rounded-full bg-primary/[0.04] blur-[100px]" />
      <div className="lp-shell">
        <FadeIn>
          <div className="lp-section-intro">
            <p className="lp-kicker mb-3">Portfolio</p>
            <h2 className="lp-title text-balance">Real sites, live today.</h2>
            <p className="lp-lead mt-4 text-pretty">
              A sample of work across Webflow builds and a custom Next.js app — click through to see
              the full experience.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mb-6">
            <FeaturedPortfolioCard item={featured} />
          </div>
        </FadeIn>

        <div className="grid items-start gap-6 md:grid-cols-2">
          {rest.map((item, i) => (
            <FadeIn key={item.id} delay={0.06 + i * 0.06}>
              <PortfolioCard item={item} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted-foreground">
            Prefer Webflow or a custom Next.js stack? Both are in the mix — we pick what fits your
            budget, content workflow, and how you want to grow.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
