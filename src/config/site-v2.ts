/**
 * Scalr v2 — copy + stats for the Craftwork-built redesign at /v2.
 * Single source of truth for everything the v2 page says. No pricing here by design:
 * v2 sells skills and outcomes; scope and cost are worked out on a call.
 *
 * Stats: every figure carries its source. Re-check them before launch and when
 * the next edition of each survey ships.
 */
import { siteConfig } from "@/config/site"

export const v2 = {
  contact: siteConfig.contact,
  social: siteConfig.social,
  business: siteConfig.business,

  nav: [
    { label: "Services", href: "#services" },
    { label: "Redesigns", href: "#redesigns" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    kicker: "Web design & build · Ōtautahi Christchurch · NZ-wide",
    headline: "Your next customer is checking your website right now.",
    lead:
      "I design and build websites for New Zealand cafés, tradies, salons, clinics and local shops — written by a marketer, built to load fast, and set up so people can book, call or buy without hunting for how.",
    primaryCta: { label: "Start your project", href: "#contact" },
    secondaryCta: { label: "See what I do", href: "#services" },
    proof: [
      "6+ years in digital marketing",
      "NZBN-registered sole trader",
      "Reply within one NZ business day",
    ],
  },

  niches: [
    "Cafés & bakeries",
    "Barbers & salons",
    "Tradies & contractors",
    "Retail & Shopify stores",
    "Clinics & wellness",
    "Restaurants & bars",
    "Professional services",
    "New local businesses",
  ],

  stats: {
    kicker: "Why it matters in 2026",
    title: "People still decide on your website. More of them are getting there through AI.",
    items: [
      {
        value: 47,
        suffix: "%",
        label: "of NZ businesses surveyed still run without their own website.",
        source: "InternetNZ .nz research, 2025 (750 businesses)",
        href: "https://internetnz.nz/dotnz-research/2025-nz-consumers-and-businesses-research/",
      },
      {
        value: 97,
        suffix: "%",
        label: "of consumers read reviews when choosing a local business.",
        source: "BrightLocal Local Consumer Review Survey, 2026",
        href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
      },
      {
        value: 45,
        suffix: "%",
        label: "now ask ChatGPT or other AI tools for local recommendations — up from 6% a year earlier.",
        source: "BrightLocal Local Consumer Review Survey, 2026",
        href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
      },
      {
        value: 32,
        prefix: "+",
        suffix: "%",
        label: "higher chance a mobile visitor leaves when load time goes from 1 to 3 seconds.",
        source: "Google / SOASTA mobile page-speed research",
        href: "https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/",
      },
    ],
    footnote:
      "A site that's fast, clear and structured for search — and for the AI tools that now read it — is how you stay on the shortlist.",
  },

  services: {
    kicker: "What I do",
    title: "One person, the whole job — strategy, words, design, build and the tools behind it.",
    lead:
      "You deal with the person doing the work. No account managers, no hand-offs, no template you'll see on three other businesses down the road.",
    items: {
      websites: {
        title: "Websites & redesigns",
        body:
          "Custom builds in Next.js or Webflow, structured around the one thing you want visitors to do — book, call, enquire or visit.",
        checklist: [
          { label: "Goals & audience agreed", done: true },
          { label: "Copy written for skimmers", done: true },
          { label: "Mockup approved", done: true },
          { label: "Fast on a 4G phone", done: true },
          { label: "Live & tracked" },
        ],
      },
      shopify: {
        title: "Shopify stores",
        body:
          "Branded stores with NZ shipping, GST and payments set up properly — and a catalogue you can manage yourself after launch.",
      },
      seo: {
        title: "Local SEO & AI visibility",
        body:
          "Google Business Profile, Search Console, schema and clean page structure, so search engines and AI assistants can understand and recommend you.",
      },
      integrations: {
        title: "Integrations that save you admin",
        body:
          "I pick the right tool for your trade and wire it into your site: bookings, email and CRM, reviews, online ordering, accounting. You keep the accounts; I handle setup and testing.",
        tools: ["Fresha", "Timely", "Cliniko", "Klaviyo", "Mailchimp", "HubSpot", "Xero", "Google Reviews", "ResDiary", "Starshipit"],
      },
      analytics: {
        title: "Analytics you can actually read",
        body:
          "GA4 and Search Console with the events that matter — calls, form fills, bookings and sales — plus a plain-English handover.",
      },
      care: {
        title: "Care after launch",
        body:
          "Updates, fixes, speed and SEO health checks, and small improvements based on what the data says. Your site keeps getting better instead of going stale.",
      },
    },
  },

  redesign: {
    kicker: "Redesigns",
    title: "Same business. Clearer site. More enquiries.",
    lead:
      "Most redesigns aren't about a new colour scheme. They're about cutting the clutter so a visitor on their phone knows what you do, trusts you, and can act in a few seconds.",
    points: [
      { title: "One clear next step", body: "Book, call or get a quote — up top and repeated where people decide." },
      { title: "Copy for skimmers", body: "Short sections and plain language that answer the questions people actually ask." },
      { title: "Trust up front", body: "Reviews, real photos and credentials where they do the most work." },
      { title: "Fast everywhere", body: "Lean pages that load quickly on a phone in a car park with one bar of signal." },
    ],
  },

  process: {
    kicker: "How it works",
    title: "Weeks, not months. No surprises along the way.",
    steps: [
      {
        title: "Goals before pixels",
        body: "A short call to agree your audience, your offer and the one action you want visitors to take. You get a written scope before any work starts.",
      },
      {
        title: "Mockup, then build",
        body: "You see the direction first. Once you're happy, I build the full site, with your feedback built into each stage.",
      },
      {
        title: "Launch & measure",
        body: "Domain, SEO foundations, analytics and integrations are tested end to end. You get a handover so you're never locked out.",
      },
      {
        title: "Keep improving",
        body: "Optional ongoing care: updates, health checks and small changes guided by what your visitors actually do.",
      },
    ],
  },

  about: {
    kicker: "About",
    title: "Hi, I'm Karan. Marketer first, builder second.",
    body: [
      "I spent six-plus years in digital marketing — campaigns, landing pages, analytics — before I started building websites full time. That's why my sites start with what makes people buy, not with a template.",
      "Scalr is a one-person studio based in Ōtautahi Christchurch, working with businesses right across Aotearoa. You talk to me from the first call to launch day, and after.",
    ],
    credentials: [
      { label: "Experience", value: "6+ years", detail: "Digital marketing & web delivery" },
      { label: "Based in", value: "Christchurch", detail: "Working NZ-wide, remote-friendly" },
      { label: "Verified", value: "NZBN registered", detail: "Sole trader on the public register" },
    ],
    principles: {
      dos: [
        "Clear goals and a written scope before design starts",
        "Plain-English updates and decisions you can follow",
        "You own your site, domain and accounts",
      ],
      donts: [
        "Cookie-cutter templates that look like everyone else",
        "Jargon, lock-in or surprise invoices",
        "Launch-and-disappear",
      ],
    },
  },

  faq: [
    {
      q: "Will I own my website when it's done?",
      a: "Yes. Once the project is complete, the site, the domain and every account it runs on are yours. I'll make sure you have logins for everything.",
    },
    {
      q: "How much does a website cost?",
      a: "It depends on what you need — a single landing page and a Shopify store with integrations are very different jobs. After a short call I send a fixed, written quote, so you know the full cost before anything starts.",
    },
    {
      q: "How long does it take?",
      a: "Most sites go live in one to six weeks depending on size. The biggest factor is how quickly content and feedback come through — I'll give you a clear timeline in your quote.",
    },
    {
      q: "Do I need to write the content myself?",
      a: "No. I can write or tidy your copy as part of the project — it's where my marketing background helps most. You'll just need to check it's accurate and sounds like you.",
    },
    {
      q: "Which platform will you build on?",
      a: "Custom Next.js for speed and flexibility, Webflow if you want to edit pages visually, or Shopify for online stores. I'll recommend whichever fits how you'll run the site day to day.",
    },
    {
      q: "Can you connect my booking or email tools?",
      a: "Yes — Fresha, Timely, Cliniko, ResDiary, Mailchimp, Klaviyo, HubSpot, Xero and more. Subscriptions stay in your name; I handle the setup and testing.",
    },
    {
      q: "Do you only work with Christchurch businesses?",
      a: "No. I'm based in Christchurch but work with businesses across New Zealand over video calls, email and phone.",
    },
    {
      q: "What happens after launch?",
      a: "You get a handover so you can make everyday changes yourself. If you'd rather not, ongoing care covers updates, fixes, health checks and small improvements.",
    },
  ],

  cta: {
    kicker: "Let's talk",
    title: "Tell me about your business.",
    lead:
      "A 20-minute call is enough to work out what you need and whether I'm the right fit. No pressure, no jargon — and a written scope and quote if we go ahead.",
    primary: { label: "Email Karan", href: `mailto:${siteConfig.contact.email}?subject=New%20website%20enquiry` },
    secondary: { label: "Fill in a project brief", href: "/#contact" },
    note: "I reply within one New Zealand business day.",
  },
} as const
