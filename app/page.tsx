import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Dr. Lal PathLabs Khargapur, Gomti Nagar Lucknow | Blood Test & Health Checkup",
  description:
    "Book blood tests, CBC, sugar, HbA1c, fever panel & health checkup packages at Dr. Lal PathLabs in Khargapur, Gomti Nagar, Lucknow. Free home sample collection. Reports in 24 hrs via WhatsApp. Call +91 9451155402.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dr. Lal PathLabs Khargapur, Gomti Nagar Lucknow | Blood Test & Health Checkup",
    description:
      "NABL accredited pathology lab in Khargapur, Gomti Nagar, Lucknow. CBC ₹210, Blood Sugar ₹50, Health Packages from ₹1250. Book now, free home collection!",
    url: "https://lallabslucknow.com",
    images: [{ url: "/images/maxresdefault.jpg", width: 1280, height: 720, alt: "Dr. Lal PathLabs Khargapur, Gomti Nagar Lucknow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Lal PathLabs Lucknow | Blood Test & Health Checkup",
    description: "NABL accredited lab in Gomti Nagar, Lucknow. Book CBC, sugar, thyroid & health packages. Free home collection.",
    images: ["/images/maxresdefault.jpg"],
  },
};
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import TestCard from "@/components/test-card";
import PackageCard from "@/components/package-card";
import CTABanner from "@/components/cta-banner";
import FAQAccordion from "@/components/faq-accordion";
import BlogCard from "@/components/blog-card";
import WhyChooseUs from "@/components/sections/why-choose-us";
import HomeCollectionSection from "@/components/sections/home-collection-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import GoogleReviews from "@/components/sections/google-reviews";
import ContactCard from "@/components/contact-card";
import {
  POPULAR_TESTS,
  HEALTH_PACKAGES,
  TESTIMONIALS,
  FAQS,
  BLOG_POSTS,
  SITE_CONFIG,
} from "@/lib/constants";
import { ArrowRight, Phone, MapPin, ChevronRight } from "lucide-react";

export default function HomePage() {
  const popularTests = POPULAR_TESTS.filter((t) => t.popular).slice(0, 6);
  const popularPackages = HEALTH_PACKAGES.slice(0, 4);
  const recentBlogs = BLOG_POSTS.slice(0, 3);
  const homepageFaqs = FAQS.slice(0, 5);

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Popular Tests */}
        <section className="py-14 md:py-20 bg-light-bg">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2 font-heading">
                  Popular Tests
                </h2>
                <p className="text-gray-500 text-sm">Most commonly booked diagnostic tests</p>
              </div>
              <Link
                href="/tests"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
              >
                View All Tests <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularTests.map((test) => (
                <TestCard key={test.id} {...test} />
              ))}
            </div>
          </div>
        </section>

        {/* Health Packages */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2 font-heading">
                Health Checkup Packages
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                Comprehensive health packages at affordable prices. Save more with bundled tests.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {popularPackages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>

            <div className="text-center">
              <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded font-semibold">
                <Link href="/health-packages">
                  View All Packages
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <HomeCollectionSection />
        <GoogleReviews />
        <TestimonialsSection testimonails={TESTIMONIALS} />

        <CTABanner />

        {/* FAQ */}
        <section className="py-14 md:py-20 bg-light-bg">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2 font-heading">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-500 text-sm">Find answers to common questions about our services</p>
              </div>

              <FAQAccordion faqs={homepageFaqs} />

              <div className="text-center mt-6">
                <Link href="/faq" className="text-sm font-semibold text-brand-blue hover:underline">
                  View All FAQs →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2 font-heading">
                  Health Blog
                </h2>
                <p className="text-gray-500 text-sm">Stay informed with our health tips and guides</p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
              >
                All Articles <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Map */}
        <section className="py-14 md:py-20 bg-light-bg">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2 font-heading">
                Visit Us
              </h2>
              <p className="text-gray-500 text-sm">We&apos;re here to serve you</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <ContactCard type="phone" title="Phone" value={SITE_CONFIG.phone}
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} />
              <ContactCard type="whatsapp" title="WhatsApp" value={SITE_CONFIG.whatsapp}
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`} />
              <ContactCard type="timing" title="Working Hours" value="Mon–Sat: 7AM–9PM | Sun: 8AM–2PM" />
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-card border border-gray-100">
              {/* Location card — always renders, no external dependencies */}
              <a
                href={SITE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 h-[280px] md:h-[360px] flex flex-col items-center justify-center gap-5 overflow-hidden">
                  {/* Decorative grid */}
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "linear-gradient(#1a56db 1px,transparent 1px),linear-gradient(90deg,#1a56db 1px,transparent 1px)", backgroundSize: "40px 40px" }}
                  />
                  {/* Pin icon */}
                  <div className="relative w-20 h-20 rounded-full bg-brand-blue shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-10 h-10 text-white" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-yellow rounded-full border-2 border-white" />
                  </div>
                  <div className="text-center relative z-10 px-4">
                    <p className="font-extrabold text-brand-blue text-xl font-heading">Dr. Lal PathLabs</p>
                    <p className="text-gray-600 font-medium">Patient Service Centre, Gomti Nagar</p>
                    <p className="text-gray-500 text-sm mt-1">{SITE_CONFIG.address}</p>
                    <span className="inline-flex items-center gap-2 mt-4 bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full group-hover:bg-brand-blue-dark transition-colors shadow">
                      <MapPin className="w-4 h-4" /> Open in Google Maps
                    </span>
                  </div>
                </div>
              </a>
              <div className="p-4 flex flex-wrap justify-center gap-3">
                <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded">
                  <a href={SITE_CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Google Maps
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded">
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call for Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
