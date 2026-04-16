# GEO Audit Report: Scalr

**Audit Date:** 2026-04-16
**URL:** https://scalr.co.nz
**Business Type:** Agency/Services — Web design for NZ local businesses
**Pages Analyzed:** 3 live pages (homepage, legal pages; `/services/integrations` returns 404)

---

## Executive Summary

**Overall GEO Score: 22/100 — Critical**

Scalr has solid technical infrastructure and honest, well-structured content, but is currently near-invisible to AI systems. The site has **zero structured data**, **no robots.txt or sitemap**, a **wrong canonical domain in OG tags**, a **broken subpage** (`/services/integrations` → 404), and **no external brand presence** of any kind. AI systems (ChatGPT, Perplexity, Gemini, Claude) cannot reliably discover, cite, or recommend this site. These are pre-launch gaps that are straightforward to fix — and doing so before any SEO or marketing spend will multiply the return on that investment.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 22/100 | 25% | 5.5 |
| Brand Authority | 5/100 | 20% | 1.0 |
| Content E-E-A-T | 52/100 | 20% | 10.4 |
| Technical GEO | 35/100 | 15% | 5.25 |
| Schema & Structured Data | 0/100 | 10% | 0.0 |
| Platform Optimization | 8/100 | 10% | 0.8 |
| **Overall GEO Score** | | | **23/100** |

---

## Critical Issues (Fix Immediately)

### 1. `/services/integrations` returns 404
**Severity: Critical**
The integrations page — linked from the main nav — returns a 404 Not Found. This is the only dedicated subpage beyond legal. Any crawler, customer, or AI that follows the navigation link hits a dead end. Fix the routing in `src/app/services/integrations/page.tsx` before any other GEO work.

### 2. `og:url` points to wrong domain
**Severity: Critical**
The live site's Open Graph `og:url` is set to `https://scalr.nz` but the site lives at `https://scalr.co.nz`. This creates a broken canonical signal for every social share and AI crawler that reads OG metadata. Update `siteConfig.url` in `src/config/site.ts` from `"https://scalr.nz"` to `"https://scalr.co.nz"`.

### 3. No canonical tag on any page
**Severity: Critical**
Zero pages have a `<link rel="canonical">` tag. Both `https://scalr.co.nz` and `https://www.scalr.co.nz` resolve to HTTP 200 with identical content, creating duplicate content for search engines and AI crawlers. Add `alternates: { canonical: 'https://scalr.co.nz' }` to every page's metadata export.

### 4. Zero structured data (JSON-LD)
**Severity: Critical**
No schema.org markup of any type exists on any page. AI systems cannot confirm Scalr is a real business, understand the service offering, or surface FAQ answers as rich results. The minimum viable schema set (Organization, FAQPage) takes under 2 hours to implement.

### 5. No robots.txt — returns 404
**Severity: Critical**
`https://scalr.co.nz/robots.txt` returns a 404. No sitemap URL is declared. AI training crawlers (CCBot, Common Crawl) have unrestricted access by default, while no sitemap reference helps citation crawlers (GPTBot, ClaudeBot) prioritise discovery. Create `src/app/robots.ts` immediately.

### 6. No sitemap.xml — returns 404
**Severity: Critical**
`https://scalr.co.nz/sitemap.xml` returns 404. Without a sitemap, page discovery depends entirely on link-following — which fails when the only subpage (`/services/integrations`) is already broken.

---

## High Priority Issues

### 7. No llms.txt
**Page:** Site-wide
`https://scalr.co.nz/llms.txt` returns 404. This emerging standard (llmstxt.org) provides AI language models with a structured, curated summary of the site's purpose and content. It is the fastest way to influence how AI assistants describe Scalr when asked about NZ web design options. Zero implementation cost.

### 8. No og:image or twitter:image
**Page:** Site-wide
Every social share of scalr.co.nz shows a blank card. AI crawlers that index social metadata see an incomplete entity profile. A 1200×630px image takes 30 minutes to create and add.

