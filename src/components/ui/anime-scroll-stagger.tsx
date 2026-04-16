"use client"

import { animate, stagger } from "animejs"
import type { JSAnimation } from "animejs"
import { useLayoutEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface AnimeScrollStaggerProps {
  children: React.ReactNode
  className?: string
  /** Elements to animate (descendants of the container). Default: `[data-anime-item]`. */
  itemSelector?: string
  rootMargin?: string
  threshold?: number
}

/**
 * Scroll-triggered stagger using Anime.js — use for section intros where a
 * Framer-style stagger adds polish (e.g. headline + subcopy).
 */
export function AnimeScrollStagger({
  children,
  className,
  itemSelector = "[data-anime-item]",
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
}: AnimeScrollStaggerProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const els = root.querySelectorAll<HTMLElement>(itemSelector)
    if (!els.length) return

    let played = false
    let anim: JSAnimation | null = null

    const run = () => {
      if (played) return
      played = true
      anim = animate(els, {
        opacity: [0, 1],
        y: [18, 0],
        duration: 720,
        ease: "outExpo",
        delay: stagger(90, { from: "first" }),
      })
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run()
            io.disconnect()
            break
          }
        }
      },
      { threshold, rootMargin }
    )

    for (const el of els) {
      el.style.opacity = "0"
      el.style.transform = "translateY(18px)"
    }

    io.observe(root)
    return () => {
      io.disconnect()
      anim?.revert()
    }
  }, [itemSelector, rootMargin, threshold])

  return (
    <div ref={rootRef} className={cn(className)}>
      {children}
    </div>
  )
}
