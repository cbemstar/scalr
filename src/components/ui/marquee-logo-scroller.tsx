import * as React from "react"

import { cn } from "@/lib/utils"

export interface MarqueeLogo {
  src: string
  alt: string
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
            <div className="grid grid-cols-1 gap-6 border-b pb-6 md:pb-8 lg:grid-cols-[3fr_2fr] lg:gap-8">
              <h2 className="text-balance text-3xl font-semibold tracking-tighter md:text-4xl">
                {title}
              </h2>
              <p className="self-start text-balance text-muted-foreground lg:justify-self-end">
                {description}
              </p>
            </div>
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
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.src}-${index}`}
                  className="group relative flex h-12 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/50 bg-muted/40 px-2 py-1.5"
                >
                  <img
                    alt={logo.alt}
                    className="relative h-6 w-auto max-h-6 max-w-[5.25rem] object-contain [image-rendering:auto]"
                    decoding="async"
                    loading="lazy"
                    src={logo.src}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }
)

MarqueeLogoScroller.displayName = "MarqueeLogoScroller"

export { MarqueeLogoScroller }
