import { buildDeliveryTimelineFaqAnswer } from "@/config/site"

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: "1",
    question: "Will I own my website when it's done?",
    answer:
      "Yes, completely. You own the code, the domain, and all the content. I'll transfer everything to your accounts once the final payment clears. No lock-in, no ongoing dependency on me unless you choose a care plan.",
  },
  {
    id: "2",
    question: "Why is this cheaper than a web agency?",
    answer:
      "Because I'm one person with low overheads — no account managers, no project coordinators, no office in the CBD. You pay for the work, not the infrastructure. You also get direct access to the person actually building your site, not a junior handing off your brief.",
  },
  {
    id: "3",
    question: "What technology do you build with?",
    answer:
      "I build with React/Next.js for custom sites or Webflow for clients who want to manage their own content visually. For ecommerce I typically use Shopify (your Shopify subscription is separate from the build fee). All options produce fast, mobile-responsive, secure sites — we pick the right stack when we first talk. Custom/Webflow marketing-site build prices are listed as standard packages; Shopify stores have their own ecommerce tiers on the Pricing section.",
  },
  {
    id: "4",
    question: "What if I don't like the design?",
    answer:
      "Before any code is written, I present a design mockup for your approval. If the direction isn't working for you at that stage, we stop there — you don't owe the build fee. Once we agree on the design, the build begins.",
  },
  {
    id: "5",
    question: "Do you need me to supply copy and images?",
    answer:
      "For Starter and Standard packages, yes — I'll give you a simple brief to fill in and guidance on what to write. If writing isn't your thing, copywriting assistance is included in the Premium package. For images, I can source high-quality stock photos or work with photos you provide.",
  },
  {
    id: "6",
    question: "How long does it actually take?",
    answer: buildDeliveryTimelineFaqAnswer(),
  },
  {
    id: "7",
    question: "Can I make changes to the site after launch?",
    answer:
      "Yes. Starter includes a short handover; Standard and Premium include a training session so you can make basic content updates yourself (CMS packages) or know how your site is structured. The Landing Page package is a single live page — say if you want a short paid walkthrough. For anything beyond day-to-day updates — new pages, design changes, technical work — care plans include a set amount of update time each month. Otherwise we quote half-day or full-day blocks for fuzzy work, or ad-hoc support at $150/hour NZD for agreed change orders (1-hour minimum, billed in 30-minute increments) — see Pricing for block rates.",
  },
  {
    id: "7b",
    question: "Do booking tools and integrations cost extra?",
    answer:
      "Yes, as fixed-price add-ons — we recommend the right tool for your industry (e.g. Fresha for salons, ResDiary for restaurants, Klaviyo for ecommerce) then set it up and test it. Software subscriptions stay in your name and are paid to each vendor. See the Add-ons & integrations section on Pricing and the Integrations page for how this works.",
  },
  {
    id: "8",
    question: "Do I need to pay for hosting and a domain separately?",
    answer:
      "Domain registration is separate — typically $25–50 NZD/year for .co.nz (I'll help you set it up). For hosting: if you're on a care plan, it's bundled in. If you manage it yourself, expect $10–30 NZD/month. If we build on Webflow, hosting is paid directly to Webflow (from $18 USD/month) — I don't mark that up.",
  },
  {
    id: "9",
    question: "What's the difference between a custom build and Webflow?",
    answer:
      "Custom (React/Next.js) gives you maximum performance and flexibility — you own the code, host it anywhere, and there are no platform fees. Webflow is great if you want to drag-and-drop edit your own pages after launch without touching code. The build cost is the same; the difference is ongoing hosting: self-managed hosting from $10–30/month vs. Webflow hosting from $18 USD/month paid directly to Webflow.",
  },
  {
    id: "10",
    question: "What areas do you serve?",
    answer:
      "I work with businesses across New Zealand — from main centres to regional towns. Discovery, builds, and handover are remote-friendly (video, phone, email). I'm based in Christchurch for NZ business hours and timezone.",
  },
  {
    id: "11",
    question: "What's included in the care plans?",
    answer:
      "Standard sites: Basic Care ($99/month) — hosting, uptime monitoring, 30 minutes of updates. Growth Care ($199/month) — everything in Basic + 1 hour of updates, monthly analytics report, SEO health check. Premium Care ($349/month) — everything in Growth + 2 hours of work, monthly strategy call, SEO reporting. Shopify: Commerce Light ($229/month), Commerce Growth ($329/month), Commerce Premium ($479/month) — theme tweaks, catalogue help, and troubleshooting; your Shopify plan is still paid to Shopify. See Pricing for the full lists.",
  },
  {
    id: "12",
    question: "Does the website fee include a marketing campaign or guaranteed leads?",
    answer:
      "No. The build covers the site, handover, and what’s listed for your tier — including basic SEO on every plan. Higher tiers add more depth (structure, tracking, training, revisions). Ongoing marketing, paid ads, SEO retainers, and lead volume guarantees are separate unless we agree that in writing. I’m not promising revenue from a fixed build scope — I’m aligning the site so the next step is obvious and easier to measure.",
  },
]
