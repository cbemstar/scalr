"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export type VerticalTabItem = {
  id: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
}

const variantStyles = {
  default: {
    heading: "text-foreground",
    eyebrow: "text-muted-foreground",
    tabActive: "text-foreground",
    tabInactive: "text-muted-foreground/60 hover:text-foreground",
    desc: "text-muted-foreground",
    rail: "bg-muted",
    railActive: "bg-foreground",
    tabBorder: "border-border/50",
    panel: "bg-muted/30 border-border/40",
    navBtn:
      "bg-background/80 backdrop-blur-md border-border/50 text-foreground hover:bg-background",
    vignette: "from-black/20",
  },
  inverse: {
    heading: "text-background",
    eyebrow: "text-background/45",
    tabActive: "text-background",
    tabInactive: "text-background/45 hover:text-background/80",
    desc: "text-background/60",
    rail: "bg-background/15",
    railActive: "bg-primary",
    tabBorder: "border-background/10",
    panel: "bg-background/5 border-background/10",
    navBtn:
      "bg-background/10 backdrop-blur-md border-background/15 text-background hover:bg-background/15",
    vignette: "from-black/40",
  },
} as const

export type VerticalTabsProps = {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  items: VerticalTabItem[]
  renderPanel: (ctx: { activeIndex: number; item: VerticalTabItem }) => React.ReactNode
  autoPlayDuration?: number | false
  showCarouselNav?: boolean
  variant?: keyof typeof variantStyles
  className?: string
  listColClassName?: string
  panelColClassName?: string
  /** Ref to the scroll region (e.g. `#dream` section) — progress through it maps to tab index. */
  scrollRootRef?: React.RefObject<HTMLElement | null>
  /** Ref to the `position: sticky` wrapper inside the root — pin duration is `root height − this height`. */
  scrollPinRef?: React.RefObject<HTMLElement | null>
  /** When true, active tab + panel follow vertical scroll through `scrollRootRef`. */
  scrollSyncActive?: boolean
  /** Keep the visual panel pinned on large screens while the list scrolls. */
  stickyPanel?: boolean
}

