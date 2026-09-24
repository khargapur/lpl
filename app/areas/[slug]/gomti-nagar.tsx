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
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const BASE_URL = "https://www.bloodtestinlucknow.com";
const PAGE_URL = `${BASE_URL}/areas/gomti-nagar`;
const PHONE_DISPLAY = "+91 9451155402";
const PHONE_HREF = "tel:+919451155402";
const ADDRESS_EN =
  "In front of Sanskar Vatika, Awadhpuri-2, Khargapur, Gomti Nagar, Lucknow – 226010";
const ADDRESS_HI =
  "संस्कार वाटिका के सामने, अवधपुरी-2, खरगापुर, गोमती नगर, लखनऊ – 226010";

export const GOMTI_NAGAR_SEO = {
  title: "Blood Test in Gomti Nagar, Lucknow | Dr. Lal PathLabs",
  description:
    "Book blood tests and home sample collection in Gomti Nagar, Lucknow through Dr. Lal PathLabs Khargapur. CBC, HbA1c, thyroid, lipid profile, health checkups and more.",
};

/* FAQs: aText = plain text for schema (no raw URLs), aJsx = visible answer (may contain links) */
export const GOMTI_NAGAR_FAQS: { q: string; aText: string; aJsx: React.ReactNode }[] = [
  {
    q: "Is home blood sample collection available in Gomti Nagar?",
    aText:
      "Yes. Free home sample collection is available for Gomti Nagar residents for eligible tests. Share your sector and test list when you book on +91 9451155402 so the team can confirm a collection slot for your location.",
    aJsx: (
      <>
        Yes. Free home sample collection is available for Gomti Nagar residents for eligible
        tests. Share your sector and test list when you book on {PHONE_DISPLAY} so the team can
        confirm a collection slot for your location.
      </>
    ),
  },
  {
    q: "Which sectors and localities of Gomti Nagar do you serve?",
    aText:
      "The service covers Gomti Nagar broadly, including Vibhuti Khand, Vibhav Khand, Vijayant Khand, Viraj Khand, Vishal Khand, Vivek Khand, Vikalp Khand, Viram Khand, Vipul Khand, Patrakarpuram and Gomti Nagar Extension. Mention your exact sector while booking so the team can confirm coverage for your address.",
    aJsx: (
      <>
        The service covers Gomti Nagar broadly, including Vibhuti Khand, Vibhav Khand, Vijayant
        Khand, Viraj Khand, Vishal Khand, Vivek Khand, Vikalp Khand, Viram Khand, Vipul Khand,
        Patrakarpuram and{" "}
        <Link href="/areas/gomti-nagar-extension" className="text-brand-blue underline">
          Gomti Nagar Extension
        </Link>
        . Mention your exact sector while booking so the team can confirm coverage for your
        address.
      </>
    ),
  },
  {
    q: "Is there a Dr Lal PathLabs pathology lab or diagnostic centre in Gomti Nagar?",
    aText:
      "The physical Dr Lal PathLabs Patient Service Centre (franchise code CC14735) is located in Khargapur, Gomti Nagar, Lucknow. Residents across Gomti Nagar use this centre for sample collection and test bookings, or choose free home sample collection instead of visiting.",
    aJsx: (
      <>
        The physical Dr Lal PathLabs Patient Service Centre (franchise code CC14735) is located in
        Khargapur, Gomti Nagar, Lucknow. Residents across Gomti Nagar use this centre for sample
        collection and test bookings, or choose free home sample collection instead of visiting.
        See the{" "}
        <Link href="/areas/khargapur" className="text-brand-blue underline">
          Khargapur centre page
        </Link>{" "}
        for details.
      </>
    ),
  },
  {
    q: "Which blood tests can I book in Gomti Nagar?",
    aText:
      "Commonly booked tests include CBC, fasting blood sugar, HbA1c, thyroid profile, lipid profile, liver function test (LFT), kidney function test (KFT) and vitamin D. The full blood tests catalogue on this website lists every available investigation, and each test page carries its preparation instructions.",
    aJsx: (
      <>
        Commonly booked tests include CBC, fasting blood sugar, HbA1c, thyroid profile, lipid
        profile, liver function test (LFT), kidney function test (KFT) and vitamin D. Browse the
        full{" "}
        <Link href="/tests" className="text-brand-blue underline">
          blood tests
        </Link>{" "}
        catalogue — each test page carries its preparation instructions.
      </>
    ),
  },
  {
    q: "Do I need to fast before my blood test?",
    aText:
      "It depends on the test. Fasting blood sugar and lipid profile usually need an overnight fast, while many other tests do not. Each test page lists its preparation, and the booking team reconfirms it on +91 9451155402. If you are unsure, ask your doctor.",
    aJsx: (
      <>
        It depends on the test. Fasting blood sugar and lipid profile usually need an overnight
        fast, while many other tests do not. Each test page lists its preparation, and the booking
        team reconfirms it on {PHONE_DISPLAY}. If you are unsure, ask your doctor.
      </>
    ),
  },
  {
    q: "How do I book a blood test in Gomti Nagar?",
    aText:
      "Call or WhatsApp +91 9451155402, or use the online booking page. Keep your doctor's test list or the test names ready, along with your preferred date and slot. For home collection, share your complete Gomti Nagar address.",
    aJsx: (
      <>
        Call or WhatsApp <strong>{PHONE_DISPLAY}</strong>, or use the{" "}
        <Link href="/book-test" className="text-brand-blue underline">
          online booking page
        </Link>
        . Keep your doctor&apos;s test list or the test names ready, along with your preferred
        date and slot. For home collection, share your complete Gomti Nagar address.
      </>
    ),
  },
  {
    q: "Can I book a full body health checkup package from Gomti Nagar?",
    aText:
      "Yes. Preventive health checkup packages, including the Swasthfit Super series and condition-focused packages for diabetes, women's health and cardiac care, can be booked by Gomti Nagar residents. Each package page lists its included tests.",
    aJsx: (
      <>
        Yes. Preventive{" "}
        <Link href="/health-packages" className="text-brand-blue underline">
          health checkup packages
        </Link>
        , including the Swasthfit Super series and condition-focused packages for diabetes,
        women&apos;s health and cardiac care, can be booked by Gomti Nagar residents. Each package
        page lists its included tests.
      </>
    ),
  },
  {
    q: "How will I receive my test reports?",
    aText:
      "The centre team confirms the report delivery mode when you book. For any report-related query, call +91 9451155402.",
    aJsx: (
      <>
        The centre team confirms the report delivery mode when you book. For any report-related
        query, call {PHONE_DISPLAY}.
      </>
    ),
  },
  {
    q: "I searched for \u201cblood test near me in Gomti Nagar\u201d — what is the nearest centre?",
    aText:
      "The nearest physical centre is the Dr Lal PathLabs Patient Service Centre in Khargapur, Gomti Nagar (In front of Sanskar Vatika, Awadhpuri-2, Lucknow \u2013 226010). If visiting is inconvenient, free home sample collection brings the service to your doorstep anywhere in Gomti Nagar.",
    aJsx: (
      <>
        The nearest physical centre is the Dr Lal PathLabs Patient Service Centre in Khargapur,
        Gomti Nagar ({ADDRESS_EN}). If visiting is inconvenient, free home sample collection
        brings the service to your doorstep anywhere in Gomti Nagar.
      </>
    ),
  },
];

