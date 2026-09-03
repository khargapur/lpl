import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const BASE_URL = "https://lallabslucknow.com";

export const metadata: Metadata = {
  title: {
    default: "Dr. Lal PathLabs Khargapur, Gomti Nagar Lucknow | Blood Test & Diagnostic Centre",
    template: `%s | Dr. Lal PathLabs Lucknow`,
  },
  description:
    "Trusted Dr. Lal PathLabs Patient Service Centre in Khargapur, Gomti Nagar, Lucknow. Book blood tests, CBC, HbA1c, Lipid Profile, fever panel & health checkup packages. Free home sample collection. NABL accredited lab. Reports via WhatsApp in 24 hrs.",
  keywords: [
    "Dr Lal PathLabs Lucknow",
    "Dr Lal PathLabs Gomti Nagar",
    "Dr Lal PathLabs Khargapur",
    "pathology lab Lucknow",
    "blood test Lucknow",
    "diagnostic centre Lucknow",
    "diagnostic center Gomti Nagar",
    "health checkup Lucknow",
    "home sample collection Lucknow",
    "CBC test Lucknow",
    "blood sugar test Lucknow",
    "HbA1c test Lucknow",
    "lipid profile Lucknow",
    "KFT test Lucknow",
    "fever panel test Lucknow",
    "NABL accredited lab Lucknow",
    "medical lab Uttar Pradesh",
    "health packages Lucknow",
    "thyroid test Lucknow",
    "vitamin D test Lucknow",
    "pathology Gomti Nagar Lucknow",
    "best pathology lab Lucknow",
    "cheap blood test Lucknow",
    "डॉ लाल पैथलैब्स लखनऊ",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: "Dr. Lal PathLabs",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: SITE_CONFIG.name,
    title: "Dr. Lal PathLabs Khargapur, Gomti Nagar Lucknow | Blood Test & Diagnostic Centre",
    description:
      "Book blood tests, health checkups & home sample collection in Khargapur, Gomti Nagar, Lucknow. NABL accredited Dr. Lal PathLabs – fast reports, affordable prices.",
    images: [
      {
        url: "/images/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "Dr. Lal PathLabs Khargapur, Gomti Nagar Lucknow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Lal PathLabs Khargapur, Gomti Nagar Lucknow | Blood Test & Diagnostic Centre",
    description:
      "NABL accredited pathology lab in Khargapur, Gomti Nagar, Lucknow. Book CBC, sugar, thyroid, fever panel & health packages. Free home collection.",
    images: ["/images/maxresdefault.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Health & Medical",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalOrganization", "MedicalBusiness", "LocalBusiness"],
        "@id": `${BASE_URL}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: ["Dr Lal PathLabs Lucknow", "Dr Lal PathLabs Gomti Nagar", "Dr Lal PathLabs Khargapur"],
        description:
          "Authorized Patient Service Centre of Dr. Lal PathLabs in Khargapur, Gomti Nagar, Lucknow. Offering NABL-accredited blood tests, health packages and free home sample collection.",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: "https://media.lalpathlabs.com/media/logo.webp",
          width: 200,
          height: 80,
        },
        image: `${BASE_URL}/images/maxresdefault.jpg`,
        telephone: SITE_CONFIG.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Khargapur, Gomti Nagar",
          addressLocality: "Lucknow",
          addressRegion: "Uttar Pradesh",
          postalCode: "226010",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "26.8361261",
          longitude: "81.0224694",
        },
        hasMap: SITE_CONFIG.mapsUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "07:00",
            closes: "21:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "08:00",
            closes: "14:00",
          },
        ],
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Google Pay, PhonePe, Paytm",
        areaServed: [
          { "@type": "City", name: "Lucknow" },
          { "@type": "State", name: "Uttar Pradesh" },
        ],
        medicalSpecialty: "Pathology",
        availableService: [
          { "@type": "MedicalTest", name: "Complete Blood Count (CBC)" },
          { "@type": "MedicalTest", name: "Blood Sugar Test" },
          { "@type": "MedicalTest", name: "HbA1c Test" },
          { "@type": "MedicalTest", name: "Lipid Profile" },
          { "@type": "MedicalTest", name: "Thyroid Profile" },
          { "@type": "MedicalTest", name: "Kidney Function Test (KFT)" },
          { "@type": "MedicalTest", name: "Liver Function Test (LFT)" },
          { "@type": "MedicalTest", name: "Fever Panel Test" },
          { "@type": "MedicalTest", name: "Vitamin D Test" },
          { "@type": "MedicalTest", name: "Home Sample Collection" },
        ],
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Dr. Lal PathLabs Lucknow",
        description: "Book blood tests and health checkups in Gomti Nagar, Lucknow",
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/tests?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://media.lalpathlabs.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
