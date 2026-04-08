"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type ReactNode, useEffect, useRef } from "react"
import Link from "next/link"

type VerticalMarqueeProps = {
  children: ReactNode
  pauseOnHover?: boolean
  reverse?: boolean
  className?: string
  speed?: number
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
}: VerticalMarqueeProps) {
  return (
    <div
      className={cn("group flex flex-col overflow-hidden bg-transparent", className)}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden
      >
        {children}
      </div>
    </div>
  )
}

export type CTAWithTextMarqueeProps = {
  className?: string
  title: string
  description: string
  /** Vertical scrolling labels (e.g. niches, regions) */
  marqueeItems: string[]
  marqueeSpeed?: number
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  /** Trust line under description (location, pricing note, etc.) */
  footnote?: ReactNode
}

export function CTAWithTextMarquee({
  className,
  title,
  description,
  marqueeItems,
  marqueeSpeed = 20,
  primaryCta,
  secondaryCta,
  footnote,
}: CTAWithTextMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marqueeContainer = marqueeRef.current
    if (!marqueeContainer) return

    let raf = 0
    let cancelled = false

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll(".marquee-item")
      const containerRect = marqueeContainer.getBoundingClientRect()
      const centerY = containerRect.top + containerRect.height / 2

      items.forEach((item) => {
        const el = item as HTMLElement
        const itemRect = el.getBoundingClientRect()
        const itemCenterY = itemRect.top + itemRect.height / 2
        const distance = Math.abs(centerY - itemCenterY)
        const maxDistance = containerRect.height / 2
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        const opacity = 1 - normalizedDistance * 0.75
        el.style.opacity = opacity.toString()
      })
    }

    const loop = () => {
      if (cancelled) return
      updateOpacity()
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className={cn("w-full max-w-7xl text-foreground animate-fade-in-up", className)}>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="max-w-xl space-y-8">
          <h2 className="lp-title-display animate-fade-in-up [animation-delay:200ms]">
            {title}
          </h2>
          <div className="animate-fade-in-up space-y-4 [animation-delay:400ms]">
            <p className="max-w-[52ch] text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              {description}
            </p>
            {footnote ? (
              <p className="text-sm leading-relaxed text-muted-foreground/90">{footnote}</p>
            ) : null}
          </div>
          <div className="flex animate-fade-in-up flex-wrap gap-4 [animation-delay:600ms]">
            <Button asChild variant="default" size="cta">
              <Link href={primaryCta.href} target="_blank" rel="noopener noreferrer">
                {primaryCta.label}
              </Link>
            </Button>
            <Button asChild variant="secondary" size="cta">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </div>

        <div
          ref={marqueeRef}
          className="relative flex h-[600px] items-center justify-center bg-transparent animate-fade-in-up [animation-delay:400ms] lg:h-[700px]"
        >
          {/* Mask fades text at top/bottom without painting bg-background (which hid lp-hero-surface) */}
          <div
            className="relative h-full w-full overflow-hidden bg-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
          >
            <VerticalMarquee speed={marqueeSpeed} className="h-full bg-transparent">
              {marqueeItems.map((item) => (
                <div
                  key={item}
                  className="marquee-item py-8 font-heading text-4xl font-light tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
                >
                  {item}
                </div>
              ))}
            </VerticalMarquee>
          </div>
        </div>
      </div>
    </div>
  )
}
