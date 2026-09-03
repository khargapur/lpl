import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FAQAccordion from "@/components/faq-accordion";
import CTABanner from "@/components/cta-banner";
import { FAQS, SITE_CONFIG } from "@/lib/constants";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ – Blood Test & Home Collection Questions | Dr. Lal PathLabs Lucknow",
  description:
    "Got questions about blood tests, home sample collection, report timing or pricing? Find all answers about Dr. Lal PathLabs services in Gomti Nagar, Lucknow.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Dr. Lal PathLabs Lucknow",
    description: "Answers to common questions about blood tests, home collection and health packages at Dr. Lal PathLabs, Gomti Nagar, Lucknow.",
    url: "https://lallabslucknow.com/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Dr. Lal PathLabs Lucknow",
    description: "Answers about blood tests, home collection and health packages in Lucknow.",
  },
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lallabslucknow.com" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://lallabslucknow.com/faq" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main>
        <section className="bg-brand-blue text-white py-12 md:py-16">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 font-heading">Frequently Asked Questions</h1>
            <p className="text-white/85 text-sm">Find answers to common questions about our diagnostic services</p>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-light-bg">
          <div className="container-custom max-w-3xl mx-auto">
            <FAQAccordion faqs={FAQS} />
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="container-custom max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-blue mb-3 font-heading">Still Have Questions?</h2>
            <p className="text-gray-500 text-sm mb-5">We&apos;re here to help.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded font-semibold">
                <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>
                  <Phone className="w-4 h-4 mr-2" />Call Us
                </a>
              </Button>
              <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded font-semibold">
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
