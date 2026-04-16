"use client"

import posthog from "posthog-js"
import { FadeIn } from "@/components/common/fade-in"
import { MultistepInquiryForm } from "@/components/ui/multistep-form"
import { siteConfig } from "@/config/site"
import { Phone } from "lucide-react"

export function FinalCTASection() {
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
            </div>
          </FadeIn>

          {/* Right — Form */}
          <FadeIn delay={0.08}>
            <div className="rounded-2xl border border-border/70 bg-background p-6 shadow-sm sm:p-8">
              <MultistepInquiryForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
