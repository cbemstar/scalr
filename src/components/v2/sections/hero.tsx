import { ArrowDownRight, ArrowRight, Check, Phone, Star } from "lucide-react"

import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { NoiseTexture } from "@/components/v2/craftwork/noise-texture"
import { SafariFrame } from "@/components/v2/craftwork/safari-frame"
import { TextAnimate } from "@/components/v2/craftwork/text-animate"
import { v2 } from "@/config/site-v2"

/** A small, made-up client site rendered live inside the browser frame. */
function SampleSite() {
  return (
    <div className="bg-[#fbf6ee] text-[#2a2118]">
      <div className="flex items-center justify-between border-b border-[#2a2118]/10 px-5 py-3 text-[11px]">
        <span className="font-semibold tracking-tight">Ember St. Bakery</span>
        <span className="hidden gap-4 text-[#2a2118]/60 @md/safari:flex">
          <span>Menu</span>
          <span>Catering</span>
          <span>Visit</span>
        </span>
        <span className="rounded-full bg-[#2a2118] px-3 py-1 text-[10px] font-medium text-[#fbf6ee]">
          Order ahead
        </span>
      </div>
      <div className="grid gap-4 px-5 py-6 @md/safari:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-3">
          <span className="w-fit rounded-full bg-[#e9dcc8] px-2 py-0.5 text-[10px] font-medium">
            Open today 7am–3pm
          </span>
          <p className="v2-display text-[26px] leading-[0.95] font-semibold @md/safari:text-[32px]">
            Sourdough, done slowly. Coffee, done right.
          </p>
          <p className="text-[11px] leading-relaxed text-[#2a2118]/70">
            Baked in Sydenham every morning. Order by 9pm for next-day pickup.
          </p>
          <div className="flex flex-wrap gap-2 text-[10px] font-medium">
            <span className="rounded-full bg-[#c4321b] px-3 py-1.5 text-white">
              Order for pickup
            </span>
            <span className="flex items-center gap-1 rounded-full px-3 py-1.5 ring-1 ring-[#2a2118]/20">
              <Phone aria-hidden className="size-3" /> Call us
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[#2a2118]/70">
            <span className="flex text-[#d9901a]" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-current" />
              ))}
            </span>
            4.9 from 212 Google reviews
          </div>
        </div>
        <div
          aria-hidden
          className="relative hidden aspect-[4/5] overflow-hidden rounded-xl bg-[radial-gradient(120%_80%_at_30%_20%,#f0c58c,#c9793a_45%,#6b3416)] @md/safari:block"
        >
          <div className="absolute inset-x-6 bottom-6 h-1/3 rounded-[50%] bg-[#3b1d0d]/35 blur-xl" />
          <div className="absolute top-1/4 left-1/2 size-28 -translate-x-1/2 rounded-[45%] bg-[radial-gradient(circle_at_35%_30%,#f6d6a1,#c27a35_60%,#7a3d15)] shadow-2xl" />
        </div>
      </div>
    </div>
  )
}

export function V2Hero() {
  const { hero } = v2
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24"
    >
      {/* Atmosphere: pōhutukawa glow + film grain */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_85%_10%,color-mix(in_oklab,var(--brand)_18%,transparent),transparent_70%),radial-gradient(40%_40%_at_0%_100%,color-mix(in_oklab,var(--brand)_8%,transparent),transparent_70%)]"
      />
      <NoiseTexture className="-z-10 opacity-30 mix-blend-multiply dark:opacity-40 dark:mix-blend-screen" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10 lg:px-8">
        <div className="flex flex-col gap-7">
          <BlurFade delay={0.05}>
            <p className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase ring-1 ring-foreground/8">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              {hero.kicker}
            </p>
          </BlurFade>

          <TextAnimate
            as="h1"
            id="hero-title"
            by="word"
            animation="blurInUp"
            startOnView={false}
            once
            delay={0.15}
            duration={0.9}
            className="v2-display text-[clamp(2.75rem,7vw,5.75rem)] font-semibold text-balance"
          >
            {hero.headline}
          </TextAnimate>

          <BlurFade delay={0.6}>
            <p className="max-w-xl text-lg text-pretty text-muted-foreground sm:text-xl">
              {hero.lead}
            </p>
          </BlurFade>

          <BlurFade delay={0.75} className="flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-base font-medium text-brand-foreground shadow-[0_10px_30px_-10px_var(--brand)] transition-transform active:scale-[0.97]"
            >
              {hero.primaryCta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex h-12 items-center gap-2 rounded-full px-5 text-base font-medium ring-1 ring-foreground/15 transition-colors hover:bg-foreground/5"
            >
              {hero.secondaryCta.label}
              <ArrowDownRight aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </BlurFade>

          <BlurFade delay={0.9}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {hero.proof.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check aria-hidden className="size-4 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>

        <BlurFade delay={0.4} offset={24} direction="up" className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-[conic-gradient(from_180deg_at_50%_50%,color-mix(in_oklab,var(--brand)_25%,transparent),transparent_40%,color-mix(in_oklab,var(--brand)_12%,transparent))] blur-2xl"
          />
          <SafariFrame
            url="https://emberstbakery.co.nz"
            className="rotate-[1.5deg] transition-transform duration-500 hover:rotate-0"
            role="img"
            aria-label="Sample café website concept, shown in a browser window"
          >
            <SampleSite />
          </SafariFrame>
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-popover px-4 py-3 text-sm shadow-xl ring-1 ring-foreground/10 sm:-left-8">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand/12 font-mono text-xs font-semibold text-brand">
              0.9s
            </span>
            <span className="leading-tight">
              <span className="block font-medium">Loads fast on 4G</span>
              <span className="text-xs text-muted-foreground">Sample concept site</span>
            </span>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
