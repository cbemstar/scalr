/**
 * Server-only: creates rows in Airtable via the REST API (not MCP — MCP is for AI tools in the IDE).
 *
 * In Airtable, create a table named `Inquiries` (or set AIRTABLE_TABLE_NAME) with these fields:
 * Recommended field types (matches “Inquiries” table): Name (primary text), Email, Phone (phone),
 * Business type … Current site (single line text), Website URL (url), Message (long text).
 *
 * PAT needs scopes: data.records:write, schema.bases:read (and data.records:read if you read via API).
 * Base must be selected for this integration in Airtable → Integrations.
 */

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
    [f.businessType]: data.businessType,
    [f.packageInterest]: data.packageInterest,
    [f.platformPreference]: data.platformPreference,
    [f.contentReadiness]: data.contentReadiness,
    [f.copywritingSupport]: data.copywritingSupport,
    [f.timeline]: data.timeline,
    [f.currentSite]: data.currentSite,
    [f.name]: data.name.trim(),
    [f.email]: data.email.trim(),
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
