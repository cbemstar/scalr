"use client"

import { motion, type Variants } from "framer-motion"
import type { ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

const motionByTag: Record<string, ElementType> = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  button: motion.button,
  a: motion.a,
}

function motionFor(as: string) {
  return motionByTag[as] ?? motion.div
}

export type TimelineContentProps = {
  as?: keyof typeof motionByTag | (string & {})
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
  const Motion = motionFor(as)

  return (
    <Motion
      className={cn(className)}
      custom={animationNum}
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </Motion>
  )
}
