import { MetadataRoute } from "next";
import { HEALTH_PACKAGES } from "@/lib/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const BASE_URL = "https://lallabslucknow.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const highPriorityPages = [
    { route: "", priority: 1.0 },
    { route: "/book-test", priority: 0.95 },
    { route: "/tests", priority: 0.9 },
    { route: "/health-packages", priority: 0.9 },
    { route: "/home-collection", priority: 0.9 },
    { route: "/contact", priority: 0.85 },
  ];

  const supportPages = [
    { route: "/about", priority: 0.75 },
    { route: "/faq", priority: 0.75 },
    { route: "/blog", priority: 0.7 },
    { route: "/download-report", priority: 0.65 },
    { route: "/privacy-policy", priority: 0.3 },
    { route: "/terms", priority: 0.3 },
  ];

  const staticRoutes = [...highPriorityPages, ...supportPages].map(
    ({ route, priority }) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    })
  );

  // Fetch all test slugs from Supabase
  const supabase = createSupabaseServerClient();
  const { data: tests } = await supabase
    .from("lab_tests")
    .select("slug, created_at")
    .order("slug");

  const testRoutes = ((tests as { slug: string; created_at: string | null }[] | null) ?? []).map((test) => ({
    url: `${BASE_URL}/tests/${test.slug}`,
    lastModified: test.created_at ? new Date(test.created_at) : now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const packageRoutes = HEALTH_PACKAGES.map((pkg) => ({
    url: `${BASE_URL}/health-packages/${pkg.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("status", "published");

  const blogRoutes = ((blogPosts as { slug: string; updated_at: string }[] | null) ?? []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...testRoutes, ...packageRoutes, ...blogRoutes];
}
