import { ArrowUpRight, Check, X } from "lucide-react"

import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { NoiseTexture } from "@/components/v2/craftwork/noise-texture"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"

export function V2About() {
  const { about, business } = v2
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div className="flex flex-col gap-8">
          <SectionHeading id="about-title" kicker={about.kicker} title={about.title} />
          <div className="flex max-w-2xl flex-col gap-4 text-lg text-pretty text-foreground/85">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="grid gap-4 sm:grid-cols-3">
            {about.credentials.map((c, i) => (
              <BlurFade key={c.label} inView delay={i * 0.08} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/8">
                <dt className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{c.label}</dt>
                <dd className="mt-2">
                  <span className="v2-display block text-2xl font-semibold">{c.value}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{c.detail}</span>
                </dd>
              </BlurFade>
            ))}
          </dl>
          <a
            href={business.nzbnPublicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            Verify Scalr on the NZBN register
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <BlurFade inView direction="up" offset={16} className="relative isolate flex flex-col justify-center overflow-hidden rounded-3xl bg-card p-8 ring-1 ring-foreground/8 sm:p-10">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_100%_0%,var(--glow),transparent_70%)]" />
          <NoiseTexture className="-z-10 opacity-20" />
          <h3 className="v2-display text-2xl font-semibold">How I work</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {about.principles.dos.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
                  <Check aria-hidden className="size-3.5" />
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <h3 className="v2-display mt-10 text-2xl font-semibold">What you won&apos;t get</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {about.principles.donts.map((d) => (
              <li key={d} className="flex gap-3 text-muted-foreground">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ring-1 ring-foreground/20">
                  <X aria-hidden className="size-3.5" />
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  )
}
