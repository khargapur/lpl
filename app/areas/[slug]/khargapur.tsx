import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  MapPin,
  Phone,
  ChevronRight,
  FlaskConical,
  ClipboardList,
  Home,
  Building2,
} from "lucide-react";

const BASE_URL = "https://www.bloodtestinlucknow.com";
const PAGE_URL = `${BASE_URL}/areas/khargapur`;
const PHONE_DISPLAY = "+91 9451155402";
const PHONE_HREF = "tel:+919451155402";
const ADDRESS_EN =
  "In front of Sanskar Vatika, Awadhpuri-2, Khargapur, Gomti Nagar, Lucknow – 226010";
const ADDRESS_HI =
  "संस्कार वाटिका के सामने, अवधपुरी-2, खरगापुर, गोमती नगर, लखनऊ – 226010";

export const KHARGAPUR_SEO = {
  title: "Blood Test & Home Sample Collection in Khargapur | Dr Lal PathLabs",
  description:
    "Blood test and home sample collection in Khargapur, Lucknow. Dr Lal PathLabs Patient Service Centre for blood tests, health checkups and diagnostic tests.",
};

/* FAQs: aText = plain text for schema (no raw URLs), aJsx = visible answer (may contain links) */
export const KHARGAPUR_FAQS: { q: string; aText: string; aJsx: React.ReactNode }[] = [
  {
    q: "Is there a Dr Lal PathLabs centre in Khargapur, Gomti Nagar, Lucknow?",
    aText:
      "Yes. Dr Lal PathLabs Patient Service Centre is located in Khargapur, Gomti Nagar, Lucknow. The centre provides access to blood tests and other diagnostic testing services.",
    aJsx: (
      <>
        Yes. Dr Lal PathLabs Patient Service Centre is located in Khargapur, Gomti Nagar, Lucknow.
        The centre provides access to blood tests and other diagnostic testing services.
      </>
    ),
  },
  {
    q: "Where is the Dr Lal PathLabs centre in Khargapur located?",
    aText:
      "The centre is located in front of Sanskar Vatika, Awadhpuri-2, Khargapur, Gomti Nagar, Lucknow – 226010.",
    aJsx: (
      <>
        The centre is located in front of Sanskar Vatika, Awadhpuri-2, Khargapur, Gomti Nagar,
        Lucknow – 226010.
      </>
    ),
  },
  {
    q: "Can I book a blood test in Khargapur?",
    aText:
      "Yes. You can book available blood tests through the centre. Test availability, sample requirements and preparation instructions may vary depending on the investigation.",
    aJsx: (
      <>
        Yes. You can book available blood tests through the centre. Test availability, sample
        requirements and preparation instructions may vary depending on the investigation.
      </>
    ),
  },
  {
    q: "Is home sample collection available in Khargapur?",
    aText:
      "Home sample collection is available for eligible locations and tests. Availability and collection timings can depend on the location and booking.",
    aJsx: (
      <>
        Home sample collection is available for eligible locations and tests. Availability and
        collection timings can depend on the location and booking.
      </>
    ),
  },
  {
    q: "Which blood tests and pathology services are available in Khargapur?",
    aText:
      "Commonly requested investigations may include CBC, HbA1c, lipid profile, liver function tests, kidney function tests, thyroid tests, vitamin tests and other diagnostic investigations. The Dr Lal PathLabs Patient Service Centre serves patients looking for blood tests and pathology services in Khargapur, Gomti Nagar. Test availability may vary by investigation and location.",
    aJsx: (
      <>
        Commonly requested investigations may include CBC, HbA1c, lipid profile, liver function
        tests, kidney function tests, thyroid tests, vitamin tests and other diagnostic
        investigations. The Dr Lal PathLabs Patient Service Centre serves patients looking for
        blood tests and pathology services in Khargapur, Gomti Nagar. Test availability may vary
        by investigation and location.
      </>
    ),
  },
  {
    q: "Can I get a health checkup package in Khargapur?",
    aText:
      "Yes. Dr Lal PathLabs offers different health checkup packages and profiles. The appropriate package depends on the tests required and individual health needs.",
    aJsx: (
      <>
        Yes. Dr Lal PathLabs offers different health checkup packages and profiles. The appropriate
        package depends on the tests required and individual health needs.
      </>
    ),
  },
  {
    q: "Do I need to visit the centre for every blood test?",
    aText:
      "Not necessarily. Eligible tests can be collected through home sample collection where available. Some investigations may have specific sample-collection requirements.",
    aJsx: (
      <>
        Not necessarily. Eligible tests can be collected through home sample collection where
        available. Some investigations may have specific sample-collection requirements.
      </>
    ),
  },
  {
    q: "How should I prepare for a blood test?",
    aText:
      "Preparation depends on the test. Some tests require fasting while others do not. Follow the preparation instructions provided for the specific test or package before giving your sample.",
    aJsx: (
      <>
        Preparation depends on the test. Some tests require fasting while others do not. Follow the
        preparation instructions provided for the specific test or package before giving your
        sample.
      </>
    ),
  },
  {
    q: "Can I book a blood test for home collection in Gomti Nagar?",
    aText:
      "Yes, home collection may be available in eligible areas of Gomti Nagar, including Khargapur. Availability should be confirmed while booking.",
    aJsx: (
      <>
        Yes, home collection may be available in eligible areas of Gomti Nagar, including
        Khargapur. Availability should be confirmed while booking.
      </>
    ),
  },
  {
    q: "How can I contact the Khargapur centre?",
    aText:
      "You can contact the Dr Lal PathLabs Patient Service Centre in Khargapur using the contact details provided on this page.",
    aJsx: (
      <>
        You can contact the Dr Lal PathLabs Patient Service Centre in Khargapur using the contact
        details provided on this page.
      </>
    ),
  },
];

