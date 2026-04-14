/**
 * Site configuration — single source of truth for all business content.
 * Update this file to change copy, pricing, contact info, etc.
 * Components read from here so you only ever change things in one place.
 */

export const siteConfig = {
  // ─── Business Identity ───────────────────────────────────────────────────────
  name: "Scalr",
  tagline: "Websites That Bring In Customers",
  description:
    "Affordable standard sites and Shopify ecommerce for cafés, tradies, barbers, and local shops in Christchurch. Standard sites from $999 NZD; Shopify builds from $6,499 NZD. Built by a marketer, not a big agency.",

  /** Hero kicker (single line) */
  heroKicker: "Redesigns & new builds",

  /**
   * Stat in hero — InternetNZ/Yabble 2025 (.nz consumers and businesses research).
   * @see https://internetnz.nz/dotnz-research/2025-nz-consumers-and-businesses-research/
   */
  /** Citation link shared by pricing + trust section */
  heroStat: {
    url: "https://internetnz.nz/dotnz-research/2025-nz-consumers-and-businesses-research/",
    linkLabel: "InternetNZ (2025)",
    titleAttr:
      "2025 .nz consumers and businesses research — Yabble survey of 750 NZ businesses, commissioned by InternetNZ",
  },

  /**
   * Trust / research strip (below hero) — InternetNZ/Yabble 2025 findings.
   * @see https://internetnz.nz/dotnz-research/2025-nz-consumers-and-businesses-research/
   */
  trustSection: {
    kicker: "NZ reality check",
    title: "Customers decide on trust first",
    lead: "National research — not a sales pitch.",
    primaryBeforeLink:
      "Most people still use a website to decide if you're trustworthy — yet nearly half of NZ businesses don't have one, according to ",
    primaryAfterLink:
      ". Clear packages so getting online isn't a guessing game.",
    supporting: [
      {
        eyebrow: "Sole traders",
        headline: "4 in 10",
        body: "have a website — many small operators are still only on socials or the phone book.",
      },
      {
        eyebrow: "Consumers",
        headline: "3 in 4",
        body: "say a website is the most important way to engage with a business — ahead of social or email.",
      },
    ],
    attributionName: "InternetNZ · Yabble",
    attributionDetail: "750 NZ businesses · Aug 2025",
  },

  /** Hero H1 — lines after “Websites that …” (rotate; keep sentence case) */
  heroRotatingPhrases: [
    "book more jobs.",
    "fill your chairs.",
    "look legit online.",
    "get found locally.",
    "fit a tight budget.",
  ],

  /**
   * Full-bleed "crisp" hero — calm post-load layout, stronger hierarchy, and only
   * a few deliberate actions above the fold.
   * Replace `slideshow[].src` with `/images/your-file.webp` when you add brand photography to `public/`.
   */
  heroCrisp: {
    /** Short line — differentiation (conversion-minded, not “agency”) */
    kicker: "Marketer-led builds",
    /** Aligns with site tagline; answers “what do I get?” for local SMB search intent */
    headline: "Websites that bring in customers",
    lead:
      "New sites and redesigns for cafés, tradies, barbers, and local shops. Standard packages from $999 NZD; Shopify ecommerce from $6,499 NZD — everything is on the Pricing section.",
    /** One scannable trust line instead of chips — saves vertical space in the hero card */
    trustLine:
      "From $999 NZD (standard sites) · Shopify from $6,499 NZD · about 1–6 weeks by package · goals before pixels",
    note: "Clear reply within 24 hours. No pressure.",
    /**
     * Verified 200 from images.unsplash.com. The first image is the settled hero
     * background after the intro animation completes.
     */
    slideshow: [
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
        alt: "Laptop on a desk with analytics and charts — website performance and business growth.",
        scene: "Your project",
      },
      {
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
        alt: "Busy restaurant interior with warm lighting — hospitality and cafes.",
        scene: "Cafes & bakeries",
      },
      {
        src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80",
        alt: "Construction worker in high-vis and hard hat on a building site.",
        scene: "Tradies & contractors",
      },
      {
        src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1920&q=80",
        alt: "Barber chairs and mirrors in a clean barbershop.",
        scene: "Barbers & salons",
      },
      {
        src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
        alt: "Clothing retail shelves — local shops and e-commerce.",
        scene: "Shops & startups",
      },
    ] as const,
    ctaPrimary: {
      label: "Compare plans",
      href: "/#pricing",
      magneticId: "hero-cta-pricing",
    },
    ctaSecondary: {
      label: "Get in touch",
      href: "/#contact",
      magneticId: "hero-cta-contact",
    },
    utilityLinks: [
      { label: "See Recent Work", href: "/#portfolio" },
      { label: "Email Us", href: "mailto:karan@scalr.co.nz" },
    ] as const,
  },

  url: "https://scalr.nz", // update once domain is live
  locale: "en-NZ",

  // ─── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    email: "karan@scalr.co.nz",
    phone: "+64 28 851 30071",
    location: "Christchurch, New Zealand",
  },

  // ─── Packages ────────────────────────────────────────────────────────────────
  packages: [
    {
      id: "landing",
      name: "Landing Page",
      price: 999,
      currency: "NZD",
      tagline: "Your first step online — a single conversion-focused page",
      deliveryDays: "1 week",
      pages: "1 page",
      popular: false,
      comparison: {
        pickIf:
          "You only need one strong page right now — like a digital poster with a clear way to get in touch.",
        youGet:
          "One live page that works on phones, with a contact form and the basics so people can find you on Google.",
        afterLaunch: "One round of tweaks after you see it online, plus help connecting your domain name.",
      },
      features: [
        "Single-page design built to convert",
        "Mobile-responsive layout",
        "Contact form with email notifications",
        "Basic SEO setup (meta titles, descriptions)",
        "Google Analytics 4 setup",
        "1 revision round",
        "Domain setup assistance",
      ],
      paymentTerms: "100% upfront",
      cta: "Get in touch",
    },
    {
      id: "starter",
      name: "Starter",
      price: 1499,
      currency: "NZD",
      tagline: "Get online properly — 3 pages with the foundations done right",
      deliveryDays: "2 weeks",
      pages: "3 pages",
      popular: false,
      comparison: {
        pickIf:
          "You want a proper small website — Home, About, and Contact — and you are not trying to sell products online here.",
        youGet:
          "Three clear pages with a contact form and the foundations so Google can list your business sensibly.",
        afterLaunch: "A short handover call so you know how to ask for content changes down the track.",
      },
      features: [
        "Home, About & Contact pages",
        "Mobile-responsive design",
        "Contact form with email notifications",
        "Basic SEO setup (meta titles, headings, sitemap)",
        "Google Analytics 4 setup",
        "One revision round",
        "Domain setup assistance",
        "30-minute handover session",
      ],
      paymentTerms: "100% upfront",
      cta: "Get in touch",
    },
    {
      id: "standard",
      name: "Standard",
      price: 2500,
      currency: "NZD",
      tagline: "The complete marketing asset — CMS, SEO, and conversion tracking included",
      deliveryDays: "2–3 weeks",
      pages: "5–7 pages",
      popular: true,
      comparison: {
        pickIf:
          "You want to change words yourself, show up better in local Google results, and see which enquiries come from the site.",
        youGet:
          "Roughly five to seven pages, a simple area you can edit yourself (like blog or portfolio posts), and tracking for forms and calls.",
        afterLaunch: "A training session plus three months of Growth Care rolled in so you are not on your own.",
      },
      features: [
        "Up to 7 custom pages",
        "Blog or portfolio CMS (you can update content yourself)",
        "Comprehensive SEO architecture (titles, headings, sitemap, schema)",
        "Google Analytics 4 + Search Console setup",
        "Conversion tracking (forms, calls, bookings)",
        "Two revision rounds",
        "30-minute training session",
        "3 months Growth Care included",
      ],
      paymentTerms: "50% upfront, 50% on delivery",
      cta: "Get in touch",
    },
    {
      id: "premium",
      name: "Premium",
      price: 4500,
      currency: "NZD",
      tagline: "Full-service for ambitious businesses — copywriting, animations, strategy",
      deliveryDays: "3–4 weeks",
      pages: "8–12 pages",
      popular: false,
      comparison: {
        pickIf:
          "You want help with the words, a more polished feel, and a sharper look at how the site fits your marketing.",
        youGet:
          "More pages, help drafting copy, subtle motion where it helps, and a light marketing once-over — not just a skin on a template.",
        afterLaunch: "Longer training, three months of Growth Care, and space for extra revision during the build.",
      },
      features: [
        "Up to 12 fully custom pages",
        "Animations & micro-interactions",
        "Full CMS architecture",
        "Copywriting assistance (I help write your content)",
        "GA4 + Search Console + conversion tracking",
        "Three revision rounds",
        "60-minute training session",
        "3 months Growth Care included",
        "Mini marketing audit",
      ],
      paymentTerms: "50% to book · 25% at design approval · 25% before launch",
      cta: "Get in touch",
    },
  ],

  /**
   * Shopify ecommerce builds — priced above standard site packages to reflect
   * catalog, checkout, shipping, and ops workload. Platform subscription is paid
   * by the client to Shopify; “commerce care” is your optional retainer.
   */
  ecommercePackages: [
    {
      id: "shopify-storefront",
      name: "Storefront",
      price: 6499,
      currency: "NZD",
      tagline: "Launch-ready Shopify — premium theme, catalog, and a checkout you trust",
      deliveryDays: "2–3 weeks",
      pages: "~40 SKUs · core collections",
      popular: false,
      comparison: {
        pickIf:
          "You are getting serious about selling online and need a real shop — but your range is still manageable.",
        youGet:
          "A branded Shopify store with a solid batch of products, working checkout, and New Zealand shipping and tax set up sensibly.",
        afterLaunch:
          "Launch training so you can add products yourself; optional monthly care if you want me on speed dial.",
      },
      features: [
        "Shopify store setup on your account (guided)",
        "Premium theme customised to your brand",
        "Up to ~40 products · variants, imagery guidance",
        "Collections, navigation & on-site search",
        "NZ shipping zones · tax & policies (core scenarios)",
        "Shopify Payments / checkout · test orders & handover doc",
        "Google Analytics 4 + purchase events",
        "Essential apps shortlist (reviews, etc.) — paid apps billed by vendors",
        "Two revision rounds",
        "45-minute launch training",
      ],
      paymentTerms: "50% to book · 50% before go-live",
      cta: "Get in touch",
    },
    {
      id: "shopify-growth",
      name: "Growth",
      price: 8999,
      currency: "NZD",
      tagline: "Merchandised for scale — larger catalog, promos, and marketing connections",
      deliveryDays: "3–4 weeks",
      pages: "~120 SKUs · multi-collection",
      popular: true,
      comparison: {
        pickIf:
          "You have a larger range, run sales or bundles, or want your store hooked up to email marketing properly.",
        youGet:
          "Room for many more products, smarter groupings, promos where they fit, and connections to email or SMS tools.",
        afterLaunch:
          "A longer strategy-style handover plus three months of Commerce Growth Care included in the build price.",
      },
      features: [
        "Everything in Storefront scope, scaled to your catalog plan",
        "Up to ~120 SKUs · collection architecture & merchandising",
        "Discounts, bundles, or gift cards (within package scope)",
        "Email or SMS app hook-up (e.g. Klaviyo / Mailchimp-ready)",
        "Metafields for attributes & filtering (where needed)",
        "Conversion tracking + Search Console",
        "Three revision rounds",
        "3 months Commerce Growth Care included",
        "60-minute strategy + handover session",
      ],
      paymentTerms: "50% upfront · 25% at theme lock · 25% before launch",
      cta: "Get in touch",
    },
    {
      id: "shopify-scale",
      name: "Scale",
      price: 12499,
      currency: "NZD",
      tagline: "Complex catalog & ops — B2B-ready rules, channels, and stricter QA",
      deliveryDays: "4–5 weeks",
      pages: "Large catalog · multi-channel",
      popular: false,
      comparison: {
        pickIf:
          "Wholesale-style pricing, a big catalog, more than one sales channel, or stock that has to stay in sync matters to you.",
        youGet:
          "Tighter structure for lots of products, stronger rules for who sees what price, and harder testing before launch.",
        afterLaunch: "Priority support while we build, plus three months of Scale Care so rollout is not chaotic.",
      },
      features: [
        "IA & filtering tuned for larger inventories",
        "B2B / wholesale pricing rules (within standard Shopify)",
        "POS or multi-location basics aligned with online stock",
        "Fulfilment or marketplace connectors (scoped in brief)",
        "Performance pass on key templates (Core Web Vitals–aware)",
        "Four revision rounds",
        "3 months Commerce Scale Care included",
        "Priority support window during build",
      ],
      paymentTerms: "40% to book · 30% at UAT · 30% before launch",
      cta: "Get in touch",
    },
    {
      id: "shopify-pro",
      name: "Commerce Pro",
      price: 16999,
      currency: "NZD",
      tagline: "Heavy customisation & integrations — scoped like a product, delivered with senior oversight",
      deliveryDays: "5–6 weeks",
      pages: "Integrations-first · custom scope",
      popular: false,
      comparison: {
        pickIf:
          "You already know you need heavy custom work, unusual integrations, or something that does not fit a neat box.",
        youGet:
          "A written scope before we start — custom sections, serious integrations, and checkout decisions documented for your team.",
        afterLaunch:
          "Premium care included after launch; anything outside the signed scope gets a separate quote so bills stay predictable.",
      },
      features: [
        "Advanced theme work & bespoke sections (per brief)",
        "Deep integrations: subscriptions, ERP, or custom apps (scoped)",
        "Checkout & app stack decisions documented for your team",
        "CRO-oriented structure + measurement plan in build",
        "Headless or checkout-edge work only if explicitly briefed",
        "Three revision rounds + controlled change window",
        "3 months Commerce Premium Care included",
        "Out-of-scope work quoted separately — no surprises",
      ],
      paymentTerms: "Milestone schedule in proposal (typically 3–4 payments)",
      cta: "Get in touch",
    },
  ],

  // ─── Platform Options ───────────────────────────────────────────────────────
  /** Webflow builds carry a platform hosting surcharge passed through at cost */
  platforms: {
    default: {
      name: "Custom (React / Next.js)",
      hostingNote: "You choose your hosting provider — typically $10–30 NZD/month, or bundled free with a care plan.",
    },
    webflow: {
      name: "Webflow",
      hostingNote: "Webflow charges hosting directly — Basic $18 USD/mo, CMS $29 USD/mo, Business $49 USD/mo. This is paid to Webflow, not to me.",
      surcharge: 0, // no build surcharge — hosting cost is the difference
      tiers: [
        { name: "Basic", price: 18, currency: "USD", note: "Up to 150 pages, no CMS" },
        { name: "CMS", price: 29, currency: "USD", note: "Up to 150 pages + CMS, 2,000 items" },
        { name: "Business", price: 49, currency: "USD", note: "Up to 150 pages + CMS, 10,000 items" },
      ],
    },
    shopify: {
      name: "Shopify",
      hostingNote:
        "Shopify bills your platform plan and transaction fees directly (pricing in USD on shopify.com/nz). Paid apps are extra and billed by each vendor — commerce care covers my time, not Shopify’s invoice.",
    },
  },

  // ─── Domain Info ─────────────────────────────────────────────────────────────
  domain: {
    note: "Domain registration is separate — typically $25–50 NZD/year for .co.nz or .nz. I'll help you set it up.",
  },

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

  /** Retainers for Shopify builds — higher than marketing-site care (ops + apps). */
  ecommerceCarePlans: [
    {
      id: "commerce-light",
      name: "Commerce Light",
      price: 229,
      currency: "NZD",
      period: "month",
      features: [
        "Theme tweaks & troubleshooting",
        "1 hour of catalogue / content work per month",
        "App conflict checks (major updates)",
        "Priority email support",
      ],
    },
    {
      id: "commerce-growth-care",
      name: "Commerce Growth",
      price: 329,
      currency: "NZD",
      period: "month",
      popular: true,
      features: [
        "Everything in Commerce Light",
        "2 hours of store work / month (products, promos, sections)",
        "Quarterly health check (checkout, tracking, speed spot-check)",
        "Seasonal merchandising recommendations (light)",
      ],
    },
    {
      id: "commerce-premium-care",
      name: "Commerce Premium",
      price: 479,
      currency: "NZD",
      period: "month",
      features: [
        "Everything in Commerce Growth",
        "3 hours of work / month + escalation for urgent fixes",
        "Monthly video or async strategy check-in",
        "CRO & analytics review against your goals",
      ],
    },
  ],

  // ─── About (principles — do / don’t) ─────────────────────────────────────────
  about: {
    /** What we optimise for — pairs with the About section story */
    principles: {
      dos: [
        "Goals, analytics, and conversion paths before the first pixel",
        "Transparent pricing and scoped packages — no surprise invoices",
        "GA4, tracking, and reporting set up so you can see what works",
      ],
      donts: [
        "Generic template sites that look like every other AI landing page",
        "Agency-style retainers and jargon when you need a clear build",
        "Launch-and-disappear — your site should keep improving after go-live",
      ],
    },
  },

  /**
   * “How we work” section — keep in sync with `packages[].deliveryDays` and FAQ timing answers.
   */
  processSection: {
    step02BuildDescription:
      "You get a mockup first. Once you're happy with the direction, we build the full site. Timing matches your package — from about 1 week (Landing Page) to about 3–4 weeks (Premium). See Pricing for each plan.",
    step03LaunchDescription:
      "GA4, SEO, and conversion tracking are set up per your package. Starter and up include a handover or training session for content updates; the Landing Page is a single live page — say if you want a short paid walkthrough.",
    closingLineBeforeEmphasis: "From first conversation to live:",
    closingLineEmphasis: "weeks, not months",
    closingLineAfterEmphasis:
      " — exact timing depends on your package and how quickly you provide feedback and content.",
    /**
     * Public “client framework” — mirrors docs/client-onboarding without internal tier names.
     */
    clientOnboarding: {
      kicker: "Client experience",
      title: "Once you're on board",
      lead: "Same promises as the pricing page: clear homework, a mockup before code, bundled revision rounds, and no surprise invoices. If several people need a say, we add milestones — not meetings for the sake of it.",
      items: [
        {
          title: "Goals before pixels",
          body: "We align on audience, offer, and the one action you want visitors to take — before design opens.",
        },
        {
          title: "Clear homework",
          body: "A simple brief for assets, copy direction, and domain access. Premium includes copy assistance.",
        },
        {
          title: "Mockup, then build",
          body: "Written approval on direction, then code. Out-of-scope work is quoted first ($150/hour as in the FAQ).",
        },
        {
          title: "Launch & handover",
          body: "Ownership transfers after final payment; handover or training on packages that include it.",
        },
      ],
    },
  },

  // ─── Social Links ─────────────────────────────────────────────────────────────
  social: {
    linkedin: "https://www.linkedin.com/in/cbemstar/",
    instagram: "https://instagram.com/yourhandle",
    facebook: "https://facebook.com/yourpage",
  },

  /** ISO date for legal documents (update when policies change) */
  legalLastUpdated: "2026-04-13",

  /** In-app routes — use leading `/` so section links work from any page */
  legal: {
    privacy: "/privacy",
    terms: "/terms",
    cookies: "/cookies",
    security: "/security",
  } as const,

  // ─── Navigation ──────────────────────────────────────────────────────────────
  nav: [
    { label: "Work", href: "/#portfolio" },
    { label: "Services", href: "/#services" },
    { label: "How we work", href: "/#how-we-work" },
    { label: "Pricing", href: "/#pricing" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],

  // ─── Target niches (for niche-specific copy) ─────────────────────────────────
  niches: [
    "Cafés & bakeries",
    "Barbers & salons",
    "Tradies & contractors",
    "New local shops",
  ],
} as const;

