# External playbook — Simple track

**Use for:** Landing Page package, many Starter packages, sole operators, tight budget, async-friendly clients.

**Before sending:** Fill `{{…}}` placeholders. Copy package facts from `[src/config/site.ts](../../src/config/site.ts)` (`packages[]`).

---

## 1. Welcome email (subject lines)

- `{{BUSINESS_NAME}} — you’re booked in with Scalr`
- `Next steps for your website ({{PACKAGE_NAME}})`

---

## 2. Welcome email (body template)

Hi {{FIRST_NAME}},

Thanks for choosing Scalr for your **{{PACKAGE_NAME}}** build ({{BUILD_PRICE}} NZD one-time).

**What you bought (summary)**  

- **Package:** {{PACKAGE_NAME}} — {{PACKAGE_TAGLINE}}  
- **Scope:** {{PAGES_OR_SCOPE}}  
- **Target timing:** about **{{DELIVERY_DAYS}}** once we have your content and approvals (see [Pricing](https://scalr.nz/#pricing) — timing moves with how quickly you reply and send assets).  
- **Payment:** {{PAYMENT_TERMS}}  
- **Design process:** mockup first → your written approval → build. If the direction isn’t right at mockup stage, we stop before the full build — you don’t owe the build fee.  
- **Revisions included:** **{{REVISION_ROUNDS}}** consolidated feedback round(s) per phase — please batch changes.  
- **Training / handover:** {{TRAINING_SUMMARY}}  
{{GROWTH_CARE_LINE}}

**How we work (short)**  

1. You complete the homework below by **{{HOMEWORK_DUE_DATE}}**.
2. I send a design mockup for approval.
3. After approval, I build and set up analytics/SEO as per your package.
4. We launch — you’re never locked in; ownership transfers after final payment as per our FAQ.

**Goals before pixels**  
Reply with (even bullet points are fine):  

- What should this site *do* for your business in the next 3 months?  
- Who is it for (one sentence)?  
- What should a visitor do first (call, book, form, visit)?

I aim for a **clear reply within 24 hours** on business days.

Thanks,  
{{YOUR_NAME}}  
{{YOUR_EMAIL}} · {{YOUR_PHONE}}

---

## 3. “What happens next” (one screen / PDF block)


| Step | What happens     | Your part                                             |
| ---- | ---------------- | ----------------------------------------------------- |
| 1    | Homework & goals | Send checklist + answers by {{DATE}}                  |
| 2    | Mockup           | Approve direction in writing                          |
| 3    | Build            | Feedback inside agreed revision rounds                |
| 4    | Launch           | Final payment per package terms; DNS/domain as agreed |


---

## 4. Homework checklist (Simple)

Send in one email or folder link:

- **Logo** (SVG or high-res PNG)  
- **Photos** you want used (or say “use stock” and name the vibe)  
- **Copy** for each section/page (bullet points OK; Premium clients on Simple track still get copy assistance if they bought Premium — use Sophisticated copy pack)  
- **Contact details** (phone, email, address, hours)  
- **Domain:** do you already own one? Registrar login or invite for DNS  
- **Social / Google Business Profile** links if they should appear  
- **Competitors or sites you like** (1–3 links + what you like)

**Landing Page only:** focus on one primary offer + one clear call-to-action.

---

## 5. Revision policy (client-facing blurb)

Your package includes **{{REVISION_ROUNDS}}** round(s) of feedback after the mockup and after key build milestones where applicable. Please **combine** feedback into one message per round so we stay on time and on scope. Extra rounds or new scope may be quoted at **$150/hour** (1-hour minimum, 30-minute increments) as on the site FAQ, or we can discuss a package upgrade.

---

## 6. Package-specific snippets (paste into email)

**Landing ($999)** — `deliveryDays`: 1 week · 100% upfront · 1 revision · no training in package (offer paid walkthrough if wanted).

**Starter ($1,499)** — 2 weeks · 100% upfront · 1 revision · 30-minute handover.

**Standard ($2,500)** — 2–3 weeks · 50% / 50% · 2 revisions · 30-min training · 3 months Growth Care included.

**Premium ($4,500)** — 3–4 weeks · 50% / 25% / 25% · 3 revisions · 60-min training · 3 months Growth Care · copy assistance + mini audit (still use revision rounds).

Replace with current strings from `siteConfig.packages` if they change.