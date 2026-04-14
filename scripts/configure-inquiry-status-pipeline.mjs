#!/usr/bin/env node
/**
 * Sets the Inquiries → Status single-select options for a CRM / enquiry Kanban pipeline.
 *
 * Requires a Personal Access Token with schema.bases:write (and data.records:read recommended).
 *
 * Usage (from repo root):
 *   AIRTABLE_PAT=pat... node scripts/configure-inquiry-status-pipeline.mjs
 *
 * Optional env:
 *   AIRTABLE_BASE_ID (default: appBhlcJvtiCaRxPT)
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "appBhlcJvtiCaRxPT"
const TABLE_ID = "tbljimurt0lbeMq4d"
const FIELD_ID = "flduYUit98GhawVOk"

/** Order = left-to-right in Kanban (early → closed). Names must match `INQUIRY_PIPELINE_DEFAULT_STATUS` in code. */
const PIPELINE_CHOICES = [
  { name: "New enquiry", color: "grayLight2" },
  { name: "Contacted", color: "blueLight2" },
  { name: "Qualified", color: "cyanLight2" },
  { name: "Proposal sent", color: "yellowLight2" },
  { name: "Awaiting decision", color: "orangeLight2" },
  { name: "Won", color: "greenLight2" },
  { name: "Lost", color: "redLight2" },
  { name: "On hold", color: "purpleLight2" },
]

const FIELD_DESCRIPTION =
  "Sales / enquiry pipeline for Kanban. New form submissions default to “New enquiry” (see app: src/lib/airtable-inquiry.ts)."

async function main() {
  const token = process.env.AIRTABLE_PAT?.trim()
  if (!token) {
    console.error(
      "Missing AIRTABLE_PAT. Create a token with schema.bases:write at https://airtable.com/create/tokens"
    )
    process.exit(1)
  }

  const url = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables/${TABLE_ID}/fields/${FIELD_ID}`

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Status",
      description: FIELD_DESCRIPTION,
      type: "singleSelect",
      options: {
        choices: PIPELINE_CHOICES,
      },
    }),
  })

  const text = await res.text()
  if (!res.ok) {
    console.error(`Airtable API error ${res.status}:`, text)
    process.exit(1)
  }

  console.log("Status field updated with pipeline options:")
  for (const c of PIPELINE_CHOICES) {
    console.log(`  - ${c.name}`)
  }
  console.log("\nIn Airtable: create a Kanban view grouped by Status, ordered by the field option order above.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
