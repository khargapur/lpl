import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FAQAccordion from "@/components/faq-accordion";
import CTABanner from "@/components/cta-banner";
import { SITE_CONFIG, HEALTH_PACKAGES, POPULAR_TESTS } from "@/lib/constants";
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageCircle,
  CalendarCheck,
  Home,
  IndianRupee,
  Beaker,
  Clock,
  User,
  FlaskConical,
  MapPin,
} from "lucide-react";

const BASE_URL = "https://lallabslucknow.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return HEALTH_PACKAGES.map((pkg) => ({ slug: pkg.slug }));
}

export const dynamicParams = false;

function getPackage(slug: string) {
  return HEALTH_PACKAGES.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};

  const title = `${pkg.name} Health Checkup Package in Lucknow | ₹${pkg.price} | Dr. Lal PathLabs`;
  const description = `Book the ${pkg.name} health checkup package at Dr. Lal PathLabs, Khargapur, Gomti Nagar, Lucknow. ${pkg.description} ${pkg.testsCount} tests at ₹${pkg.price}. Free home sample collection. Call ${SITE_CONFIG.phone}.`;

  return {
    title,
    description,
    keywords: [
      `${pkg.name} package Lucknow`,
      `${pkg.name} health checkup Lucknow`,
      `health checkup package Gomti Nagar`,
      `full body checkup Lucknow`,
      `health checkup Khargapur`,
      `${pkg.name} price Lucknow`,
      `blood test package Lucknow`,
    ],
    alternates: { canonical: `/health-packages/${pkg.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/health-packages/${pkg.slug}`,
      type: "website",
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${pkg.name} Health Checkup Package in Lucknow | ₹${pkg.price}`,
      description: `${pkg.testsCount} tests at ₹${pkg.price}. Free home collection in Lucknow.`,
    },
    robots: { index: true, follow: true },
  };
}

function buildPackageSchema(pkg: (typeof HEALTH_PACKAGES)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: `${pkg.name} Health Checkup Package`,
    description: pkg.description,
    url: `${BASE_URL}/health-packages/${pkg.slug}`,
    provider: {
      "@type": "MedicalOrganization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
      telephone: SITE_CONFIG.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Khargapur, Gomti Nagar",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        postalCode: "226010",
        addressCountry: "IN",
      },
    },
  };
}

function buildBreadcrumbSchema(pkg: (typeof HEALTH_PACKAGES)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Health Packages", item: `${BASE_URL}/health-packages` },
      { "@type": "ListItem", position: 3, name: pkg.name, item: `${BASE_URL}/health-packages/${pkg.slug}` },
    ],
  };
}

function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const phoneClean = SITE_CONFIG.phone.replace(/\s/g, "");
  const whatsappNumber = SITE_CONFIG.whatsapp.replace(/\D/g, "");
  const bookingUrl = `/book-test?package=${pkg.slug}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I want to book the ${pkg.name} health package (₹${pkg.price}) at Dr. Lal PathLabs Gomti Nagar, Lucknow.`
  )}`;

  const relatedPackages = HEALTH_PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 4);
  const relatedTests = POPULAR_TESTS.filter((t) => t.popular).slice(0, 6);

  const packageFaqs = [
    {
      question: `What is included in the ${pkg.name} package?`,
      answer: `The ${pkg.name} package includes ${pkg.testsCount} tests covering: ${pkg.tests.join(", ")}. This comprehensive package is designed for ${pkg.idealFor}.`,
    },
    {
      question: `How much does the ${pkg.name} package cost?`,
      answer: `The ${pkg.name} package is priced at ₹${pkg.price} (original price ₹${pkg.originalPrice}). This includes all tests, free home sample collection, and report delivery via WhatsApp and email.`,
    },
    {
      question: `Is fasting required for the ${pkg.name} package?`,
      answer: pkg.fasting
        ? `Yes, fasting is required for the ${pkg.name} package. We recommend 10-12 hours of fasting before sample collection. You may drink water during the fasting period.`
        : `No fasting is required for the ${pkg.name} package. However, we recommend consulting our team for any specific instructions.`,
    },
    {
      question: `How long does it take to get ${pkg.name} reports?`,
      answer: `Reports for the ${pkg.name} package are typically available within ${pkg.reportsIn}. Reports are delivered via email and WhatsApp. You can also download them from our website using your patient ID.`,
    },
    {
      question: `Is home sample collection available for the ${pkg.name} package?`,
      answer: `Yes, free home sample collection is available across Lucknow for the ${pkg.name} package. You can book online or call ${SITE_CONFIG.phone} to schedule a convenient time slot.`,
    },
    {
      question: `Who should consider the ${pkg.name} package?`,
      answer: `The ${pkg.name} package is ideal for ${pkg.idealFor}. It is designed to provide a comprehensive health assessment for this group.`,
    },
  ];

  const packageSchema = buildPackageSchema(pkg);
  const breadcrumbSchema = buildBreadcrumbSchema(pkg);
  const faqSchema = buildFaqSchema(packageFaqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />
      <main>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="bg-light-bg border-b border-gray-100">
          <div className="container-custom py-3">
            <ol className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
              <li><Link href="/" className="hover:text-brand-blue transition-colors">Home</Link></li>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <li><Link href="/health-packages" className="hover:text-brand-blue transition-colors">Health Packages</Link></li>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <li className="text-brand-blue font-medium truncate max-w-[200px] sm:max-w-none">{pkg.name}</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-brand-blue text-white py-10 md:py-14">
          <div className="container-custom">
            <Link href="/health-packages" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to All Packages
            </Link>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className="bg-brand-yellow text-brand-blue font-semibold text-xs">{pkg.testsCount} Tests</Badge>
                  {pkg.popular && (
                    <Badge className="bg-white/15 text-white border border-white/20 text-xs">Most Popular</Badge>
                  )}
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-3 font-heading break-words">
                  {pkg.name} Health Checkup Package in Lucknow
                </h1>
                <p className="text-white/80 text-sm max-w-2xl leading-relaxed">{pkg.description}</p>

                <div className="flex flex-wrap gap-4 mt-5 text-sm">
                  <div className="flex items-center gap-1.5 text-white/70">
                    <Clock className="w-4 h-4 text-brand-yellow" /> Reports in {pkg.reportsIn}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70">
                    <Home className="w-4 h-4 text-brand-yellow" /> Home Collection Available
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow" /> NABL Accredited
                  </div>
                  {pkg.fasting && (
                    <div className="flex items-center gap-1.5 text-white/70">
                      <FlaskConical className="w-4 h-4 text-brand-yellow" /> Fasting Required
                    </div>
                  )}
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 min-w-[260px]">
                <p className="text-white/60 text-xs uppercase tracking-wide mb-3">Book This Package</p>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white flex items-center">
                      <IndianRupee className="w-5 h-5" />{pkg.price}
                    </span>
                    <span className="text-sm text-white/50 line-through">₹{pkg.originalPrice}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-1">All tests included · Free home collection</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <Button asChild className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-blue font-bold rounded w-full">
                    <Link href={bookingUrl}><CalendarCheck className="w-4 h-4 mr-2" /> Book Package</Link>
                  </Button>
                  <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-bold rounded w-full">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us</a>
                  </Button>
                  <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded w-full text-sm">
                    <a href={`tel:${phoneClean}`}><Phone className="w-4 h-4 mr-2" /> {SITE_CONFIG.phone}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Package details */}
        <section className="py-10 md:py-14 bg-light-bg">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main info column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Overview */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading">Package Overview</h2>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{pkg.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3 py-2">
                      <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <Beaker className="w-4 h-4 text-brand-blue" />
                      </div>
                      <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tests Included</p><p className="text-sm text-gray-800">{pkg.testsCount} tests</p></div>
                    </div>
                    <div className="flex items-start gap-3 py-2">
                      <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-brand-blue" />
                      </div>
                      <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ideal For</p><p className="text-sm text-gray-800">{pkg.idealFor}</p></div>
                    </div>
                    <div className="flex items-start gap-3 py-2">
                      <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-brand-blue" />
                      </div>
                      <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Report Time</p><p className="text-sm text-gray-800">{pkg.reportsIn}</p></div>
                    </div>
                    <div className="flex items-start gap-3 py-2">
                      <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <IndianRupee className="w-4 h-4 text-brand-blue" />
                      </div>
                      <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</p><p className="text-sm text-gray-800">₹{pkg.price} (was ₹{pkg.originalPrice})</p></div>
                    </div>
                  </div>
                </div>

                {/* Tests included */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading">Tests Included in {pkg.name}</h2>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {pkg.tests.map((test, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {test}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Who should consider */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading">Who Should Consider This Package?</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The {pkg.name} package is recommended for <strong>{pkg.idealFor}</strong>. This package provides a comprehensive health assessment tailored to the needs of this group. {pkg.fasting ? "Since fasting is required, we recommend scheduling the sample collection in the morning." : "No fasting is required, so you can schedule the sample collection at your convenience."}
                  </p>
                </div>

                {/* Preparation */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading">Preparation & Sample Collection</h2>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                    <p>
                      {pkg.fasting
                        ? "This package requires fasting for 10-12 hours before sample collection. You may drink water during the fasting period. Please avoid eating, drinking (except water), smoking, or chewing gum during the fast."
                        : "No special preparation is required for this package. However, we recommend wearing comfortable clothing for easy sample collection."}
                    </p>
                    <p>
                      Free home sample collection is available across all areas of Lucknow. Our trained technicians will visit your home at a scheduled time with proper safety and hygiene protocols. You can also visit our centre in Khargapur, Gomti Nagar for sample collection.
                    </p>
                  </div>
                </div>

                {/* Report information */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading">Report Information</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Reports for the {pkg.name} package are typically available within <strong>{pkg.reportsIn}</strong>. Reports are delivered via email and WhatsApp. You can also download your reports from our website using your patient ID, or from the official Dr. Lal PathLabs portal.
                  </p>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading">Frequently Asked Questions</h2>
                  <FAQAccordion faqs={packageFaqs} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Booking CTA */}
                <div className="bg-brand-blue rounded-xl p-6 text-white sticky top-20">
                  <h3 className="text-lg font-bold mb-2 font-heading">Book {pkg.name}</h3>
                  <div className="mb-3">
                    <span className="text-2xl font-bold flex items-center">
                      <IndianRupee className="w-4 h-4" />{pkg.price}
                    </span>
                    <p className="text-white/60 text-xs">All {pkg.testsCount} tests included · Free home collection</p>
                  </div>
                  <p className="text-white/75 text-sm mb-4">Free home collection in Lucknow. NABL accredited lab.</p>
                  <div className="flex flex-col gap-2.5">
                    <Button asChild className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-blue font-bold rounded w-full">
                      <Link href={bookingUrl}><CalendarCheck className="w-4 h-4 mr-2" /> Book Now</Link>
                    </Button>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-bold rounded w-full">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp</a>
                    </Button>
                    <Button asChild className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded w-full">
                      <a href={`tel:${phoneClean}`}><Phone className="w-4 h-4 mr-2" /> Call {SITE_CONFIG.phone}</a>
                    </Button>
                  </div>
                </div>

                {/* Centre info */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h3 className="font-bold text-brand-blue text-base mb-4 font-heading">Our Centre</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <p>{SITE_CONFIG.address}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <a href={`tel:${phoneClean}`} className="hover:text-brand-blue">{SITE_CONFIG.phone}</a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <p>Mon–Sat: 7AM–9PM<br />Sun: 8AM–2PM</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded text-sm">
                    <Link href="/contact"><MapPin className="w-4 h-4 mr-2" /> View Location</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Related packages */}
            <div className="mt-10">
              <h2 className="font-bold text-brand-blue text-xl mb-5 font-heading">Related Health Packages</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedPackages.map((rp) => (
                  <Link key={rp.id} href={`/health-packages/${rp.slug}`} className="group bg-white rounded-lg p-4 shadow-card border border-gray-100 hover:shadow-card-hover hover:border-brand-blue/20 transition-all">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-blue transition-colors mb-1">{rp.name}</p>
                    <p className="text-xs text-gray-400">{rp.testsCount} tests</p>
                    <p className="text-sm font-bold text-brand-blue mt-1 flex items-center"><IndianRupee className="w-3 h-3" />{rp.price}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related tests */}
            <div className="mt-8">
              <h2 className="font-bold text-brand-blue text-xl mb-5 font-heading">Popular Tests</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {relatedTests.map((rt) => (
                  <Link key={rt.id} href={`/tests/${rt.slug}`} className="group bg-white rounded-lg p-3 shadow-card border border-gray-100 hover:shadow-card-hover hover:border-brand-blue/20 transition-all">
                    <p className="text-xs font-semibold text-gray-800 group-hover:text-brand-blue transition-colors line-clamp-2 mb-1">{rt.name}</p>
                    <p className="text-xs text-gray-400">{rt.category}</p>
                    {rt.price && <p className="text-sm font-bold text-brand-blue mt-1 flex items-center"><IndianRupee className="w-3 h-3" />{rt.price}</p>}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 text-white">
              <div>
                <h3 className="text-xl font-bold mb-1 font-heading">Ready to book the {pkg.name} package?</h3>
                <p className="text-white/75 text-sm">Free home collection across Lucknow. Reports in {pkg.reportsIn}.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-blue font-bold rounded px-6">
                  <Link href={bookingUrl}><CalendarCheck className="w-4 h-4 mr-2" /> Book Package</Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-bold rounded px-6">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
