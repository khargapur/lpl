"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import {
  FlaskConical,
  LogOut,
  LayoutDashboard,
  TestTube2,
  PackageCheck,
  Users,
  FileText,
  ChevronRight,
  Loader2,
} from "lucide-react";

const STATS = [
  { label: "Total Tests", value: "—", icon: TestTube2, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Health Packages", value: "8", icon: PackageCheck, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { label: "Blog Posts", value: "6", icon: FileText, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { label: "Admin Users", value: "1", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
];

const QUICK_LINKS = [
  { label: "Tests Database", desc: "Browse all lab tests", href: "/tests", icon: TestTube2 },
  { label: "Health Packages", desc: "Manage packages", href: "/health-packages", icon: PackageCheck },
  { label: "Blog Posts", desc: "Create & edit articles", href: "/admin/blog", icon: FileText },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { checkAuth, logout } = useAdminAuth();
  const [email, setEmail] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    checkAuth().then(({ authenticated, email }) => {
      if (!authenticated) {
        router.replace("/admin/login");
        return;
      }
      setEmail(email);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-blue-400" />
            </div>
            <span className="font-semibold text-sm text-white">Admin Portal</span>
            <span className="hidden sm:block text-slate-600 text-xs">— Dr. Lal PathLabs</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-slate-500 truncate max-w-[160px]">{email}</span>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/40 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50"
            >
              {loggingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Welcome */}
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-blue-400" />
          <div>
            <h1 className="text-lg font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-xs mt-0.5">Welcome back, {email?.split("@")[0]}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className={`rounded-xl border p-4 ${stat.bg} bg-slate-900`}>
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-center gap-4 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-4 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                  <link.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">{link.label}</p>
                  <p className="text-xs text-slate-500">{link.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-slate-400 flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Session info */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-400 mb-2">Session Details</p>
          <p>Email: <span className="text-slate-300">{email}</span></p>
          <p>Session: <span className="text-slate-300 font-mono">active</span></p>
        </div>
      </main>
    </div>
  );
}
