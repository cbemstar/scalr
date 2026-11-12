import { TextAnimate } from "@/components/v2/craftwork/text-animate"
import { cn } from "@/lib/utils"

export function SectionHeading({
  kicker,
  title,
  lead,
  id,
  className,
  align = "left",
}: {
  kicker: string
  title: string
  lead?: string
  id?: string
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <p className="flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
        <span aria-hidden className="size-1.5 rounded-full bg-brand" />
        {kicker}
      </p>
      <TextAnimate
        as="h2"
        id={id}
        by="word"
        animation="blurInUp"
        once
        duration={0.5}
        className="v2-display text-4xl font-semibold text-balance sm:text-5xl lg:text-6xl"
      >
        {title}
      </TextAnimate>
      {lead && (
        <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  )
}
