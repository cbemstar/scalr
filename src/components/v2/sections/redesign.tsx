"use client"

import * as React from "react"
import { Phone, Star } from "lucide-react"

import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
  CompareSliderLabel,
} from "@/components/v2/craftwork/compare-slider"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"

/** A deliberately dated, cluttered homepage — the "before". Sizes use cqw so it scales with the slider. */
function BeforeSite() {
  return (
    <div className="@container flex size-full flex-col bg-[#e9edf2] font-serif text-[#1f2a44]">
      <div className="flex items-center justify-between gap-[2cqw] bg-[#1f3a6e] px-[2cqw] py-[1.2cqw] text-[clamp(7px,1.3cqw,13px)] text-white">
        <span className="font-bold whitespace-nowrap">SMITH PLUMBING &amp; GAS LTD</span>
        <span className="hidden gap-[1.5cqw] whitespace-nowrap @lg:flex">
          <span>HOME</span><span>ABOUT US</span><span>SERVICES</span><span>GALLERY</span><span>NEWS</span><span>LINKS</span><span>CONTACT</span>
        </span>
      </div>
      <div className="bg-[repeating-linear-gradient(45deg,#c9d3df,#c9d3df_10px,#d7dee8_10px,#d7dee8_20px)] px-[2cqw] py-[3cqw] text-center">
        <p className="text-[clamp(14px,3.6cqw,40px)] font-bold text-[#8a1c1c] italic">Welcome to our website!!!</p>
        <p className="mt-[0.5cqw] text-[clamp(8px,1.3cqw,14px)]">Established 1998 · Family owned · Servicing Canterbury and surrounds</p>
      </div>
      <div className="grid flex-1 grid-cols-[2fr_1fr] gap-[2cqw] p-[2cqw] text-[clamp(8px,1.35cqw,14px)] leading-snug">
        <div className="flex flex-col gap-[1.5cqw]">
          <p>
            We are a family owned and operated plumbing and gasfitting company and we have been in business for many years providing
            quality services to residential and commercial customers. Our services include but are not limited to: hot water cylinders,
            blocked drains, leak detection, gas fitting, bathroom renovations, roofing, spouting and much much more. Please see our
            services page for more information about the services that we offer.
          </p>
          <p>
            We pride ourselves on our workmanship and customer service. No job too big or too small! Free quotes available on request
            (conditions apply). Please allow 5-7 working days for a response to all enquiries.
          </p>
          <div className="flex flex-1 items-center justify-center border-2 border-dashed border-[#1f3a6e]/30 bg-white/40 text-[#1f3a6e]/60">
            [ photo gallery coming soon ]
          </div>
          <p className="text-[#555]">Latest news: Our new van has arrived! (posted 14/03/2017)</p>
        </div>
        <div className="flex flex-col gap-[1.2cqw] bg-white/60 p-[1.5cqw]">
          <p className="font-bold underline">Contact Us</p>
          <p>Ph: 03 xxx xxxx</p>
          <p>Fax: 03 xxx xxxx</p>
          <p className="text-[#1f3a6e] underline">Click here to email</p>
          <p className="mt-auto font-mono text-[#555]">You are visitor no. 004213</p>
        </div>
      </div>
    </div>
  )
}

