"use client"

import {
  Marquee as MarqueeRoot,
  MarqueeContent,
  MarqueeFade,
} from "@/components/kibo-ui/marquee"
import { cn } from "@/lib/utils"

export type MarqueeProps = {
  className?: string
  children: React.ReactNode
  /** When true, scrolls toward the right (opposite of default). */
  reverse?: boolean
  pauseOnHover?: boolean
  /** Passed through to react-fast-marquee (higher = faster). */
  speed?: number
  /** Extra classes for both edge fades (e.g. match section background). */
  fadeClassName?: string
}

/**
 * Horizontal marquee with edge fades — wraps the kibo-ui marquee + react-fast-marquee.
 * Pair with theme tokens; CSS `@keyframes marquee` lives in `globals.css` for custom builds.
 */
export function Marquee({
  className,
  children,
  reverse,
  pauseOnHover = true,
  speed = 40,
  fadeClassName,
}: MarqueeProps) {
  return (
    <MarqueeRoot className={cn("w-full", className)}>
      <MarqueeFade
        side="left"
        className={cn(
          "w-12 bg-gradient-to-r from-muted/80 to-transparent sm:w-20",
          fadeClassName
        )}
      />
      <MarqueeFade
        side="right"
        className={cn(
          "w-12 bg-gradient-to-l from-muted/80 to-transparent sm:w-20",
          fadeClassName
        )}
      />
      <MarqueeContent
        className="gap-3 [--gap:0.75rem]"
        direction={reverse ? "right" : "left"}
        pauseOnHover={pauseOnHover}
        speed={speed}
      >
        {children}
      </MarqueeContent>
    </MarqueeRoot>
  )
}
