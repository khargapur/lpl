"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

const SESSION_COOKIE = "admin-session";

export function useAdminAuth() {
  const router = useRouter();

  const checkAuth = useCallback(async (): Promise<{ authenticated: boolean; email?: string }> => {
    try {
      const res = await fetch("/api/admin-auth", { method: "GET" });
      if (!res.ok) return { authenticated: false };
      const data = await res.json();
      return { authenticated: !!data.authenticated, email: data.email };
    } catch {
      return { authenticated: false };
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Invalid email or password." };
      }
      return { success: true };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/admin-auth", { method: "DELETE" });
    } catch {
      // ignore
    }
    router.replace("/admin/login");
  }, [router]);

  return { checkAuth, login, logout };
}
