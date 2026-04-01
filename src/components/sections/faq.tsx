// Section 9: FAQ

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Will I own my website when it's done?",
    answer:
      "Yes, completely. You own the code, the domain, and all the content. I'll transfer everything to your accounts once the final payment clears. No lock-in, no ongoing dependency on me unless you choose a care plan.",
  },
  {
    question: "Why is this cheaper than a web agency?",
    answer:
      "Because I'm one person with low overheads — no account managers, no project coordinators, no office in the CBD. You pay for the work, not the infrastructure. You also get direct access to the person actually building your site, not a junior handing off your brief.",
  },
  {
    question: "What technology do you build with?",
    answer:
      "I build with React and modern web frameworks — not WordPress, Wix, Squarespace, or page builders. This means faster sites, better security (no plugin vulnerabilities), and a CMS your team can actually use without needing a developer.",
  },
  {
    question: "What if I don't like the design?",
    answer:
      "Before any code is written, I present a design mockup for your approval. If you're not happy with the direction at that stage, you pay nothing — that's my satisfaction guarantee. Once we agree on the design, the build begins.",
  },
  {
    question: "Do you need me to supply copy and images?",
    answer:
      "For Starter and Standard packages, yes — I'll give you a simple brief to fill in and guidance on what to write. If writing isn't your thing, copywriting assistance is included in the Premium package. For images, I can source high-quality stock photos or work with photos you provide.",
  },
  {
    question: "How long does it actually take?",
    answer:
      "Starter sites: 5–7 business days. Standard: 2–3 weeks. Premium: 3–4 weeks. The biggest variable is how quickly you provide feedback and content — the faster you respond, the faster we launch.",
  },
  {
    question: "Can I make changes to the site after launch?",
    answer:
      "Yes. You get a training session showing you how to make basic content updates yourself. For anything beyond that — new pages, design changes, technical work — the care plans include a set amount of update time each month, or you can book ad-hoc support.",
  },
  {
    question: "Do I need to pay for hosting separately?",
    answer:
      "If you're on a care plan, hosting is bundled in. If you prefer to manage hosting yourself, I'll set it up on your chosen provider and hand it over — the cost is typically $20–50 NZD/month depending on traffic.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "I'm based in Christchurch and work with businesses across Canterbury. I also work remotely with clients throughout New Zealand and internationally — everything can be done over video call.",
  },
  {
    question: "What's included in the care plans?",
    answer:
      "Basic Care ($99/month): hosting, uptime monitoring, 30 minutes of updates. Growth Care ($199/month): everything in Basic + 1 hour of updates, monthly analytics report, SEO health check. Premium Care ($349/month): everything in Growth + 2 hours of work, monthly strategy call, SEO reporting.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="lp-section">
      <div className="lp-shell max-w-4xl">
        <div className="mb-12 border-l-4 border-brand pl-6 sm:pl-8">
          <p className="lp-kicker mb-3">FAQ</p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.35rem]">
            Questions you&apos;re probably wondering about
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">If something isn&apos;t covered here, just ask.</p>
        </div>

        <Accordion className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium hover:text-brand">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a
              href="mailto:hello@nzwebstudio.co.nz"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              Email me directly.
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
