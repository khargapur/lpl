import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import TestsBrowser from "@/components/tests-browser";

export const metadata: Metadata = {
  title: "Diagnostic Tests in Lucknow | CBC, Sugar, Thyroid & More | Dr. Lal PathLabs",
  description:
    "Browse all blood tests available at Dr. Lal PathLabs, Gomti Nagar, Lucknow. CBC ₹210, Blood Sugar ₹50, HbA1c ₹400, Lipid Profile ₹350, KFT ₹630 & more. Book online or call for home collection.",
  keywords: [
    "blood test Lucknow",
    "CBC test Lucknow price",
    "blood sugar test Lucknow",
    "HbA1c test Lucknow",
    "lipid profile Lucknow",
    "thyroid test Lucknow",
    "kidney function test Lucknow",
    "pathology tests Lucknow",
    "diagnostic tests Gomti Nagar",
    "cheap blood test Lucknow",
  ],
  alternates: { canonical: "/tests" },
  openGraph: {
    title: "Diagnostic Tests in Lucknow | Dr. Lal PathLabs Gomti Nagar",
    description:
      "All blood tests at lowest prices. CBC ₹210, Sugar ₹50, HbA1c ₹400. Book online or home collection in Lucknow.",
    url: "https://lallabslucknow.com/tests",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnostic Tests in Lucknow | Dr. Lal PathLabs",
    description: "Browse 100+ blood tests at affordable prices in Gomti Nagar, Lucknow.",
  },
};

export const revalidate = 3600;

export default async function TestsPage() {
  const supabase = createSupabaseServerClient();

  // Fetch initial page of tests + all categories for the filter
  const [{ data: initialTests, count }, { data: categoryRows }] = await Promise.all([
    supabase
      .from("lab_tests")
      .select("test_code, test_name, slug, specimen, report, category, aliases, method, price", { count: "exact" })
      .order("test_name")
      .range(0, 11),
    supabase
      .from("lab_tests")
      .select("category")
      .order("category"),
  ]);

  // Build category list with counts
  const categoryMap = new Map<string, number>();
  (categoryRows as { category: string }[] | null)?.forEach((row) => {
    categoryMap.set(row.category, (categoryMap.get(row.category) ?? 0) + 1);
  });
  const categories = Array.from(categoryMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lallabslucknow.com" },
      { "@type": "ListItem", position: 2, name: "Tests", item: "https://lallabslucknow.com/tests" },
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
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Our Tests</h1>
              <p className="text-white/85 mb-6 text-sm">
                Browse our comprehensive range of {count ?? 0} diagnostic tests
              </p>
            </div>
          </div>
        </section>

        <TestsBrowser
          initialTests={(initialTests as any[]) ?? []}
          totalCount={count ?? 0}
          categories={categories}
        />
      </main>
      <Footer />
    </>
  );
}