### 9. No external brand presence
**Severity: High**
Search for "Scalr" web design Christchurch NZ on Google, Reddit, Clutch, Yellow.co.nz, DesignRush, MoneyHub, Sortlist, and GoodFirms returns zero results. AI models source citations from platforms they have been trained on — a business with no third-party mentions is invisible to AI-generated recommendations. This requires a deliberate off-site presence strategy (see 30-Day Plan).

---

## Medium Priority Issues

### 10. Title differs from site config description
The page title `"Scalr — Websites That Bring In Customers"` is stronger than the old config tagline. Confirm this is intentional and update `siteConfig.tagline` to match, keeping all metadata in sync.

### 11. Meta description mentions only "Christchurch"
**Impact:** Medium
The description says "cafés, tradies, barbers, and local shops in Christchurch" but the site services all of NZ. This narrows the addressable audience in search results. Either expand to "across New Zealand" or create location-specific landing pages to support the Christchurch focus deliberately.

### 12. No FAQ schema for 12-item FAQ
The FAQ section contains 12 fully written Q&A items. None are marked up as `FAQPage` JSON-LD. AI assistants frequently extract FAQ answers verbatim — without markup, these answers are invisible to structured extraction.

### 13. Founder name not surfaced as page text
The About section uses first-person ("I've spent 6+ years...") without naming the founder on-page. A Quality Rater or AI system cannot verify E-E-A-T claims without a verifiable name. The LinkedIn handle `cbemstar` is linked but not labelled.

### 14. Instagram and Facebook links are placeholders
`siteConfig.social.instagram` = `"https://instagram.com/yourhandle"` and Facebook is similarly a placeholder. These appear in the rendered footer as broken social links, which is a minor trust signal failure.

### 15. No CSP header
`Content-Security-Policy` is absent from `next.config.ts`. Start with `Content-Security-Policy-Report-Only` mode to audit violations before enforcing.

---

## Low Priority Issues

