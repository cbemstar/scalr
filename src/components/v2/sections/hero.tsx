import { ArrowDown, ArrowRight, Check, Mail, MousePointerClick, PanelsTopLeft } from "lucide-react"

import { AnnotatedText } from "@/components/v2/craftwork/annotated-text"
import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { NoiseTexture } from "@/components/v2/craftwork/noise-texture"
import { v2 } from "@/config/site-v2"

const PATH_ICONS = [MousePointerClick, PanelsTopLeft, Mail]

/**
 * Hero — one promise, one action. Who it's for (businesses paying for traffic),
 * the outcome they want (more enquiries), how (ads + page + follow-up), and a
 * single primary CTA. Everything else waits for the scroll.
 */
export function V2Hero() {
  const { hero, cta } = v2
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div aria-hidden className="v2-grid absolute inset-0 -z-10 [mask-image:radial-gradient(60%_55%_at_50%_30%,black,transparent)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(45%_55%_at_50%_0%,color-mix(in_oklab,var(--brand)_12%,transparent),transparent_70%)]" />
      <NoiseTexture className="-z-10 opacity-15 mix-blend-multiply dark:mix-blend-screen" />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
        <BlurFade delay={0.05}>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            {hero.kicker}
          </p>
        </BlurFade>

        <BlurFade delay={0.12}>
          <h1 id="hero-title" className="v2-display mt-8 text-[clamp(2.6rem,6.4vw,5.6rem)] font-medium text-balance">
            {hero.headlineStart}{" "}
            <AnnotatedText variant="underline" color="text-brand" delay={0.9} duration={0.8}>
              <span className="v2-serif text-brand">{hero.headlineMark}</span>
            </AnnotatedText>{" "}
            {hero.headlineEnd}
          </h1>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">{hero.lead}</p>
        </BlurFade>

        <BlurFade delay={0.4} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a href={cta.href} className="group inline-flex h-13 items-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground transition-transform active:scale-[0.97]">
            {cta.label}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href={hero.secondary.href} className="group inline-flex h-13 items-center gap-2 rounded-full px-5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground">
            {hero.secondary.label}
            <ArrowDown aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </BlurFade>

        <BlurFade delay={0.5}>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {hero.reassurance.map((r) => (
              <li key={r} className="flex items-center gap-1.5">
                <Check aria-hidden className="size-4 text-brand" />
                {r}
              </li>
            ))}
          </ul>
        </BlurFade>

        {/* A quiet picture of the whole offer: three steps, one path. */}
        <BlurFade delay={0.65} direction="up" offset={12} className="mt-20 w-full">
          <ol aria-label="What we look after" className="mx-auto flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {hero.path.map((step, i) => {
              const Icon = PATH_ICONS[i]
              return (
                <li key={step} className="flex flex-1 items-center gap-3">
                  <span className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-left shadow-[0_1px_0_var(--highlight)_inset,0_12px_32px_-20px_rgb(10_12_16/0.25)]">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-brand">
                      <Icon aria-hidden className="size-4.5" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Step {i + 1}</span>
                      <span className="block text-sm font-medium">{step}</span>
                    </span>
                  </span>
                  {i < hero.path.length - 1 && (
                    <ArrowRight aria-hidden className="hidden size-4 shrink-0 text-muted-foreground sm:block" />
                  )}
                </li>
              )
            })}
          </ol>
        </BlurFade>
      </div>
    </section>
  )
}
