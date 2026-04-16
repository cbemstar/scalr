"use client"

import * as React from "react"

import { AnimeScrollStagger } from "@/components/ui/anime-scroll-stagger"
import { cn } from "@/lib/utils"

export interface MarqueeLogo {
  src: string
  alt: string
  /** Merged onto `<img>` — e.g. optical scale for padded PNG lockups vs tight SVGs */
  imgClassName?: string
}

export interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  logos: MarqueeLogo[]
  speed?: "normal" | "slow" | "fast"
}

/**
 * Infinitely scrolling marquee — pauses on hover. Logos use full-colour SVGs as provided (no overlay).
 */
const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  ({ title, description, logos, speed = "normal", className, ...props }, ref) => {
    const durationMap = {
      normal: "40s",
      slow: "80s",
      fast: "5s",
    }
    const animationDuration = durationMap[speed]

    return (
      <>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn(
            "w-full overflow-hidden rounded-lg border bg-background text-foreground",
            className
          )}
          {...props}
        >
          <div className="p-6 md:p-8 lg:p-10">
            <AnimeScrollStagger className="grid grid-cols-1 gap-6 border-b pb-6 md:pb-8 lg:grid-cols-[3fr_2fr] lg:gap-8">
              <h2
                data-anime-item
                className="text-balance text-3xl font-semibold tracking-tighter md:text-4xl"
              >
                {title}
              </h2>
              <p
                data-anime-item
                className="self-start text-balance text-muted-foreground lg:justify-self-end"
              >
                {description}
              </p>
            </AnimeScrollStagger>
          </div>

          <div
            className="w-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              className="flex w-max items-center gap-3 py-2 pr-3 transition-all duration-300 ease-in-out hover:[animation-play-state:paused]"
              style={{
                animation: `marquee ${animationDuration} linear infinite`,
              }}
            >
              {[...logos, ...logos].map((logo, index) => {
                // Wide padded PNG lockups (e.g. Mailchimp 320×173) read tiny next to tight SVGs;
                // overflow-visible so scale isn’t clipped by the cell.
                const paddedLockup = logo.src.includes("mailchimp")
                return (
                  <div
                    key={`${logo.src}-${index}`}
                    className={cn(
                      "group relative flex h-12 w-24 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/40 px-2 py-1.5",
                      paddedLockup ? "z-[1] overflow-visible" : "overflow-hidden"
                    )}
                  >
                    <img
                      alt={logo.alt}
                      className={cn(
                        "[image-rendering:auto] object-contain object-center",
                        paddedLockup
                          ? "h-8 w-auto max-h-8 max-w-[5.75rem] origin-center scale-[1.32] sm:max-w-[6rem] sm:scale-[1.38]"
                          : "h-7 w-full max-h-7",
                        logo.imgClassName
                      )}
                      decoding="async"
                      loading="lazy"
                      src={logo.src}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </>
    )
  }
)

MarqueeLogoScroller.displayName = "MarqueeLogoScroller"

export { MarqueeLogoScroller }