### 16. `skipTrailingSlashRedirect: true` without canonical tags
Both `/page` and `/page/` can resolve without redirect. Now that canonical tags are absent (Issue #3), this creates a real duplicate-content risk. Fix canonicals first; optionally remove this config setting.

### 17. No `<time>` element for the InternetNZ citation date
The "Aug 2025" attribution in the trust section should be wrapped in `<time datetime="2025-08">` for machine-readable freshness signals.

### 18. Hero images lack `priority` prop
The above-the-fold hero slideshow images should use `priority={true}` on the Next.js `<Image>` component to trigger `<link rel="preload">` and improve LCP scores.

### 19. No hreflang (future consideration)
Not needed now. Add if expanding to international markets.

---

## Category Deep Dives

### AI Citability (22/100)

**What was found:** The homepage content is SSR (Next.js App Router), so AI crawlers receive complete HTML on first request — a positive baseline. The H1 is animated text rendered as plain text in the HTML: *"Websites that bring in customers / book more jobs / fill your chairs / look legit online / get found locally / fit a tight budget."* The 12-item FAQ is rendered in the HTML and could be extracted by crawlers. Pricing is transparent and specific ($999–$16,999 NZD).

**What is missing:** No JSON-LD schema to structure any of this content. No blog posts or guides that can be cited for informational queries. No named author in page text. The `/services/integrations` page is broken, removing the only deep-content subpage from the crawlable graph.

**Specific passages with high citability potential (once indexed):**
- FAQ: *"Yes, completely. You own the code, the domain, and all the content."* — direct answer to a common query.
- Pricing: *"Standard websites from $999 NZD; Shopify stores from $6,499 NZD"* — exact-match for "website cost NZ" queries.
- About: *"I work with businesses across New Zealand — based in Christchurch"* — local intent signal.

**Path to 60+:** Fix the 404, add FAQPage schema, add Organization schema, write one blog post answering "how much does a website cost in NZ 2026."

---

### Brand Authority (5/100)

**What was found:** The LinkedIn profile `https://www.linkedin.com/in/cbemstar/` exists and is linked from the site. No other external presence detected.

**What is missing:** Zero results on Google, Reddit, Clutch.co, Yellow.co.nz, DesignRush, MoneyHub NZ, Sortlist, GoodFirms, or any NZ business directory. AI models learn to recognize businesses through repeated co-occurrence across platforms they are trained on. A business that exists only on its own domain is essentially unknown to AI systems.

**Competitive context:** The NZ web design market has established players listed on Clutch (Christchurch), MoneyHub NZ, and DesignRush with verified reviews. Scalr is absent from all of these.

**Path to 30+:** Submit to Clutch.co (free listing), Yellow.co.nz, Localist.co.nz. Set up Google Business Profile (Christchurch). Get one client to leave a Google Review. Post 2–3 times on LinkedIn as the founder about web design for NZ small business.

---

### Content E-E-A-T (52/100)

**Strengths:**
- Transparent full pricing ($999–$16,999 NZD, care plans, add-ons, hourly rate) — rare in this category
- Honest caveats in Dream State section ("Site handles the first touch; you still own the conversation")
- Third-party research cited accurately (InternetNZ/Yabble 2025, 750 NZ businesses)
- 12-question FAQ with direct, opinionated answers
- Industry-specific tool recommendations (Fresha, Cliniko, ResDiary) showing genuine expertise
- NZ Privacy Act 2020 compliance documented in Privacy Policy
- Direct contact: email, phone, and Christchurch location all visible

**Gaps:**
- No named founder in page text (only discoverable via email domain and LinkedIn URL)
- No client testimonials with names or business types
- No case studies or portfolio with measurable outcomes
- No professional certifications visible (Google Partner, Shopify Partner)
- Instagram and Facebook placeholders not yet active

---

### Technical GEO (35/100)

| Signal | Status | Notes |
|---|---|---|
| HTTPS / HSTS | ✅ | `max-age=31536000; includeSubDomains; preload` confirmed live |
| Server-side rendering | ✅ | Next.js App Router — full HTML delivered to crawlers |
| TTFB | ✅ | 263ms — excellent |
| HTML lang | ✅ | `lang="en-NZ"` |
| robots.txt | ❌ | 404 — does not exist |
| XML Sitemap | ❌ | 404 — does not exist |
| llms.txt | ❌ | 404 — does not exist |
| Canonical tags | ❌ | Missing on all pages |
| og:url | ❌ | Points to `scalr.nz` not `scalr.co.nz` |
| og:image | ❌ | Missing |
| JSON-LD | ❌ | Zero blocks on all pages |
| /services/integrations | ❌ | 404 — broken route |
| Security headers | ✅ | X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| CSP | ❌ | Not configured |
| Font display swap | ✅ | Prevents FOIT |
| Image optimization | ✅ | Next.js `<Image>` component |

---

### Schema & Structured Data (0/100)

**Total JSON-LD blocks found on live site: 0**

No structured data of any kind exists on any crawlable page.

**Missing schema types by GEO impact:**

| Schema Type | Priority | Where to Add | Why It Matters |
|---|---|---|---|
| `Organization` + `LocalBusiness` | Critical | `layout.tsx` | Entity identity — AI can't confirm Scalr is a real NZ business |
| `Person` | High | `layout.tsx` | Founder credentials machine-readable |
| `FAQPage` | High | `page.tsx` | 12 FAQ items ready; AI assistants cite FAQ answers directly |
| `Service` + `Offer` | High | `page.tsx` | Makes pricing data citable for "website cost NZ" queries |
| `WebSite` | Medium | `layout.tsx` | Canonical site identity |
| `BreadcrumbList` | Low | Subpages | Needed once routing is fixed |

---

### Platform Optimization (8/100)

| Platform | Status | Notes |
|---|---|---|
| Google Search | Indexed but weak | No structured data, no sitemap, no inbound links |
| Google AI Overviews | Not present | Zero chance without entity schema and domain authority |
| ChatGPT web search | Not present | No brand mentions on cited platforms |
| Perplexity | Not present | No citations found |
| Gemini | Not present | No citations found |
| Bing Copilot | Not present | Not indexed in Bing (likely) |
| Clutch.co | Not listed | Free listing opportunity |
| Yellow.co.nz | Not listed | High-priority NZ directory |
| MoneyHub NZ | Not listed | Listed Christchurch web designers section |
| Google Business Profile | Not set up | Critical for local search |
| LinkedIn (company) | Not found | Personal profile exists; company page absent |
| Reddit (r/newzealand) | No mentions | No brand presence |

---

## Quick Wins (Implement This Week)

1. **Fix `og:url`** — change `siteConfig.url` from `"https://scalr.nz"` to `"https://scalr.co.nz"`. 5 minutes. Fixes every social share and OG signal immediately.

2. **Fix `/services/integrations` 404** — investigate and repair the Next.js route. This is the only content subpage and it's broken.

3. **Add canonical tags** — add `alternates: { canonical: 'https://scalr.co.nz' }` to `layout.tsx` metadata. Prevents duplicate content penalty from www/non-www.

4. **Create `src/app/robots.ts`** — 20 lines of code. Declares sitemap URL, disallows `/api/`, gives crawlers a structured entry point.

5. **Create `src/app/sitemap.ts`** — 30 lines. Lists homepage, integrations (once fixed), legal pages. Required for any search engine or AI crawler page discovery.

---

## 30-Day Action Plan

### Week 1: Fix the Broken Foundations
- [ ] Fix `siteConfig.url` → `https://scalr.co.nz`
- [ ] Fix `/services/integrations` 404 (investigate Next.js routing)
- [ ] Add canonical tags to all pages via `layout.tsx`
- [ ] Create `src/app/robots.ts` with sitemap declaration
- [ ] Create `src/app/sitemap.ts` including all live pages
- [ ] Create `public/llms.txt` with plain-text site summary
- [ ] Create default OG image (1200×630px) and add to `layout.tsx` metadata

### Week 2: Add Structured Data
- [ ] Add `Organization` + `LocalBusiness` JSON-LD to `layout.tsx`
- [ ] Add `Person` JSON-LD (founder) to `layout.tsx` with `sameAs: ["https://www.linkedin.com/in/cbemstar/"]`
- [ ] Add `FAQPage` JSON-LD to `page.tsx` (12 items — copy from FAQ component)
- [ ] Add `Service` + `Offer` JSON-LD to `page.tsx` (pricing data from `siteConfig.packages`)
- [ ] Add `WebSite` JSON-LD to `layout.tsx`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

### Week 3: Build External Brand Presence
- [ ] Create Google Business Profile (Christchurch, NZ)
- [ ] Submit free listing to Clutch.co (NZ web designers category)
- [ ] Submit listing to Yellow.co.nz
- [ ] Create LinkedIn Company Page for Scalr
- [ ] Post 2 founder LinkedIn articles on NZ small business web design
- [ ] Ask first client for a Google Review
- [ ] Fix placeholder Instagram/Facebook links or remove them from footer

### Week 4: Content for AI Citability
- [ ] Write "How much does a website cost in New Zealand in 2026?" — 800-word blog post
- [ ] Add author name (full name) to About section in page text
- [ ] Add founder headshot to About section
- [ ] Add 2–3 client testimonials (business type + city, anonymised OK)
- [ ] Create niche landing page: `/websites-for-tradies-nz`
- [ ] Create niche landing page: `/websites-for-cafes-nz`

---

## Appendix: Pages Analyzed

| URL | HTTP Status | Title | Critical Issues |
|---|---|---|---|
| `https://scalr.co.nz` | 200 | Scalr — Websites That Bring In Customers | No canonical, no JSON-LD, wrong og:url |
| `https://scalr.co.nz/services/integrations` | 404 | 404: This page could not be found | Broken route — navigation dead-end |
| `https://scalr.co.nz/privacy` | 200 (assumed) | Privacy Policy | No canonical, no JSON-LD |
| `https://scalr.co.nz/terms` | 200 (assumed) | Terms of Service | No canonical, no JSON-LD |
| `https://scalr.co.nz/robots.txt` | 404 | — | Does not exist |
| `https://scalr.co.nz/sitemap.xml` | 404 | — | Does not exist |
| `https://scalr.co.nz/llms.txt` | 404 | — | Does not exist |

---

*Report generated by GEO Audit · scalr.co.nz · 2026-04-16*
