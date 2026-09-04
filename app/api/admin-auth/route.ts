import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const ADMIN_EMAIL = "admin@lallabslucknow.com";
const SESSION_COOKIE = "admin-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Simple HMAC-like token: base64(email:timestamp:hmac)
function createToken(email: string): string {
  const secret = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const timestamp = Date.now();
  const payload = `${email}:${timestamp}`;
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64");
}

function verifyToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 3) return null;
    const [email, timestampStr, hmac] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return null;

    // Check token age (7 days)
    const age = Date.now() - timestamp;
    if (age > SESSION_MAX_AGE * 1000) return null;

    // Verify HMAC
    const secret = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const crypto = require("crypto");
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

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Verify password against auth.users using a Supabase RPC
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );

    // Use a Postgres function via RPC to verify the password hash
    const { data, error } = await supabase.rpc("verify_admin_password", {
      input_email: normalizedEmail,
      input_password: password,
    });

    if (error || !data) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const valid = typeof data === "boolean" ? data : (data as any)?.valid === true;

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Create session token
    const token = createToken(normalizedEmail);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    return NextResponse.json({ success: true, email: normalizedEmail });
  } catch (err: any) {
    return NextResponse.json(
      { error: "An error occurred during login." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const email = verifyToken(token);
  if (!email) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true, email });
}
