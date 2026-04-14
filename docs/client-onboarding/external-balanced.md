# External playbook — Balanced track

**Use for:** Standard package (default), most Premium packages, Starter when there are **two approvers** or **medium content risk**.

Include **everything** from `[external-simple.md](./external-simple.md)`, then add the sections below.

---

## 1. Welcome email — extra paragraphs

**Primary contact**  
Please confirm **one person** who can approve the mockup and final build. If someone else needs to see work, add them as CC — decisions still need a single “yes” from {{APPROVER_NAME}}.

**Milestones**  


| Milestone                 | Target date | Owner  |
| ------------------------- | ----------- | ------ |
| Homework in               | {{DATE}}    | Client |
| Mockup ready              | {{DATE}}    | Scalr  |
| Mockup approved           | {{DATE}}    | Client |
| Build complete for review | {{DATE}}    | Scalr  |
| Launch                    | {{DATE}}    | Both   |


Dates are tied to your **{{DELIVERY_DAYS}}** window from `[siteConfig.packages](../../src/config/site.ts)` and assume feedback within **{{FEEDBACK_SLA}}** (e.g. 2 business days unless we agree otherwise).

---

## 2. Kickoff agenda (30–45 minutes)

**Invite title:** `{{BUSINESS_NAME}} — website kickoff (Scalr)`

1. **Intros** (2 min)
2. **Goals & success** (10 min) — what must improve for the business; primary CTA
3. **Audience** (5 min) — who lands on the site; what they need to trust
4. **Scope vs package** (8 min) — page list vs {{PACKAGE_NAME}} limits; what’s out of scope
5. **Content & assets** (5 min) — who writes, due dates, stock vs supplied photos
6. **SEO & analytics** (5 min) — GA4, Search Console, conversion tracking per package
7. **Platform** (3 min) — Next.js vs Webflow; hosting/care plan reminder (FAQ #8–9)
8. **Revisions & change requests** (3 min) — {{REVISION_ROUNDS}} rounds; $150/hr ad-hoc
9. **Next steps & owners** (2 min)

**Within 24 hours after:** send written recap (decisions, dates, homework).

---

## 3. Written recap email (template)

Subject: `Recap — {{BUSINESS_NAME}} kickoff {{DATE}}`

Hi {{FIRST_NAME}},

Thanks for today. **Decisions:**  

- …

**Homework (by {{DATE}}):**  

- …

**Dates:**  

- …

**Revisions:** Your package includes **{{REVISION_ROUNDS}}** consolidated round(s) per phase — batch changes to stay on budget.

If anything looks off, reply by {{DATE}}.

— {{YOUR_NAME}}

---

## 4. Homework checklist (Balanced) — add to Simple list

- **Page map** aligned to package (which URLs / sections)  
- **Forms / booking:** Calendly, embedded tool, or simple contact only?  
- **SEO priority:** top services or suburbs to mention  
- **Post-launch:** who will do small content edits (name + email)  
- **Optional:** Google Business Profile manager access for NAP consistency

---

## 5. Revision policy (Balanced — slightly firmer)

Same as Simple, plus:  
“After each round, I’ll confirm what’s in scope for the next deliverable. Requests outside the package are quoted before work starts.”