import { TextAnimate } from "@/components/v2/craftwork/text-animate"
import { cn } from "@/lib/utils"

/** Numbered section heading: "[01] Kicker" rule, headline, optional lead. */
export function SectionHeading({
  index,
  kicker,
  title,
  lead,
  id,
  className,
  inverted = false,
}: {
  index?: string
  kicker: string
  title: string
  lead?: string
  id?: string
  className?: string
  inverted?: boolean
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <p
        className={cn(
          "flex items-center gap-3 self-start border-t pt-4 font-mono text-[11px] tracking-[0.16em] uppercase lg:col-span-3",
          inverted ? "border-white/15 text-white/60" : "border-border text-muted-foreground"
        )}
      >
        {index && <span className={inverted ? "text-white" : "text-foreground"}>{index}</span>}
        {kicker}
      </p>
      <div className="flex flex-col gap-5 lg:col-span-9">
        <TextAnimate
          as="h2"
          id={id}
          by="word"
          animation="blurInUp"
          once
          duration={0.5}
          className="v2-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-medium text-balance"
        >
          {title}
        </TextAnimate>
        {lead && (
          <p
            className={cn(
              "max-w-2xl text-lg text-pretty",
              inverted ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {lead}
          </p>
        )}
      </div>
    </div>
  )
}
