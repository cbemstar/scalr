import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { v2 } from "@/config/site-v2"

export function V2Founder() {
  const { founder, business } = v2
  return (
    <section aria-label="A note from the founder" className="bg-muted py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <p className="border-t border-border pt-4 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3">
          <span className="text-foreground">07</span> Founder-led
        </p>
        <BlurFade inView className="flex flex-col gap-10 lg:col-span-9">
          <blockquote className="v2-display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.12] font-normal text-balance">
            <span aria-hidden className="v2-serif mr-1 text-brand">“</span>
            {founder.quote}
            <span aria-hidden className="v2-serif ml-1 text-brand">”</span>
          </blockquote>
          <div className="flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-primary font-logo text-xl text-primary-foreground">k</span>
              <div>
                <p className="font-medium">{founder.name}</p>
                <p className="text-sm text-muted-foreground">{founder.role}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 text-xs">
              {founder.credentials.map((c, i) => (
                <li key={c} className="rounded-full border border-border bg-card px-3 py-1.5">
                  {i === 1 ? (
                    <a href={business.nzbnPublicUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                      {c}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : c}
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
