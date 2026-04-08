"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type ShineBorderProps = {
  children: ReactNode
  className?: string
  /** Padding in px that creates the visible border ring */
  borderWidth?: number
  /** Full rotation duration in seconds (one continuous loop around the card) */
  duration?: number
}

const conicShineBackground = `conic-gradient(
  from 0deg,
  transparent 0deg,
  transparent 260deg,
  color-mix(in oklch, var(--primary) 85%, transparent) 300deg,
  var(--primary) 330deg,
  color-mix(in oklch, var(--primary) 70%, transparent) 360deg
)`

/** Spinning conic layer only — use inside a `relative overflow-hidden rounded-2xl` host. */
export function AnimatedCardBorder({
  className,
  duration = 4,
}: {
  className?: string
  duration?: number
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className)}
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 size-[220%] min-h-[200%] min-w-[200%] -translate-x-1/2 -translate-y-1/2 will-change-transform motion-reduce:animate-none"
        style={{
          background: conicShineBackground,
          animation: `spin ${duration}s linear infinite`,
        }}
      />
    </div>
  )
}

/**
 * Animated border: a single conic highlight that rotates 360° so colour travels
 * around the perimeter in one direction (closed loop).
 */
export function ShineBorder({
  children,
  className,
  borderWidth = 2,
  duration = 4,
}: ShineBorderProps) {
  return (
    <div
      className={cn("relative isolate rounded-2xl", className)}
      style={{ padding: borderWidth }}
    >
      <AnimatedCardBorder duration={duration} />
      <div className="relative z-[1] h-full overflow-hidden rounded-2xl bg-card">
        {children}
      </div>
    </div>
  )
}
