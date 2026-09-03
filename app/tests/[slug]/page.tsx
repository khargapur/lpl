import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG, HEALTH_PACKAGES } from "@/lib/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { LabTest } from "@/lib/types";
import FAQAccordion from "@/components/faq-accordion";
import {
  Clock,
  ChevronRight,
  ArrowLeft,
  Beaker,
  CheckCircle2,
  Phone,
  MessageCircle,
  CalendarCheck,
  Home,
  FlaskConical,
  FileText,
  UserCheck,
  TestTube,
  Stethoscope,
  AlertCircle,
  IndianRupee,
} from "lucide-react";

const BASE_URL = "https://lallabslucknow.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("lab_tests")
    .select("slug")
    .limit(2000);

  return ((data as { slug: string }[] | null) ?? []).map((t) => ({ slug: t.slug }));
}

export const dynamicParams = true;
export const revalidate = 3600;

async function getTest(slug: string): Promise<LabTest | null> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("lab_tests")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data as unknown as LabTest | null;
}

async function getRelatedTests(test: LabTest): Promise<LabTest[]> {
  const supabase = createSupabaseServerClient();

  // First try same category, excluding current test
  const { data: byCategory } = await supabase
    .from("lab_tests")
    .select("test_code, test_name, slug, category, report")
    .eq("category", test.category)
    .neq("test_code", test.test_code)
    .limit(8);

  if (byCategory && byCategory.length >= 4) {
    return byCategory as unknown as LabTest[];
  }

  // Fallback: search by first word of test name
  const firstWord = test.test_name.split(/\s+/)[0];
  if (firstWord && firstWord.length >= 3) {
    const { data: byName } = await supabase
      .from("lab_tests")
      .select("test_code, test_name, slug, category, report")
      .ilike("test_name", `${firstWord}%`)
      .neq("test_code", test.test_code)
      .limit(8);

    if (byName && byName.length > 0) {
      const existing = new Set((byCategory as { test_code: string }[] | null ?? []).map((t) => t.test_code));
      const merged = [...((byCategory as LabTest[] | null) ?? []), ...(byName as LabTest[]).filter((t) => !existing.has(t.test_code))];
      return merged.slice(0, 8) as LabTest[];
    }
  }

  return ((byCategory as LabTest[] | null) ?? []);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = await getTest(slug);
  if (!test) return {};

  const title = `${test.test_name} (${test.test_code}) in Lucknow | Dr. Lal PathLabs Gomti Nagar`;
  const description = `Book ${test.test_name} at Dr. Lal PathLabs, Gomti Nagar, Lucknow. ${
    test.specimen ? `Sample: ${test.specimen.split(".")[0]}.` : ""
  } ${test.report ? `Report: ${test.report}.` : ""} Free home collection available. Call ${SITE_CONFIG.phone}.`;

  return {
    title,
    description,
    keywords: [
      test.test_name,
      `${test.test_name} Lucknow`,
      `${test.test_name} Gomti Nagar`,
      `${test.test_name} price Lucknow`,
      `${test.test_code} test`,
      ...(test.aliases ?? []).slice(0, 5),
      `${test.category} test Lucknow`,
      "blood test Lucknow",
      "diagnostic test Lucknow",
    ],
    alternates: { canonical: `/tests/${test.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/tests/${test.slug}`,
      type: "website",
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

function buildMedicalTestSchema(test: LabTest) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: test.test_name,
    alternateName: test.aliases?.length ? test.aliases : undefined,
    code: test.test_code,
    description: `${test.test_name} (${test.test_code}) available at Dr. Lal PathLabs, Gomti Nagar, Lucknow. ${
      test.specimen ? `Sample type: ${test.specimen.split(".")[0]}.` : ""
    } ${test.report ? `Reporting: ${test.report}.` : ""} ${test.method ? `Method: ${test.method}.` : ""}`,
    relevantSpecialty: test.category,
    provider: {
      "@type": "MedicalOrganization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
      telephone: SITE_CONFIG.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
  };
}

function buildMedicalWebPageSchema(test: LabTest) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${test.test_name} - Dr. Lal PathLabs Gomti Nagar, Lucknow`,
    description: `Book ${test.test_name} (${test.test_code}) at Dr. Lal PathLabs, Gomti Nagar, Lucknow. Free home collection. NABL accredited lab.`,
    url: `${BASE_URL}/tests/${test.slug}`,
    about: {
      "@type": "MedicalTest",
      name: test.test_name,
    },
    mainEntity: buildMedicalTestSchema(test),
    provider: {
      "@type": "MedicalOrganization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
      telephone: SITE_CONFIG.phone,
    },
  };
}

function buildBreadcrumbSchema(test: LabTest) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Tests", item: `${BASE_URL}/tests` },
      {
        "@type": "ListItem",
        position: 3,
        name: test.test_name,
        item: `${BASE_URL}/tests/${test.slug}`,
      },
    ],
  };
}

function buildFaqSchema(test: LabTest, faqs: { question: string; answer: string }[]) {
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

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-brand-blue" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

export default async function TestDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const test = await getTest(slug);
  if (!test) notFound();

  const relatedTests = await getRelatedTests(test);
  const whatsappNumber = SITE_CONFIG.whatsapp.replace(/\D/g, "");
  const phoneClean = SITE_CONFIG.phone.replace(/\s/g, "");
  const bookingUrl = `/book-test?test=${test.slug}`;
  const homeCollectionUrl = `/home-collection?test=${test.slug}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I want to book ${test.test_name} (${test.test_code}) at Dr. Lal PathLabs Gomti Nagar, Lucknow.`
  )}`;

  const medicalTestSchema = buildMedicalTestSchema(test);
  const medicalWebPageSchema = buildMedicalWebPageSchema(test);
  const breadcrumbSchema = buildBreadcrumbSchema(test);

  // Extract fasting/preparation info from specimen and comments
  const fastingInfo = (() => {
    const all = `${test.specimen} ${test.comments}`;
    if (/fasting/i.test(all) || /fast/i.test(all)) {
      const match = all.match(/(\d+[\s-]*(?:hour|hr)s?)/i);
      return match ? `Fasting required (${match[1]})` : "Fasting may be required";
    }
    return "No fasting required";
  })();

  // Parse components into list items
  const componentList = test.components
    ? test.components.split("*").filter((c) => c.trim()).map((c) => c.trim())
    : [];

  const testFaqs = [
    {
      question: `What is the ${test.test_name} test?`,
      answer: `The ${test.test_name} (${test.test_code}) is a ${test.category.toLowerCase()} test available at Dr. Lal PathLabs, Gomti Nagar, Lucknow.${test.method ? ` It uses the ${test.method} method for analysis.` : ""}${test.specimen ? ` Sample type: ${test.specimen.split(".")[0]}.` : ""}`,
    },
    {
      question: `What is the price of ${test.test_name} in Lucknow?`,
      answer: test.price
        ? `The ${test.test_name} test is available at Dr. Lal PathLabs, Gomti Nagar, Lucknow for ₹${test.price}. Free home sample collection is included with every booking.`
        : `Please contact us at ${SITE_CONFIG.phone} for the current price of the ${test.test_name} test. Free home sample collection is available.`,
    },
    {
      question: `Is fasting required for ${test.test_name}?`,
      answer: fastingInfo !== "No fasting required"
        ? fastingInfo
        : "No fasting is required for this test. You can take the test at any time during our working hours.",
    },
    {
      question: `How long does it take to get ${test.test_name} results?`,
      answer: test.report
        ? `Reports for the ${test.test_name} test are typically available in ${test.report}. Reports are delivered via email and WhatsApp. You can also download them from our website.`
        : `Please contact us at ${SITE_CONFIG.phone} for the expected report turnaround time for this test.`,
    },
    {
      question: `Is home sample collection available for ${test.test_name}?`,
      answer: `Yes, free home sample collection is available across Lucknow for the ${test.test_name} test. You can book online or call ${SITE_CONFIG.phone} to schedule a convenient time.`,
    },
  ];

  const faqSchema = buildFaqSchema(test, testFaqs);
  const healthPackages = HEALTH_PACKAGES.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalTestSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />
      <main>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="bg-light-bg border-b border-gray-100">
          <div className="container-custom py-3">
            <ol className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
              <li>
                <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
              </li>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <li>
                <Link href="/tests" className="hover:text-brand-blue transition-colors">Tests</Link>
              </li>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <li className="text-brand-blue font-medium truncate max-w-[200px] sm:max-w-none">
                {test.test_name}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-brand-blue text-white py-10 md:py-14">
          <div className="container-custom">
            <Link
              href="/tests"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Tests
            </Link>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className="bg-brand-yellow text-brand-blue font-semibold text-xs">
                    {test.category}
                  </Badge>
                  <Badge className="bg-white/15 text-white border border-white/20 font-mono text-xs">
                    Code: {test.test_code}
                  </Badge>
                  {test.aliases && test.aliases.length > 1 && (
                    <Badge className="bg-white/15 text-white border border-white/20 text-xs">
                      Also known as: {test.aliases.slice(0, 3).filter((a) => a !== test.test_name && a !== test.test_code).join(", ")}
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-3 font-heading break-words">
                  {test.test_name}
                </h1>
                <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
                  Book {test.test_name} at Dr. Lal PathLabs, Gomti Nagar, Lucknow. NABL accredited diagnostic lab with free home sample collection and accurate reports.
                </p>

                <div className="flex flex-wrap gap-4 mt-5 text-sm">
                  {test.report && (
                    <div className="flex items-center gap-1.5 text-white/70">
                      <Clock className="w-4 h-4 text-brand-yellow" />
                      {test.report}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-white/70">
                    <Home className="w-4 h-4 text-brand-yellow" />
                    Home Collection Available
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                      NABL Accredited
                  </div>
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 min-w-[260px]">
                <p className="text-white/60 text-xs uppercase tracking-wide mb-3">Book This Test</p>
                {test.price ? (
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white flex items-center">
                        <IndianRupee className="w-5 h-5" />{test.price}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs mt-1">Starting price · Home collection included</p>
                  </div>
                ) : null}
                <div className="flex flex-col gap-2.5">
                  <Button asChild className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-blue font-bold rounded w-full">
                    <Link href={bookingUrl}>
                      <CalendarCheck className="w-4 h-4 mr-2" /> Book Test
                    </Link>
                  </Button>
                  <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-bold rounded w-full">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
                    </a>
                  </Button>
                  <Button asChild className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded w-full">
                    <a href={homeCollectionUrl}>
                      <Home className="w-4 h-4 mr-2" /> Home Collection
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded w-full text-sm">
                    <a href={`tel:${phoneClean}`}>
                      <Phone className="w-4 h-4 mr-2" /> {SITE_CONFIG.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Test details */}
        <section className="py-10 md:py-14 bg-light-bg">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main info column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Key info card */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-yellow" /> Test Information
                  </h2>
                  <div className="divide-y divide-gray-100">
                    <InfoRow icon={TestTube} label="Test Code" value={test.test_code} />
                    <InfoRow icon={Beaker} label="Test Name" value={test.test_name} />
                    {test.aliases && test.aliases.length > 1 && (
                      <InfoRow
                        icon={AlertCircle}
                        label="Also Known As"
                        value={test.aliases.filter((a) => a !== test.test_name && a !== test.test_code).join(", ")}
                      />
                    )}
                    <InfoRow icon={FlaskConical} label="Sample Type" value={test.specimen} />
                    <InfoRow icon={UserCheck} label="Patient Preparation" value={fastingInfo} />
                    <InfoRow icon={Clock} label="Reporting Time" value={test.report} />
                    {test.method && (
                      <InfoRow icon={Stethoscope} label="Method" value={test.method} />
                    )}
                    <InfoRow icon={CheckCircle2} label="Category" value={test.category} />
                    {test.price ? (
                      <InfoRow icon={IndianRupee} label="Price (Lucknow)" value={`₹${test.price} · Home collection included`} />
                    ) : null}
                  </div>
                </div>

                {/* Components */}
                {componentList.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                    <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-brand-yellow" /> Components / Parameters
                    </h2>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {componentList.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Clinical comments */}
                {test.comments && (
                  <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                    <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-brand-yellow" /> Clinical Use & Notes
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{test.comments}</p>
                  </div>
                )}

                {/* About this test */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h2 className="font-bold text-brand-blue text-lg mb-4 font-heading flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-yellow" /> About {test.test_name}
                  </h2>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                    <p>
                      <strong>{test.test_name}</strong> ({test.test_code}) is a {test.category.toLowerCase()} test available at Dr. Lal PathLabs, Gomti Nagar, Lucknow. {test.method ? `This test uses the ${test.method} method for accurate analysis.` : ""} {test.report ? `Reports are typically available in ${test.report.toLowerCase()}.` : ""}
                    </p>
                    <p>
                      {fastingInfo !== "No fasting required" ? "This test may require fasting or special preparation. " : "No special preparation is required for this test. "}
                      Free home sample collection is available across Lucknow. Book online or call {SITE_CONFIG.phone} to schedule your test.
                    </p>
                    <p>
                      Dr. Lal PathLabs in Gomti Nagar, Lucknow is a NABL accredited diagnostic center offering accurate and reliable test results with state-of-the-art equipment and stringent quality control.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Booking CTA */}
                <div className="bg-brand-blue rounded-xl p-6 text-white sticky top-20">
                  <h3 className="text-lg font-bold mb-2 font-heading">Book {test.test_name}</h3>
                  {test.price ? (
                    <div className="mb-3">
                      <span className="text-2xl font-bold flex items-center">
                        <IndianRupee className="w-4 h-4" />{test.price}
                      </span>
                      <p className="text-white/60 text-xs">Starting price · Home collection included</p>
                    </div>
                  ) : null}
                  <p className="text-white/75 text-sm mb-4">
                    Free home collection in Lucknow. NABL accredited lab.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <Button asChild className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-blue font-bold rounded w-full">
                      <Link href={bookingUrl}>
                        <CalendarCheck className="w-4 h-4 mr-2" /> Book Now
                      </Link>
                    </Button>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-bold rounded w-full">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                      </a>
                    </Button>
                    <Button asChild className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded w-full">
                      <a href={`tel:${phoneClean}`}>
                        <Phone className="w-4 h-4 mr-2" /> Call {SITE_CONFIG.phone}
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Why choose us */}
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                  <h3 className="font-bold text-brand-blue text-base mb-4 font-heading">Why Choose Us?</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      NABL accredited lab in Gomti Nagar
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Free home sample collection
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Accurate & reliable results
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Reports via email & WhatsApp
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Affordable pricing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Health packages */}
            <div className="mt-10">
              <h2 className="font-bold text-brand-blue text-xl mb-5 font-heading flex items-center gap-2">
                <Beaker className="w-5 h-5 text-brand-yellow" /> Recommended Health Packages
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {healthPackages.map((hp) => (
                  <Link
                    key={hp.id}
                    href={`/health-packages/${hp.slug}`}
                    className="group bg-white rounded-lg p-4 shadow-card border border-gray-100 hover:shadow-card-hover hover:border-brand-blue/20 transition-all"
                  >
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-blue transition-colors mb-1">{hp.name}</p>
                    <p className="text-xs text-gray-400">{hp.testsCount} tests</p>
                    <p className="text-sm font-bold text-brand-blue mt-1 flex items-center">
                      <IndianRupee className="w-3 h-3" />{hp.price}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQ section */}
            <div className="mt-10">
              <h2 className="font-bold text-brand-blue text-xl mb-5 font-heading flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-yellow" /> Frequently Asked Questions
              </h2>
              <FAQAccordion faqs={testFaqs} />
            </div>

            {/* Related tests */}
            {relatedTests.length > 0 && (
              <div className="mt-10">
                <h2 className="font-bold text-brand-blue text-xl mb-5 font-heading flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-brand-yellow" /> Related Tests
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {relatedTests.map((rt) => (
                    <Link
                      key={rt.test_code}
                      href={`/tests/${rt.slug}`}
                      className="group bg-white rounded-lg p-4 shadow-card border border-gray-100 hover:shadow-card-hover hover:border-brand-blue/20 transition-all"
                    >
                      <Badge className="bg-brand-blue/10 text-brand-blue text-[10px] mb-2 font-medium">
                        {rt.category}
                      </Badge>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-blue transition-colors line-clamp-2 mb-1">
                        {rt.test_name}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">{rt.test_code}</p>
                      {rt.report && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {rt.report}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-8 bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 text-white">
              <div>
                <h3 className="text-xl font-bold mb-1 font-heading">Ready to book {test.test_name}?</h3>
                <p className="text-white/75 text-sm">
                  Home collection available across Lucknow. {test.report ? `Reports in ${test.report}.` : "Fast turnaround."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-blue font-bold rounded px-6">
                  <Link href={bookingUrl}>
                    <CalendarCheck className="w-4 h-4 mr-2" /> Book Test
                  </Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-bold rounded px-6">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded px-6">
                  <a href={`tel:${phoneClean}`}>
                    <Phone className="w-4 h-4 mr-2" /> Call
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
