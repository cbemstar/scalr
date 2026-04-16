"use client"

// Section 9: FAQ

import posthog from "posthog-js"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { siteConfig } from "@/config/site"
import { faqItems } from "@/data/faq"

export function FAQSection() {
  return (
    <section id="faq" className="lp-section">
      <div className="lp-shell max-w-4xl">
        <div className="mb-12 border-l-4 border-primary pl-6 sm:pl-8">
          <p className="lp-kicker mb-3">FAQ</p>
          <h2 className="lp-title">
            Questions you&apos;re probably wondering about
          </h2>
          <p className="lp-lead mt-4">If something isn&apos;t covered here, just ask.</p>
        </div>

        <Accordion
          type="single"
          defaultValue="1"
          collapsible
          className="w-full"
          onValueChange={(value) => {
            if (value) {
              const item = faqItems.find((i) => i.id === value)
              if (item) posthog.capture("faq_item_opened", { question: item.question })
            }
          }}
        >
          {faqItems.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="last:border-b">
              <AccordionTrigger className="cursor-pointer overflow-hidden pl-4 text-left text-muted-foreground duration-200 hover:no-underline sm:pl-6 md:pl-14 data-[state=open]:text-primary [&>svg]:hidden">
                <div className="flex flex-1 items-start gap-3 sm:gap-4">
                  <p className="text-xs">{item.id}</p>
                  <h3 className="relative text-left text-lg uppercase sm:text-xl md:text-2xl lg:text-3xl">
                    {item.question}
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-4 text-base leading-relaxed text-muted-foreground sm:pl-6 md:px-20">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Email me directly.
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
