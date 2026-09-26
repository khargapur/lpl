import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTABanner from "@/components/cta-banner";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  ChevronRight,
  Home,
  ShieldCheck,
  Clock,
  BadgeCheck,
  FileCheck,
  FlaskConical,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { AREAS, AREA_SLUGS, getArea } from "@/data/areas";
import { KhargapurPage, KhargapurJsonLd, KHARGAPUR_SEO } from "./khargapur";
import { GomtiNagarPage, GomtiNagarJsonLd, GOMTI_NAGAR_SEO } from "./gomti-nagar";
import {
  ShalimarOneWorldPage,
  ShalimarOneWorldJsonLd,
  SHALIMAR_ONE_WORLD_SEO,
} from "./shalimar-one-world";

const BASE_URL = "https://www.bloodtestinlucknow.com";

export async function generateStaticParams() {
  return AREA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  if (slug === "khargapur") {
    return {
      title: { absolute: KHARGAPUR_SEO.title },
      description: KHARGAPUR_SEO.description,
      alternates: { canonical: "/areas/khargapur" },
      openGraph: {
        title: KHARGAPUR_SEO.title,
        description: KHARGAPUR_SEO.description,
        url: `${BASE_URL}/areas/khargapur`,
      },
      twitter: {
        card: "summary_large_image",
        title: KHARGAPUR_SEO.title,
        description: KHARGAPUR_SEO.description,
      },
    };
  }
  if (slug === "shalimar-one-world") {
    return {
      title: { absolute: SHALIMAR_ONE_WORLD_SEO.title },
      description: SHALIMAR_ONE_WORLD_SEO.description,
      alternates: { canonical: "/areas/shalimar-one-world" },
      openGraph: {
        title: SHALIMAR_ONE_WORLD_SEO.title,
        description: SHALIMAR_ONE_WORLD_SEO.description,
        url: `${BASE_URL}/areas/shalimar-one-world`,
      },
      twitter: {
        card: "summary_large_image",
        title: SHALIMAR_ONE_WORLD_SEO.title,
        description: SHALIMAR_ONE_WORLD_SEO.description,
      },
    };
  }
  if (slug === "gomti-nagar") {
    return {
      title: { absolute: GOMTI_NAGAR_SEO.title },
      description: GOMTI_NAGAR_SEO.description,
      alternates: { canonical: "/areas/gomti-nagar" },
      openGraph: {
        title: GOMTI_NAGAR_SEO.title,
        description: GOMTI_NAGAR_SEO.description,
        url: `${BASE_URL}/areas/gomti-nagar`,
      },
      twitter: {
        card: "summary_large_image",
        title: GOMTI_NAGAR_SEO.title,
        description: GOMTI_NAGAR_SEO.description,
      },
    };
  }
  return {
    title: `Blood Test in ${area.name}, Lucknow | Free Home Sample Collection | Dr. Lal PathLabs`,
    description:
      area.metaDescription ??
      `Book blood tests & health checkups in ${area.name}, Lucknow with free home sample collection. NABL-accredited Dr. Lal PathLabs centre — CBC ₹210, packages from ₹1250. Call ${SITE_CONFIG.phone}.`,
    keywords: [
      `blood test ${area.shortName} Lucknow`,
      `pathology lab ${area.shortName}`,
      `home sample collection ${area.shortName} Lucknow`,
      `diagnostic centre ${area.shortName} Lucknow`,
      `full body checkup ${area.shortName} Lucknow`,
    ],
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title: `Blood Test in ${area.name}, Lucknow | Dr. Lal PathLabs`,
      description: `Free home sample collection in ${area.name}, Lucknow. NABL-accredited reports in 24 hrs.`,
      url: `${BASE_URL}/areas/${area.slug}`,
    },
  };
}

