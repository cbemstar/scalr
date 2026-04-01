"use client"

import Link from "next/link"
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/kibo-ui/announcement"
import { FadeIn } from "@/components/common/fade-in"
import { buttonVariants } from "@/components/ui/button"
import { TextRotate } from "@/components/ui/text-rotate"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const promisePoints = [
  "2-week delivery",
  "Conversion-focused structure",
  "From $1,499 NZD",
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden px-4 py-20 sm:px-6 sm:py-24"
      style={{
        backgroundColor: "oklch(0.985 0.006 260)",
        backgroundImage: `radial-gradient(circle, oklch(0.22 0.03 260 / 0.07) 1px, transparent 1px)`,
        backgroundSize: "26px 26px",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent"
      />

      <div className="lp-shell relative z-10 grid items-start gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <FadeIn>
            <Announcement
              themed
              variant="outline"
              className="w-fit max-w-full border-border/80 bg-card/90 text-foreground shadow-sm backdrop-blur-sm"
            >
              <AnnouncementTag className="border-emerald-600/15 bg-emerald-600/10 text-emerald-800">
                New
              </AnnouncementTag>
              <AnnouncementTitle className="text-sm text-foreground/90">
                3-page websites from $1,499 NZD · live in about 2 weeks
              </AnnouncementTitle>
            </Announcement>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h1 className="font-heading text-4xl font-semibold leading-[1.06] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem]">
              <span className="text-foreground">Websites that </span>
              <TextRotate
                texts={[...siteConfig.heroRotatingPhrases]}
                splitBy="characters"
                rotationInterval={2800}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                lineHeightEm={1.06}
                containerClassName={cn(
                  "rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5",
                  "bg-muted/80 text-brand",
                  "ring-1 ring-border/70",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                )}
                mainClassName="text-brand"
                elementLevelClassName="text-brand"
              />
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="max-w-[56ch] text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Built for Christchurch small businesses by a marketer, not just a designer.
            </p>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#pricing"
                string="magnetic"
                string-id="hero-cta-packages"
                string-strength={0.24}
                string-radius={150}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "st-magnetic bg-brand text-brand-foreground shadow-sm hover:bg-brand/90"
                )}
              >
                See Packages
              </Link>
              <a
                href={siteConfig.contact.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                string="magnetic"
                string-id="hero-cta-call"
                string-strength={0.16}
                string-radius={130}
                className="st-magnetic inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background/80 px-8 text-base font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-border hover:bg-muted/80"
              >
                Book a Free Call
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="text-sm tracking-wide text-muted-foreground/90">
              Tradies · Cafés · Physios · Lawyers · Retailers
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="lg:col-span-5">
          <div
            string="parallax"
            string-id="nzws-hero-preview"
            string-parallax={0.12}
            className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/95 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md"
          >
            <div className="border-b border-border/70 bg-muted/30 px-6 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                What you get in 14 days
              </p>
            </div>
            <div className="space-y-4 p-6">
              {promisePoints.map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-border/70 bg-muted/25 px-4 py-3 text-sm text-foreground/90"
                >
                  {point}
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3 border-t border-border/70 pt-4">
                <div>
                  <p className="font-mono text-xl font-semibold text-foreground">47%</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    of NZ businesses have no website
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xl font-semibold text-foreground">2 wk</p>
                  <p className="mt-1 text-xs text-muted-foreground">typical delivery</p>
                </div>
                <div>
                  <p className="font-mono text-xl font-semibold text-foreground">$1.5k</p>
                  <p className="mt-1 text-xs text-muted-foreground">from · 3 pages</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
