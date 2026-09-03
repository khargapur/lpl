"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { BlogPost } from "@/lib/types";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  FileText,
  Eye,
  EyeOff,
  ExternalLink,
  FlaskConical,
  LogOut,
} from "lucide-react";

export default function AdminBlogListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const supabase = createSupabaseBrowserClient();

  const checkAuthAndLoad = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.replace("/admin/login");
      return;
    }

    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("id")
      .eq("id", session.user.id)
      .maybeSingle();

    if (!profile) {
      supabase.auth.signOut();
      router.replace("/admin/login");
      return;
    }

    setAuthChecked(true);

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load blog posts", error);
    }
    setPosts((data as BlogPost[] | null) ?? []);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkAuthAndLoad();
  }, [checkAuthAndLoad]);

  async function handleDelete() {
    if (deleteId === null) return;
    setDeleting(true);
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", deleteId);

    setDeleting(false);
    setDeleteId(null);

    if (error) {
      console.error("Delete failed", error);
      return;
    }

    setPosts((prev) => prev.filter((p) => p.id !== deleteId));
  }

  async function togglePublish(post: BlogPost) {
    const newStatus = post.status === "published" ? "draft" : "published";
    const updates: Partial<BlogPost> = {
      status: newStatus,
      published_at: newStatus === "published" ? (post.published_at ?? new Date().toISOString()) : null,
    };

    const { error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", post.id);

    if (error) {
      console.error("Update failed", error);
      return;
    }

    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, ...updates } as BlogPost : p))
    );
  }

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
      </div>
    );
  }

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

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
            <span className="hidden sm:block text-slate-600 text-xs">— Blog Manager</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 border border-slate-700 hover:border-blue-500/40 rounded-lg px-3 py-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Dashboard
            </Link>
            <button
              onClick={() => {
                supabase.auth.signOut();
                router.replace("/admin/login");
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/40 rounded-lg px-3 py-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-400" />
            <div>
              <h1 className="text-lg font-bold text-white">Blog Posts</h1>
              <p className="text-slate-400 text-xs mt-0.5">
                {publishedCount} published · {draftCount} draft{draftCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>

        {/* Post list */}
        {posts.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
            <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No blog posts yet. Create your first post.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex items-start gap-4 hover:border-slate-700 transition-colors"
              >
                {/* Thumbnail */}
                <div className="hidden sm:block w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                  {post.image_url && (
                    <img src={post.image_url} alt="" className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        post.status === "published"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {post.status === "published" ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs text-slate-500">{post.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white truncate">{post.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{post.excerpt}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {new Date(post.created_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => togglePublish(post)}
                    title={post.status === "published" ? "Unpublish" : "Publish"}
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                  >
                    {post.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    title="Edit"
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  {post.status === "published" && (
                    <Link
                      href={`/blog/${post.slug}`}
                      title="View on site"
                      className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                  <button
                    onClick={() => setDeleteId(post.id)}
                    title="Delete"
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete confirmation modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-base font-semibold text-white mb-2">Delete this post?</h3>
            <p className="text-sm text-slate-400 mb-5">
              This action cannot be undone. The post will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
