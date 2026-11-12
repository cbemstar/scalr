// Number Ticker from Blank by Craftwork
// Copyright (c) 2026 Craftwork. Craftwork License, use in your projects, no resale: https://craftwork.design/license#components
// Source: https://github.com/craftwork-design/blank-new (f6d6614), via craftwork.design

// Adapted from Magic UI (MIT, © Magic UI) — https://magicui.design/docs/components/number-ticker
"use client"

import * as React from "react"
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Counts from `startValue` to `value` on a spring when it scrolls into view,
 * and springs again whenever `value` changes. Digits are tabular, so the
 * width holds while it counts. With reduced motion it shows `value` at once.
 */
function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  locale = "en-US",
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
  locale?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const from = direction === "down" ? value : startValue
  const to = direction === "down" ? startValue : value
  const motionValue = useMotionValue(from)
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const inView = useInView(ref, { once: true, margin: "0px" })

  const format = React.useCallback(
    (n: number) =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(Number(n.toFixed(decimalPlaces))),
    [locale, decimalPlaces]
  )

  React.useEffect(() => {
    if (reduceMotion) {
      motionValue.jump(to)
      spring.jump(to)
      if (ref.current) ref.current.textContent = format(to)
      return
    }
    if (!inView) return
    const timer = setTimeout(() => motionValue.set(to), delay * 1000)
    return () => clearTimeout(timer)
  }, [reduceMotion, inView, delay, to, motionValue, spring, format])

  // Writes straight to the DOM: a re-render per spring frame is wasted work.
  React.useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest)
      }),
    [spring, format]
  )

  return (
    <span
      ref={ref}
      data-slot="number-ticker"
      className={cn("inline-block tabular-nums", className)}
      {...props}
    >
      {format(from)}
    </span>
  )
}

export { NumberTicker }
