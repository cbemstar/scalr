"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type TimelineContentProps = {
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span" | "button" | "a"
  /** Passed to variant functions as `custom` (stagger index). */
  animationNum?: number
  /** Reserved for scroll-root patterns; intersection uses the viewport. */
  timelineRef?: React.RefObject<HTMLElement | null>
  customVariants: Variants
  className?: string
  children?: ReactNode
}

/**
 * Scroll-triggered reveal used by the 21st.dev “about-section-2” pattern.
 * Registry dependency `timeline-animation` is unavailable from 21st.dev (500); this matches the API.
 */
export function TimelineContent({
  as = "div",
  animationNum = 0,
  customVariants,
  className,
  children,
}: TimelineContentProps) {
  const motionProps = {
    className: cn(className),
    custom: animationNum,
    variants: customVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.35, margin: "0px 0px -10% 0px" },
    children,
  } as const

  switch (as) {
    case "h1":
      return <motion.h1 {...motionProps} />
    case "h2":
      return <motion.h2 {...motionProps} />
    case "h3":
      return <motion.h3 {...motionProps} />
    case "p":
      return <motion.p {...motionProps} />
    case "span":
      return <motion.span {...motionProps} />
    case "button":
      return <motion.button {...motionProps} />
    case "a":
      return <motion.a {...motionProps} />
    case "div":
      return <motion.div {...motionProps} />
  }
}
