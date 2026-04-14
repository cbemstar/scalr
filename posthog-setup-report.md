<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the NZ Web Studio Next.js App Router project. PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), which runs automatically on the client side with no provider wrapper needed. A reverse proxy is configured in `next.config.ts` to route PostHog requests through `/ingest`, improving ad-blocker resilience. Twelve events covering the full lead-generation funnel — from hero engagement through inquiry form submission — were instrumented across eight files. Environment variables are stored in `.env.local`.

| Event | Description | File |
|---|---|---|
| `hero_cta_clicked` | User clicks the primary or secondary CTA in the hero section. Properties: `label`, `variant` | `src/components/sections/hero.tsx` |
| `inquiry_form_started` | User selects their first option in the multi-step form, beginning the lead qualification flow | `src/components/ui/multistep-form.tsx` |
| `inquiry_form_step_completed` | User advances to the next form step. Properties: `step_number`, `step_name` | `src/components/ui/multistep-form.tsx` |
| `inquiry_form_submitted` | User submits the completed inquiry form — primary conversion event. Properties: `business_type`, `package_interest`, `platform_preference`, `timeline`, `current_site` | `src/components/ui/multistep-form.tsx` |
| `pricing_cta_clicked` | User clicks a pricing card CTA. Properties: `plan_name`, `plan_price` | `src/components/ui/pricing.tsx` |
| `pricing_comparison_opened` | User expands the "Compare all plans in detail" accordion | `src/components/ui/pricing.tsx` |
| `faq_item_opened` | User expands a FAQ accordion item. Property: `question` | `src/components/sections/faq.tsx` |
| `contact_phone_clicked` | User clicks a phone number link — high purchase intent. Property: `source` (about, contact, footer) | `src/components/sections/about.tsx`, `src/components/sections/final-cta.tsx`, `src/components/layout/site-footer.tsx` |
| `contact_email_clicked` | User clicks the email link. Property: `source` | `src/components/layout/site-footer.tsx` |
| `linkedin_clicked` | User clicks the LinkedIn profile link. Property: `source` (about, footer) | `src/components/sections/about.tsx`, `src/components/layout/site-footer.tsx` |
| `nav_link_clicked` | User clicks a nav link in the mobile/desktop menu. Properties: `label`, `href` | `src/components/ui/sterling-gate-kinetic-navigation.tsx` |
| `footer_service_link_clicked` | User clicks a service link in the footer. Property: `label` | `src/components/layout/site-footer.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/374857/dashboard/1446768
- **Inquiry Funnel: Hero → Pricing → Form**: https://us.posthog.com/project/374857/insights/IsbmNYZn
- **Lead Signals: Inquiries, Calls & Emails**: https://us.posthog.com/project/374857/insights/kq05soUr
- **Pricing Engagement: CTA Clicks & Comparison Opens**: https://us.posthog.com/project/374857/insights/pdqY37nT
- **Top FAQ Questions Opened**: https://us.posthog.com/project/374857/insights/zlXFDscT
- **Inquiry Form Step Drop-off**: https://us.posthog.com/project/374857/insights/oWKmvkCA

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
