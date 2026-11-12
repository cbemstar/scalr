import { Check, Minus } from "lucide-react"

import { BlurFade } from "@/components/v2/craftwork/blur-fade"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/v2/craftwork/table"
import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"
import { cn } from "@/lib/utils"

/** Process as a numbered timeline. */
export function V2Approach() {
  const { approach } = v2
  return (
    <section id="approach" aria-labelledby="approach-title" className="scroll-mt-20 border-t border-border bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="approach-title" index="04" kicker={approach.kicker} title={approach.title} />

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-border lg:block" />
          {approach.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <BlurFade inView delay={i * 0.1} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "z-10 flex size-10 items-center justify-center rounded-full border font-mono text-sm",
                    i === 0 ? "border-transparent bg-brand text-brand-foreground" : "border-border bg-card"
                  )}>
                    {i + 1}
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">{step.timing}</span>
                </div>
                <h3 className="v2-display text-2xl font-medium">{step.title}</h3>
                <p className="text-sm text-pretty text-muted-foreground">{step.body}</p>
              </BlurFade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (value === true)
    return (
      <span className={cn("inline-flex size-7 items-center justify-center rounded-full", highlight ? "bg-brand text-brand-foreground" : "bg-muted")}>
        <Check aria-label="Yes" className="size-4" />
      </span>
    )
  if (value === false)
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground">
        <Minus aria-label="No" className="size-4" />
      </span>
    )
  return <span className={cn("text-sm", highlight ? "font-medium" : "text-muted-foreground")}>{value}</span>
}

/** Comparison table: Scalr vs a typical agency vs DIY. */
export function V2Compare() {
  const { compare } = v2
  return (
    <section aria-labelledby="compare-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="compare-title" index="05" kicker={compare.kicker} title={compare.title} />

        <BlurFade inView className="mt-14 overflow-hidden rounded-3xl border border-border bg-card">
          <Table className="min-w-[640px] text-left">
            <TableCaption className="sr-only">How Scalr compares with a typical agency and doing it yourself</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-auto w-2/5 p-5 font-normal text-muted-foreground sm:p-6">What you get</TableHead>
                {compare.columns.map((c, i) => (
                  <TableHead
                    key={c}
                    className={cn("h-auto p-5 text-center sm:p-6", i === 0 ? "bg-primary text-primary-foreground" : "font-medium text-foreground")}
                  >
                    {i === 0 ? <span className="font-logo text-xl leading-none">scalr</span> : c}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {compare.rows.map((row) => (
                <TableRow key={row.label}>
                  <TableHead scope="row" className="h-auto p-5 font-medium text-foreground sm:p-6">{row.label}</TableHead>
                  {row.values.map((v, i) => (
                    <TableCell key={i} className={cn("p-5 text-center sm:p-6", i === 0 && "bg-accent/60")}>
                      <Cell value={v} highlight={i === 0} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </BlurFade>
      </div>
    </section>
  )
}
