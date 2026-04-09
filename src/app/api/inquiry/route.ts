import { NextResponse } from "next/server"
import { z } from "zod"
import {
  createInquiryRecord,
  normalizeInquiryWebsiteUrl,
} from "@/lib/airtable-inquiry"

const inquirySchema = z.object({
  businessType: z.string().min(1).max(200),
  packageInterest: z.string().min(1).max(200),
  platformPreference: z.string().min(1).max(200),
  contentReadiness: z.string().min(1).max(200),
  copywritingSupport: z.string().min(1).max(200),
  timeline: z.string().min(1).max(200),
  currentSite: z.string().min(1).max(200),
  websiteUrl: z.string().max(2000).optional().default(""),
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().max(80).optional().default(""),
  message: z.string().max(8000).optional().default(""),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = inquirySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const normalizedUrl = normalizeInquiryWebsiteUrl(parsed.data.websiteUrl ?? "")
  if ((parsed.data.websiteUrl ?? "").trim() && !normalizedUrl) {
    return NextResponse.json(
      { error: "Enter a valid website URL or leave it blank." },
      { status: 422 }
    )
  }

  try {
    const { id } = await createInquiryRecord({
      ...parsed.data,
      websiteUrl: normalizedUrl ?? "",
    })
    return NextResponse.json({ ok: true, id })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Submission failed"
    console.error("[api/inquiry]", message)
    return NextResponse.json(
      { error: "Could not save your inquiry. Please try again or email us directly." },
      { status: 502 }
    )
  }
}