export function KhargapurJsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blood Test in Khargapur, Lucknow", item: PAGE_URL },
    ],
  };
  const clinic = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Dr Lal PathLabs Patient Service Centre - Khargapur",
    url: PAGE_URL,
    telephone: PHONE_DISPLAY,
    address: {
      "@type": "PostalAddress",
      streetAddress: "In front of Sanskar Vatika, Awadhpuri-2, Khargapur, Gomti Nagar",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226010",
      addressCountry: "IN",
    },
    areaServed: { "@type": "Place", name: "Khargapur, Lucknow" },
    description:
      "Dr Lal PathLabs Patient Service Centre in Khargapur, Gomti Nagar, Lucknow (franchise code CC14735). Sample collection and test-booking services; home sample collection may be available in Khargapur and nearby areas, subject to availability. Call +91 9451155402.",
  };
  const webpage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Blood Test & Home Sample Collection in Khargapur, Lucknow",
    url: PAGE_URL,
    inLanguage: "en",
    description: KHARGAPUR_SEO.description,
    about: {
      "@type": "MedicalClinic",
      name: "Dr Lal PathLabs Patient Service Centre - Khargapur",
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: KHARGAPUR_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.aText },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinic) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

function Section({
  title,
  children,
  gray = false,
}: {
  title: string;
  children: React.ReactNode;
  gray?: boolean;
}) {
  return (
    <section className={`py-12 md:py-16 ${gray ? "bg-light-bg" : "bg-white"}`}>
      <div className="container-custom max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-blue mb-6 font-heading">{title}</h2>
        <div className="text-gray-600 leading-relaxed space-y-4">{children}</div>
      </div>
    </section>
  );
}

/* All hrefs verified to exist in the codebase (lib/constants.ts / data). No prices shown. */
const POPULAR_TESTS: { name: string; href: string }[] = [
  { name: "Complete Blood Count (CBC)", href: "/tests/complete-blood-count-cbc" },
  { name: "Fasting Blood Sugar", href: "/tests/glucose-fasting-f" },
  { name: "HbA1c", href: "/tests/hba1c-glycosylated-hemoglobin" },
  { name: "Lipid Profile", href: "/tests/lipid-profile-complete" },
  { name: "Thyroid Profile", href: "/tests/thyroid-profile-total" },
  { name: "Liver Function Test (LFT)", href: "/tests/liver-panel-1-lft" },
  { name: "Kidney Function Test (KFT)", href: "/tests/kidney-panel-kft" },
  { name: "Vitamin D", href: "/tests/vitamin-d-25-hydroxy" },
  { name: "Vitamin B12", href: "/tests/vitamin-b12-cyanocobala-min" },
  { name: "Urine Routine Examination", href: "/tests/urine-examination-routine-urine-r-e" },
];

