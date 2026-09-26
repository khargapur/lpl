// Server-side lead forwarder: validates the /book-test submission
// (Turnstile / honeypot / time-trap / rate-limit) and forwards only genuine
// leads to the CRM ingest endpoint. The shared secret never touches client JS.
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// 5 leads per hour per IP (best-effort in-memory).
const LEADS_PER_HOUR = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 3_600_000;
  const arr = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  if (arr.length >= LEADS_PER_HOUR) return false;
  arr.push(now);
  hits.set(ip, arr);
  return true;
}

/** Indian mobile: 10 digits starting 6-9 (accepts +91 / 0 prefixes). */
function normalizePhone(raw: unknown): string | null {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

async function verifyTurnstile(
  token: string | undefined,
  ip: string
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Fail-open: keys not configured → caller falls back to honeypot+time-trap.
  if (!secret) return { ok: true };
  if (!token) return { ok: false, reason: "missing-turnstile-token" };
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
        signal: AbortSignal.timeout(8000),
      }
    );
    const data = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (data.success) return { ok: true };
    return {
      ok: false,
      reason: `turnstile-failed:${(data["error-codes"] || ["unknown"]).join(",")}`,
    };
  } catch (e) {
    return {
      ok: false,
      reason: `turnstile-verify-error:${e instanceof Error ? e.message : e}`,
    };
  }
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  // Honeypot is always enforced — real users never see the field.
  if (String(body.company ?? "").trim()) {
    console.warn(`[lead] rejected: honeypot ip=${ip}`);
    return NextResponse.json({ ok: false, error: "Rejected" }, { status: 400 });
  }

  const turnstileConfigured = !!process.env.TURNSTILE_SECRET_KEY;
  if (turnstileConfigured) {
    const v = await verifyTurnstile(
      String(body.turnstileToken ?? "") || undefined,
      ip
    );
    if (!v.ok) {
      console.warn(`[lead] rejected: ${v.reason} ip=${ip}`);
      return NextResponse.json({ ok: false, error: "Spam check failed" }, { status: 400 });
    }
  } else {
    // Fail-open fallback: honeypot + time-trap + rate-limit.
    console.warn(
      "[lead] TURNSTILE_SECRET_KEY not set — fallback to honeypot+time-trap+rate-limit (fail-open)"
    );
    const loadedAt = Number(body.formLoadedAt || 0);
    const elapsed = loadedAt ? Date.now() - loadedAt : Infinity;
    if (elapsed < 3000) {
      console.warn(`[lead] rejected: time-trap (${elapsed}ms) ip=${ip}`);
      return NextResponse.json({ ok: false, error: "Rejected" }, { status: 400 });
    }
  }

  if (!rateLimited(ip)) {
    console.warn(`[lead] rejected: rate-limit ip=${ip}`);
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const phone = normalizePhone(body.phone);
  if (!name || !phone) {
    console.warn(`[lead] rejected: invalid name/phone ip=${ip}`);
    return NextResponse.json({ ok: false, error: "Invalid lead" }, { status: 400 });
  }

  const secret = process.env.LEAD_INGEST_SECRET;
  const crmUrl = process.env.CRM_LEADS_URL;
  if (!secret || !crmUrl) {
    console.error("[lead] LEAD_INGEST_SECRET or CRM_LEADS_URL not configured");
    return NextResponse.json(
      { ok: false, error: "Lead pipeline not configured" },
      { status: 500 }
    );
  }

  try {
    const fwd = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lead-secret": secret,
      },
      body: JSON.stringify({ ...body, name, phone }),
      signal: AbortSignal.timeout(20000),
    });
    const data = await fwd.json().catch(() => ({}));
    return NextResponse.json(data, { status: fwd.status });
  } catch (e) {
    console.error(
      "[lead] CRM forward failed:",
      e instanceof Error ? e.message : e
    );
    return NextResponse.json({ ok: false, error: "Forward failed" }, { status: 502 });
  }
}
