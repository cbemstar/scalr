import { NextResponse } from "next/server"
import { z } from "zod"
import {
  createInquiryRecord,
  normalizeInquiryWebsiteUrl,
} from "@/lib/airtable-inquiry"
import { verifyTurnstileToken } from "@/lib/verify-turnstile"

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
  turnstileToken: z.string().max(4000).optional().default(""),
})

function clientIpFromRequest(request: Request): string | undefined {
  const cf = request.headers.get("cf-connecting-ip")?.trim()
  if (cf) return cf
  const xff = request.headers.get("x-forwarded-for")?.trim()
  if (xff) return xff.split(",")[0]?.trim()
  return undefined
}

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

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (turnstileSecret) {
    const token = (parsed.data.turnstileToken ?? "").trim()
    if (!token) {
      return NextResponse.json(
        { error: "Please complete the security check before submitting." },
        { status: 400 }
      )
    }
    const verified = await verifyTurnstileToken(token, clientIpFromRequest(request))
    if (!verified) {
      return NextResponse.json(
        { error: "Security verification failed. Refresh the page and try again." },
        { status: 403 }
      )
    }
  }

  try {
    const { turnstileToken, ...inquiryFields } = parsed.data
    void turnstileToken
    const { id } = await createInquiryRecord({
      ...inquiryFields,
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
