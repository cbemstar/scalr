"use client"

/**
 * Adapted from shadcn / 21st.dev team-section-block (moumensoliman).
 * Reworked for the “Sound familiar?” problem section: icon cards, theme tokens, scroll reveals.
 */

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Sparkles, type LucideIcon } from "lucide-react"
import Link from "next/link"

export type SoundFamiliarItem = {
  icon: LucideIcon
  headline: string
  description: string
  /** Short label for the badge (e.g. Trust, Leads). */
  tag: string
  gradient?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
}

function PainPointCard({ item }: { item: SoundFamiliarItem }) {
  const Icon = item.icon

  return (
    <motion.div variants={itemVariants} className="h-full min-h-0">
      <Card className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/90 shadow-sm backdrop-blur-xl">
        <div className="flex h-full flex-col p-6 md:p-7">
          <div className="mb-5 flex shrink-0 justify-center">
            <div className="flex size-[5.25rem] items-center justify-center rounded-2xl border border-border/60 bg-muted/40 text-primary shadow-inner">
              <Icon className="size-9" strokeWidth={1.6} aria-hidden />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col text-center">
            <Badge
              variant="secondary"
              className="mx-auto mb-3 w-fit shrink-0 bg-primary/10 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/90"
            >
              {item.tag}
            </Badge>
            <h3 className="font-heading shrink-0 text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {item.headline}
            </h3>
            <p className="mt-3 min-h-0 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

type SoundFamiliarShowcaseProps = {
  items: SoundFamiliarItem[]
  className?: string
}

export function SoundFamiliarShowcase({ items, className }: SoundFamiliarShowcaseProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="problem"
      aria-labelledby="problem-section-heading"
      className={cn(
        "lp-section relative w-full overflow-hidden bg-muted/25",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.14, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.1, 0.22, 0.1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 20, repeat: Infinity, ease: "linear" }
          }
          className="absolute -right-28 -top-28 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[160px]"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1.08, 1, 1.08],
                  rotate: [0, -90, 0],
                  opacity: [0.08, 0.2, 0.08],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 17, repeat: Infinity, ease: "linear" }
          }
          className="absolute -bottom-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-emerald-500/15 blur-[150px]"
        />
      </div>

      <div className="lp-shell">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="lp-section-intro mx-auto max-w-3xl text-center"
        >
          <motion.div className="mb-5 inline-block">
            <Badge
              variant="secondary"
              className="gap-2 border border-border/60 bg-background/80 px-3 py-1 text-muted-foreground shadow-sm backdrop-blur"
            >
              <Sparkles className="size-3 text-primary" aria-hidden />
              Sound familiar?
            </Badge>
          </motion.div>

          <h2 id="problem-section-heading" className="lp-title">
            Your site should sell — not{" "}
            <span className="bg-gradient-to-r from-primary via-primary/85 to-primary/60 bg-clip-text text-transparent">
              apologise.
            </span>
          </h2>

          <p className="lp-lead mx-auto mt-5 max-w-2xl text-pretty text-center">
            Whether you&apos;re on a DIY template, a five-year-old redesign, or no site
            at all, the pattern is the same: trust leaks before you get a chance to
            pitch. If any of this hits home, you&apos;re who Scalr is for — new
            builds and full redesigns, with clear packages from $699 NZD.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid auto-rows-[350px] gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <PainPointCard key={item.headline} item={item} />
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="mt-14 flex flex-col gap-8 md:mt-16"
        >
          <p className="mx-auto max-w-3xl border-l-4 border-primary pl-5 text-left text-base font-medium leading-relaxed text-foreground sm:text-lg">
            You&apos;re not imagining it. Without clear calls to action, fast mobile
            load, and analytics wired up, you&apos;re guessing — while competitors look
            like the safer choice.
          </p>

          <Card className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 rounded-3xl border border-border/60 bg-card/90 px-8 py-8 text-center shadow-[0_20px_60px_-32px_color-mix(in_oklch,var(--foreground)_20%,transparent)] backdrop-blur-xl sm:flex-row sm:text-left">
            <div className="flex-1 space-y-2">
              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Pricing is on the page — no mystery quotes
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Pick a package that fits, or get in touch and I&apos;ll tell you straight
                what to fix first. Canterbury and NZ-wide.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
              <Button asChild variant="default" size="cta" className="w-full sm:w-auto">
                <Link href="#pricing">Compare plans</Link>
              </Button>
              <Button asChild variant="secondary" size="cta" className="w-full sm:w-auto">
                <Link href="#contact">Get in touch</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
