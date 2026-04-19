"use client"

import React, { useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"
import { getFooterPricingLinks, siteConfig } from "@/config/site"
import { Mail, MapPin, Phone } from "lucide-react"

// ─── Data ────────────────────────────────────────────────────────────────────

const linkGroups = [
  {
    label: "Navigate",
    links: siteConfig.nav.map((item) => ({ title: item.label, href: item.href })),
  },
  {
    label: "Legal",
    links: [
      { title: "Privacy", href: siteConfig.legal.privacy },
      { title: "Terms", href: siteConfig.legal.terms },
      { title: "Cookies", href: siteConfig.legal.cookies },
      { title: "Security", href: siteConfig.legal.security },
      { title: "Business info", href: siteConfig.legal.business },
    ],
  },
  {
    label: "Pricing",
    links: getFooterPricingLinks(),
  },
  {
    label: "Contact",
    links: [
      { title: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, icon: Mail },
      {
        title: siteConfig.contact.phone,
        href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
        icon: Phone,
      },
      { title: siteConfig.contact.location, href: "/#contact", icon: MapPin },
    ],
  },
]

const socialLinks = [
  {
    title: "LinkedIn",
    href: siteConfig.social.linkedin,
    svg: (
      <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

// ─── Animated container ───────────────────────────────────────────────────────

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode
  delay?: number
}

function AnimatedContainer({ delay = 0.1, children, ...props }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return <>{children}</>
  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ─── Footer (sticky “reveal” — scroll-linked, no fixed layer) ───────────────
//
// `position: fixed` on the panel + `sticky` inside breaks scroll/sticky coordination
// (wrong scrollport, spacer vs. paint misaligned). The spacer is this <footer>; the
// panel is `position: sticky` with `top` tied to measured height so the reveal
// starts/ends exactly with the section. `100dvh` matches mobile dynamic toolbars.

const DEFAULT_STICK_TOP = "max(0px, calc(100dvh - 620px))"

export function SiteFooter({ className }: { className?: string }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [stickTop, setStickTop] = useState(DEFAULT_STICK_TOP)

  useLayoutEffect(() => {
    const el = panelRef.current
    if (!el) return

    const sync = () => {
      const h = el.offsetHeight
      if (h < 1) return
      setStickTop(`max(0px, calc(100dvh - ${h}px))`)
    }

    sync()
    const ro = new ResizeObserver(() => {
      sync()
    })
    ro.observe(el)

    const vv = window.visualViewport
    vv?.addEventListener("resize", sync)
    window.addEventListener("resize", sync)

    return () => {
      ro.disconnect()
      vv?.removeEventListener("resize", sync)
      window.removeEventListener("resize", sync)
    }
  }, [])

  return (
    <footer className={cn("relative w-full", className)}>
      <div
        ref={panelRef}
        className="sticky z-10 flex w-full flex-col border-t border-border/60 bg-background"
        style={{ top: stickTop }}
      >
        {/* ── Main content ── */}
        <div className="relative px-5 pt-8 pb-6 md:px-8">
          {/* Background glows */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 left-0 h-80 w-96 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklch,var(--primary)_5%,transparent)_0,transparent_100%)]" />
            <div className="absolute -top-20 right-1/4 h-80 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklch,var(--primary)_4%,transparent)_0,transparent_100%)]" />
          </div>

          <div className="lp-shell relative z-10">
            <div className="mx-auto flex max-w-6xl flex-col gap-10 md:gap-12 lg:flex-row lg:items-start lg:justify-between">
              {/* Brand column */}
              <AnimatedContainer className="w-full max-w-sm shrink-0 space-y-3">
                <Link
                  href="/"
                  className="font-logo text-base font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/30"
                >
                  {siteConfig.name}
                </Link>
                <p className="max-w-[30ch] text-sm leading-relaxed text-muted-foreground text-pretty">
                  {siteConfig.description}
                </p>
                <div className="flex gap-2 pt-1">
                  {socialLinks.map(({ title, href, svg }) => (
                    <a
                      key={title}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={title}
                      onClick={() => posthog.capture("linkedin_clicked", { source: "footer" })}
                      className="flex size-8 items-center justify-center rounded-lg border border-border/70 bg-muted/30 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/30"
                    >
                      {svg}
                    </a>
                  ))}
                </div>
              </AnimatedContainer>

              {/* Link groups */}
              <div className="grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
                {linkGroups.map((group, i) => (
                  <AnimatedContainer key={group.label} delay={0.1 + i * 0.08}>
                    <p className="lp-kicker mb-3">
                      {group.label}
                    </p>
                    <ul className="space-y-2">
                      {group.links.map((link) => {
                        const Icon = (link as { icon?: React.ComponentType<{ className?: string }> }).icon ?? null
                        const handleClick = () => {
                          if (link.href.startsWith("mailto:")) {
                            posthog.capture("contact_email_clicked", { source: "footer" })
                          } else if (link.href.startsWith("tel:")) {
                            posthog.capture("contact_phone_clicked", { source: "footer" })
                          } else if (group.label === "Pricing") {
                            posthog.capture("footer_pricing_link_clicked", { label: link.title })
                          } else if (group.label === "Legal") {
                            posthog.capture("footer_legal_link_clicked", {
                              label: link.title,
                              href: link.href,
                            })
                          }
                        }
                        return (
                          <li key={link.title}>
                            <a
                              href={link.href}
                              onClick={handleClick}
                              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary/25"
                            >
                              {Icon && <Icon className="size-3.5 shrink-0 text-primary/60" />}
                              {link.title}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </AnimatedContainer>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar — always pinned, never hidden ── */}
        <div className="shrink-0 border-t border-border/60 bg-background px-5 py-4 md:px-8">
          <div className="lp-shell">
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
              <p>© {new Date().getFullYear()} {siteConfig.name}. All prices in NZD.</p>
              <div className="flex flex-col gap-1 sm:items-end">
                <p className="opacity-60">Serving businesses across New Zealand</p>
                <p className="opacity-80">
                  <span className="mr-1.5">NZBN</span>
                  <a
                    href={siteConfig.business.nzbnPublicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[0.95em] underline-offset-2 transition-colors hover:text-foreground hover:underline"
                  >
                    {siteConfig.business.nzbn}
                  </a>
                  <span className="mx-1.5 opacity-50" aria-hidden>
                    ·
                  </span>
                  <Link
                    href={siteConfig.legal.business}
                    className="underline-offset-2 transition-colors hover:text-foreground hover:underline"
                  >
                    Business details
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
