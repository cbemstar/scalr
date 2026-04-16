"use client"

import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export type LogoGridItem = {
  src: string
  alt: string
  width?: number
  height?: number
  /** Merged onto `<img>` — e.g. optical scale for padded PNG lockups vs tight SVGs */
  imgClassName?: string
}

export type LogoCloudGridProps = ComponentProps<"div"> & {
  logos: LogoGridItem[]
}

const MOBILE_LAST_ROW_BORDER: Record<1 | 2, string> = {
  1: "max-md:[&:nth-last-child(-n+1)]:border-b-0",
  2: "max-md:[&:nth-last-child(-n+2)]:border-b-0",
}

const MD_LAST_ROW_BORDER: Record<1 | 2 | 3, string> = {
  1: "md:[&:nth-last-child(-n+1)]:border-b-0",
  2: "md:[&:nth-last-child(-n+2)]:border-b-0",
  3: "md:[&:nth-last-child(-n+3)]:border-b-0",
}

function lastRowBorderClasses(count: number) {
  const mobileKey = (count % 2 === 0 ? 2 : 1) as 1 | 2
  const mdRemainder = count % 3
  const mdKey = (mdRemainder === 0 ? 3 : mdRemainder) as 1 | 2 | 3
  return cn(MOBILE_LAST_ROW_BORDER[mobileKey], MD_LAST_ROW_BORDER[mdKey])
}

/**
 * Static grid logo cloud (21st.dev / sshahaider style) — borders, no marquee.
 * Responsive 2-column (mobile) / 3-column (md+) grid; supports any logo count.
 */
export function LogoCloudGrid({ logos, className, ...props }: LogoCloudGridProps) {
  const n = logos.length
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-border/60 md:grid-cols-3",
        lastRowBorderClasses(n),
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t border-border/60" />

      {logos.map((logo, i) => (
        <LogoCell
          key={`${logo.src}-${i}`}
          logo={logo}
          className={cn(
            "border-b border-r border-border/60",
            "max-md:[&:nth-child(2n)]:border-r-0",
            "md:[&:nth-child(3n)]:border-r-0",
            alternatingSurface(i)
          )}
        />
      ))}

      <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b border-border/60" />
    </div>
  )
}

function alternatingSurface(index: number) {
  const primary = "bg-background"
  const secondary = "bg-secondary/40 dark:bg-secondary/25"
  const mobile = index % 2 === 0 ? secondary : primary
  const mdSecondary = (Math.floor(index / 3) + (index % 3)) % 2 === 0
  const mdClass = mdSecondary
    ? "md:bg-secondary/40 md:dark:bg-secondary/25"
    : "md:bg-background"
  return cn(mobile, mdClass)
}

type LogoCellProps = ComponentProps<"div"> & {
  logo: LogoGridItem
}

function LogoCell({ logo, className, ...props }: LogoCellProps) {
  return (
    <div
      className={cn(
        "flex min-h-[5.5rem] items-center justify-center px-5 py-8 md:min-h-[6.5rem] md:px-8 md:py-10",
        className
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className={cn(
          "pointer-events-none h-8 w-auto max-w-[min(100%,10rem)] select-none object-contain object-center md:h-10 dark:opacity-95",
          logo.imgClassName
        )}
        decoding="async"
        height={logo.height}
        loading="lazy"
        src={logo.src}
        width={logo.width}
      />
    </div>
  )
}