const PACKAGES: { name: string; href: string }[] = [
  { name: "Super 1", href: "/health-packages/super-1" },
  { name: "Super 2", href: "/health-packages/super-2" },
  { name: "Super 3", href: "/health-packages/super-3" },
  { name: "Super 4", href: "/health-packages/super-4" },
  { name: "Diabetes care package", href: "/health-packages/diabetes-care-package" },
  { name: "Women's health package", href: "/health-packages/womens-health-package" },
  { name: "Cardiac care package", href: "/health-packages/cardiac-care-package" },
];

const NEARBY_AREAS: { name: string; href: string }[] = [
  { name: "Gomti Nagar", href: "/areas/gomti-nagar" },
  { name: "Shalimar One World", href: "/areas/shalimar-one-world" },
  { name: "Gomti Nagar Extension", href: "/areas/gomti-nagar-extension" },
  { name: "Chinhat", href: "/areas/chinhat" },
  { name: "Indira Nagar", href: "/areas/indira-nagar" },
  { name: "Aliganj", href: "/areas/aliganj" },
  { name: "Jankipuram", href: "/areas/jankipuram" },
  { name: "Alambagh", href: "/areas/alambagh" },
  { name: "Aashiana", href: "/areas/aashiana" },
  { name: "Hazratganj", href: "/areas/hazratganj" },
];

