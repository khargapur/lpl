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

const BASE_URL = "https://www.bloodtestinlucknow.com";

export const metadata: Metadata = {
  title: {
    default: "Dr. Lal PathLabs Khargapur, Gomti Nagar Lucknow | Blood Test & Diagnostic Centre",
    template: `%s | Dr. Lal PathLabs Lucknow`,
  },
  description:
    "Authorized Patient Service Centre of Dr Lal PathLabs in Khargapur, Gomti Nagar, Lucknow. Book blood tests, health checkups and health packages. Home sample collection may be available, subject to availability.",
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
      "Book blood tests, health checkups and home sample collection in Khargapur, Gomti Nagar, Lucknow. Authorized Patient Service Centre of Dr Lal PathLabs.",
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
    title: "Dr Lal PathLabs Khargapur, Gomti Nagar Lucknow | Blood Test & Home Sample Collection",
    description:
      "Blood tests, health checkups and home sample collection in Khargapur, Gomti Nagar, Lucknow. Authorized Patient Service Centre of Dr Lal PathLabs.",
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
        "@type": ["MedicalOrganization", "MedicalBusiness", "MedicalClinic", "LocalBusiness"],
        "@id": `${BASE_URL}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: ["Dr Lal PathLabs Lucknow", "Dr Lal PathLabs Gomti Nagar", "Dr Lal PathLabs Khargapur"],
        description:
          "Authorized Patient Service Centre of Dr Lal PathLabs in Khargapur, Gomti Nagar, Lucknow. Blood tests, health checkup packages and diagnostic test booking services. Home sample collection may be available, subject to availability.",
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
        hasMap: SITE_CONFIG.mapsUrl,
        currenciesAccepted: "INR",
        areaServed: [
          { "@type": "City", name: "Lucknow" },
          { "@type": "State", name: "Uttar Pradesh" },
        ],
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
