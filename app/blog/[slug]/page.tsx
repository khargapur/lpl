import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

interface Props {
  params: { slug: string };
}

export const revalidate = 3600;

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return data as BlogPost;
}

export async function generateStaticParams() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  return ((data as { slug: string }[] | null) ?? []).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Dr. Lal PathLabs Lucknow Health Blog`,
    description: `${post.excerpt} Read more health tips from Dr. Lal PathLabs, Gomti Nagar, Lucknow.`,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at ?? post.created_at,
      authors: [SITE_CONFIG.name],
      images: [{ url: post.image_url, alt: post.title }],
      url: `https://lallabslucknow.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image_url],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const publishDate = post.published_at ?? post.created_at;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image_url,
    datePublished: publishDate,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: "https://lallabslucknow.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Dr. Lal PathLabs Lucknow",
      logo: {
        "@type": "ImageObject",
        url: "https://media.lalpathlabs.com/media/logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://lallabslucknow.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main>
        <article className="py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <div className="mb-8">
                <Button
                  asChild
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Link href="/blog">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Link>
                </Button>
              </div>

              {/* Header */}
              <header className="mb-8">
                <Badge className="bg-brand-red mb-4">{post.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4 font-heading">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(publishDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.read_time}
                  </span>
                </div>

                {/* Featured Image */}
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
                />
              </header>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {post.content.split("\n\n").map((paragraph, idx) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={idx} className="text-2xl font-bold text-brand-blue mt-8 mb-4 font-heading">
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  return (
                    <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}

                <div className="flex flex-wrap gap-4 mt-8">
                  <Button asChild className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl">
                    <Link href="/book-test">Book a Test</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl"
                  >
                    <Link href="/tests">View All Tests</Link>
                  </Button>
                </div>
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-light-grey">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">Share this article:</span>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
