/**
 * Site configuration — single source of truth for all business content.
 * Update this file to change copy, pricing, contact info, etc.
 * Components read from here so you only ever change things in one place.
 */

export const siteConfig = {
  // ─── Business Identity ───────────────────────────────────────────────────────
  name: "NZ Web Studio",
  tagline: "Websites That Bring In Customers",
  description:
    "Custom websites for Christchurch small businesses. Built by a marketer, not just a designer. Websites from $1,499 NZD for a 3-page site.",

  /** Hero H1 — lines after “Websites that …” (rotate; keep sentence case) */
  heroRotatingPhrases: [
    "win customers.",
    "convert clicks into calls.",
    "look as credible as you are.",
    "fill your enquiry form.",
    "show up in local search.",
  ],
  url: "https://nzwebstudio.co.nz", // update once domain is live
  locale: "en-NZ",

  // ─── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    email: "hello@nzwebstudio.co.nz",
    phone: "+64 21 000 0000", // update
    location: "Christchurch, New Zealand",
    calendarUrl: "https://cal.com/your-link", // Calendly / Cal.com link
  },

  // ─── Packages ────────────────────────────────────────────────────────────────
  packages: [
    {
      id: "starter",
      name: "Starter",
      price: 1499,
      currency: "NZD",
      gstExclusive: true,
      tagline: "Get online fast",
      deliveryDays: "2 weeks",
      pages: "3 pages",
      popular: false,
      features: [
        "Home, About & Contact pages",
        "Mobile-responsive design",
        "Basic SEO setup",
        "Contact form",
        "One revision round",
        "Google Analytics setup",
      ],
      paymentTerms: "100% upfront",
      cta: "Get Started",
    },
    {
      id: "standard",
      name: "Standard",
      price: 2500,
      currency: "NZD",
      gstExclusive: true,
      tagline: "The smart choice for growing businesses",
      deliveryDays: "2–3 weeks",
      pages: "5–7 pages",
      popular: true, // highlighted as Most Popular
      features: [
        "Up to 7 custom pages",
        "Blog or portfolio CMS",
        "Comprehensive SEO setup",
        "Google Search Console",
        "Conversion tracking",
        "Two revision rounds",
        "30-minute training session",
        "3 months Growth Care included",
      ],
      paymentTerms: "50% upfront, 50% on delivery",
      cta: "Get Started",
    },
    {
      id: "premium",
      name: "Premium",
      price: 4500,
      currency: "NZD",
      gstExclusive: true,
      tagline: "Full-service for ambitious businesses",
      deliveryDays: "3–4 weeks",
      pages: "8–12 pages",
      popular: false,
      features: [
        "Up to 12 fully custom pages",
        "Animations & micro-interactions",
        "Full CMS architecture",
        "Copywriting assistance",
        "Three revision rounds",
        "60-minute training session",
        "3 months Growth Care included",
        "Mini marketing audit",
      ],
      paymentTerms: "50% to book · 25% at design approval · 25% before launch",
      cta: "Get Started",
    },
  ],

  // ─── Care Plans (Retainers) ───────────────────────────────────────────────────
  carePlans: [
    {
      id: "basic-care",
      name: "Basic Care",
      price: 99,
      currency: "NZD",
      period: "month",
      features: [
        "Hosting & uptime monitoring",
        "30 minutes of updates/month",
        "Priority email support",
      ],
    },
    {
      id: "growth-care",
      name: "Growth Care",
      price: 199,
      currency: "NZD",
      period: "month",
      popular: true,
      features: [
        "Everything in Basic Care",
        "1 hour of updates/month",
        "Monthly analytics report",
        "SEO health check",
      ],
    },
    {
      id: "premium-care",
      name: "Premium Care",
      price: 349,
      currency: "NZD",
      period: "month",
      features: [
        "Everything in Growth Care",
        "2 hours of work/month",
        "Monthly strategy call",
        "SEO reporting & recommendations",
      ],
    },
  ],

  // ─── Social Links ─────────────────────────────────────────────────────────────
  social: {
    linkedin: "https://linkedin.com/in/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    facebook: "https://facebook.com/yourpage",
  },

  // ─── Navigation ──────────────────────────────────────────────────────────────
  nav: [
    { label: "Work", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],

  // ─── Target niches (for niche-specific copy) ─────────────────────────────────
  niches: ["Tradies", "Cafés & Hospitality", "Health Practitioners", "Professional Services"],
} as const;

export type Package = (typeof siteConfig.packages)[number];
export type CarePlan = (typeof siteConfig.carePlans)[number];
