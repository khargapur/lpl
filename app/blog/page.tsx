import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogCard from "@/components/blog-card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Health Blog – Tips on Blood Tests, Diabetes & Wellness | Dr. Lal PathLabs Lucknow",
  description:
    "Read health articles, blood test guides, diabetes management tips and wellness advice from Dr. Lal PathLabs, Gomti Nagar, Lucknow. Stay informed, stay healthy.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Health Blog | Dr. Lal PathLabs Lucknow",
    description: "Tips on blood tests, diabetes, thyroid health, vitamin deficiency and more from Lucknow's trusted diagnostic centre.",
    url: "https://lallabslucknow.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Blog | Dr. Lal PathLabs Lucknow",
    description: "Tips on blood tests, diabetes, thyroid health and wellness from Lucknow's trusted diagnostic centre.",
  },
};

export const revalidate = 3600;

async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return data as BlogPost[];
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lallabslucknow.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://lallabslucknow.com/blog" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main>
        <section className="bg-brand-blue text-white py-12 md:py-16">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 font-heading">Health Blog</h1>
            <p className="text-white/85 text-sm">Stay informed with health tips, guides, and wellness articles</p>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-light-bg">
          <div className="container-custom">
            <p className="text-xs text-gray-400 mb-6">Showing {posts.length} articles</p>
            {posts.length === 0 ? (
              <p className="text-gray-500 text-sm">No articles published yet. Please check back soon.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    slug={blog.slug}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    category={blog.category}
                    date={blog.published_at ?? blog.created_at}
                    readTime={blog.read_time}
                    image={blog.image_url}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
