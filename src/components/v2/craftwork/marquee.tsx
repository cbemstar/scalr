// Marquee from Blank by Craftwork
// Copyright (c) 2026 Craftwork. Craftwork License, use in your projects, no resale: https://craftwork.design/license#components
// Source: https://github.com/craftwork-design/blank-new (f6d6614), via craftwork.design

// Adapted from Magic UI (MIT, © Magic UI) — https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/marquee.tsx
// Scalr: keyframes renamed to `cw-marquee*` so they don't collide with the v1 site's `marquee`.
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * An endless strip. The children are rendered `repeat` times side by side and
 * every copy slides by its own length, so the seam never shows. Only the first
 * copy is exposed to assistive tech and the keyboard; the rest are decoration.
 * The loop pauses while the strip is off screen.
 */
function Marquee({
  ref,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  fade = true,
  repeat = 4,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  fade?: boolean
  repeat?: number
}) {
  const root = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => root.current!)

  React.useEffect(() => {
    const node = root.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) =>
      node.toggleAttribute("data-paused", !entry.isIntersecting)
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={root}
      data-slot="marquee"
      data-orientation={vertical ? "vertical" : "horizontal"}
      data-reverse={reverse || undefined}
      data-pause-on-hover={pauseOnHover || undefined}
      data-fade={fade || undefined}
      className={cn(
        "group/marquee flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--fade:3rem] [--gap:1rem]",
        "data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
        "data-fade:data-[orientation=horizontal]:[mask-image:linear-gradient(to_right,transparent,black_var(--fade),black_calc(100%-var(--fade)),transparent)]",
        "data-fade:data-[orientation=vertical]:[mask-image:linear-gradient(to_bottom,transparent,black_var(--fade),black_calc(100%-var(--fade)),transparent)]",
        className
      )}
      {...props}
    >
      {Array.from({ length: Math.max(1, repeat) }, (_, index) => (
        <div
          key={index}
          data-slot="marquee-track"
          aria-hidden={index > 0 || undefined}
          inert={index > 0 || undefined}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap) group-data-[orientation=horizontal]/marquee:flex-row group-data-[orientation=vertical]/marquee:flex-col",
            "[animation-duration:var(--duration)] [animation-iteration-count:infinite] [animation-timing-function:linear]",
            "group-data-[orientation=horizontal]/marquee:motion-safe:[animation-name:cw-marquee]",
            "group-data-[orientation=vertical]/marquee:motion-safe:[animation-name:cw-marquee-vertical]",
            "group-data-reverse/marquee:[animation-direction:reverse]",
            "group-data-pause-on-hover/marquee:group-hover/marquee:[animation-play-state:paused]",
            "group-data-pause-on-hover/marquee:group-focus-within/marquee:[animation-play-state:paused]",
            "group-data-paused/marquee:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export { Marquee }
