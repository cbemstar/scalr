# Internal playbook — Scalr (solo operator)

Single source of truth for **commercial terms** is `[src/config/site.ts](../../src/config/site.ts)`. This doc is **process**: how you run Simple / Balanced / Sophisticated tracks without contradicting the site.

---

## 1. Segmentation (assign after sale)


| Floor (package) | Default track | Bump to Balanced if…      | Bump to Sophisticated if…        |
| --------------- | ------------- | ------------------------- | -------------------------------- |
| Landing         | Simple        | 2 approvers, weak content | Compliance, migration            |
| Starter         | Simple        | 2 approvers, weak content | + hard date + committee          |
| Standard        | Balanced      | —                         | Multi-location, legal/brand gate |
| Premium         | Balanced      | —                         | Stakeholder map + audit risk     |


**Overrides:** hard launch inside delivery window, Webflow + low digital literacy, prior bad agency experience, invisible second approver.

---

## 2. Handover brief (self-brief — fill before first client touch after payment)

Even as a solo founder, write this so fatigue doesn’t erase nuance.

### Simple (half page)

- **Deal:** 5 bullets — why they bought, fear, win, competitor mention  
- **Package + $:** id, price, `deliveryDays`, payment terms, revision count, training line  
- **Promises:** mockup gate; what you said about timeline/content  
- **Tech:** Next.js vs Webflow; care plan yes/no  
- **Risks:** content, ghosting, scope creep noted in sales  
- **Next 7 days:** dated checklist (homework due, mockup target)

### Balanced (+ Simple, expanded)

- **Narrative:** 1 short paragraph + best client quotes  
- **Milestones table:** homework / mockup / build / launch dates  
- **Content risk:** who writes; due dates  
- **SEO/tracking:** expectations vs package features

### Sophisticated (+ Balanced)

- **Stakeholders:** names, roles, skeptics  
- **Compliance / legal / brand** gates and dates  
- **Redirects / migration** notes  
- **Success metric hypothesis** + who validates  
- **RACI-lite:** for mockup, build sign-off, launch, DNS

---

## 3. Meeting & async cadence


| Activity           | Simple                  | Balanced                  | Sophisticated               |
| ------------------ | ----------------------- | ------------------------- | --------------------------- |
| Post-payment intro | Email + optional 20 min | Email + 30–45 min kickoff | Kickoff + optional workshop |
| Design             | Async PDF + written OK  | Screenshare + written OK  | Formal sign-off + archive   |
| Build updates      | Short Loom / email      | Weekly/biweekly summary   | Short standups or board     |
| Pre-launch         | Checklist               | Walkthrough + tracking QA | Stakeholder sign-off        |
| Post-launch        | Training if in package  | + Growth Care pitch       | + 30-day metric check plan  |


**Rituals**  

- **Pre-kickoff (internal, 10–15 min):** Re-read `siteConfig` for their package; list top 3 risks; confirm payment received per terms.  
- **Post-kickoff debrief (1–2 weeks after kickoff):** Did they feel understood? Any expectation drift vs FAQ? Update brief template if you missed a pattern.

---

## 4. Risk register — triggers & actions


| Signal                                         | Action                                                         |
| ---------------------------------------------- | -------------------------------------------------------------- |
| Content late                                   | Pause timeline message (align FAQ); offer copy hour or upgrade |
| Feedback in dribbles                           | “Bundle into one round”; state revisions left                  |
| Out-of-scope ask                               | Map to package bullets; quote $150/hr or upgrade before work   |
| Missed payment milestone                       | Pause build per SOW; no handover of final assets               |
| New approver appears                           | Freeze until single approver; bump to Sophisticated comms      |
| Silent client (>5–7 biz days in first 2 weeks) | Friendly nudge + new homework date; internal “at risk” flag    |


---

## 5. Short intake form (internal — can be Google Form / Notion)

1. Business name + ABN/GST if needed
2. Package purchased
3. Primary goal (1 sentence)
4. Primary CTA
5. Domain status (own / need / Webflow)
6. Platform choice (Next / Webflow)
7. Approver name + email
8. Hard launch date Y/N + date
9. Content owner
10. Links to 2–3 reference sites
11. Anything sensitive (compliance, rebrand, etc.)

---

## 6. Kickoff outline (internal checklist)

- Goals + CTA documented  
- Page list ≤ package max  
- Revision count restated  
- Payment milestones restated  
- Mockup process + stop-before-build fee (FAQ #4)  
- Training/handover expectation by package  
- Growth Care (Standard/Premium) start/end  
- Webflow hosting paid to Webflow — reiterated if applicable  
- Recap scheduled within 24h

---

## 7. Post-launch 30 / 60 / 90 (internal)

- **Day 0–30:** Training done; GA4/Conversions smoke test; client homework SLA closed  
- **Day 30–60:** Check silent site; offer Growth Care if not subscribed; one satisfaction ping  
- **Day 60–90:** Standard/Premium: Growth Care nearing first quarter — recap wins; ad-hoc or upgrade conversation

---

## 8. Onboarding KPIs (pick 3–5 to track)


| KPI                         | Definition                                                            | Why                                        |
| --------------------------- | --------------------------------------------------------------------- | ------------------------------------------ |
| **Time to mockup approval** | Business days from paid + homework complete → written mockup approval | First value moment; predicts timeline slip |
| **Client homework SLA**     | % of projects where assets arrive by agreed date                      | Biggest schedule driver                    |
| **Revision burn rate**      | Rounds used ÷ rounds included (by phase)                              | Scope discipline / education gap           |
| **Silent client flag**      | Count of accounts with no inbound reply > X days in first 14 days     | Early churn / ghosting signal              |
| **Care plan attach rate**   | % of Standard/Premium who continue after included Growth Care         | Expansion health                           |


Optional: **ad-hoc hours revenue** post-launch; **time to launch** vs `deliveryDays` promise.

---

## 9. File locations

- External copy templates: `[external-simple.md](./external-simple.md)`, `[external-balanced.md](./external-balanced.md)`, `[external-sophisticated.md](./external-sophisticated.md)`  
- Site copy & packages: `[src/config/site.ts](../../src/config/site.ts)`  
- FAQ: `[src/components/sections/faq.tsx](../../src/components/sections/faq.tsx)`  
- Process section copy: `siteConfig.processSection` + `[how-it-works.tsx](../../src/components/sections/how-it-works.tsx)`