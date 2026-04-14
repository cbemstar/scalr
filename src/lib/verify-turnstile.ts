/**
 * Cloudflare Turnstile server-side verification.
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

type SiteverifyResponse = {
  success: boolean
  "error-codes"?: string[]
}

export async function verifyTurnstileToken(
  token: string,
  remoteip?: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false

  const body = new URLSearchParams()
  body.set("secret", secret)
  body.set("response", token)
  if (remoteip?.trim()) {
    body.set("remoteip", remoteip.trim())
  }

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  })

  if (!res.ok) return false

  const data = (await res.json()) as SiteverifyResponse
  return data.success === true
}