export function GomtiNagarJsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blood Test in Gomti Nagar, Lucknow", item: PAGE_URL },
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
    areaServed: { "@type": "Place", name: "Gomti Nagar, Lucknow" },
    description:
      "Dr Lal PathLabs Patient Service Centre in Khargapur, Gomti Nagar, Lucknow (franchise code CC14735) serving Gomti Nagar residents with blood tests, pathology services and health checkups. Free home sample collection available in Gomti Nagar for eligible tests. Call +91 9451155402.",
  };
  const webpage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Blood Test & Home Collection in Gomti Nagar, Lucknow",
    url: PAGE_URL,
    inLanguage: "en",
    description: GOMTI_NAGAR_SEO.description,
    about: {
      "@type": "MedicalClinic",
      name: "Dr Lal PathLabs Patient Service Centre - Khargapur",
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GOMTI_NAGAR_FAQS.map((f) => ({
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
const POPULAR_TESTS: { name: string; href: string; note: string }[] = [
  { name: "Complete Blood Count (CBC)", href: "/tests/complete-blood-count-cbc", note: "The most commonly ordered screening test." },
  { name: "Fasting Blood Sugar", href: "/tests/glucose-fasting-f", note: "Overnight fasting required." },
  { name: "HbA1c", href: "/tests/hba1c-glycosylated-hemoglobin", note: "No fasting needed; shows 2–3 month average sugar." },
  { name: "Thyroid Profile", href: "/tests/thyroid-profile-total", note: "Covers T3, T4 and TSH." },
  { name: "Lipid Profile", href: "/tests/lipid-profile-complete", note: "Overnight fasting usually required." },
  { name: "Liver Function Test (LFT)", href: "/tests/liver-panel-1-lft", note: "Checks liver health markers." },
  { name: "Kidney Function Test (KFT)", href: "/tests/kidney-panel-kft", note: "Checks kidney health markers." },
  { name: "Vitamin D", href: "/tests/vitamin-d-25-hydroxy", note: "Commonly advised for bone health and fatigue." },
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

const LOCALITIES = [
  "Vibhuti Khand",
  "Vibhav Khand",
  "Vijayant Khand",
  "Viraj Khand",
  "Vishal Khand",
  "Vivek Khand",
  "Vikalp Khand",
  "Viram Khand",
  "Vipul Khand",
  "Patrakarpuram",
  "Gomti Nagar Extension",
];

export function GomtiNagarPage() {
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
              <span className="text-white/90">Blood Test in Gomti Nagar, Lucknow</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-blue text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5" /> Gomti Nagar, Lucknow
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-heading">
                  Blood Test &amp; Home Collection in Gomti Nagar, Lucknow
                </h1>
                <p className="text-white/85 text-lg">
                  If you live in Gomti Nagar and need a blood test, you have two easy options:
                  visit the Dr Lal PathLabs Patient Service Centre in nearby Khargapur, or book
                  free home sample collection and have your sample taken at your doorstep.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/book-test" primary>
                    Book a Blood Test in Gomti Nagar <ChevronRight className="w-4 h-4 ml-1" />
                  </ButtonLink>
                  <ButtonLink href={PHONE_HREF} primary={false}>
                    <Phone className="w-4 h-4 mr-2" /> {PHONE_DISPLAY}
                  </ButtonLink>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-white">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Serving Centre Address
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

        <Section title="Blood testing services for Gomti Nagar residents">
          <p>
            Gomti Nagar is one of Lucknow&apos;s largest residential townships, and its residents
            regularly need routine blood tests — for annual checkups, diabetes and thyroid
            follow-ups, fever investigations, pre-employment medicals and preventive health
            screening. Through the Dr Lal PathLabs Patient Service Centre in Khargapur, Gomti
            Nagar, you can book blood tests and pathology services without travelling across the
            city.
          </p>
          <p>
            The centre handles sample collection and test bookings for investigations ranging
            from a basic CBC to specialised profiles. If you prefer not to travel,{" "}
            <Link href="/home-collection" className="text-brand-blue underline">
              home sample collection
            </Link>{" "}
            brings the same service to your home in Gomti Nagar. This page explains both options,
            the commonly booked tests, and exactly how to book.
          </p>
        </Section>

        <Section title="Home sample collection in Gomti Nagar" gray>
          <p>
            Free home sample collection is available for Gomti Nagar residents for eligible
            tests. A trained phlebotomist visits your home or office at the confirmed slot, and
            the sample is handled according to the collection and transport procedures for your
            selected test. This is the most convenient option for elderly family members, working
            professionals with tight mornings, and anyone booking tests for several family
            members at once.
          </p>
          <p>How it works:</p>
          <ol className="space-y-3 list-none">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
              <p><strong className="text-gray-900">Book your slot</strong> — call or WhatsApp {PHONE_DISPLAY}, or use the{" "}
                <Link href="/book-test" className="text-brand-blue underline">online booking page</Link>.
                Share your test list and your complete Gomti Nagar address.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
              <p><strong className="text-gray-900">Sample collected at home</strong> — the phlebotomist arrives at the confirmed time with sealed, single-use collection kits.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
              <p><strong className="text-gray-900">Testing and reports</strong> — your sample goes through the Dr Lal PathLabs testing network, and the team confirms how your reports will be shared when you book.</p>
            </li>
          </ol>
          <p>
            Coverage is confirmed per booking — mention your sector and nearest landmark so the
            team can arrange the right slot for your exact location. Read more about the service
            on the{" "}
            <Link href="/home-collection" className="text-brand-blue underline">
              home sample collection page
            </Link>
            .
          </p>
        </Section>

        <Section title="Popular blood tests in Gomti Nagar">
          <p>
            These are the investigations Gomti Nagar residents book most often. Each test page
            lists its preparation instructions and current price — availability may vary by test
            and collection requirements.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {POPULAR_TESTS.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="flex items-start gap-2.5 bg-white border border-gray-100 rounded-xl px-4 py-3 text-brand-blue hover:border-brand-blue transition-colors"
                >
                  <FlaskConical className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="text-sm font-medium block">{t.name}</span>
                    <span className="text-xs text-gray-500">{t.note}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <strong className="text-gray-900">Fasting guidance:</strong> fasting blood sugar and
            lipid profile usually need an overnight fast (water is generally fine unless the team
            says otherwise), while tests like HbA1c do not need fasting. The exact preparation
            for your test is listed on its test page and reconfirmed by the booking team — when
            in doubt, ask your doctor.
          </p>
          <p>
            Looking for something else? Browse the full{" "}
            <Link href="/tests" className="text-brand-blue underline">
              blood tests
            </Link>{" "}
            catalogue.
          </p>
        </Section>

        <Section title="Health checkup packages" gray>
          <p>
            If you want a broader picture of your health rather than a single test, preventive
            packages bundle the commonly advised investigations together. The{" "}
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
            , can all be booked by Gomti Nagar residents. Each{" "}
            <Link href="/health-packages" className="text-brand-blue underline">
              health package
            </Link>{" "}
            page lists its included tests and current price.
          </p>
          <p>
            Packages can be booked at the Khargapur centre or with home sample collection, as
            applicable — confirm the collection option for your chosen package while booking.
          </p>
        </Section>

        <Section title="Localities served in Gomti Nagar">
          <p>
            Home sample collection is arranged across the township. The localities below are
            routinely served — when you book, mention your exact sector so the team can confirm
            the slot for your address:
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {LOCALITIES.map((l) => (
              <li key={l} className="flex items-center gap-2 text-gray-700 text-sm">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" /> {l}
              </li>
            ))}
          </ul>
          <p>
            Don&apos;t see your exact sector? Call {PHONE_DISPLAY} — if you are in Gomti Nagar,
            the team will confirm whether your location can be served. There is also a separate{" "}
            <Link href="/areas/gomti-nagar-extension" className="text-brand-blue underline">
              Gomti Nagar Extension
            </Link>{" "}
            page with area-specific details.
          </p>
        </Section>

        <Section title="Why choose Dr Lal PathLabs in Gomti Nagar" gray>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-blue" /> A physical centre nearby
              </h3>
              <p className="text-sm">
                The Patient Service Centre in Khargapur, Gomti Nagar is a real, operating
                centre — not just a collection van. Visit it in person or use it as the base
                for your home collection booking.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Home className="w-5 h-5 text-brand-blue" /> Free home sample collection
              </h3>
              <p className="text-sm">
                Skip the travel across the township. A trained phlebotomist collects your
                sample at home for eligible tests — free of charge.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-brand-blue" /> Wide test menu
              </h3>
              <p className="text-sm">
                From routine CBC and blood sugar to thyroid, lipid, liver and kidney profiles
                and full preventive packages — one booking covers the investigations your
                doctor advised.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-blue" /> Simple booking
              </h3>
              <p className="text-sm">
                Call, WhatsApp, or book online in a couple of minutes. The team confirms your
                tests, preparation and slot before the sample is taken.
              </p>
            </div>
          </div>
        </Section>

        <Section title="How booking works">
          <p>Booking a blood test in Gomti Nagar takes a couple of minutes:</p>
          <ol className="space-y-3 list-none">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
              <p><strong className="text-gray-900">Call or WhatsApp {PHONE_DISPLAY}</strong> — the centre team confirms your tests, preparation and slot.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
              <p><strong className="text-gray-900">Share your details</strong> — your doctor&apos;s test list (a photo on WhatsApp works), your preferred date and time, and your complete Gomti Nagar address for home collection.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
              <p><strong className="text-gray-900">Give your sample</strong> — at home with the visiting phlebotomist, or at the Khargapur centre if you prefer to walk in.</p>
            </li>
          </ol>
          <p>
            Prefer to book yourself? Use the{" "}
            <Link href="/book-test" className="text-brand-blue underline">
              online booking page
            </Link>{" "}
            — it opens a pre-filled WhatsApp message to the centre with your booking details.
          </p>
        </Section>

        <Section title="Visit the centre or contact us" gray>
          <div className="bg-white border border-gray-100 rounded-xl p-6 not-prose">
            <p className="font-semibold text-gray-900 mb-1">
              Dr Lal PathLabs Patient Service Centre
            </p>
            <p className="text-gray-700 mb-1">{ADDRESS_EN}</p>
            <p className="text-gray-700 mb-3">{ADDRESS_HI}</p>
            <p className="text-gray-700 mb-3">
              <span className="font-medium">Phone / WhatsApp:</span>{" "}
              <a href={PHONE_HREF} className="text-brand-blue font-semibold hover:underline">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="text-gray-700">
              <a
                href={SITE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue font-medium hover:underline"
              >
                Open in Google Maps
              </a>
              {" · "}
              <Link href="/contact" className="text-brand-blue font-medium hover:underline">
                Contact page
              </Link>
            </p>
          </div>
          <p>
            If you are visiting in person, carry your doctor&apos;s written test list or
            prescription if you have one. Calling {PHONE_DISPLAY} before visiting is
            recommended so the team can confirm the day&apos;s sample-collection timings.
          </p>
        </Section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container-custom max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-blue mb-8 font-heading text-center">
              Gomti Nagar — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {GOMTI_NAGAR_FAQS.map((f, i) => (
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
              Book a Blood Test in Gomti Nagar
            </h2>
            <p className="text-white/85 leading-relaxed">
              Book a blood test online or contact the Khargapur Patient Service Centre for test
              availability and free home sample collection in Gomti Nagar.
            </p>
            <p className="text-white/85">
              Phone:{" "}
              <a href={PHONE_HREF} className="font-bold text-brand-yellow hover:underline">
                {PHONE_DISPLAY}
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <ButtonLink href="/book-test" primary>
                Book a Blood Test in Gomti Nagar <ChevronRight className="w-4 h-4 ml-1" />
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