/** The same business, rebuilt — the "after". */
function AfterSite() {
  return (
    <div className="@container flex size-full flex-col bg-[#f7f5f0] text-[#14212b]">
      <div className="flex items-center justify-between px-[3cqw] py-[1.8cqw] text-[clamp(9px,1.4cqw,15px)]">
        <span className="font-semibold tracking-tight">Smith Plumbing &amp; Gas</span>
        <span className="hidden gap-[2.5cqw] text-[#14212b]/60 @lg:flex">
          <span>Services</span><span>Reviews</span><span>About</span>
        </span>
        <span className="flex items-center gap-[0.6cqw] rounded-full bg-[#0f5c4a] px-[1.6cqw] py-[0.8cqw] font-medium text-white">
          <Phone aria-hidden className="size-[1.1em]" /> 03 xxx xxxx
        </span>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-[3cqw] px-[3cqw] pb-[3cqw] @lg:grid-cols-[1fr_1.15fr]">
        <div
          aria-hidden
          className="relative hidden overflow-hidden rounded-[2cqw] bg-[radial-gradient(90%_70%_at_30%_25%,#9cc9b8,#2f7a66_50%,#0b3b30)] @lg:block"
        >
          <div className="absolute bottom-[8%] left-[8%] flex items-center gap-[0.8cqw] rounded-full bg-white/95 px-[1.6cqw] py-[0.9cqw] text-[clamp(8px,1.2cqw,13px)] font-medium shadow-lg">
            <Star aria-hidden className="size-[1.1em] fill-[#d9901a] text-[#d9901a]" /> 4.8 · 96 Google reviews
          </div>
        </div>
        <div className="flex flex-col justify-end gap-[2cqw] @lg:justify-center">
          <span className="w-fit rounded-full bg-[#dcebe5] px-[1.4cqw] py-[0.6cqw] text-[clamp(9px,1.25cqw,14px)] font-medium text-[#0f5c4a]">
            Same-day callouts across Canterbury
          </span>
          <p className="v2-display text-[clamp(22px,5cqw,64px)] leading-[0.95] font-semibold">
            Burst pipe? No hot water? We&apos;re on our way.
          </p>
          <p className="max-w-[46ch] text-[clamp(11px,1.5cqw,17px)] text-[#14212b]/70">
            Licensed plumbers and gasfitters since 1998. Upfront quotes, tidy work and a 12-month workmanship guarantee.
          </p>
          <div className="flex flex-wrap gap-[1cqw] text-[clamp(10px,1.4cqw,15px)] font-medium">
            <span className="rounded-full bg-[#0f5c4a] px-[2cqw] py-[1.1cqw] text-white">Book a plumber</span>
            <span className="rounded-full px-[2cqw] py-[1.1cqw] ring-1 ring-[#14212b]/20">Get a quote</span>
          </div>
          <div className="mt-[1cqw] grid grid-cols-2 gap-[1cqw] text-[clamp(9px,1.25cqw,14px)]">
            {["Hot water cylinders", "Blocked drains", "Gas fitting", "Bathroom renovations"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-[1.2cqw] bg-white px-[1.4cqw] py-[1.1cqw] shadow-sm ring-1 ring-black/5">
                {item} <span className="text-[#0f5c4a]">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Side-by-side on wide screens; top/bottom on phones so both versions stay readable. */
function useNarrow() {
  const [narrow, setNarrow] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)")
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return narrow
}

export function V2Redesign() {
  const { redesign } = v2
  const narrow = useNarrow()
  return (
    <section id="redesigns" aria-labelledby="redesign-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <SectionHeading id="redesign-title" kicker={redesign.kicker} title={redesign.title} lead={redesign.lead} />
          <p className="font-mono text-xs text-muted-foreground lg:text-right">
            Drag the handle (or use arrow keys) to compare. Illustrative example.
          </p>
        </div>

        <BlurFade inView className="mt-12">
          <CompareSlider
            key={narrow ? "v" : "h"}
            defaultValue={narrow ? 34 : 38}
            orientation={narrow ? "vertical" : "horizontal"}
            aria-label="Before and after: a dated plumbing website compared with its redesign"
            className="aspect-square shadow-2xl sm:aspect-[16/9]"
          >
            <CompareSliderAfter>
              <AfterSite />
            </CompareSliderAfter>
            <CompareSliderBefore>
              <BeforeSite />
            </CompareSliderBefore>
            <CompareSliderHandle />
            <CompareSliderLabel side="before">Before</CompareSliderLabel>
            <CompareSliderLabel side="after">After</CompareSliderLabel>
          </CompareSlider>
        </BlurFade>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {redesign.points.map((p, i) => (
            <li key={p.title}>
              <BlurFade inView delay={i * 0.06} className="flex flex-col gap-2 border-t border-foreground/15 pt-4">
                <span className="font-mono text-xs text-brand">0{i + 1}</span>
                <h3 className="v2-display text-xl font-semibold">{p.title}</h3>
                <p className="text-sm text-pretty text-muted-foreground">{p.body}</p>
              </BlurFade>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