const POPULAR_TESTS = [
  { name: "Complete Blood Count (CBC)", price: "₹210" },
  { name: "Blood Sugar (Fasting)", price: "₹50" },
  { name: "HbA1c (Diabetes)", price: "₹450" },
  { name: "Lipid Profile", price: "₹650" },
  { name: "Thyroid Profile (T3/T4/TSH)", price: "₹550" },
  { name: "Liver Function Test (LFT)", price: "₹650" },
];

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();
  if (slug === "khargapur") {
    return (
      <>
        <KhargapurJsonLd />
        <KhargapurPage />
      </>
    );
  }
  if (slug === "gomti-nagar") {
    return (
      <>
        <GomtiNagarJsonLd />
        <GomtiNagarPage />
      </>
    );
  }
  if (slug === "shalimar-one-world") {
    return (
      <>
        <ShalimarOneWorldJsonLd />
        <ShalimarOneWorldPage />
      </>
    );
  }

  const pageUrl = `${BASE_URL}/areas/${area.slug}`;

  const clinicJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${pageUrl}#clinic`,
    name: `Dr. Lal PathLabs – Blood Test in ${area.name}, Lucknow`,
    description: area.intro,
    url: pageUrl,
    telephone: SITE_CONFIG.phone,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    medicalSpecialty: "Pathology",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Khargapur, Gomti Nagar",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226010",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: "26.8361261", longitude: "81.0224694" },
    hasMap: SITE_CONFIG.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "21:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "08:00", closes: "14:00" },
    ],
    areaServed: { "@type": "City", name: area.name },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Home Collection", item: `${BASE_URL}/home-collection` },
      { "@type": "ListItem", position: 3, name: area.name, item: pageUrl },
    ],
  };

  const otherAreas = AREAS.filter((a) => a.slug !== area.slug).slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-brand-blue text-white py-12 md:py-16">
          <div className="container-custom">
            <nav className="text-xs text-white/60 mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/home-collection" className="hover:text-white">Home Collection</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">{area.name}</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-blue text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5" /> {area.name}, Lucknow
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-heading">
                  Blood Test in {area.name}, Lucknow
                </h1>
                <p className="text-white/85 text-lg">{area.intro}</p>
                <p className="text-white/70 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" /> {area.distanceNote}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-blue font-bold rounded">
                    <Link href="/book-test">Book Test in {area.shortName} <ChevronRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                  <Button asChild className="border border-white bg-transparent text-white hover:bg-white hover:text-brand-blue rounded font-semibold">
                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>
                      <Phone className="w-4 h-4 mr-2" /> {SITE_CONFIG.phone}
                    </a>
                  </Button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-white">
                <h3 className="font-semibold text-center mb-4 flex items-center justify-center gap-2">
                  <Home className="w-4 h-4" /> Free Home Collection in {area.shortName}
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { icon: BadgeCheck, text: "Trained, verified phlebotomists at your doorstep" },
                    { icon: ShieldCheck, text: "NABL-accredited lab processing — same quality as walk-in" },
                    { icon: FileCheck, text: "Reports on WhatsApp & email within 24 hours" },
                    { icon: Clock, text: "7 days a week: Mon–Sat 7 AM–9 PM, Sun 8 AM–2 PM" },
                  ].map((row, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <row.icon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                      <span className="text-white/85">{row.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* About the area */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container-custom grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue mb-4 font-heading">
                Diagnostic Services for {area.name} Residents
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">{area.residentialNote}</p>
              <p className="text-gray-600 leading-relaxed">
                {area.servicesNote ??
                  `Instead of travelling across the city, ${area.shortName} residents can get every routine and specialised test — CBC, blood sugar, HbA1c, thyroid, lipid, liver and kidney profiles, fever panels and full-body health packages — collected from home and processed at our NABL-accredited laboratory in Khargapur, Gomti Nagar.`}
              </p>
              {area.localInsight && (
                <p className="text-gray-600 leading-relaxed mt-4">{area.localInsight}</p>
              )}
            </div>
            <div className="bg-light-bg rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-brand-blue mb-4">Neighbourhoods & Landmarks We Cover Nearby</h3>
              <ul className="space-y-2.5">
                {area.landmarks.map((lm) => (
                  <li key={lm} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" /> {lm}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                Don&apos;t see your exact location? Call us — if you&apos;re in Lucknow, we&apos;ll usually find a way.
              </p>
            </div>
          </div>
        </section>

        {/* Popular tests */}
        <section className="py-12 md:py-16 bg-light-bg">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-brand-blue mb-2 font-heading">
                Popular Tests in {area.shortName}
              </h2>
              <p className="text-gray-500 text-sm">Transparent pricing — same rates across all of Lucknow</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {POPULAR_TESTS.map((t) => (
                <div key={t.name} className="bg-white rounded-xl p-5 shadow-card border border-gray-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-5 h-5 text-brand-blue" />
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{t.name}</span>
                  </div>
                  <span className="font-bold text-brand-blue whitespace-nowrap">{t.price}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="rounded font-semibold">
                <Link href="/tests">View All 100+ Tests <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container-custom max-w-3xl">
            <h2 className="text-3xl font-bold text-brand-blue mb-8 font-heading text-center">
              {area.shortName} — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {area.faqs.map((f, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5 bg-light-bg">
                  <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other areas */}
        <section className="py-10 bg-light-bg border-t border-gray-100">
          <div className="container-custom">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
              We also serve
            </h3>
            <div className="flex flex-wrap justify-center gap-2.5">
              {otherAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="text-sm bg-white border border-gray-200 rounded-full px-4 py-2 text-brand-blue hover:border-brand-blue transition-colors"
                >
                  Blood Test in {a.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title={`Book Your Blood Test in ${area.name} Today`}
          subtitle={`Free home sample collection in ${area.shortName}, Lucknow. Call ${SITE_CONFIG.phone} or book online in 2 minutes.`}
        />
      </main>
      <Footer />
    </>
  );
}
