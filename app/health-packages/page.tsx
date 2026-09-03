import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PackageCard from "@/components/package-card";
import CTABanner from "@/components/cta-banner";
import { HEALTH_PACKAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Health Checkup Packages Lucknow | Super 1 ₹1250, Super 2 ₹1550 | Dr. Lal PathLabs",
  description:
    "Affordable health checkup packages in Lucknow – Super 1 (₹1250), Super 2 (₹1550), Super 3 (₹2250), Super 4 (₹2550). Comprehensive blood test panels at Dr. Lal PathLabs, Gomti Nagar. Book online now.",
  keywords: [
    "health checkup package Lucknow",
    "full body checkup Lucknow",
    "health package Gomti Nagar",
    "blood test package Lucknow",
    "preventive health checkup Lucknow",
    "affordable health checkup Lucknow",
    "Super health package Lucknow",
  ],
  alternates: { canonical: "/health-packages" },
  openGraph: {
    title: "Health Checkup Packages Lucknow | Starting ₹1250 | Dr. Lal PathLabs",
    description: "Super 1 ₹1250, Super 2 ₹1550, Super 3 ₹2250, Super 4 ₹2550. Book health packages in Gomti Nagar, Lucknow.",
    url: "https://lallabslucknow.com/health-packages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Checkup Packages Lucknow | From ₹1250 | Dr. Lal PathLabs",
    description: "Super 1–4 health packages in Gomti Nagar, Lucknow. Book online now.",
  },
};

export default function HealthPackagesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lallabslucknow.com" },
      { "@type": "ListItem", position: 2, name: "Health Packages", item: "https://lallabslucknow.com/health-packages" },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-3 font-heading">Health Checkup Packages</h1>
            <p className="text-white/85 text-sm">Save more with our comprehensive health packages designed for complete wellness screening</p>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-light-bg">
          <div className="container-custom">
            <p className="text-xs text-gray-400 mb-6">Showing {HEALTH_PACKAGES.length} health packages</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {HEALTH_PACKAGES.map((pkg) => <PackageCard key={pkg.id} {...pkg} />)}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-blue mb-6 font-heading text-center">Choosing the Right Package</h2>
            <div className="grid sm:grid-cols-2 gap-5 text-sm text-gray-600">
              {[
                { title: "Basic Health Checkup", desc: "Ideal for young adults (18–40) looking for routine health screening. Covers essential tests for overall health assessment." },
                { title: "Comprehensive Package", desc: "Recommended for adults 30+ with detailed organ function tests. Includes thyroid, vitamins, and metabolic screening." },
                { title: "Executive Package", desc: "Perfect for busy professionals 35+ with additional cardiac screening." },
                { title: "Senior Citizen Package", desc: "Specially designed for seniors 55+ with bone health, cancer markers, and comprehensive cardiac evaluation." },
              ].map((item, i) => (
                <div key={i} className="bg-light-bg rounded-xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-brand-blue mb-2">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
