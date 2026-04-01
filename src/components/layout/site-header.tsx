"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  Briefcase,
  CircleDollarSign,
  HeartHandshake,
  HelpCircle,
  Layers,
  type LucideIcon,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Dock, type DockItem } from "@/components/ui/dock-two"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const NAV_ICON_BY_LABEL: Record<string, LucideIcon> = {
  Work: Briefcase,
  Services: Layers,
  Pricing: CircleDollarSign,
  About: HeartHandshake,
  FAQ: HelpCircle,
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const dockItems: DockItem[] = useMemo(
    () =>
      siteConfig.nav.map((item) => ({
        icon: NAV_ICON_BY_LABEL[item.label] ?? Layers,
        label: item.label,
        href: item.href,
      })),
    []
  )

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-[background,border-color,box-shadow] duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/90 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-background/75"
            : "border-b border-border/50 bg-[oklch(0.985_0.006_260)]/95 text-foreground backdrop-blur-md supports-[backdrop-filter]:bg-[oklch(0.985_0.006_260)]/88"
        )}
      >
        <div
          className={cn(
            "container mx-auto flex min-h-14 items-center justify-between gap-3 px-4 sm:min-h-16 sm:px-5 md:px-6 lg:px-8"
          )}
        >
          <Link
            href="/"
            className={cn(
              "shrink-0 font-heading text-base font-semibold tracking-tight transition-colors sm:text-lg",
              "text-foreground"
            )}
          >
            NZ Web Studio
          </Link>

          <Link
            href="#pricing"
            string="magnetic"
            string-id="header-cta-packages"
            string-strength={0.22}
            string-radius={130}
            className={cn(
              buttonVariants({ size: "sm" }),
              "st-magnetic shrink-0 text-xs sm:text-sm",
              scrolled
                ? "bg-foreground text-background hover:bg-foreground/88"
                : "border border-border bg-background text-foreground shadow-sm hover:bg-muted"
            )}
          >
            See Packages
          </Link>
        </div>
      </header>

      <nav
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40"
        aria-label="Primary navigation"
      >
        <div
          className={cn(
            "pointer-events-auto mx-auto flex w-full justify-center px-3 pt-3 sm:px-4 sm:pt-4",
            "pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          )}
        >
          <Dock items={dockItems} className="py-0" />
        </div>
      </nav>
    </>
  )
}
