import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BookingForm from "@/components/sections/booking-form";

export const metadata: Metadata = {
  title: "Book Blood Test Online Lucknow | Dr. Lal PathLabs Gomti Nagar",
  description:
    "Book your blood test or health checkup online at Dr. Lal PathLabs, Gomti Nagar, Lucknow. Choose from 100+ tests, select home collection or walk-in. Fast reports in 24 hrs. Call +91 9451155402.",
  keywords: [
    "book blood test Lucknow",
    "book diagnostic test online Lucknow",
    "blood test appointment Lucknow",
    "book health checkup Lucknow",
    "online lab test booking Lucknow",
  ],
  alternates: { canonical: "/book-test" },
  openGraph: {
    title: "Book Blood Test Online in Lucknow | Dr. Lal PathLabs",
    description: "Easy online booking for blood tests and home collection in Gomti Nagar, Lucknow. Fast, affordable, NABL accredited.",
    url: "https://lallabslucknow.com/book-test",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Blood Test Online Lucknow | Dr. Lal PathLabs",
    description: "Book blood tests and home collection in Gomti Nagar, Lucknow. Call +91 9451155402.",
  },
};

export default function BookTestPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lallabslucknow.com" },
      { "@type": "ListItem", position: 2, name: "Book a Test", item: "https://lallabslucknow.com/book-test" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main>
        <section className="bg-brand-blue text-white py-10 md:py-14">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 font-heading">Book a Test</h1>
            <p className="text-white/85 text-sm">Fill the form below and our team will confirm your appointment</p>
          </div>
        </section>
        <section className="py-10 md:py-14 bg-light-bg">
          <div className="container-custom">
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
