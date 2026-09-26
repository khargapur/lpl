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
const PAGE_URL = `${BASE_URL}/areas/shalimar-one-world`;
const PHONE_DISPLAY = "+91 9451155402";
const PHONE_HREF = "tel:+919451155402";
const ADDRESS_EN =
  "In front of Sanskar Vatika, Awadhpuri-2, Khargapur, Gomti Nagar, Lucknow – 226010";
const ADDRESS_HI =
  "संस्कार वाटिका के सामने, अवधपुरी-2, खरगापुर, गोमती नगर, लखनऊ – 226010";

export const SHALIMAR_ONE_WORLD_SEO = {
  title: "Blood Test Near Shalimar One World, Lucknow | Home Collection",
  description:
    "Looking for blood tests near Shalimar One World, Lucknow? Explore Dr Lal PathLabs blood testing and home sample collection services for Sector 6 and nearby Gomti Nagar areas.",
};

/* FAQs: aText = plain text for schema (no raw URLs), aJsx = visible answer (may contain links) */
export const SHALIMAR_ONE_WORLD_FAQS: { q: string; aText: string; aJsx: React.ReactNode }[] = [
  {
    q: "Is home blood sample collection available near Shalimar One World?",
    aText:
      "Yes. Free home sample collection can be arranged for residents in and around Shalimar One World for eligible tests. Share your tower/block and test list when you book on +91 9451155402 so the team can confirm a collection slot for your address.",
    aJsx: (
      <>
        Yes. Free home sample collection can be arranged for residents in and around Shalimar
        One World for eligible tests. Share your tower/block and test list when you book on{" "}
        {PHONE_DISPLAY} so the team can confirm a collection slot for your address.
      </>
    ),
  },
  {
    q: "Which Dr Lal PathLabs centre serves Shalimar One World?",
    aText:
      "This website belongs to the Dr Lal PathLabs Patient Service Centre (franchise code CC14735) in Khargapur, Gomti Nagar, Lucknow. Residents near Shalimar One World use this centre for sample collection and test bookings, or choose free home sample collection instead of visiting.",
    aJsx: (
      <>
        This website belongs to the Dr Lal PathLabs Patient Service Centre (franchise code
        CC14735) in Khargapur, Gomti Nagar, Lucknow. Residents near Shalimar One World use this
        centre for sample collection and test bookings, or choose free home sample collection
        instead of visiting. See the{" "}
        <Link href="/areas/khargapur" className="text-brand-blue underline">
          Khargapur centre page
        </Link>{" "}
        for details.
      </>
    ),
  },
  {
    q: "Which blood tests can I book near Shalimar One World?",
    aText:
      "Commonly booked tests include CBC, fasting blood sugar, HbA1c, thyroid profile, lipid profile, liver function test (LFT), kidney function test (KFT), vitamin D and vitamin B12. The full blood tests catalogue on this website lists every available investigation, and each test page carries its preparation instructions.",
    aJsx: (
      <>
        Commonly booked tests include CBC, fasting blood sugar, HbA1c, thyroid profile, lipid
        profile, liver function test (LFT), kidney function test (KFT), vitamin D and vitamin
        B12. Browse the full{" "}
        <Link href="/tests" className="text-brand-blue underline">
          blood tests
        </Link>{" "}
        catalogue — each test page carries its preparation instructions.
      </>
    ),
  },
  {
    q: "Can I book a full body health checkup from Shalimar One World?",
    aText:
      "Yes. Preventive health checkup packages, including the Swasthfit Super series and condition-focused packages for diabetes, women's health and cardiac care, can be booked by residents near Shalimar One World. Each package page lists its included tests, and home sample collection can be arranged where applicable.",
    aJsx: (
      <>
        Yes. Preventive{" "}
        <Link href="/health-packages" className="text-brand-blue underline">
          health checkup packages
        </Link>
        , including the Swasthfit Super series and condition-focused packages for diabetes,
        women&apos;s health and cardiac care, can be booked by residents near Shalimar One
        World. Each package page lists its included tests, and home sample collection can be
        arranged where applicable.
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
        fast, while many other tests do not. Each test page lists its preparation, and the
        booking team reconfirms it on {PHONE_DISPLAY}. If you are unsure, ask your doctor.
      </>
    ),
  },
  {
    q: "How do I book a blood test near Shalimar One World?",
    aText:
      "Call or WhatsApp +91 9451155402, or use the online booking page. Keep your doctor's test list or the test names ready, along with your preferred date and slot. For home collection, share your complete address near Shalimar One World, including tower or block.",
    aJsx: (
      <>
        Call or WhatsApp <strong>{PHONE_DISPLAY}</strong>, or use the{" "}
        <Link href="/book-test" className="text-brand-blue underline">
          online booking page
        </Link>
        . Keep your doctor&apos;s test list or the test names ready, along with your preferred
        date and slot. For home collection, share your complete address near Shalimar One
        World, including tower or block.
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
    q: "I live in Sector 6, Gomti Nagar — can I use this service?",
    aText:
      "Yes. Sector 6 residents are served by the same Khargapur Patient Service Centre, with free home sample collection available for eligible tests. The broader Gomti Nagar service details are on the Gomti Nagar area page.",
    aJsx: (
      <>
        Yes. Sector 6 residents are served by the same Khargapur Patient Service Centre, with
        free home sample collection available for eligible tests. Broader Gomti Nagar service
        details are on the{" "}
        <Link href="/areas/gomti-nagar" className="text-brand-blue underline">
          Gomti Nagar area page
        </Link>
        .
      </>
    ),
  },
];

export function ShalimarOneWorldJsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blood Test Near Shalimar One World, Lucknow",
        item: PAGE_URL,
      },
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
    areaServed: { "@type": "Place", name: "Shalimar One World, Sector 6, Gomti Nagar, Lucknow" },
    description:
      "Dr Lal PathLabs Patient Service Centre in Khargapur, Gomti Nagar, Lucknow (franchise code CC14735) serving Shalimar One World, Sector 6 and nearby Gomti Nagar areas with blood tests, pathology services and health checkups. Free home sample collection available for eligible tests. Call +91 9451155402.",
  };
  const webpage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Blood Test Near Shalimar One World, Lucknow",
    url: PAGE_URL,
    inLanguage: "en",
    description: SHALIMAR_ONE_WORLD_SEO.description,
    about: {
      "@type": "MedicalClinic",
      name: "Dr Lal PathLabs Patient Service Centre - Khargapur",
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SHALIMAR_ONE_WORLD_FAQS.map((f) => ({
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

/* Test hrefs verified against lib/constants.ts / existing area pages. No prices shown. */
const POPULAR_TESTS: { name: string; href: string; note: string }[] = [
  { name: "Complete Blood Count (CBC)", href: "/tests/complete-blood-count-cbc", note: "The most commonly ordered screening test." },
  { name: "Fasting Blood Sugar", href: "/tests/glucose-fasting-f", note: "Overnight fasting required." },
  { name: "HbA1c", href: "/tests/hba1c-glycosylated-hemoglobin", note: "No fasting needed; shows 2–3 month average sugar." },
  { name: "Thyroid Profile", href: "/tests/thyroid-profile-total", note: "Covers T3, T4 and TSH." },
  { name: "Lipid Profile", href: "/tests/lipid-profile-complete", note: "Overnight fasting usually required." },
  { name: "Liver Function Test (LFT)", href: "/tests/liver-panel-1-lft", note: "Checks liver health markers." },
  { name: "Kidney Function Test (KFT)", href: "/tests/kidney-panel-kft", note: "Checks kidney health markers." },
  { name: "Vitamin D", href: "/tests/vitamin-d-25-hydroxy", note: "Commonly advised for bone health and fatigue." },
  { name: "Vitamin B12", href: "/tests/vitamin-b12-cyanocobala-min", note: "Checks B12 levels; advised for fatigue and nerve health." },
];

const NEARBY_AREAS = [
  { name: "Gomti Nagar", href: "/areas/gomti-nagar" },
  { name: "Khargapur", href: "/areas/khargapur" },
  { name: "Gomti Nagar Extension", href: "/areas/gomti-nagar-extension" },
  { name: "Sector 6, Gomti Nagar", href: "/areas/gomti-nagar" },
];

export function ShalimarOneWorldPage() {
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
              <Link href="/areas/gomti-nagar" className="hover:text-white">Gomti Nagar</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">Shalimar One World</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-blue text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5" /> Shalimar One World, Lucknow
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-heading">
                  Blood Test Near Shalimar One World, Lucknow
                </h1>
                <p className="text-white/85 text-lg">
                  Living in or around Shalimar One World and need a blood test? Book routine
                  blood tests, diabetes and thyroid profiles, vitamin tests and full-body
                  health checkups through the Dr Lal PathLabs Patient Service Centre in
                  Khargapur — at the centre, or with free home sample collection at your
                  doorstep.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/book-test" primary>
                    Book a Blood Test <ChevronRight className="w-4 h-4 ml-1" />
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

        <Section title="Blood testing services near Shalimar One World">
          <p>
            Shalimar One World is a residential neighbourhood in the Gomti Nagar region of
            Lucknow, close to Sector 6. Families here need the same routine diagnostics as
            anywhere else in the city — annual health checkups, diabetes and thyroid
            monitoring, fever and infection workups, and pre-employment medicals. Through
            this website you can book those blood tests with the Dr Lal PathLabs Patient
            Service Centre (franchise code CC14735) in Khargapur, which serves Shalimar One
            World and the surrounding Sector 6 / Gomti Nagar pockets.
          </p>
          <p>
            You can either visit the Khargapur centre in person or skip the trip entirely:
            free{" "}
            <Link href="/home-collection" className="text-brand-blue underline">
              home sample collection
            </Link>{" "}
            sends a trained phlebotomist to your home in or around Shalimar One World for
            eligible tests. Both options are booked through the same team on {PHONE_DISPLAY}.
          </p>
        </Section>

        <Section title="Home sample collection near Shalimar One World" gray>
          <p>
            For most residents near Shalimar One World, home collection is the simpler
            option — no parking, no waiting room, no taking half a day off. It works
            especially well for elderly parents, for fasting tests that need an early-morning
            slot, and when several family members need tests on the same day.
          </p>
          <p>How it works:</p>
          <ol className="space-y-3 list-none">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
              <p><strong className="text-gray-900">Book your slot</strong> — call or WhatsApp {PHONE_DISPLAY}, or use the{" "}
                <Link href="/book-test" className="text-brand-blue underline">online booking page</Link>.
                Share your test list and your complete address near Shalimar One World (tower or block helps).</p>
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
            Collection slots are confirmed per booking, so mention your exact location while
            booking. Read more about the service on the{" "}
            <Link href="/home-collection" className="text-brand-blue underline">
              home sample collection page
            </Link>
            .
          </p>
        </Section>

        <Section title="Common diagnostic tests">
          <p>
            These are the investigations residents near Shalimar One World book most often.
            Each test page lists its preparation instructions and current price:
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
            <strong className="text-gray-900">Fasting guidance:</strong> fasting blood sugar
            and lipid profile usually need an overnight fast, while tests like HbA1c do not.
            The exact preparation for your test is listed on its test page and reconfirmed by
            the booking team — when in doubt, ask your doctor. Browse the full{" "}
            <Link href="/tests" className="text-brand-blue underline">
              blood tests
            </Link>{" "}
            catalogue for everything else.
          </p>
        </Section>

        <Section title="Full body health checkups" gray>
          <p>
            If you want a complete picture rather than individual tests, preventive health
            checkup packages bundle the commonly advised investigations. The{" "}
            <Link href="/health-packages/super-1" className="text-brand-blue underline">Super 1</Link>,{" "}
            <Link href="/health-packages/super-2" className="text-brand-blue underline">Super 2</Link>,{" "}
            <Link href="/health-packages/super-3" className="text-brand-blue underline">Super 3</Link>{" "}
            and{" "}
            <Link href="/health-packages/super-4" className="text-brand-blue underline">Super 4</Link>{" "}
            screening packages cover the standard preventive panels, and condition-focused
            options such as the{" "}
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
            </Link>{" "}
            address specific health concerns. Each{" "}
            <Link href="/health-packages" className="text-brand-blue underline">
              health package
            </Link>{" "}
            page lists its included tests and current price.
          </p>
          <p>
            Packages can be booked at the Khargapur centre or with home sample collection,
            as applicable — confirm the collection option for your chosen package while
            booking on {PHONE_DISPLAY}.
          </p>
        </Section>

        <Section title="Areas we serve nearby">
          <p>
            The Khargapur Patient Service Centre serves Shalimar One World along with the
            surrounding neighbourhoods. If your area is listed below — or anywhere close to
            it — call {PHONE_DISPLAY} and the team will confirm a slot for your address:
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
            {NEARBY_AREAS.map((a) => (
              <li key={a.href + a.name}>
                <Link
                  href={a.href}
                  className="flex items-center gap-2 text-brand-blue text-sm bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-brand-blue transition-colors"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" /> Blood Test in {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Why book through the Khargapur centre" gray>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-blue" /> A physical centre you can visit
              </h3>
              <p className="text-sm">
                The Patient Service Centre in Khargapur, Gomti Nagar is a real, operating
                centre — not just a collection van. Walk in for sample collection, or use it
                as the base for your home collection booking.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Home className="w-5 h-5 text-brand-blue" /> Free home sample collection
              </h3>
              <p className="text-sm">
                For eligible tests, a trained phlebotomist collects your sample at home near
                Shalimar One World — free of charge, at a confirmed slot.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-brand-blue" /> Wide test menu
              </h3>
              <p className="text-sm">
                From routine CBC and blood sugar to thyroid, lipid, liver and kidney profiles,
                vitamin tests and full preventive packages — one booking covers the
                investigations your doctor advised.
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

        <Section title="Visit the centre or contact us">
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
            Prefer to book yourself? Use the{" "}
            <Link href="/book-test" className="text-brand-blue underline">
              online booking page
            </Link>{" "}
            — it opens a pre-filled WhatsApp message to the centre with your booking details.
          </p>
        </Section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container-custom max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-blue mb-8 font-heading text-center">
              Shalimar One World — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {SHALIMAR_ONE_WORLD_FAQS.map((f, i) => (
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
              Book a Blood Test Near Shalimar One World
            </h2>
            <p className="text-white/85 leading-relaxed">
              Book a blood test online or contact the Khargapur Patient Service Centre for
              test availability and free home sample collection near Shalimar One World,
              Sector 6 and nearby Gomti Nagar areas.
            </p>
            <p className="text-white/85">
              Phone:{" "}
              <a href={PHONE_HREF} className="font-bold text-brand-yellow hover:underline">
                {PHONE_DISPLAY}
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <ButtonLink href="/book-test" primary>
                Book a Blood Test <ChevronRight className="w-4 h-4 ml-1" />
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
