import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"

export function V2Process() {
  const { process } = v2
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="scroll-mt-20 bg-primary py-24 text-primary-foreground sm:py-32 [--muted-foreground:color-mix(in_oklab,var(--primary-foreground)_65%,transparent)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="process-title" kicker={process.kicker} title={process.title} />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-primary-foreground/12 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <li key={step.title} className="bg-primary">
              <BlurFade inView delay={i * 0.1} className="flex h-full flex-col gap-6 p-6 sm:p-8">
                <span
                  aria-hidden
                  className="v2-display text-7xl font-semibold text-brand"
                >
                  {i + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="v2-display text-2xl font-semibold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="text-sm text-pretty text-muted-foreground">{step.body}</p>
                </div>
              </BlurFade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
