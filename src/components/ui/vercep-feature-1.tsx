import { Call02Icon, PencilEdit01Icon, Rocket01Icon } from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"

/** Step keys — mapped to Hugeicons (same visual language as Problem / Solution). */
export type VercepFeatureIconKey = "phone" | "pencil" | "launch"

const ICON_MAP: Record<VercepFeatureIconKey, IconSvgElement> = {
  phone: Call02Icon,
  pencil: PencilEdit01Icon,
  launch: Rocket01Icon,
}

export type VercepFeatureItem = {
  /** e.g. "01" */
  step: string
  title: string
  description: string
  icon: VercepFeatureIconKey
}

export type VercepFeature1Props = {
  items: VercepFeatureItem[]
  className?: string
}

/**
 * Vercel-style feature grid: single bordered panel, hairline dividers between cells,
 * step index + icon + copy.
 */
export function VercepFeature1({ items, className }: VercepFeature1Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-sm sm:rounded-[2rem]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(color-mix(in oklch, var(--foreground) 12%, transparent) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative grid grid-cols-1 divide-y divide-border/70 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => {
          return (
            <article
              key={item.step}
              className="group flex flex-col gap-5 bg-background/85 p-6 backdrop-blur-[2px] transition-colors hover:bg-muted/25 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs font-medium tabular-nums text-primary">
                  {item.step}
                </span>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-muted-foreground transition-colors group-hover:border-primary/25 group-hover:bg-primary/10 group-hover:text-primary">
                  <HugeiconsIcon
                    icon={ICON_MAP[item.icon]}
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0"
                    aria-hidden
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-balance">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
