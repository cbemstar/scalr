# Scalr client onboarding playbooks

Canonical **pricing, delivery times, payment terms, revision counts, and features** live in [`src/config/site.ts`](../../src/config/site.ts). Client-facing emails and PDFs should **copy numbers from there** (or from the live site) so nothing contradicts the landing page.

The public **How we work** section renders that story as a **scroll-linked vertical timeline** ([`src/components/ui/client-journey-timeline.tsx`](../../src/components/ui/client-journey-timeline.tsx)) — motion pattern inspired by [Aceternity’s timeline](https://ui.aceternity.com/components/timeline) (also listed on [21st.dev’s shadcn hub](https://21st.dev/shadcn)), restyled for Scalr tokens. Copy still lives in `siteConfig.processSection.clientOnboarding`; keep both aligned when you edit either.

| Track             | When to use                                       | Files                                                      |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| **Simple**        | Landing Page; many Starter; sole trader, async OK | `[external-simple.md](./external-simple.md)`               |
| **Balanced**      | Standard; most Premium; Starter with 2 approvers  | `[external-balanced.md](./external-balanced.md)`           |
| **Sophisticated** | Premium + complexity, compliance, committee       | `[external-sophisticated.md](./external-sophisticated.md)` |
| **Internal**      | Handover brief, cadence, risks, KPIs, rituals     | `[internal-framework.md](./internal-framework.md)`         |


**Segmentation:** See Part B in the business plan — package sets the *floor*; stakeholders, hard launch dates, Webflow education needs, and compliance *bump* the track up.