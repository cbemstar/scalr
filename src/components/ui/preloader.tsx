"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { LoaderIcon, type LoaderIconHandle } from "@/components/ui/loader-icon"
import { siteConfig } from "@/config/site"

const phrases = [
  { main: siteConfig.name, sub: null },
  { main: "Sites from $999 · Shopify from $6,499", sub: "full pricing on the page · no guessing" },
  { main: "Live in 1–2 weeks", sub: "typical timeline for most packages" },
  { main: "Built for clarity", sub: "structure that supports action" },
  { main: "Not just look good", sub: "performance + aesthetics" },
  { main: "SEO foundations", sub: "meta, structure, and analytics from launch" },
  { main: "Clear scope", sub: "you know what you're getting upfront" },
  { main: "Let's build yours.", sub: null },
]

const easeOutExpo = [0.76, 0, 0.24, 1] as const
const easeOutSoft = [0.22, 1, 0.36, 1] as const

const slideUp: Variants = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: easeOutExpo, delay: 0.2 },
  },
}

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)
  const loaderRef = useRef<LoaderIconHandle>(null)

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    loaderRef.current?.startAnimation()
  }, [])

  useEffect(() => {
    if (index === phrases.length - 1) {
      const t = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => onComplete?.(), 1000)
      }, 900)
      return () => clearTimeout(t)
    }
    const delay = index === 0 ? 900 : 520
    const t = setTimeout(() => setIndex((i) => i + 1), delay)
    return () => clearTimeout(t)
  }, [index, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: easeOutExpo },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: easeOutExpo, delay: 0.3 },
    },
  }

  const { main, sub } = phrases[index]
  const isEdge = index === 0 || index === phrases.length - 1

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      role="status"
      aria-live="polite"
      aria-busy={!isExiting}
      className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center overflow-hidden bg-foreground text-background"
    >
      <div className="absolute top-0 right-0 left-0 flex items-center justify-between px-6 py-5 sm:px-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-heading text-sm font-semibold tracking-tight text-background/60"
        >
          {siteConfig.name}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-[11px] tracking-[0.18em] text-background/40 uppercase"
        >
          New Zealand
        </motion.span>
      </div>

      {dimension.width > 0 && (
        <div className="relative z-10 flex flex-col items-center gap-5 px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <LoaderIcon
              ref={loaderRef}
              size={32}
              isAnimated
              className="text-primary"
              aria-hidden
            />
            <div className="flex items-center gap-1.5">
              {phrases.map((_, i) => (
                <div
                  key={i}
                  className={
                    i === index
                      ? "h-1 w-[22px] rounded-full bg-primary transition-all duration-500"
                      : "h-1 w-[5px] rounded-full bg-background/20 transition-all duration-500"
                  }
                />
              ))}
            </div>
          </motion.div>

          <div className="overflow-hidden py-1">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={`main-${index}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.38, ease: easeOutSoft }}
                className="font-heading text-[clamp(2.5rem,6.5vw,5rem)] leading-none font-bold tracking-tight text-background"
              >
                {!isEdge && (
                  <span className="mr-3 mb-1 inline-block size-3 shrink-0 rounded-full bg-primary align-middle" />
                )}
                {main}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="min-h-[1.4em]">
            <AnimatePresence mode="popLayout">
              {sub && (
                <motion.p
                  key={`sub-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className="font-mono text-sm tracking-[0.18em] text-background/45 uppercase"
                >
                  {sub}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute right-0 bottom-0 left-0 flex items-center justify-center px-6 py-6"
      >
        <p className="font-mono text-[11px] tracking-[0.2em] text-background/30 uppercase">
          new zealand small business websites
        </p>
      </motion.div>

      {dimension.width > 0 && (
        <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full">
          <motion.path
            variants={curve}
            initial="initial"
            animate={isExiting ? "exit" : "initial"}
            className="fill-foreground"
          />
        </svg>
      )}
    </motion.div>
  )
}
