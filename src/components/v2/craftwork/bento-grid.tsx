// Bento Grid from Blank by Craftwork
// Copyright (c) 2026 Craftwork. Craftwork License, use in your projects, no resale: https://craftwork.design/license#components
// Source: https://github.com/craftwork-design/blank-new (f6d6614), via craftwork.design

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Six columns from `md` up, so a row holds three cards (the default span) or
 * two halves (`md:col-span-3`). One column below.
 */
function BentoGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-grid"
      className={cn(
        "gap-4 md:grid-cols-6 grid w-full auto-rows-[minmax(24rem,auto)] grid-cols-1",
        className
      )}
      {...props}
    />
  )
}

function BentoCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-card"
      className={cn(
        "group/bento-card min-h-80 md:col-span-2 relative isolate flex flex-col overflow-hidden rounded-3xl bg-card text-card-foreground shadow-[inset_0_1px_0_var(--highlight)] ring-1 ring-foreground/8 transition-shadow duration-300 hover:ring-foreground/12",
        className
      )}
      {...props}
    />
  )
}

function BentoCardVisual({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-card-visual"
      className={cn(
        "min-h-48 relative flex flex-1 items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_calc(100%_-_4rem),transparent)]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Soft light falling into the card from its top edge. Tint it by setting
 * `--bento-light` on the card.
 */
function BentoLight({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      data-slot="bento-light"
      className={cn(
        "inset-x-0 top-0 pointer-events-none absolute -z-10 h-full origin-top opacity-80 transition-[opacity,scale] duration-700 group-hover/bento-card:scale-110 group-hover/bento-card:opacity-100 motion-reduce:transition-none",
        "[--bento-tint:color-mix(in_oklab,var(--bento-light,transparent)_35%,transparent)]",
        "bg-[radial-gradient(50%_70%_at_50%_0%,var(--bento-tint),color-mix(in_oklab,var(--bento-tint)_45%,transparent)_25%,color-mix(in_oklab,var(--bento-tint)_12%,transparent)_55%,transparent),radial-gradient(50%_90%_at_50%_0%,var(--glow),color-mix(in_oklab,var(--glow)_45%,transparent)_25%,color-mix(in_oklab,var(--glow)_12%,transparent)_55%,transparent)]",
        "before:inset-0 before:absolute before:bg-[radial-gradient(color-mix(in_oklab,var(--bento-light,var(--foreground))_22%,transparent)_1px,transparent_1px)] before:[mask-image:radial-gradient(40%_50%_at_50%_0%,black,transparent)] before:bg-size-[12px_12px]",
        "after:top-0 after:absolute after:inset-x-1/4 after:h-px after:bg-linear-to-r after:from-transparent after:via-[color-mix(in_oklab,var(--bento-light,var(--foreground))_70%,transparent)] after:to-transparent after:opacity-0 after:shadow-[0_0_16px_2px_var(--glow)] dark:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

/** A raised fragment on the stage — the window, toast or palette a visual is built on. */
function BentoPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-panel"
      className={cn(
        "shadow-lg backdrop-blur-md dark:shadow-2xl relative rounded-2xl bg-popover/80 ring-1 inset-shadow-[0_1px_0_var(--highlight)] ring-foreground/10",
        className
      )}
      {...props}
    />
  )
}

function BentoCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-card-content"
      className={cn(
        "gap-1.5 p-6 [[data-slot=bento-card-visual]~&]:pt-0 flex flex-col",
        className
      )}
      {...props}
    />
  )
}

function BentoCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="bento-card-title"
      className={cn("text-base font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function BentoCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="bento-card-description"
      className={cn(
        "max-w-sm text-sm text-pretty text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  BentoGrid,
  BentoCard,
  BentoCardVisual,
  BentoLight,
  BentoPanel,
  BentoCardContent,
  BentoCardTitle,
  BentoCardDescription,
}