/** FAQ and client comms — always derived from `siteConfig.packages` delivery fields. */
export function buildDeliveryTimelineFaqAnswer(): string {
  const byPackage = siteConfig.packages
    .map((p) => `${p.name}: about ${p.deliveryDays}`)
    .join(". ")
  return `${byPackage}. The biggest variable is how quickly you provide feedback and content — the faster you respond, the faster we launch.`
}

/**
 * URL hashes for the pricing section — read in `PricingSection` to set the
 * Standard vs Ecommerce toggle and scroll target. Keep in sync with markup ids
 * (`pricing`, `pricing-care`).
 */
export const pricingHash = {
  /** Top of pricing; Standard Sites view */
  compare: "#pricing",
  /** Same section, Standard Sites (explicit) */
  standard: "#pricing-standard",
  /** Same section, Ecommerce / Shopify view */
  commerce: "#pricing-commerce",
  /** Care plans block; uses Standard-site care copy by default */
  care: "#pricing-care",
} as const

/**
 * Footer “Pricing” links — derived from `packages` + `ecommercePackages` so titles
 * stay in sync with the pricing section. Each `href` uses a distinct hash so the
 * pricing toggle matches the row you clicked.
 */
export function getFooterPricingLinks(): { title: string; href: string }[] {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
      maximumFractionDigits: 0,
    }).format(n)

  return [
    { title: "Compare plans", href: `/${pricingHash.compare}` },
    ...siteConfig.packages.map((p) => ({
      title: `Standard · ${p.name} · ${fmt(p.price)}`,
      href: `/${pricingHash.standard}`,
    })),
    ...siteConfig.ecommercePackages.map((p) => ({
      title: `Shopify · ${p.name} · ${fmt(p.price)}`,
      href: `/${pricingHash.commerce}`,
    })),
    { title: "Care plans", href: `/${pricingHash.care}` },
  ]
}

export type Package = (typeof siteConfig.packages)[number];
export type CarePlan = (typeof siteConfig.carePlans)[number];
