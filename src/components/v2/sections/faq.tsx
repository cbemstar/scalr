"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"

import { SectionHeading } from "@/components/v2/sections/section-heading"
import { v2 } from "@/config/site-v2"

export function V2Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="faq-title" index="08" kicker="FAQ" title="Questions we hear most." />

        <AccordionPrimitive.Root type="single" collapsible className="mt-12 border-t border-border lg:ml-[calc(25%+0.625rem)]">
          {v2.faq.map((item, i) => (
            <AccordionPrimitive.Item key={item.q} value={`q-${i}`} className="border-b border-border">
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium sm:text-xl">
                  <span className="flex gap-5">
                    <span className="mt-1 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    {item.q}
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-[transform,background-color,color] duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-brand group-data-[state=open]:bg-brand group-data-[state=open]:text-brand-foreground">
                    <Plus aria-hidden className="size-4" />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-2xl pb-6 pl-10 text-pretty text-muted-foreground">{item.a}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}
