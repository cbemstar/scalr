import { ArrowRight, ArrowUpRight, Check, MailOpen, MousePointerClick, TrendingUp } from "lucide-react"

import { AnnotatedText } from "@/components/v2/craftwork/annotated-text"
import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { AnimatedCircularProgressBar } from "@/components/v2/craftwork/circular-progress"
import { NoiseTexture } from "@/components/v2/craftwork/noise-texture"
import { SafariFrame } from "@/components/v2/craftwork/safari-frame"
import { v2 } from "@/config/site-v2"

function PanelLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
      <span className="text-foreground">{index}</span>
      {children}
    </p>
  )
}

/** 01 — Google Ads: a campaign snapshot. */
function AdsPanel() {
  const rows = [
    { name: "Emergency plumber · Search", clicks: "1,284", conv: "11.2%" },
    { name: "Hot water cylinders · Search", clicks: "642", conv: "9.6%" },
    { name: "Brand · PMax", clicks: "418", conv: "14.1%" },
  ]
  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_0_var(--highlight)_inset,0_24px_48px_-24px_rgb(10_12_16/0.18)]">
      <PanelLabel index="01">Google Ads</PanelLabel>
      <div className="flex items-center gap-5">
        <AnimatedCircularProgressBar
          value={68}
          gaugePrimaryColor="var(--brand)"
          gaugeSecondaryColor="color-mix(in oklab, var(--foreground) 8%, transparent)"
          className="size-24 text-xl font-semibold"
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Search impression share, %</p>
          <p className="flex items-center gap-1.5 text-sm font-medium">
            <TrendingUp aria-hidden className="size-4 text-brand" /> Cost per lead down 31%
          </p>
          <p className="text-xs text-muted-foreground">vs. previous 30 days</p>
        </div>
      </div>
      <table className="w-full text-left text-xs">
        <thead className="text-muted-foreground">
          <tr className="border-b border-border">
            <th className="py-2 font-normal">Campaign</th>
            <th className="py-2 text-right font-normal">Clicks</th>
            <th className="py-2 text-right font-normal">Conv.</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border/60 last:border-0">
              <td className="py-2 pr-2">{r.name}</td>
              <td className="py-2 text-right tabular-nums">{r.clicks}</td>
              <td className="py-2 text-right font-medium tabular-nums text-brand">{r.conv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** 02 — Webflow: the landing page the ad points at. */
function WebflowPanel() {
  return (
    <div className="flex h-full flex-col gap-4">
      <PanelLabel index="02">Webflow landing page</PanelLabel>
      <SafariFrame url="https://smithplumbing.co.nz/emergency" className="flex-1 shadow-[0_32px_64px_-24px_rgb(10_12_16/0.35)]" role="img" aria-label="Sample Webflow landing page for a plumbing business">
        <div className="flex h-full flex-col bg-white p-5 text-[#0a0c10]">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold">Smith Plumbing</span>
            <span className="rounded-full bg-[#0a0c10] px-2.5 py-1 text-[10px] text-white">03 xxx xxxx</span>
          </div>
          <p className="mt-6 w-fit rounded-full bg-[#eef1ff] px-2 py-0.5 text-[10px] font-medium text-[#2645f5]">Available now · Christchurch</p>
          <p className="v2-display mt-3 text-2xl leading-[1.02] font-semibold">Burst pipe? A plumber at your door in 60 minutes.</p>
          <p className="mt-2 text-[11px] leading-relaxed text-black/60">Upfront pricing. Licensed and insured. 4.9★ from 300+ Google reviews.</p>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2 text-[11px]">
            <span className="rounded-lg border border-black/10 px-3 py-2 text-black/40">Your phone number</span>
            <span className="flex items-center gap-1 rounded-lg bg-[#2645f5] px-3 py-2 font-medium text-white">
              <MousePointerClick aria-hidden className="size-3" /> Call me back
            </span>
          </div>
          <ul className="mt-auto flex gap-3 pt-4 text-[10px] text-black/55">
            {["No call-out fee", "Same-day fix", "12-month guarantee"].map((x) => (
              <li key={x} className="flex items-center gap-1"><Check aria-hidden className="size-3 text-[#2645f5]" />{x}</li>
            ))}
          </ul>
        </div>
      </SafariFrame>
    </div>
  )
}

/** 03 — Email: the follow-up that does the closing. */
function EmailPanel() {
  const flow = [
    { t: "Instantly", s: "Thanks — here's what happens next", open: "78%" },
    { t: "Day 2", s: "Your quote, plus 3 tips to prevent leaks", open: "61%" },
    { t: "Day 30", s: "Time for a hot water check-up?", open: "44%" },
  ]
  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_0_var(--highlight)_inset,0_24px_48px_-24px_rgb(10_12_16/0.18)]">
      <PanelLabel index="03">Email follow-up</PanelLabel>
      <ol className="relative flex flex-col gap-3 before:absolute before:top-3 before:bottom-3 before:left-[15px] before:w-px before:bg-border">
        {flow.map((f, i) => (
          <li key={f.t} className="relative flex items-start gap-3">
            <span className={`z-10 flex size-8 shrink-0 items-center justify-center rounded-full border ${i === 0 ? "border-transparent bg-brand text-brand-foreground" : "border-border bg-card text-muted-foreground"}`}>
              <MailOpen aria-hidden className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1 rounded-xl border border-border bg-background/60 px-3 py-2">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{f.t}</span>
                <span>{f.open} opened</span>
              </div>
              <p className="truncate text-xs font-medium">{f.s}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function V2Hero() {
  const { hero } = v2
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      <div aria-hidden className="v2-grid absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(50%_60%_at_70%_0%,color-mix(in_oklab,var(--brand)_14%,transparent),transparent_70%)]" />
      <NoiseTexture className="-z-10 opacity-20 mix-blend-multiply dark:mix-blend-screen" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-8 lg:col-span-8">
            <BlurFade delay={0.05}>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 py-1 pr-3 pl-1 text-xs backdrop-blur">
                <span className="rounded-full bg-brand px-2 py-0.5 font-medium text-brand-foreground">New</span>
                {hero.kicker}
              </p>
            </BlurFade>
            <BlurFade delay={0.12}>
              <h1 id="hero-title" className="v2-display text-[clamp(2.9rem,7.2vw,6.5rem)] font-medium text-balance">
                {hero.headlineStart}{" "}
                <AnnotatedText variant="underline" color="text-brand" delay={0.9} duration={0.8}>
                  <span className="v2-serif text-brand">{hero.headlineMark}</span>
                </AnnotatedText>{" "}
                {hero.headlineEnd}
              </h1>
            </BlurFade>
          </div>
          <BlurFade delay={0.3} className="flex flex-col gap-6 lg:col-span-4 lg:pb-3">
            <p className="text-lg text-pretty text-muted-foreground">{hero.lead}</p>
            <div className="flex flex-wrap gap-3">
              <a href={hero.primaryCta.href} className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-transform active:scale-[0.97]">
                {hero.primaryCta.label}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={hero.secondaryCta.href} className="group inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-5 font-medium transition-colors hover:bg-muted">
                {hero.secondaryCta.label}
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.45} direction="up" offset={24} className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-[1fr_1.35fr_1fr]">
          <AdsPanel />
          <WebflowPanel />
          <EmailPanel />
        </BlurFade>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </ul>
          <p className="font-mono text-[11px] tracking-wide">Illustrative example — not client data</p>
        </div>
      </div>
    </section>
  )
}
