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
    "Affordable websites for new cafés, tradies, barbers, and local shops in Christchurch. Built by a marketer, not a big agency. From $999 NZD.",

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
      "New sites and redesigns for cafés, tradies, barbers, and local shops. Clear packages from $999 NZD.",
    /** One scannable trust line instead of chips — saves vertical space in the hero card */
    trustLine: "From $999 NZD · typical delivery 1–2 weeks · goals before pixels",
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
      href: "#pricing",
      magneticId: "hero-cta-pricing",
    },
    ctaSecondary: {
      label: "Get in touch",
      href: "#contact",
      magneticId: "hero-cta-contact",
    },
    utilityLinks: [
      { label: "See Recent Work", href: "#portfolio" },
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

  // ─── Social Links ─────────────────────────────────────────────────────────────
  social: {
    linkedin: "https://www.linkedin.com/in/cbemstar/",
    instagram: "https://instagram.com/yourhandle",
    facebook: "https://facebook.com/yourpage",
  },

  // ─── Navigation ──────────────────────────────────────────────────────────────
  nav: [
    { label: "Work", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "How we work", href: "#how-we-work" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  // ─── Target niches (for niche-specific copy) ─────────────────────────────────
  niches: [
    "Cafés & bakeries",
    "Barbers & salons",
    "Tradies & contractors",
    "New local shops",
  ],
} as const;

export type Package = (typeof siteConfig.packages)[number];
export type CarePlan = (typeof siteConfig.carePlans)[number];
