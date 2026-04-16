"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export type TestimonialSupporting = {
  eyebrow: string
  headline: string
  body: string
}

export type TestimonialsProps = {
  sourceUrl: string
  sourceLabel: string
  sourceTitleAttr: string
  primaryBeforeLink: string
  primaryAfterLink: string
  supporting: readonly TestimonialSupporting[]
  attributionName: string
  attributionDetail: string
  /** Optional machine-readable publication period for research citations */
  attributionDate?: { label: string; dateTime: string }
}

/**
 * Bento-style research / trust strip (Card + Avatar pattern).
 * Inspired by community testimonial layouts; content is NZ research, not client quotes.
 */
export function Testimonials({
  sourceUrl,
  sourceLabel,
  sourceTitleAttr,
  primaryBeforeLink,
  primaryAfterLink,
  supporting,
  attributionName,
  attributionDetail,
  attributionDate,
}: TestimonialsProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        "lg:grid-cols-3 lg:grid-rows-2 lg:items-stretch"
      )}
    >
      <Card
        className={cn(
          "border-border/80 bg-card/90 shadow-sm ring-1 ring-foreground/5",
          "lg:col-span-2 lg:row-span-2",
          "flex flex-col"
        )}
      >
        <CardHeader className="gap-4 pb-4">
          <CardTitle className="font-heading text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
            {primaryBeforeLink}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-primary/35 underline-offset-[0.2em] transition-colors hover:decoration-primary/70"
              title={sourceTitleAttr}
            >
              {sourceLabel}
            </a>
            {primaryAfterLink}
          </CardTitle>
        </CardHeader>
        <CardFooter className="mt-auto flex flex-row items-center gap-3 border-t border-border/60 pt-6">
          <Avatar className="size-11 rounded-xl">
            <AvatarFallback className="rounded-xl bg-primary/12 font-heading text-sm font-semibold text-primary">
              .nz
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm font-semibold text-foreground">{attributionName}</p>
            <p className="text-xs text-muted-foreground">
              {attributionDetail}
              {attributionDate ? (
                <>
                  {" · "}
                  <time dateTime={attributionDate.dateTime}>{attributionDate.label}</time>
                </>
              ) : null}
            </p>
          </div>
        </CardFooter>
      </Card>

      {supporting.map((item) => (
        <Card
          key={item.headline + item.eyebrow}
          size="sm"
          className="border-border/70 bg-muted/15 ring-1 ring-foreground/5"
        >
          <CardHeader className="gap-1 pb-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {item.eyebrow}
            </p>
            <CardTitle className="font-heading text-2xl font-semibold tabular-nums tracking-tight text-primary sm:text-3xl">
              {item.headline}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
