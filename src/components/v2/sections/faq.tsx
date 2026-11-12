"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"

import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"

export function V2Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:px-8">
        <SectionHeading
          id="faq-title"
          kicker="FAQ"
          title="Straight answers."
          lead="Can't see your question? Email me — I'd rather answer it before you commit than after."
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <AccordionPrimitive.Root type="single" collapsible className="flex flex-col gap-3">
          {v2.faq.map((item, i) => (
            <AccordionPrimitive.Item
              key={item.q}
              value={`q-${i}`}
              className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8 transition-shadow data-[state=open]:shadow-lg"
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-medium sm:px-6 sm:text-lg">
                  {item.q}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/5 transition-[transform,background-color] duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-brand group-data-[state=open]:text-brand-foreground">
                    <Plus aria-hidden className="size-4" />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-5 pb-5 text-pretty text-muted-foreground sm:px-6">{item.a}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}
