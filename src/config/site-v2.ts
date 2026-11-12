/**
 * Scalr v2 — agency positioning. Three services only:
 *   1. Webflow design & development
 *   2. Google Ads management
 *   3. Email templates & marketing
 * Single source of truth for everything the /v2 page says. No pricing by design.
 *
 * Benchmarks: every figure carries its source. Re-check before launch and when
 * each report's next edition ships.
 */
import { siteConfig } from "@/config/site"

export const v2 = {
  contact: siteConfig.contact,
  social: siteConfig.social,
  business: siteConfig.business,

  nav: [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#system" },
    { label: "Approach", href: "#approach" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    kicker: "Webflow & Google Ads agency · New Zealand",
    // Rendered as: "Paid traffic that lands," / "converts" (annotated) / "and comes back."
    headlineStart: "Paid traffic that lands,",
    headlineMark: "converts",
    headlineEnd: "and comes back.",
    lead:
      "Scalr builds high-converting Webflow sites, runs Google Ads that pay for themselves, and designs the emails that turn one-off visitors into repeat customers — one team, one strategy, one set of numbers.",
    primaryCta: { label: "Book a strategy call", href: "#contact" },
    secondaryCta: { label: "Explore services", href: "#services" },
    trust: ["Founder-led", "Christchurch-based, NZ-wide", "Month-to-month ads management"],
  },

  platforms: [
    "Webflow",
    "Google Ads",
    "Google Analytics 4",
    "Google Tag Manager",
    "Looker Studio",
    "Klaviyo",
    "Mailchimp",
    "HubSpot",
    "Search Console",
  ],

  services: {
    kicker: "Services",
    title: "Three disciplines. One growth system.",
    lead:
      "We don't do everything. We do the three things that move the needle for service businesses and online brands — and we make them work together.",
    items: [
      {
        id: "webflow",
        number: "01",
        name: "Webflow design & development",
        short: "Webflow",
        summary:
          "Fast, flexible Webflow sites and campaign landing pages, designed to convert and easy for your team to update.",
        deliverables: [
          "Conversion-led UX, copy and design",
          "Custom Webflow build with CMS",
          "Campaign landing pages that match your ads",
          "Migrations from WordPress, Wix and Squarespace",
          "Speed, SEO and tracking set up from day one",
          "Editor training so you're never stuck",
        ],
        outcome: "A site your ads can rely on — and your team can actually edit.",
      },
      {
        id: "google-ads",
        number: "02",
        name: "Google Ads management",
        short: "Google Ads",
        summary:
          "Search and Performance Max campaigns built around profit, with tracking you can trust and reporting you can read.",
        deliverables: [
          "Account audit and keyword research",
          "Search, Performance Max and remarketing campaigns",
          "GA4, Tag Manager and enhanced conversions",
          "Ad copy and landing-page testing",
          "Weekly optimisation, monthly reporting",
          "Clear cost-per-lead and return-on-ad-spend targets",
        ],
        outcome: "Every dollar tracked to a lead, a booking or a sale.",
      },
      {
        id: "email",
        number: "03",
        name: "Email templates & marketing",
        short: "Email",
        summary:
          "On-brand email templates and automated flows that follow up while you sleep — in Klaviyo, Mailchimp or HubSpot.",
        deliverables: [
          "Custom, responsive email templates",
          "Welcome, follow-up and abandoned-cart flows",
          "Campaign and newsletter design",
          "Lead capture wired from your site and ads",
          "List segmentation and deliverability checks",
          "Performance reporting tied to revenue",
        ],
        outcome: "More value from every lead you've already paid for.",
      },
    ],
  },

  system: {
    kicker: "How it works",
    title: "Ads bring the click. Webflow wins it. Email brings them back.",
    lead:
      "Most businesses hire three different suppliers for this and wonder why the numbers never line up. We run it as one funnel, so every change is measured end to end.",
    steps: [
      { label: "Search", detail: "Google Ads" },
      { label: "Click", detail: "Matched message" },
      { label: "Land", detail: "Webflow page" },
      { label: "Convert", detail: "Lead or sale" },
      { label: "Nurture", detail: "Email flows" },
    ],
  },

  benchmarks: {
    kicker: "The bar we work against",
    title: "Industry averages are the floor, not the goal.",
    items: [
      {
        value: 8.18,
        decimals: 2,
        suffix: "%",
        label: "Average Google Ads conversion rate across industries.",
        source: "LocaliQ / WordStream Google Ads Benchmarks 2026",
        href: "https://localiq.com/blog/search-advertising-benchmarks/",
      },
      {
        value: 66.69,
        decimals: 2,
        prefix: "US$",
        label: "Average cost per lead from search ads.",
        source: "LocaliQ / WordStream Google Ads Benchmarks 2026",
        href: "https://localiq.com/blog/search-advertising-benchmarks/",
      },
      {
        value: 6.6,
        decimals: 1,
        suffix: "%",
        label: "Median landing page conversion rate.",
        source: "Unbounce Conversion Benchmark Report",
        href: "https://unbounce.com/conversion-benchmark-report/",
      },
      {
        value: 36,
        decimals: 0,
        prefix: "$",
        label: "Average return for every $1 spent on email marketing.",
        source: "Litmus, State of Email",
        href: "https://www.litmus.com/resources/email-marketing-roi",
      },
    ],
    footnote:
      "Benchmarks are mostly US data and vary widely by industry. We set your targets from your own numbers in the first month.",
  },

  approach: {
    kicker: "Approach",
    title: "A clear process, from audit to compounding results.",
    steps: [
      {
        title: "Audit & strategy",
        timing: "Week 1",
        body: "We review your site, ad account, tracking and email setup, then agree goals, targets and a 90-day plan.",
      },
      {
        title: "Build & set up",
        timing: "Weeks 2–5",
        body: "Webflow pages, campaigns, conversion tracking and email templates are designed, built and tested together.",
      },
      {
        title: "Launch",
        timing: "Week 6",
        body: "Campaigns go live with landing pages and follow-up flows already in place — no leaks between the steps.",
      },
      {
        title: "Optimise monthly",
        timing: "Ongoing",
        body: "Weekly ad optimisation, landing-page tests and monthly reporting, all tied to cost per lead and revenue.",
      },
    ],
  },

  compare: {
    kicker: "Why Scalr",
    title: "Specialists, not a generalist agency.",
    columns: ["Scalr", "Typical agency", "Doing it yourself"],
    rows: [
      { label: "Ads, website and email planned together", values: [true, "Rarely", false] },
      { label: "You work with the founder, not an account manager", values: [true, "Rarely", "—"] },
      { label: "Conversion tracking set up and checked", values: [true, "Sometimes", "Often missed"] },
      { label: "You own every account and asset", values: [true, "Sometimes", true] },
      { label: "Month-to-month ads management", values: [true, "Often 6–12 month terms", "—"] },
      { label: "Your time each week", values: ["A quick check-in", "Meetings & briefs", "Hours of learning"] },
    ],
  },

  founder: {
    name: "Karan",
    role: "Founder, Scalr",
    quote:
      "I started Scalr after years in digital marketing watching good ad budgets land on slow, confusing websites. We fix the whole path — the ad, the page and the follow-up — and we measure it like it's our own money.",
    credentials: ["6+ years in digital marketing", "NZBN-registered business", "Based in Ōtautahi Christchurch"],
  },

  faq: [
    {
      q: "Do you only work with Webflow?",
      a: "For websites, yes. We specialise in Webflow because it's fast, secure and easy for your team to edit — ideal for landing pages that need to change with your campaigns. If you're on another platform, we can migrate you.",
    },
    {
      q: "Can you take over our existing Google Ads account?",
      a: "Yes. We start with an audit of your account and tracking, fix what's leaking budget, then rebuild or restructure campaigns as needed. You keep full ownership of the account throughout.",
    },
    {
      q: "Do I need all three services?",
      a: "No. Plenty of clients start with one — often Google Ads or a Webflow build. They work best together, so we'll show you where the gaps are, but you choose what we take on.",
    },
    {
      q: "How much does it cost?",
      a: "Webflow builds and email template projects are quoted as fixed projects. Google Ads management is a monthly fee, separate from your ad spend. After a strategy call you'll get a written proposal with exact numbers.",
    },
    {
      q: "Is there a lock-in contract?",
      a: "No. Ads management is month to month after the initial setup. We'd rather keep you with results than with paperwork.",
    },
    {
      q: "Which email platforms do you work with?",
      a: "Mostly Klaviyo, Mailchimp and HubSpot. We design templates that work across inboxes and devices, and set up automated flows on the platform you already use.",
    },
    {
      q: "How do you report on results?",
      a: "A live dashboard plus a monthly summary in plain English: what we spent, what it brought in, what we changed and what's next.",
    },
    {
      q: "Do you work outside Christchurch?",
      a: "Yes — we work with businesses across New Zealand, with calls over video and phone.",
    },
  ],

  cta: {
    kicker: "Let's talk",
    title: "Get a free audit of your ads, site and email.",
    lead:
      "Book a 30-minute strategy call. We'll look at where your traffic comes from, where it drops off, and what we'd fix first — whether or not you work with us.",
    primary: {
      label: "Book a strategy call",
      href: `mailto:${siteConfig.contact.email}?subject=Strategy%20call%20%E2%80%94%20Scalr`,
    },
    secondary: { label: "Email us", href: `mailto:${siteConfig.contact.email}` },
    note: "We reply within one New Zealand business day.",
  },
} as const

export type V2Service = (typeof v2.services.items)[number]
