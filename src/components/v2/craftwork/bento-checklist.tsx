// Bento Checklist from Blank by Craftwork
// Copyright (c) 2026 Craftwork. Craftwork License, use in your projects, no resale: https://craftwork.design/license#components
// Source: https://github.com/craftwork-design/blank-new (f6d6614), via craftwork.design
"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

type BentoChecklistItem = { label: string; done?: boolean }

// Each row sits a little left or right of the last, so the stack reads as a
// cascade running off the stage rather than a form.
const CASCADE = [12, -12, 28, 0, 20, -4]

/**
 * A stack of checks that tick one by one when the card scrolls into view. The
 * latest check lifts off the stack; items not `done` stay open.
 */
function BentoChecklist({
  items,
  className,
  ...props
}: React.ComponentProps<"div"> & { items: BentoChecklistItem[] }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const last = items.findLastIndex((item) => item.done)
  const [step, setStep] = React.useState(-1)
  const at = step

  React.useEffect(() => {
    if (!inView || step >= last) return
    if (reduceMotion) return setStep(last)
    const id = setTimeout(() => setStep(step + 1), step === -1 ? 500 : 550)
    return () => clearTimeout(id)
  }, [inView, reduceMotion, step, last])

  return (
    <div
      ref={ref}
      data-slot="bento-checklist"
      className={cn("gap-2.5 px-8 py-6 flex w-full flex-col", className)}
      {...props}
    >
      {items.map((item, index) => {
        const checked = item.done && index <= at
        const current = checked && index === at
        return (
          <motion.div
            key={item.label}
            data-checked={checked || undefined}
            data-current={current || undefined}
            initial={{ opacity: 0, x: 24 }}
            animate={
              inView
                ? {
                    opacity: current ? 1 : checked ? 0.8 : 0.55,
                    x: 0,
                    y: current ? -2 : 0,
                    scale: current ? 1.04 : 0.98,
                  }
                : undefined
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    bounce: 0.25,
                    duration: 0.5,
                    delay: step === -1 ? index * 0.06 : 0,
                  }
            }
            style={{ marginLeft: CASCADE[index % CASCADE.length] }}
            className="group/row -mr-24 h-10 gap-2.5 pl-3 text-sm before:inset-x-6 before:top-0 data-current:shadow-xl relative flex origin-left items-center rounded-xl bg-foreground/[0.025] text-muted-foreground ring-1 ring-foreground/6 transition-[background-color,box-shadow,color] duration-300 before:absolute before:h-px before:bg-linear-to-r before:from-transparent before:via-foreground/40 before:to-transparent before:opacity-0 before:transition-opacity data-checked:text-foreground/80 data-current:z-10 data-current:bg-popover data-current:text-foreground data-current:inset-shadow-[0_1px_0_var(--highlight)] data-current:ring-foreground/12 group-hover/bento-card:data-current:ring-foreground/20 dark:data-current:before:opacity-100"
          >
            <span className="size-4 flex shrink-0 items-center justify-center rounded-[5px] text-brand-foreground ring-1 ring-foreground/20 transition-[background-color,box-shadow] duration-150 group-data-checked/row:bg-[color:var(--bento-light,var(--brand))] group-data-checked/row:ring-transparent">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="size-3"
                aria-hidden
              >
                <motion.path
                  d="M3.5 8.5 6.5 11.5 12.5 4.5"
                  stroke="currentColor"
                  strokeWidth={2.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={false}
                  animate={{
                    pathLength: checked ? 1 : 0,
                    opacity: checked ? 1 : 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                    delay: 0.08,
                  }}
                />
              </svg>
            </span>
            <span className="truncate">{item.label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

export { BentoChecklist }
export type { BentoChecklistItem }
