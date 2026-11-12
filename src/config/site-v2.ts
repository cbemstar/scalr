/**
 * Scalr v2 — agency positioning. Three services only:
 *   1. Webflow design & development
 *   2. Google Ads management
 *   3. Email templates & marketing
 *
 * The page is written as a conversion journey (see src/app/v2/page.tsx for the
 * section-by-section rationale): promise → problem → stakes → guide & solution →
 * offer → plan → proof → risk reversal → objections → final ask.
 *
 * Copy rules: no promised results (no "ads that pay for themselves"), no features
 * we don't offer, one CTA wording everywhere ("Book a free strategy call").
 * Benchmarks carry their source; re-check before launch.
 */
import { siteConfig } from "@/config/site"

const CTA_LABEL = "Book a free strategy call"
const CTA_HREF = "#contact"

export const v2 = {
  contact: siteConfig.contact,
  social: siteConfig.social,
  business: siteConfig.business,
  cta: { label: CTA_LABEL, href: CTA_HREF },

  nav: [
    { label: "The problem", href: "#problem" },
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#plan" },
    { label: "FAQ", href: "#faq" },
  ],

  /** 1 — Hero: who it's for, the outcome they want, one action. */
  hero: {
    kicker: "Webflow & Google Ads agency · New Zealand",
    headlineStart: "Get more enquiries from the traffic",
    headlineMark: "you're already",
    headlineEnd: "paying for.",
    lead:
      "Scalr plans your Google Ads, builds the Webflow pages they land on and writes the emails that follow up — so every step from click to customer works together.",
    secondary: { label: "See how it works", href: "#problem" },
    reassurance: ["Founder-led", "No lock-in contracts", "You own every account"],
    path: ["Google Ads", "Webflow page", "Email follow-up"],
  },

  /** 2 — Problem: name the pains in the visitor's own words. */
  problem: {
    kicker: "Sound familiar?",
    title: "Most businesses don't have a traffic problem. They have a leak.",
    items: [
      {
        tag: "Google Ads",
        title: "You're paying for clicks, but the phone isn't ringing.",
        body: "Budget goes out every day. It's hard to tell which keywords bring real enquiries and which just burn money.",
      },
      {
        tag: "Website",
        title: "People land on your site, then leave without a word.",
        body: "The page is slow, generic or unclear about what to do next — so visitors you paid for go back to Google.",
      },
      {
        tag: "Email",
        title: "Leads come in, then go quiet.",
        body: "There's no follow-up, or it's a one-off reply. The people who were interested drift to whoever got back to them first.",
      },
    ],
  },

  /** 3 — Stakes: make the cost of the leak concrete, with sourced numbers. */
  stakes: {
    kicker: "What it costs",
    title: "On average, 92 of every 100 paid clicks leave without converting.",
    lead:
      "That's what an 8.18% conversion rate looks like. Each step that leaks — the ad, the page, the follow-up — multiplies the waste. Fixing one in isolation rarely fixes the result.",
    benchmarks: [
      {
        value: 8.18,
        decimals: 2,
        suffix: "%",
        label: "average Google Ads conversion rate",
        source: "LocaliQ / WordStream, 2026",
        href: "https://localiq.com/blog/search-advertising-benchmarks/",
      },
      {
        value: 66.69,
        decimals: 2,
        prefix: "US$",
        label: "average cost per lead from search ads",
        source: "LocaliQ / WordStream, 2026",
        href: "https://localiq.com/blog/search-advertising-benchmarks/",
      },
      {
        value: 36,
        decimals: 0,
        prefix: "$",
        label: "average return per $1 spent on email",
        source: "Litmus, State of Email",
        href: "https://www.litmus.com/resources/email-marketing-roi",
      },
    ],
    footnote: "Industry averages, mostly US data. Your numbers will differ — we start by measuring them.",
  },

  /** 4 — Guide & solution: empathy + one joined-up approach. */
  solution: {
    kicker: "The fix",
    title: "One team looking after the whole journey.",
    lead:
      "Most businesses hire one supplier for ads, another for the website and nobody for follow-up — then wonder why the numbers never line up. We plan all three together, so the message in your ad matches the page, and the page hands every lead to an email sequence.",
    steps: [
      { label: "Search", detail: "Someone looks for what you do" },
      { label: "Ad", detail: "A message that matches their search" },
      { label: "Page", detail: "A Webflow page built for that ad" },
      { label: "Enquiry", detail: "One clear next step" },
      { label: "Follow-up", detail: "Emails that keep you front of mind" },
    ],
  },

  /** 5 — Offer: the three services, scannable. */
  services: {
    kicker: "Services",
    title: "Three services. Planned together, or one at a time.",
    items: [
      {
        id: "google-ads",
        number: "01",
        name: "Google Ads management",
        short: "Google Ads",
        summary: "Search and Performance Max campaigns built around your cost-per-lead goals.",
        deliverables: [
          "Account audit and keyword research",
          "Campaign build and ad copy",
          "Conversion tracking with GA4 and Tag Manager",
          "Ongoing optimisation and a monthly report",
        ],
      },
      {
        id: "webflow",
        number: "02",
        name: "Webflow design & development",
        short: "Webflow",
        summary: "Fast Webflow sites and campaign landing pages that make the next step obvious.",
        deliverables: [
          "Conversion-focused copy, UX and design",
          "Custom Webflow build with CMS",
          "Landing pages matched to your ads",
          "Training so your team can edit with confidence",
        ],
      },
      {
        id: "email",
        number: "03",
        name: "Email templates & marketing",
        short: "Email",
        summary: "On-brand templates and automated follow-up in Klaviyo, Mailchimp or HubSpot.",
        deliverables: [
          "Custom, responsive email templates",
          "Welcome and follow-up sequences",
          "Newsletter and campaign design",
          "Sign-up forms wired to your site and ads",
        ],
      },
    ],
    tools: ["Webflow", "Google Ads", "Google Analytics 4", "Tag Manager", "Klaviyo", "Mailchimp", "HubSpot"],
  },

  /** 6 — Plan: three steps that remove the fear of starting. */
  plan: {
    kicker: "How it works",
    title: "Getting started is simple.",
    steps: [
      {
        title: "Book a free strategy call",
        body: "30 minutes on video. We look at your ads, website and follow-up together and find where enquiries are being lost.",
      },
      {
        title: "Get a clear, written plan",
        body: "You receive a plan with priorities, timelines and a fixed quote. No obligation, and no jargon.",
      },
      {
        title: "We build, launch and improve",
        body: "We set everything up, launch, then keep refining based on what your results show — with a plain-English report each month.",
      },
    ],
  },

  /** 7 — Proof & authority: why us, honestly. */
  compare: {
    kicker: "Why Scalr",
    title: "Specialists in three things, not a generalist agency.",
    columns: ["Scalr", "Typical agency", "Doing it yourself"],
    rows: [
      { label: "Ads, website and email planned together", values: [true, "Rarely", false] },
      { label: "You work directly with the founder", values: [true, "Rarely", "—"] },
      { label: "Conversion tracking set up and checked", values: [true, "Sometimes", "Often missed"] },
      { label: "You own every account and asset", values: [true, "Sometimes", true] },
      { label: "Month-to-month ads management", values: [true, "Often 6–12 month terms", "—"] },
    ],
  },

  founder: {
    name: "Karan",
    role: "Founder, Scalr",
    quote:
      "I started Scalr after years in digital marketing watching good ad budgets land on slow, confusing pages with no follow-up. We look after the whole path — the ad, the page and the emails after — and we treat your budget like it's our own.",
    credentials: ["6+ years in digital marketing", "NZBN-registered business", "Based in Ōtautahi Christchurch"],
  },

  /** 8 — Risk reversal: what they can count on. */
  assurances: [
    { title: "No lock-in contracts", body: "Ads management is month to month after setup." },
    { title: "You own everything", body: "Ad accounts, website, email lists and data stay in your name." },
    { title: "Fixed quotes for projects", body: "Websites and email templates are quoted up front, in writing." },
    { title: "Plain-English reporting", body: "A monthly summary of what we spent, what it brought in and what's next." },
  ],

  /** 9 — Objections. */
  faq: [
    {
      q: "Can you guarantee results from Google Ads?",
      a: "No one honestly can — results depend on your market, offer and budget. What we can promise is a properly tracked setup, regular optimisation and clear reporting, so you always know what your spend is doing.",
    },
    {
      q: "Do I need all three services?",
      a: "No. Many clients start with one — often Google Ads or a Webflow landing page. They work best together, so we'll show you where the gaps are, but you choose what we take on.",
    },
    {
      q: "Can you take over our existing Google Ads account?",
      a: "Yes. We start with an audit, fix what's wasting budget, then restructure campaigns as needed. You keep full ownership of the account throughout.",
    },
    {
      q: "Why Webflow?",
      a: "Webflow sites are fast, secure and easy for your team to update — ideal for landing pages that need to change with your campaigns. If you're on another platform, we can migrate you.",
    },
    {
      q: "How much does it cost?",
      a: "Webflow builds and email templates are fixed-price projects. Google Ads management is a monthly fee, separate from your ad spend. After the strategy call you'll get a written quote with exact numbers.",
    },
    {
      q: "Which email platforms do you use?",
      a: "Mostly Klaviyo, Mailchimp and HubSpot. We work on the platform you already have, or help you choose one.",
    },
    {
      q: "Do you work outside Christchurch?",
      a: "Yes — we work with businesses across New Zealand over video and phone.",
    },
  ],

  /** 10 — Final ask: restate the outcome, say exactly what happens next. */
  final: {
    kicker: "Next step",
    title: "Find out where your enquiries are leaking.",
    lead: "In a free 30-minute call we'll look at your ads, website and follow-up together — whether or not you work with us.",
    next: [
      "We review your ads, landing pages and emails",
      "You get the three changes we'd make first",
      "If it's a fit, a written plan and fixed quote follow",
    ],
    note: "We reply within one New Zealand business day.",
  },
} as const

export type V2Service = (typeof v2.services.items)[number]
