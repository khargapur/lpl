"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { BlogPost, BlogPostInsert } from "@/lib/types";
import { ArrowLeft, Loader2, Save, Trash2, FlaskConical, LogOut } from "lucide-react";

const CATEGORIES = [
  "Health Tips",
  "Health Education",
  "Diabetes",
  "Thyroid",
  "Nutrition",
  "Women's Health",
  "Heart Health",
  "General",
];

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const postId = Number(params.id);
  const supabase = createSupabaseBrowserClient();
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const loadPost = useCallback(async () => {
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

    const { data, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .maybeSingle();

    if (fetchError || !data) {
      setLoading(false);
      return;
    }

    const post = data as BlogPost;
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCategory(post.category);
    setImageUrl(post.image_url);
    setReadTime(post.read_time);
    setStatus(post.status);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim()) {
      setError("Title, slug, excerpt, and content are required.");
      return;
    }

    setSaving(true);

    const updates: Partial<BlogPostInsert> = {
      slug: slug.trim(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category.trim(),
      image_url: imageUrl.trim(),
      read_time: readTime.trim(),
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    };

    const { error: updateError } = await supabase
      .from("blog_posts")
      .update(updates as never)
      .eq("id", postId);

    if (updateError) {
      if (updateError.code === "23505") {
        setError("A post with this slug already exists. Please choose a different slug.");
      } else {
        setError("Could not save the post. Please try again.");
      }
      console.error("Update failed", updateError);
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
  }

  async function handleDelete() {
    setDeleting(true);
    const { error: deleteError } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", postId);

    setDeleting(false);
    if (deleteError) {
      setError("Could not delete the post. Please try again.");
      console.error("Delete failed", deleteError);
      return;
    }
    router.push("/admin/blog");
  }

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-blue-400" />
            </div>
            <span className="font-semibold text-sm text-white">Admin Portal</span>
            <span className="hidden sm:block text-slate-600 text-xs">— Edit Post</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 border border-slate-700 hover:border-blue-500/40 rounded-lg px-3 py-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Blog List
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-white">Edit Blog Post</h1>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 rounded-lg px-3 py-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-5 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors font-mono"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Featured Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Excerpt *</label>
            <textarea
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Content *</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={14}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-y font-mono"
            />
            <p className="text-xs text-slate-500">Use ## for section headings. Separate paragraphs with blank lines.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
            <Link
              href="/admin/blog"
              className="px-5 py-2.5 text-sm text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-base font-semibold text-white mb-2">Delete this post?</h3>
            <p className="text-sm text-slate-400 mb-5">
              This action cannot be undone. The post will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
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
