/**
 * Server-only: creates rows in Airtable via the REST API (not MCP — MCP is for AI tools in the IDE).
 *
 * ## Airtable table schema (`Inquiries` or `AIRTABLE_TABLE_NAME`)
 *
 * Create these columns (exact names — see `AIRTABLE_INQUIRY_FIELD_NAMES`):
 *
 * | Field name            | Type            | Notes |
 * |-----------------------|-----------------|-------|
 * | Name                  | Single line text| Primary field |
 * | Email                 | Email           | |
 * | Phone                 | Phone           | Optional; omit column if you never collect phone |
 * | Business type         | Single line text| **Not** Single select — form adds new choices over time (e.g. “Not sure”). API stores **human-readable** labels via `inquiry-field-labels.ts`. |
 * | Package interest      | Single line text| Same — values include `Standard site · …`, `Shopify · …`, or “Not sure yet — recommend…”. |
 * | Platform preference   | Single line text| |
 * | Content readiness     | Single line text| |
 * | Copywriting support   | Single line text| |
 * | Timeline              | Single line text| |
 * | Current site          | Single line text| |
 * | Website URL           | URL             | Optional |
 * | Message               | Long text       | Optional; may include an auto-appended block for integration path, add-ons, and tools notes (see `appendIntegrationNotesToMessage` in `api/inquiry/route.ts`). |
 * | Status                | Single select   | CRM pipeline (Kanban). New rows default to **New enquiry** — configure options with `scripts/configure-inquiry-status-pipeline.mjs` (requires PAT with `schema.bases:write`). |
 *
 * If any choice column was **Single select**, new form options (e.g. `not-sure`) would be **rejected**
 * by Airtable until you add each option. Using **Single line text** avoids that.
 *
 * PAT needs scopes: data.records:write, schema.bases:read (and data.records:read if you read via API).
 * Base must be selected for this integration in Airtable → Integrations.
 */

import {
  labelBusinessType,
  labelContentReadiness,
  labelCopywritingSupport,
  labelCurrentSite,
  labelPackageInterest,
  labelPlatformPreference,
  labelTimeline,
} from "@/lib/inquiry-field-labels"

/** Must match the first option in `scripts/configure-inquiry-status-pipeline.mjs` */
export const INQUIRY_PIPELINE_DEFAULT_STATUS = "New enquiry" as const

export const AIRTABLE_INQUIRY_FIELD_NAMES = {
  businessType: "Business type",
  packageInterest: "Package interest",
  platformPreference: "Platform preference",
  contentReadiness: "Content readiness",
  copywritingSupport: "Copywriting support",
  timeline: "Timeline",
  currentSite: "Current site",
  websiteUrl: "Website URL",
  name: "Name",
  email: "Email",
  phone: "Phone",
  message: "Message",
  status: "Status",
} as const

export type InquiryFormPayload = {
  businessType: string
  packageInterest: string
  platformPreference: string
  contentReadiness: string
  copywritingSupport: string
  timeline: string
  currentSite: string
  /** Normalized https URL, or empty string */
  websiteUrl: string
  name: string
  email: string
  phone: string
  message: string
}

/** Returns a normalized absolute URL, or null if empty/invalid. Prepends https:// when missing. */
export function normalizeInquiryWebsiteUrl(raw: string): string | null {
  const t = raw.trim()
  if (!t) return null
  const candidate = /^https?:\/\//i.test(t) ? t : `https://${t}`
  try {
    return new URL(candidate).href
  } catch {
    return null
  }
}

function mapToAirtableFields(data: InquiryFormPayload): Record<string, string> {
  const f = AIRTABLE_INQUIRY_FIELD_NAMES
  const fields: Record<string, string> = {
    [f.businessType]: labelBusinessType(data.businessType),
    [f.packageInterest]: labelPackageInterest(data.packageInterest),
    [f.platformPreference]: labelPlatformPreference(data.platformPreference),
    [f.contentReadiness]: labelContentReadiness(data.contentReadiness),
    [f.copywritingSupport]: labelCopywritingSupport(data.copywritingSupport),
    [f.timeline]: labelTimeline(data.timeline),
    [f.currentSite]: labelCurrentSite(data.currentSite),
    [f.name]: data.name.trim(),
    [f.email]: data.email.trim(),
    [f.status]: INQUIRY_PIPELINE_DEFAULT_STATUS,
  }
  const url = data.websiteUrl.trim()
  if (url) fields[f.websiteUrl] = url
  const phone = data.phone.trim()
  if (phone) fields[f.phone] = phone
  const message = data.message.trim()
  if (message) fields[f.message] = message
  return fields
}

export async function createInquiryRecord(data: InquiryFormPayload): Promise<{ id: string }> {
  const baseId = process.env.AIRTABLE_BASE_ID
  const token = process.env.AIRTABLE_PAT
  const tableName = process.env.AIRTABLE_TABLE_NAME ?? "Inquiries"

  if (!baseId?.trim() || !token?.trim()) {
    throw new Error("Missing AIRTABLE_BASE_ID or AIRTABLE_PAT")
  }

  const url = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`
  const fields = mapToAirtableFields(data)

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [{ fields }],
    }),
  })

  const json = (await res.json()) as {
    records?: { id: string }[]
    error?: string
    message?: string
  }

  if (!res.ok) {
    const detail = json.message ?? json.error ?? res.statusText
    throw new Error(`Airtable error (${res.status}): ${detail}`)
  }

  const id = json.records?.[0]?.id
  if (!id) {
    throw new Error("Airtable returned no record id")
  }

  return { id }
}
