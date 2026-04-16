"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export type DreamOutcome = {
  headline: string
  description: string
  /** One line that reinforces this outcome — not repeated across cards */
  takeaway: string
}

function formatStep(value: number) {
  return String(value).padStart(2, "0")
}

/** px — drag distance to commit a slide */
const SWIPE_OFFSET_THRESHOLD = 52
/** px/ms — flick velocity to commit a slide */
const SWIPE_VELOCITY_THRESHOLD = 0.28

function DreamOutcomeCard({
  outcome,
  index,
  activeIndex,
  totalOutcomes,
  onSwipeNext,
  onSwipePrev,
  canSwipeNext,
  canSwipePrev,
}: {
  outcome: DreamOutcome
  index: number
  activeIndex: number
  totalOutcomes: number
  onSwipeNext: () => void
  onSwipePrev: () => void
  canSwipeNext: boolean
  canSwipePrev: boolean
}) {
  const offset = index - activeIndex
  const isActive = offset === 0
  const isVisible = Math.abs(offset) <= 2

  return (
    <motion.article
      aria-hidden={!isActive}
      aria-label={
        isActive
          ? `Outcome ${index + 1} of ${totalOutcomes}. Drag or swipe horizontally to see other outcomes.`
          : undefined
      }
      drag={isActive ? "x" : false}
      dragConstraints={{ left: -120, right: 120 }}
      dragElastic={0.14}
      dragDirectionLock
      dragSnapToOrigin
      onDragEnd={
        isActive
          ? (_, info) => {
              const { offset: dragOffset, velocity } = info
              const ox = dragOffset.x
              const vx = velocity.x
              if (
                canSwipeNext &&
                (ox < -SWIPE_OFFSET_THRESHOLD || vx < -SWIPE_VELOCITY_THRESHOLD)
              ) {
                onSwipeNext()
              } else if (
                canSwipePrev &&
                (ox > SWIPE_OFFSET_THRESHOLD || vx > SWIPE_VELOCITY_THRESHOLD)
              ) {
                onSwipePrev()
              }
            }
          : undefined
      }
      className={cn(
        "absolute inset-y-0 left-0 flex w-full max-w-[34rem] origin-center flex-col justify-between overflow-y-auto overflow-x-hidden rounded-[1.5rem] border p-5 shadow-[0_32px_80px_var(--dream-shadow-deep)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10",
        "border-[color:var(--dream-border-soft)] bg-[color:var(--dream-surface-card)]",
        "shadow-[inset_0_1px_0_0_var(--dream-border-soft)]",
        isActive && "cursor-grab active:cursor-grabbing"
      )}
      initial={false}
      animate={{
        x: `${offset * 56}%`,
        y: `${Math.abs(offset) * 3}%`,
        scale: isActive ? 1 : Math.abs(offset) === 1 ? 0.92 : 0.86,
        rotate: isActive ? 0 : offset > 0 ? -4 : 4,
        opacity: isActive ? 1 : isVisible ? 0.34 : 0,
        zIndex: 20 - Math.abs(offset),
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_right,var(--dream-card-glow-1),transparent_38%),radial-gradient(circle_at_bottom_left,var(--dream-card-glow-2),transparent_44%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,var(--dream-card-sheen-top),var(--dream-card-sheen-bot))]"
        aria-hidden
      />

      <div className="relative z-10 flex items-center gap-3">
        <span className="inline-flex size-2 rounded-full bg-primary shadow-[0_0_0_6px_color-mix(in_oklch,var(--primary)_14%,transparent)]" />
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--dream-kicker)]">
          Outcome {formatStep(index + 1)}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex flex-1 flex-col justify-center">
        <h3 className="max-w-[14ch] font-heading text-2xl font-semibold leading-[1.05] tracking-[-0.04em] text-[color:var(--dream-text)] sm:text-4xl lg:text-[3rem]">
          {outcome.headline}
        </h3>
        <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-[color:var(--dream-body)] sm:text-lg">
          {outcome.description}
        </p>
      </div>

      <div className="relative z-10 mt-8 border-t border-[color:var(--dream-border-soft)] pt-5">
        <p className="max-w-[36ch] text-sm leading-relaxed text-[color:var(--dream-foot)]">
          {outcome.takeaway}
        </p>
      </div>
    </motion.article>
  )
}

