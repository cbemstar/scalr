"use client"

import { DraggableMarquee } from "@/components/v2/craftwork/draggable-marquee"
import { v2 } from "@/config/site-v2"

/** Platforms we work in — a draggable, throwable strip (Craftwork / Obsidian UI). */
export function V2Platforms() {
  const items = v2.platforms.map((name) => ({ id: name, src: name, alt: name }))
  return (
    <section aria-labelledby="platforms-title" className="border-y border-border bg-card py-8">
      <div className="mx-auto mb-5 flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2 id="platforms-title" className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          Platforms we work in
        </h2>
        <p className="hidden font-mono text-[11px] text-muted-foreground sm:block">Drag to scroll</p>
      </div>
      <p className="sr-only">{v2.platforms.join(", ")}.</p>
      <DraggableMarquee
        items={items}
        speed={0.6}
        repeatCount={3}
        pauseOnHover
        label="Platforms we work in"
        gapClassName="gap-3"
        itemClassName=""
        className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        renderItem={(item) => (
          <span className="v2-display flex h-14 items-center gap-3 rounded-full border border-border bg-background px-6 text-xl font-medium whitespace-nowrap select-none">
            <span aria-hidden className="size-2 rounded-full bg-brand" />
            {String(item.src)}
          </span>
        )}
      />
    </section>
  )
}
