"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DockItem {
  icon: LucideIcon
  label: string
  href?: string
  onClick?: () => void
}

interface DockProps {
  className?: string
  /** Extra classes on the inner pill (e.g. max width) */
  barClassName?: string
  items: DockItem[]
}

function DockIconButton({
  icon: Icon,
  label,
  href,
  onClick,
  className,
}: {
  icon: LucideIcon
  label: string
  href?: string
  onClick?: () => void
  className?: string
}) {
  const inner = (
    <span className="flex min-w-0 flex-col items-center gap-1 text-center">
      <Icon
        className="size-5 shrink-0 text-foreground"
        aria-hidden
      />
      <span className="whitespace-nowrap text-[10px] font-medium leading-none tracking-tight text-muted-foreground sm:text-[11px]">
        {label}
      </span>
    </span>
  )

  const base = cn(
    "flex flex-col items-center justify-center rounded-xl px-2 py-2 transition-colors sm:px-2.5 sm:py-2.5",
    "hover:bg-secondary"
  )

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link href={href} className={cn(base, className)}>
          {inner}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(base, className)}
    >
      {inner}
    </motion.button>
  )
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className, barClassName }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full justify-center", className)}
      >
        <motion.div
          className={cn(
            "inline-flex w-fit max-w-full flex-nowrap items-center gap-1 overflow-x-auto rounded-2xl border border-border/70 bg-background/92 p-2 shadow-[0_-10px_40px_-12px_color-mix(in_oklch,var(--foreground)_18%,transparent)] ring-1 ring-border/40 backdrop-blur-lg transition-shadow duration-300",
            "supports-[backdrop-filter]:bg-background/88",
            "hover:shadow-[0_-14px_48px_-14px_color-mix(in_oklch,var(--foreground)_22%,transparent)]",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            barClassName
          )}
        >
          {items.map((item) => (
            <DockIconButton key={item.label} {...item} />
          ))}
        </motion.div>
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock, DockIconButton }
