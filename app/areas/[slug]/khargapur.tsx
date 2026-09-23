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
import { AREAS } from "@/data/areas";

const BASE_URL = "https://www.bloodtestinlucknow.com";
const PAGE_URL = `${BASE_URL}/areas/khargapur`;
const PHONE_DISPLAY = "+91 9451155402";
const PHONE_HREF = "tel:+919451155402";
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
    q: "Is there a blood test centre in Khargapur?",
    aText:
      "Yes. The Dr Lal PathLabs Patient Service Centre (franchise code CC14735) is a physical, operating centre in Khargapur — not a temporary camp or a collection point open on select days. You can visit the Patient Service Centre for applicable sample collection and test-booking services.",
    aJsx: (
      <>
        Yes. The Dr Lal PathLabs Patient Service Centre (franchise code CC14735) is a physical,
        operating centre in Khargapur — not a temporary camp or a collection point open on select
        days. You can visit the Patient Service Centre for applicable sample collection and
        test-booking services.
      </>
    ),
  },
  {
    q: "Where exactly is the Dr Lal PathLabs centre in Khargapur?",
    aText: `The centre is at ${ADDRESS_HI} — opposite Sanskar Vatika in Awadhpuri-2, Khargapur. The phone number is ${PHONE_DISPLAY}.`,
    aJsx: (
      <>
        The centre is at {ADDRESS_HI} — opposite Sanskar Vatika in Awadhpuri-2, Khargapur. The
        phone number is {PHONE_DISPLAY}.
      </>
    ),
  },
  {
    q: "Is home blood sample collection available in Khargapur?",
    aText:
      "Home sample collection may be available for eligible tests and locations in the Khargapur area, subject to collection-slot availability. A member of the collection team visits your home or office, and samples are collected according to the applicable collection and transport procedures for the selected test.",
    aJsx: (
      <>
        Home sample collection may be available for eligible tests and locations in the Khargapur
        area, subject to collection-slot availability. A member of the collection team visits your
        home or office, and samples are collected according to the applicable collection and
        transport procedures for the selected test.
      </>
    ),
  },
  {
    q: "Which blood tests can I book from Khargapur?",
    aText:
      "A wide range of tests can be booked through the Khargapur service — routine blood work such as CBC and blood sugar, HbA1c, lipid profile, liver and kidney function panels, thyroid tests, vitamin D and B12, iron studies, CRP and ESR, urine investigations, fever-related tests, and preventive health packages — subject to test availability and applicable sample-collection requirements. The catalogue with preparation information is on the tests page of this website.",
    aJsx: (
      <>
        A wide range of tests can be booked through the Khargapur service — routine blood work such
        as CBC and blood sugar, HbA1c, lipid profile, liver and kidney function panels, thyroid
        tests, vitamin D and B12, iron studies, CRP and ESR, urine investigations, fever-related
        tests, and preventive health packages — subject to test availability and applicable
        sample-collection requirements. The catalogue with preparation information is on the{" "}
        <Link href="/tests" className="text-brand-blue underline">tests page</Link>.
      </>
    ),
  },
  {
    q: "Do I need to fast before a blood test?",
    aText:
      "It depends on the test. Some investigations require fasting and some do not. The preparation instructions are listed on each individual test page, and the booking team confirms them when you book. If you are unsure, ask your doctor.",
    aJsx: (
      <>
        It depends on the test. Some investigations require fasting and some do not. The preparation
        instructions are listed on each individual test page, and the booking team confirms them
        when you book. If you are unsure, ask your doctor.
      </>
    ),
  },
  {
    q: "Can elderly patients or people with limited mobility use home collection?",
    aText:
      "Home sample collection can be convenient when travel is difficult — the collection team member comes to the home, so there is no travel involved. Availability depends on the test, location and slot, which the team confirms at booking.",
    aJsx: (
      <>
        Home sample collection can be convenient when travel is difficult — the collection team
        member comes to the home, so there is no travel involved. Availability depends on the test,
        location and slot, which the team confirms at booking.
      </>
    ),
  },
  {
    q: "Can I book a full-body health checkup from Khargapur?",
    aText:
      "Yes. Preventive health checkup packages — including the Swasthfit Super series and condition-focused packages for diabetes, women's health and cardiac care — can be booked through the Khargapur centre. Package availability and collection options depend on the selected package and current service availability. Each package page lists its included tests.",
    aJsx: (
      <>
        Yes. Preventive{" "}
        <Link href="/health-packages" className="text-brand-blue underline">
          health checkup packages
        </Link>{" "}
        — including the Swasthfit Super series and condition-focused packages for diabetes,
        women&apos;s health and cardiac care — can be booked through the Khargapur centre. Package
        availability and collection options depend on the selected package and current service
        availability. Each package page lists its included tests.
      </>
    ),
  },
  {
    q: "How do I book a blood test?",
    aText: `Call or WhatsApp ${PHONE_DISPLAY}, or use the online booking page of this website. Keep your doctor's test list or the test names ready, along with your preferred date and slot.`,
    aJsx: (
      <>
        Call or WhatsApp <strong>{PHONE_DISPLAY}</strong>, or use the{" "}
        <Link href="/book-test" className="text-brand-blue underline">
          online booking page
        </Link>
        . Keep your doctor&apos;s test list or the test names ready, along with your preferred date
        and slot.
      </>
    ),
  },
  {
    q: "Do you serve nearby areas like Gomti Nagar Extension, Chinhat or Indira Nagar?",
    aText:
      "Home sample collection may be available in nearby areas such as Gomti Nagar Extension, Chinhat and Indira Nagar, subject to test, location and collection-slot availability. The physical Patient Service Centre described on this page is in Khargapur, and you are welcome to visit it in person.",
    aJsx: (
      <>
        Home sample collection may be available in nearby areas such as Gomti Nagar Extension,
        Chinhat and Indira Nagar, subject to test, location and collection-slot availability. The
        physical Patient Service Centre described on this page is in Khargapur, and you are welcome
        to visit it in person.
      </>
    ),
  },
  {
    q: "What should I check before going for a blood test?",
    aText:
      "Confirm which tests your doctor advised and carry the written list or prescription if you have one. Check the fasting or preparation instructions on the test page or with the booking team. Let the collection team know about any medication you take regularly. For home collection, keep your full address and a nearby landmark ready.",
    aJsx: (
      <>
        Confirm which tests your doctor advised and carry the written list or prescription if you
        have one. Check the fasting or preparation instructions on the test page or with the booking
        team. Let the collection team know about any medication you take regularly. For home
        collection, keep your full address and a nearby landmark ready.
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
      streetAddress: "संस्कार वाटिका के सामने, अवधपुरी-2, खरगापुर, गोमती नगर",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226010",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "Place", name: "Khargapur, Lucknow" },
      { "@type": "Place", name: "Gomti Nagar, Lucknow" },
      { "@type": "Place", name: "Gomti Nagar Extension, Lucknow" },
      { "@type": "Place", name: "Chinhat, Lucknow" },
      { "@type": "Place", name: "Indira Nagar, Lucknow" },
    ],
    medicalSpecialty: "Pathology",
    description:
      "Dr Lal PathLabs Patient Service Centre in Khargapur, Gomti Nagar, Lucknow. Blood tests and diagnostic testing with in-centre sample collection and home sample collection. Call +91 9451155402.",
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

const TEST_CATEGORIES: { name: string; desc: string; href: string; linkText?: string }[] = [
  {
    name: "Complete Blood Count (CBC)",
    desc: "measures red blood cells, white blood cells, haemoglobin and platelets. A common part of routine health evaluations.",
    href: "/tests/complete-blood-count-cbc",
    linkText: "CBC test details",
  },
  {
    name: "HbA1c (Glycosylated Haemoglobin)",
    desc: "reflects average blood sugar levels over roughly the past two to three months and is widely used in diabetes monitoring.",
    href: "/tests/hba1c-glycosylated-hemoglobin",
    linkText: "HbA1c test details",
  },
  {
    name: "Blood sugar / glucose tests",
    desc: "fasting and post-meal glucose measurements, booked individually or as part of diabetes panels.",
    href: "/tests",
  },
  {
    name: "Lipid profile",
    desc: "measures cholesterol fractions and triglycerides; typically needs fasting, as stated on the test page.",
    href: "/tests",
  },
  {
    name: "Liver function test (LFT)",
    desc: "a panel of markers related to liver health.",
    href: "/tests",
  },
  {
    name: "Kidney function test (KFT)",
    desc: "markers such as creatinine and urea used to assess kidney function.",
    href: "/tests",
  },
  {
    name: "Thyroid tests (T3, T4, TSH)",
    desc: "individual and combined thyroid-function measurements.",
    href: "/tests",
  },
  {
    name: "Vitamin D (25-OH)",
    desc: "measures vitamin D status.",
    href: "/tests",
  },
  {
    name: "Vitamin B12",
    desc: "measures B12 levels, often checked alongside anaemia workups.",
    href: "/tests",
  },
  {
    name: "Ferritin and iron studies",
    desc: "assess iron stores and related markers.",
    href: "/tests/ferritin",
    linkText: "Ferritin test details",
  },
  {
    name: "CRP and ESR",
    desc: "inflammation-related markers frequently included in general health evaluations.",
    href: "/tests/c-reactive-protein-cardio-hscrp",
    linkText: "CRP test details",
  },
  {
    name: "Urine routine and microscopy",
    desc: "a standard urine investigation.",
    href: "/tests",
  },
  {
    name: "Fever-related tests",
    desc: "dengue, typhoid, malaria and related investigations, also available as a combined panel.",
    href: "/health-packages/fever-panel",
    linkText: "fever panel",
  },
  {
    name: "Other diagnostic investigations",
    desc: "hormone assays, allergy panels, tumour markers and specialised tests are all bookable through the centre.",
    href: "/tests",
  },
];

const PACKAGES = [
  { name: "Super 1", href: "/health-packages/super-1" },
  { name: "Super 2", href: "/health-packages/super-2" },
  { name: "Super 3", href: "/health-packages/super-3" },
  { name: "Super 4", href: "/health-packages/super-4" },
  { name: "Diabetes care package", href: "/health-packages/diabetes-care-package" },
  { name: "Women's health package", href: "/health-packages/womens-health-package" },
  { name: "Cardiac care package", href: "/health-packages/cardiac-care-package" },
];

const NEARBY_AREAS = [
  { name: "Gomti Nagar", href: "/areas/gomti-nagar" },
  { name: "Gomti Nagar Extension", href: "/areas/gomti-nagar-extension" },
  { name: "Indira Nagar", href: "/areas/indira-nagar" },
  { name: "Chinhat", href: "/areas/chinhat" },
];

export function KhargapurPage() {
  const otherAreas = AREAS.filter((a) => a.slug !== "khargapur").slice(0, 6);
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
                  The Dr Lal PathLabs Patient Service Centre (franchise code CC14735) is located
                  right here in Khargapur — visit for sample collection and test bookings, or
                  request home sample collection, subject to availability.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/book-test" primary>
                    Book Test in Khargapur <ChevronRight className="w-4 h-4 ml-1" />
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

        <Section title="A physical diagnostic centre in Khargapur">
          <p>
            Khargapur is a residential sublocality of Gomti Nagar in east Lucknow, made up of
            plotted colonies and newer housing pockets such as Awadhpuri-2. For residents here,
            getting a blood test has usually meant travelling to the main Gomti Nagar market or
            further into the city. That is no longer necessary.
          </p>
          <p>
            The Dr Lal PathLabs Patient Service Centre (franchise code CC14735) is a physical
            diagnostic centre located in Khargapur itself. You can visit the Patient Service Centre
            for applicable sample collection and test-booking services, and discuss health checkup
            packages in person. Home sample collection may also be available for eligible tests and
            locations, subject to collection-slot availability.
          </p>
          <p>
            This page covers everything specific to Khargapur: where the centre is, which tests you
            can book, how home collection works here, and how residents of nearby Gomti Nagar
            pockets can use the service.
          </p>
        </Section>

        <Section title="Blood tests and diagnostic tests available in Khargapur" gray>
          <p>
            A wide range of pathology and diagnostic tests can be booked through the Khargapur
            service, subject to test availability and applicable sample-collection requirements.
            This includes routine blood work, diabetes and thyroid monitoring, lipid and
            organ-function panels, vitamin and iron studies, infection and fever tests, urine
            investigations, and preventive health packages. The catalogue is listed on the{" "}
            <Link href="/tests" className="text-brand-blue underline">tests page</Link>, and
            individual test pages include preparation information where applicable, so you can check
            in advance whether fasting or any other preparation applies.
          </p>
          <p>
            For tests with specific preparation or collection requirements, check the individual test
            instructions and confirm availability and the appropriate collection slot when booking.
            If your doctor has advised a specific set of investigations, the centre team can help you
            book exactly what was written — nothing more.
          </p>
        </Section>

        <Section title="Home sample collection in Khargapur">
          <p>
            Home sample collection may be available for eligible tests and locations in the Khargapur
            area, subject to collection-slot availability. When you book, you choose a date and time
            slot, and a collection-team member arrives at your home or office with sealed, single-use
            collection materials. Samples are collected according to the applicable collection and
            transport procedures for the selected test.
          </p>
          <p>
            This option can be convenient for elderly residents, working professionals who cannot step
            out in the morning, parents booking tests for children, and families who want several
            members tested in one visit. Booking is done the same way as a centre visit —{" "}
            <Link href="/book-test" className="text-brand-blue underline">
              call, WhatsApp or book online
            </Link>{" "}
            — and you mention your Khargapur address so the team can confirm slot availability for
            your area.
          </p>
        </Section>

        <Section title="The Dr Lal PathLabs Patient Service Centre in Khargapur" gray>
          <p>
            This is an actual, operating Patient Service Centre — not a camp, not a collection point
            run on select days. It carries the Dr Lal PathLabs franchise code CC14735 and serves as
            the service point for Khargapur and the surrounding Gomti Nagar pockets. You can visit
            for sample collection, to book health checkup packages, or to ask practical questions
            about test preparation and booking.
          </p>
          <p>
            For this local service page, the physical Patient Service Centre is located in Khargapur.
            Nearby areas may be served through home sample collection, subject to availability.
          </p>
        </Section>

        <Section title="Centre address and location">
          <div className="bg-light-bg border border-gray-100 rounded-xl p-6 not-prose">
            <p className="font-semibold text-gray-900 mb-1">
              Dr Lal PathLabs Patient Service Centre – Khargapur
            </p>
            <p className="text-gray-700 mb-3">{ADDRESS_HI}</p>
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span>{" "}
              <a href={PHONE_HREF} className="text-brand-blue font-semibold hover:underline">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
          <p>
            The centre is in Awadhpuri-2, Khargapur, opposite Sanskar Vatika. Khargapur falls under
            PIN 226010 and is a sublocality of Gomti Nagar, connected to the wider city through
            Shaheed Path and the developing sectors of Gomti Nagar Extension. Nearby pockets —
            Vineet Khand, the Sector 5 and 6 areas, Saraswati Puram, Chinhat and Malhaur — are within
            the broader local service area; home sample collection may be available subject to
            location and slot availability.
          </p>
          <p>
            If you are visiting in person, calling{" "}
            <a href={PHONE_HREF} className="text-brand-blue underline">{PHONE_DISPLAY}</a> before
            you leave is a good idea — the team can confirm the day&apos;s sample-collection timings
            and whether your test needs any preparation.
          </p>
        </Section>

        <Section title="Popular test categories" gray>
          <ul className="space-y-4">
            {TEST_CATEGORIES.map((t) => (
              <li key={t.name} className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FlaskConical className="w-4 h-4 text-brand-blue" />
                </span>
                <p className="text-gray-600">
                  <strong className="text-gray-900">{t.name}</strong> — {t.desc}{" "}
                  {t.linkText ? (
                    <Link href={t.href} className="text-brand-blue underline">{t.linkText}</Link>
                  ) : (
                    <Link href={t.href} className="text-brand-blue underline">See the tests page</Link>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Health checkup packages for Khargapur residents">
          <p>
            Alongside individual tests, the centre offers preventive{" "}
            <Link href="/health-packages" className="text-brand-blue underline">
              health checkup packages
            </Link>{" "}
            designed around common screening needs. The Swasthfit Super series (
            {PACKAGES.slice(0, 4).map((p, i) => (
              <span key={p.href}>
                <Link href={p.href} className="text-brand-blue underline">{p.name}</Link>
                {i < 3 ? ", " : ""}
              </span>
            ))}
            ) covers broad multi-parameter screening. Condition-focused options include the{" "}
            <Link href="/health-packages/diabetes-care-package" className="text-brand-blue underline">
              diabetes care package
            </Link>
            , the{" "}
            <Link href="/health-packages/womens-health-package" className="text-brand-blue underline">
              women&apos;s health package
            </Link>
            , and the{" "}
            <Link href="/health-packages/cardiac-care-package" className="text-brand-blue underline">
              cardiac care package
            </Link>
            .
          </p>
          <p>
            Each package page lists exactly which tests are included, so you can compare inclusions
            before choosing. Packages can be booked at the Khargapur centre in person. Home sample
            collection may also be available for eligible packages. Package availability and
            collection options depend on the selected package and current service availability. For
            current pricing, see the individual package pages — prices are not repeated here because
            they are updated on those pages.
          </p>
        </Section>

        <Section title="Khargapur and nearby areas served" gray>
          <p>
            The physical Patient Service Centre described on this page is in Khargapur. Home sample
            collection may be available in the nearby Gomti Nagar pockets, subject to test, location
            and slot availability:
          </p>
          <ul className="grid sm:grid-cols-2 gap-2.5">
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
            <li className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0" /> Malhaur and the Vineet Khand side of Gomti Nagar
            </li>
          </ul>
          <p>
            For this local service page, the physical Patient Service Centre is located in Khargapur.
            If you live in a nearby pocket and prefer to visit in person, you are welcome at the
            Khargapur centre; home sample collection may be available subject to location and slot
            availability.
          </p>
        </Section>

        <Section title="When is a blood test usually advised?">
          <p>
            In general, people book blood tests when a doctor recommends them — for a routine annual
            check-up, to follow up on an existing condition, to monitor the effect of prescribed
            medication, or to meet a requirement such as a pre-employment medical or an insurance
            health check. Some people also book preventive packages on their own initiative to get a
            baseline picture of their health.
          </p>
          <p>
            What this page will not do is tell you which tests you personally need. If you have
            symptoms or a health concern, speak to your doctor first and get a written test list. Once
            you have it, the Khargapur centre team can help you book exactly those investigations —
            by phone, on WhatsApp, or through the{" "}
            <Link href="/book-test" className="text-brand-blue underline">
              online booking page
            </Link>
            .
          </p>
        </Section>

        <Section title="How to book a test in Khargapur" gray>
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
            Keep ready: the names of the tests (or your doctor&apos;s note), your preferred date and
            time slot, and — for home collection — your complete Khargapur address with a nearby
            landmark. If any of your tests need fasting, the team confirms this at the time of
            booking, and the preparation is also listed on each test page.
          </p>
        </Section>

        <Section title="Visiting the centre vs home sample collection">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-light-bg border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-blue" /> Visit the centre
              </h3>
              <p className="text-sm">
                If you live close by, prefer an in-person visit, are booking a package and want to
                discuss the inclusions in person, or like the routine of visiting the centre yourself.
              </p>
            </div>
            <div className="bg-light-bg border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Home className="w-5 h-5 text-brand-blue" /> Home sample collection
              </h3>
              <p className="text-sm">
                If mornings are difficult, an elderly family member needs testing, you are booking for
                several family members at once, or mobility is a concern. Samples are collected
                according to the applicable collection and transport procedures for the selected test.
              </p>
            </div>
          </div>
          <p>
            Both options are booked through the same number — {PHONE_DISPLAY} — and both are subject
            to slot availability on the day you choose.
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

        {/* Final CTA */}
        <section className="bg-brand-blue text-white py-12 md:py-16">
          <div className="container-custom max-w-3xl text-center space-y-5">
            <ClipboardList className="w-10 h-10 mx-auto text-brand-yellow" />
            <h2 className="text-2xl md:text-3xl font-bold font-heading">
              Need a blood test in Khargapur?
            </h2>
            <p className="text-white/85 leading-relaxed">
              Visit the Dr Lal PathLabs Patient Service Centre at {ADDRESS_HI}, or request home
              sample collection, subject to availability. Either way, booking starts with one step —
              call or WhatsApp{" "}
              <a href={PHONE_HREF} className="font-bold text-brand-yellow hover:underline">
                {PHONE_DISPLAY}
              </a>
              , or{" "}
              <Link href="/book-test" className="font-semibold underline hover:text-brand-yellow">
                book your test online
              </Link>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <ButtonLink href="/book-test" primary>
                Book Your Test <ChevronRight className="w-4 h-4 ml-1" />
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
