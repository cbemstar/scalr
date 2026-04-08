"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const reduceMotionPref = useReducedMotion()
  const reduceMotion = reduceMotionPref === true

  // Keep the same element type across renders; swapping div ↔ motion.div after hydration
  // can trigger React 19 reconciliation warnings in dev (same symptom as unstable sibling order).
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
