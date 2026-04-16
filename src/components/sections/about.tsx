// Section 7: About — people buy from people
// Layout based on 21st.dev uilayout.contact/about-section-2 (timeline-animation + staggered headline).

"use client"

import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr"
import { ArrowUpRight, Phone } from "lucide-react"
import { useRef } from "react"
import type { Variants } from "framer-motion"

import posthog from "posthog-js"
import { FadeIn } from "@/components/common/fade-in"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { TimelineContent } from "@/components/ui/timeline-animation"
import { cn } from "@/lib/utils"

function highlightClass(...extra: string[]) {
  return cn(
    "my-2 inline-block rounded-md border-2 border-dotted px-2 py-1 align-middle font-heading xl:min-h-16 xl:px-3 xl:py-0 xl:leading-[4rem]",
    ...extra
  )
}

export function AboutSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  const revealVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.12,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  }

  const textVariants: Variants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  }

  return (
    <section
      id="about"
      className="lp-section relative isolate overflow-hidden lp-hero-surface"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[8%] size-[420px] rounded-full bg-primary/[0.06] blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[5%] size-[380px] rounded-full bg-primary/[0.05] blur-[90px]"
      />

      <div className="lp-shell relative z-10" ref={heroRef}>
        <div className="max-w-3xl">
          <p className="lp-kicker mb-3">About</p>

          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="lp-title mb-8 text-balance"
          >
            We&apos;re{" "}
            <TimelineContent
              as="span"
              animationNum={1}
              timelineRef={heroRef}
              customVariants={textVariants}
              className={highlightClass("border-primary/50 bg-primary/5 text-primary")}
            >
              rethinking
            </TimelineContent>{" "}
            how small businesses get online —{" "}
            <TimelineContent
              as="span"
              animationNum={2}
              timelineRef={heroRef}
              customVariants={textVariants}
              className={highlightClass("border-foreground/25 bg-muted/50 text-foreground")}
            >
              clarity-first
            </TimelineContent>{" "}
            builds, honest pricing, and{" "}
            <TimelineContent
              as="span"
              animationNum={3}
              timelineRef={heroRef}
              customVariants={textVariants}
              className={highlightClass("border-primary/45 bg-background text-primary")}
            >
              analytics you can trust
            </TimelineContent>
            .
          </TimelineContent>

          <FadeIn delay={0.04}>
            <p className="lp-lead mt-4 max-w-2xl text-pretty">
              I&apos;m {siteConfig.founder.name} — I&apos;ve spent 6+ years in digital marketing —
              campaigns, funnels, and why people click. Small businesses with great offers were
              losing to competitors with better sites. So I build pages with a goal on every screen,
              analytics from day one, and copy that sounds like you. I work with businesses across
              New Zealand — based in {siteConfig.contact.location.split(",")[0]}.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild variant="default" size="cta">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => posthog.capture("linkedin_clicked", { source: "about" })}
                >
                  <LinkedinLogoIcon data-icon="inline-start" weight="fill" />
                  LinkedIn
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
              <Button asChild variant="secondary" size="cta">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  onClick={() => posthog.capture("contact_phone_clicked", { source: "about" })}
                >
                  <Phone data-icon="inline-start" aria-hidden />
                  Call {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
