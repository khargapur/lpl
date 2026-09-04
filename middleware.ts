import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

const SESSION_COOKIE = "admin-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function verifyToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 3) return null;
    const [email, timestampStr, hmac] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return null;

    const age = Date.now() - timestamp;
    if (age > SESSION_MAX_AGE * 1000) return null;

    const secret = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const expectedHmac = crypto
      .createHmac("sha256", secret)
      .update(`${email}:${timestamp}`)
      .digest("hex");

    if (hmac !== expectedHmac) return null;

    return email;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const email = verifyToken(token);

  if (!email) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