export function DreamStateTabs({
  outcomes,
}: {
  outcomes: DreamOutcome[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const activeIndexRef = useRef(0)
  const lastIndex = Math.max(0, outcomes.length - 1)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const setIndex = useCallback(
    (nextIndex: number) => {
      if (outcomes.length === 0) return
      const clamped = Math.min(lastIndex, Math.max(0, nextIndex))
      if (clamped === activeIndexRef.current) return

      setDirection(clamped > activeIndexRef.current ? 1 : -1)
      setActiveIndex(clamped)
    },
    [lastIndex, outcomes.length]
  )

  const handleNext = useCallback(() => setIndex(activeIndexRef.current + 1), [setIndex])
  const handlePrev = useCallback(() => setIndex(activeIndexRef.current - 1), [setIndex])

  if (outcomes.length === 0) return null

  return (
    <div className="dream-state-scope w-full">
      <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--dream-border)] bg-[color:var(--dream-surface-shell)] px-5 py-6 shadow-[0_32px_90px_var(--dream-shadow-deep)] sm:px-6 sm:py-8 lg:rounded-[2.5rem] lg:px-8 lg:py-10">
        <div className="dream-state-wash pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-12">
          <div className="flex min-h-full flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--dream-kicker)]">
                Imagine this instead
              </p>
              <h2 className="mt-4 max-w-[12ch] font-heading text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-balance text-[color:var(--dream-text)] sm:text-5xl lg:text-[4.25rem]">
                Imagine a site that works with you—not instead of you.
              </h2>
              <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-[color:var(--dream-body)] sm:text-lg">
                When layout, copy, and next steps line up with how people decide, you improve the
                chances they’ll enquire — without pretending a build fee replaces marketing,
                ads, or sales follow-through.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex items-end gap-4">
                <div className="min-h-[5.5rem] overflow-visible sm:min-h-[7rem]">
                  <motion.span
                    key={activeIndex}
                    initial={{ y: direction > 0 ? 40 : -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="block font-heading text-[3.25rem] leading-[1.06] tracking-[-0.08em] text-[color:var(--dream-text)] tabular-nums sm:text-[4.5rem]"
                  >
                    {formatStep(activeIndex + 1)}
                  </motion.span>
                </div>
                <span className="mb-3 h-12 w-px rotate-[14deg] bg-[color:var(--dream-border)]" />
                <span className="mb-2 font-heading text-[1.4rem] leading-none tracking-[-0.04em] text-[color:var(--dream-kicker)] tabular-nums sm:text-[1.8rem]">
                  {formatStep(outcomes.length)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-2xl border border-[color:var(--dream-control-border)] bg-[color:var(--dream-control-bg)] text-[color:var(--dream-text)] transition-[background-color,transform,opacity,border-color,box-shadow] duration-300",
                    "hover:bg-[color:var(--dream-control-bg-hover)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary/35 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-35"
                  )}
                  aria-label="Previous outcome"
                >
                  <HugeiconsIcon
                    icon={ArrowLeft01Icon}
                    size={18}
                    className="text-[color:var(--dream-text)]"
                  />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === lastIndex}
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-2xl border border-[color:var(--dream-control-border)] bg-[color:var(--dream-control-bg)] text-[color:var(--dream-text)] transition-[background-color,transform,opacity,border-color,box-shadow] duration-300",
                    "hover:bg-[color:var(--dream-control-bg-hover)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary/35 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-35"
                  )}
                  aria-label="Next outcome"
                >
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={18}
                    className="text-[color:var(--dream-text)]"
                  />
                </button>
              </div>
            </div>
          </div>

          <div
            className="relative min-h-[30rem] overflow-hidden rounded-[1.25rem] border border-[color:var(--dream-border-soft)] bg-[color:var(--dream-surface-stack)] p-3 sm:min-h-[32rem] sm:rounded-[1.75rem] sm:p-5 lg:min-h-[36rem]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Outcome cards — drag or swipe to change"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--dream-stack-vignette)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--dream-stack-vignette)] to-transparent" />

            <p className="sr-only">
              You can drag the front card left or right, or swipe on a touchscreen, to move between
              outcomes. Previous and next buttons are also available.
            </p>

            <div className="relative h-full">
              {outcomes.map((outcome, index) => (
                <DreamOutcomeCard
                  key={outcome.headline}
                  outcome={outcome}
                  index={index}
                  activeIndex={activeIndex}
                  totalOutcomes={outcomes.length}
                  onSwipeNext={handleNext}
                  onSwipePrev={handlePrev}
                  canSwipeNext={activeIndex < lastIndex}
                  canSwipePrev={activeIndex > 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