export function KhargapurPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-brand-blue text-white py-12 md:py-16">
          <div className="container-custom">
            <nav className="text-xs text-white/60 mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">Blood Test in Khargapur, Lucknow</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-blue text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5" /> Khargapur, Lucknow
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-heading">
                  Blood Test &amp; Home Sample Collection in Khargapur, Lucknow
                </h1>
                <p className="text-white/85 text-lg">
                  Our Khargapur Patient Service Centre provides sample collection and
                  test-booking services. Home sample collection may also be available in Khargapur
                  and nearby areas, subject to availability and applicable terms.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/book-test" primary>
                    Book a Blood Test in Khargapur <ChevronRight className="w-4 h-4 ml-1" />
                  </ButtonLink>
                  <ButtonLink href={PHONE_HREF} primary={false}>
                    <Phone className="w-4 h-4 mr-2" /> {PHONE_DISPLAY}
                  </ButtonLink>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-white">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Centre Address
                </h3>
                <p className="text-sm text-white/85 leading-relaxed mb-1">
                  Dr Lal PathLabs Patient Service Centre – Khargapur
                </p>
                <p className="text-sm text-white/85 leading-relaxed mb-1">{ADDRESS_EN}</p>
                <p className="text-sm text-white/85 leading-relaxed mb-4">{ADDRESS_HI}</p>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-yellow hover:underline"
                >
                  <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Section title="Where is the Khargapur Patient Service Centre?">
          <p>
            The Dr Lal PathLabs Patient Service Centre serving Khargapur is located at{" "}
            {ADDRESS_EN} (franchise code CC14735). If you are travelling to the centre, the
            Sanskar Vatika landmark in Awadhpuri-2 is the easiest reference point to share with
            your driver.
          </p>
          <p>
            Residents of Khargapur can visit the centre for sample collection and test bookings,
            or enquire about{" "}
            <Link href="/home-collection" className="text-brand-blue underline">
              home sample collection
            </Link>
            , subject to availability. For current service availability, call{" "}
            <a href={PHONE_HREF} className="text-brand-blue underline">{PHONE_DISPLAY}</a> before
            visiting.
          </p>
        </Section>

        <Section title="Services at the Khargapur Patient Service Centre" gray>
          <p>
            The Khargapur centre provides sample collection and test-booking services. At the
            centre you can:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>give a sample for a booked test at the centre, where applicable;</li>
            <li>book blood tests and health checkup packages in person;</li>
            <li>ask the team about test preparation before your visit;</li>
            <li>
              enquire about{" "}
              <Link href="/home-collection" className="text-brand-blue underline">
                home sample collection
              </Link>{" "}
              for eligible tests and locations.
            </li>
          </ul>
          <p>
            Service availability can vary by day and by test, so calling{" "}
            <a href={PHONE_HREF} className="text-brand-blue underline">{PHONE_DISPLAY}</a> before
            visiting is recommended.
          </p>
        </Section>

        <Section title="Visit Our Khargapur Patient Service Centre">
          <div className="bg-light-bg border border-gray-100 rounded-xl p-6 not-prose">
            <p className="font-semibold text-gray-900 mb-1">
              Dr Lal PathLabs Patient Service Centre
            </p>
            <p className="text-gray-700 mb-1">{ADDRESS_EN}</p>
            <p className="text-gray-700 mb-3">{ADDRESS_HI}</p>
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span>{" "}
              <a href={PHONE_HREF} className="text-brand-blue font-semibold hover:underline">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
          <p>
            If you are visiting in person, carry your doctor&apos;s written test list or
            prescription if you have one. The Khargapur location is a Patient Service Centre — a
            sample collection and test-booking service point. For directions or other queries, you
            can also reach us through the{" "}
            <Link href="/contact" className="text-brand-blue underline">
              contact page
            </Link>
            .
          </p>
        </Section>

        <Section title="Home Sample Collection in Khargapur" gray>
          <p>
            Home sample collection may be available in Khargapur and selected nearby areas, subject
            to availability and applicable terms.
          </p>
          <p>
            To request home collection, call or WhatsApp {PHONE_DISPLAY} or use the{" "}
            <Link href="/book-test" className="text-brand-blue underline">
              online booking page
            </Link>
            . Share your complete address in Khargapur along with your test list, so the team can
            confirm whether your location and tests are eligible.
          </p>
        </Section>

        <Section title="Popular Blood Tests">
          <p>
            The tests below can be booked through the Khargapur Patient Service Centre. Each test
            page includes preparation information where applicable, and current prices are listed
            on the individual test pages. Availability may vary by test and collection
            requirements.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {POPULAR_TESTS.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl px-4 py-3 text-brand-blue hover:border-brand-blue transition-colors"
                >
                  <FlaskConical className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{t.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p>
            Looking for something else? Browse the full{" "}
            <Link href="/tests" className="text-brand-blue underline">
              blood tests
            </Link>{" "}
            catalogue.
          </p>
        </Section>

        <Section title="Health Checkup Packages" gray>
          <p>
            Health packages available on the website include the{" "}
            {PACKAGES.slice(0, 4).map((p, i) => (
              <span key={p.href}>
                <Link href={p.href} className="text-brand-blue underline">
                  {p.name}
                </Link>
                {i < 3 ? ", " : ""}
              </span>
            ))}{" "}
            screening packages, as well as condition-focused options such as the{" "}
            <Link href="/health-packages/diabetes-care-package" className="text-brand-blue underline">
              diabetes care package
            </Link>
            , the{" "}
            <Link href="/health-packages/womens-health-package" className="text-brand-blue underline">
              women&apos;s health package
            </Link>{" "}
            and the{" "}
            <Link href="/health-packages/cardiac-care-package" className="text-brand-blue underline">
              cardiac care package
            </Link>
            . Each{" "}
            <Link href="/health-packages" className="text-brand-blue underline">
              health package
            </Link>{" "}
            page lists its included tests and current price.
          </p>
          <p>
            Packages can be booked through the Khargapur centre. Home sample collection may be
            available for eligible packages, subject to availability.
          </p>
        </Section>

        <Section title="Home Sample Collection in Nearby Areas">
          <p>
            The physical Patient Service Centre described on this page is in Khargapur. Home sample
            collection may be available in the following nearby areas, subject to service
            availability:
          </p>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {NEARBY_AREAS.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="flex items-center gap-2 text-brand-blue hover:underline"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" /> {a.name}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            These area pages describe home sample collection options — only Khargapur is described
            on this page as a physical Patient Service Centre.
          </p>
        </Section>

        <Section title="When is a blood test usually advised?" gray>
          <p>
            In general, people book blood tests when a doctor recommends them — for a routine
            annual check-up, to follow up on an existing condition, to monitor the effect of
            prescribed medication, or to meet a requirement such as a pre-employment medical or an
            insurance health check. Some people also book preventive packages on their own
            initiative to get a baseline picture of their health.
          </p>
          <p>
            What this page will not do is tell you which tests you personally need. If you have
            symptoms or a health concern, speak to your doctor first and get a written test list.
            Once you have it, the Khargapur centre team can help you book exactly those
            investigations — by phone, on WhatsApp, or through the{" "}
            <Link href="/book-test" className="text-brand-blue underline">
              online booking page
            </Link>
            .
          </p>
        </Section>

        <Section title="How to Book a Blood Test in Khargapur">
          <p>Booking takes a couple of minutes:</p>
          <ol className="space-y-3 list-none">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
              <p><strong className="text-gray-900">Call {PHONE_DISPLAY}</strong> — the centre team confirms your tests, preparation and slot.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
              <p><strong className="text-gray-900">WhatsApp the same number</strong> — convenient for sending a photo of your doctor&apos;s test list.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
              <p><strong className="text-gray-900">Book online</strong> at the{" "}
                <Link href="/book-test" className="text-brand-blue underline">book a test page</Link>.
              </p>
            </li>
          </ol>
          <p>
            Keep ready: the names of the tests (or your doctor&apos;s note), your preferred date
            and time slot, and — for home collection — your complete Khargapur address. If any of
            your tests need fasting, the team confirms this at the time of booking, and the
            preparation is also listed on each test page.
          </p>
        </Section>

        <Section title="Visiting the centre vs home sample collection" gray>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-blue" /> Visit the centre
              </h3>
              <p className="text-sm">
                If you live close by, prefer an in-person visit, or are booking a package and want
                to discuss the inclusions in person.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Home className="w-5 h-5 text-brand-blue" /> Home sample collection
              </h3>
              <p className="text-sm">
                If mornings are difficult, an elderly family member needs testing, you are booking
                for several family members at once, or mobility is a concern. Availability is
                subject to test, location and slot.
              </p>
            </div>
          </div>
          <p>
            Both options are booked through the same number — {PHONE_DISPLAY} — and both are
            subject to availability.
          </p>
        </Section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container-custom max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-blue mb-8 font-heading text-center">
              Khargapur — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {KHARGAPUR_FAQS.map((f, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5 bg-light-bg">
                  <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                  <div className="text-sm text-gray-600 leading-relaxed">{f.aJsx}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand-blue text-white py-12 md:py-16">
          <div className="container-custom max-w-3xl text-center space-y-5">
            <ClipboardList className="w-10 h-10 mx-auto text-brand-yellow" />
            <h2 className="text-2xl md:text-3xl font-bold font-heading">
              Book a Blood Test in Khargapur
            </h2>
            <p className="text-white/85 leading-relaxed">
              Book a blood test online or contact our Khargapur Patient Service Centre for test
              availability and home sample collection options.
            </p>
            <p className="text-white/85">
              Phone:{" "}
              <a href={PHONE_HREF} className="font-bold text-brand-yellow hover:underline">
                {PHONE_DISPLAY}
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <ButtonLink href="/book-test" primary>
                Book a Blood Test in Khargapur <ChevronRight className="w-4 h-4 ml-1" />
              </ButtonLink>
              <ButtonLink href={PHONE_HREF} primary={false}>
                <Phone className="w-4 h-4 mr-2" /> {PHONE_DISPLAY}
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ButtonLink({
  href,
  primary,
  children,
}: {
  href: string;
  primary: boolean;
  children: React.ReactNode;
}) {
  if (primary) {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center bg-brand-yellow hover:bg-brand-yellow-dark text-brand-blue font-bold rounded px-6 py-3"
      >
        {children}
      </Link>
    );
  }
  const cls =
    "inline-flex items-center justify-center border border-white bg-transparent text-white hover:bg-white hover:text-brand-blue rounded font-semibold px-6 py-3";
  return href.startsWith("tel:") ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
