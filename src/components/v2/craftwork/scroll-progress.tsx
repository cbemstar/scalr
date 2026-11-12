// Scroll Progress from Blank by Craftwork
// Copyright (c) 2026 Craftwork. Craftwork License, use in your projects, no resale: https://craftwork.design/license#components
// Source: https://github.com/craftwork-design/blank-new (f6d6614), via craftwork.design

// Adapted from Magic UI (MIT, © Magic UI) — https://magicui.design/docs/components/scroll-progress
"use client"

import * as React from "react"
import { motion, useScroll, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * A hairline that fills as the page — or `container`, when given — scrolls.
 */
function ScrollProgress({
  container,
  className,
  style,
  ...props
}: Omit<HTMLMotionProps<"div">, "children"> & {
  container?: React.RefObject<HTMLElement | null>
}) {
  const { scrollYProgress } = useScroll(container ? { container } : undefined)

  return (
    <motion.div
      data-slot="scroll-progress"
      aria-hidden="true"
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-brand",
        className
      )}
      style={{ scaleX: scrollYProgress, ...style }}
      {...props}
    />
  )
}

export { ScrollProgress }
