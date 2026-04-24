"use client"

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import posthog from "posthog-js"
import { FadeIn } from "@/components/common/fade-in"
import { MultistepInquiryForm } from "@/components/ui/multistep-form"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Maximize2, Phone, ShieldCheck, X } from "lucide-react"

export function FinalCTASection() {
  const [focusMode, setFocusMode] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const focusTitleId = useId()

  useEffect(() => {
    if (!focusMode) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [focusMode])

  /* `main` is z-10 — traps the focus overlay below the nav (z-100). See globals.css `html[data-inquiry-focus]`. */
  useLayoutEffect(() => {
    if (!focusMode) return
    const html = document.documentElement
    html.setAttribute("data-inquiry-focus", "")
    return () => {
      html.removeAttribute("data-inquiry-focus")
    }
  }, [focusMode])

  useEffect(() => {
    if (!focusMode) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocusMode(false)
        posthog.capture("inquiry_form_focus_mode_exited", { reason: "escape" })
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [focusMode])

  useEffect(() => {
    if (focusMode) closeButtonRef.current?.focus()
  }, [focusMode])

  const enterFocusMode = useCallback(() => {
    setFocusMode(true)
    posthog.capture("inquiry_form_focus_mode_entered")
  }, [])

  const exitFocusMode = useCallback(() => {
    setFocusMode(false)
    posthog.capture("inquiry_form_focus_mode_exited", { reason: "close" })
  }, [])

  return (
    <section
      id="contact"
      className="lp-section lp-hero-surface relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 size-[500px] rounded-full bg-primary/[0.07] blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 right-[10%] size-[400px] rounded-full bg-primary/[0.06] blur-[90px]"
      />

      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Copy */}
          <FadeIn>
            <div className="max-w-lg space-y-6 lg:sticky lg:top-28">
              <p className="lp-kicker mb-4">Ready to start?</p>
              <h2 className="lp-title-display">
                Give your next customer a clear reason to take the next step.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
                Send a short brief below and I&apos;ll reply within one business day with a
                clear next step — no hard sell.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground/90">
                Serving businesses across New Zealand. All prices in NZD — based in Christchurch.
              </p>

              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Prefer to talk?
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    onClick={() => posthog.capture("contact_phone_clicked", { source: "contact" })}
                    className="text-sm font-semibold text-foreground underline-offset-2 hover:underline"
                  >
                    Call {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/15 px-4 py-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">NZ registered business</p>
                  <p className="text-sm leading-snug text-foreground">
                    <a
                      href={siteConfig.business.nzbnPublicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.95em] underline-offset-2 hover:underline"
                      onClick={() => posthog.capture("nzbn_verify_clicked", { source: "contact" })}
                    >
                      NZBN {siteConfig.business.nzbn}
                    </a>
                    <span className="mx-1.5 text-muted-foreground/80" aria-hidden>
                      ·
                    </span>
                    <Link
                      href={siteConfig.legal.business}
                      className="underline-offset-2 hover:underline"
                      onClick={() =>
                        posthog.capture("business_details_clicked", { source: "contact" })
                      }
                    >
                      Business details
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right — Form: no FadeIn wrapper — framer-motion `transform` breaks `fixed` + flex scrollport */}
          <div className="relative">
            {focusMode ? (
              <div
                className="min-h-[min(85vh,720px)] rounded-2xl border border-transparent"
                aria-hidden
              />
            ) : null}
            <div
              className={cn(
                "transition-[box-shadow,background-color] duration-200",
                focusMode
                  ? "fixed inset-0 z-[120] flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden bg-background shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "rounded-2xl border border-border/70 bg-background p-6 shadow-sm sm:p-8"
              )}
              role={focusMode ? "dialog" : undefined}
              aria-modal={focusMode ? true : undefined}
              aria-labelledby={focusMode ? focusTitleId : undefined}
            >
              {focusMode ? (
                <header className="flex shrink-0 items-start justify-between gap-3 border-b border-border/60 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
                  <div className="min-w-0 space-y-0.5">
                    <p
                      id={focusTitleId}
                      className="font-heading text-base font-semibold tracking-tight text-foreground"
                    >
                      {siteConfig.name} — project brief
                    </p>
                    <p className="text-xs leading-snug text-muted-foreground">
                      Same questions as below — fewer distractions so you can think clearly. Press{" "}
                      <kbd className="rounded border border-border/80 bg-muted/50 px-1 font-mono text-[10px]">
                        Esc
                      </kbd>{" "}
                      or close to return.
                    </p>
                  </div>
                  <Button
                    ref={closeButtonRef}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-full"
                    onClick={exitFocusMode}
                    aria-label="Exit focus mode and return to the page"
                  >
                    <X className="size-5" strokeWidth={2} />
                  </Button>
                </header>
              ) : (
                <div className="mb-5 flex flex-col gap-3 border-b border-border/40 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-snug text-muted-foreground">
                    Want a calmer screen while you work through the brief?
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 gap-2 self-start sm:self-auto"
                    onClick={enterFocusMode}
                  >
                    <Maximize2 className="size-3.5" aria-hidden />
                    Focus mode
                  </Button>
                </div>
              )}

              <div
                {...(focusMode ? { "data-lenis-prevent": "" as const } : {})}
                className={cn(
                  focusMode &&
                    "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 [-webkit-overflow-scrolling:touch] sm:px-8"
                )}
              >
                <div
                  className={cn(
                    "min-w-0",
                    focusMode && "mx-auto w-full max-w-xl min-h-0"
                  )}
                >
                  <MultistepInquiryForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