export function VerticalTabs({
  eyebrow,
  title,
  subtitle,
  items,
  renderPanel,
  autoPlayDuration = 5000,
  showCarouselNav = true,
  variant = "default",
  className,
  listColClassName,
  panelColClassName,
  scrollRootRef,
  scrollPinRef,
  scrollSyncActive = false,
  stickyPanel = false,
}: VerticalTabsProps) {
  const v = variantStyles[variant]
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const ignoreScrollSyncUntil = useRef(0)

  activeIndexRef.current = activeIndex

  const handleNext = useCallback(() => {
    if (items.length === 0) return
    ignoreScrollSyncUntil.current = Date.now() + 700
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const handlePrev = useCallback(() => {
    if (items.length === 0) return
    ignoreScrollSyncUntil.current = Date.now() + 700
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return
    ignoreScrollSyncUntil.current = Date.now() + 700
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setIsPaused(false)
  }

  useEffect(() => {
    if (autoPlayDuration === false || isPaused || items.length <= 1) return

    const interval = setInterval(() => {
      handleNext()
    }, autoPlayDuration)

    return () => clearInterval(interval)
  }, [activeIndex, isPaused, handleNext, autoPlayDuration, items.length])

  useEffect(() => {
    if (!scrollSyncActive || items.length <= 1) return

    const getRoot = () => scrollRootRef?.current ?? null

    const updateFromScroll = () => {
      if (Date.now() < ignoreScrollSyncUntil.current) return

      const root = getRoot()
      if (!root) return

      const rootTop = root.getBoundingClientRect().top + window.scrollY
      const rootHeight = root.offsetHeight
      const vh = window.innerHeight
      const pinEl = scrollPinRef?.current
      const pinH = pinEl?.offsetHeight ?? vh
      /** Scroll distance while the sticky block stays pinned (not `root − vh`). */
      const scrollRange = Math.max(1, rootHeight - pinH)
      const scrolledPastTop = window.scrollY - rootTop
      const progress = Math.min(1, Math.max(0, scrolledPastTop / scrollRange))
      const idx = Math.min(
        items.length - 1,
        Math.floor(progress * items.length)
      )

      const prev = activeIndexRef.current
      if (idx !== prev) {
        setDirection(idx > prev ? 1 : -1)
        setActiveIndex(idx)
      }
    }

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(updateFromScroll)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    const root = getRoot()
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => onScroll())
        : null
    if (ro && root) ro.observe(root)
    if (ro && scrollPinRef?.current) ro.observe(scrollPinRef.current)

    updateFromScroll()

    return () => {
      ro?.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [scrollSyncActive, items.length, scrollRootRef, scrollPinRef])

  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      y: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  const activeItem = items[activeIndex]

  if (items.length === 0) return null

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16">
        <div
          className={cn(
            "order-2 flex min-h-0 flex-col justify-center pt-4 lg:order-1 lg:col-span-5 lg:justify-start",
            listColClassName
          )}
        >
          <div className="mb-12 flex flex-col gap-1">
            {eyebrow ? (
              <p
                className={cn(
                  "mb-2 text-xs font-semibold uppercase tracking-[0.2em]",
                  v.eyebrow
                )}
              >
                {eyebrow}
              </p>
            ) : null}
            <h2 className={cn("lp-title text-balance", v.heading)}>
              {title}
            </h2>
            {subtitle ? (
              <p className={cn("mt-4 max-w-xl text-lg leading-relaxed md:text-xl", v.desc)}>
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-0">
            {items.map((item, index) => {
              const isActive = activeIndex === index
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "group relative flex items-start gap-4 border-t py-6 text-left transition-all duration-500 first:border-0 md:py-8",
                    v.tabBorder,
                    isActive ? v.tabActive : v.tabInactive
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0 bottom-0 left-[-16px] w-0.5 md:left-[-24px]",
                      v.rail
                    )}
                  >
                    {isActive && autoPlayDuration !== false && items.length > 1 ? (
                      <motion.div
                        key={`progress-${index}-${isPaused}`}
                        className={cn("absolute top-0 left-0 w-full origin-top", v.railActive)}
                        initial={{ height: "0%" }}
                        animate={isPaused ? { height: "0%" } : { height: "100%" }}
                        transition={{
                          duration:
                            (typeof autoPlayDuration === "number" ? autoPlayDuration : 5000) /
                            1000,
                          ease: "linear",
                        }}
                      />
                    ) : null}
                    {isActive && (autoPlayDuration === false || items.length <= 1) ? (
                      <div className={cn("absolute top-0 left-0 h-full w-full", v.railActive)} />
                    ) : null}
                  </div>

                  <span className="mt-1 text-[9px] font-medium tabular-nums opacity-50 md:text-[10px]">
                    /{item.id}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <span
                      className={cn(
                        "text-xl font-semibold tracking-tight transition-colors duration-500 md:text-2xl lg:text-3xl",
                        isActive ? v.tabActive : ""
                      )}
                    >
                      {item.title}
                    </span>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p
                            className={cn(
                              "max-w-sm pb-2 text-sm font-normal leading-relaxed md:text-base",
                              v.desc
                            )}
                          >
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div
          className={cn(
            "order-1 flex min-h-0 h-full flex-col justify-start lg:order-2 lg:col-span-7",
            stickyPanel && "lg:sticky lg:top-24 lg:self-start",
            panelColClassName
          )}
        >
          <div
            className="group/gallery relative flex min-h-0 flex-1 flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={cn(
                "relative min-h-[280px] flex-1 overflow-hidden rounded-3xl border md:min-h-[320px] md:rounded-[2.5rem] lg:min-h-0",
                v.panel
              )}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 260, damping: 32 },
                    opacity: { duration: 0.4 },
                  }}
                  className="absolute inset-0 flex w-full flex-col"
                  onClick={items.length > 1 ? handleNext : undefined}
                  onKeyDown={
                    items.length > 1
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleNext()
                          }
                        }
                      : undefined
                  }
                  role={items.length > 1 ? "button" : undefined}
                  tabIndex={items.length > 1 ? 0 : undefined}
                  aria-label={items.length > 1 ? "Next outcome" : undefined}
                >
                  {renderPanel({ activeIndex, item: activeItem })}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t via-transparent to-transparent opacity-70",
                      v.vignette
                    )}
                  />
                </motion.div>
              </AnimatePresence>

              {showCarouselNav && items.length > 1 ? (
                <div className="absolute right-4 bottom-4 z-20 flex gap-2 sm:right-6 sm:bottom-6 md:right-8 md:bottom-8 md:gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrev()
                    }}
                    className={cn(
                      "flex size-10 items-center justify-center rounded-md border transition-all active:scale-90 md:size-12",
                      v.navBtn
                    )}
                    aria-label="Previous"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNext()
                    }}
                    className={cn(
                      "flex size-10 items-center justify-center rounded-md border transition-all active:scale-90 md:size-12",
                      v.navBtn
                    )}
                    aria-label="Next"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerticalTabs
