import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTABanner from "@/components/cta-banner";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Dr. Lal PathLabs Gomti Nagar Lucknow | +91 9451155402",
  description:
    "Contact Dr. Lal PathLabs Patient Service Centre, Gomti Nagar, Lucknow. Call +91 9451155402 to book blood tests, home sample collection or ask about health packages. Open Mon–Sat 7AM–9PM, Sun 8AM–2PM.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Dr. Lal PathLabs Lucknow | Book Test or Home Collection",
    description: "Call +91 9451155402 for blood tests and home collection in Khargapur, Gomti Nagar, Lucknow. Mon–Sat 7AM–9PM, Sun 8AM–2PM.",
    url: "https://lallabslucknow.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Dr. Lal PathLabs Lucknow | +91 9451155402",
    description: "Book blood tests and home collection in Gomti Nagar, Lucknow. Call +91 9451155402.",
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lallabslucknow.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://lallabslucknow.com/contact" },
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
        <section className="bg-brand-blue text-white py-12 md:py-16">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 font-heading">Contact Us</h1>
            <p className="text-white/85 text-sm">Reach out to us for test bookings, home collection, or any queries</p>
          </div>
        </section>

        <section className="py-10 bg-light-bg">
          <div className="container-custom">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Phone, title: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`, color: "bg-brand-blue text-white" },
                { icon: MessageCircle, title: "WhatsApp", value: SITE_CONFIG.whatsapp, href: `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`, color: "bg-green-100 text-green-700" },
                { icon: Clock, title: "Working Hours", value: "Mon–Sat: 7AM–9PM | Sun: 8AM–2PM", color: "bg-brand-yellow/20 text-brand-blue" },
              ].map((item, i) => (
                <a key={i} href={item.href} target={item.href?.startsWith("https") ? "_blank" : undefined} rel={item.href?.startsWith("https") ? "noopener noreferrer" : undefined} className="block bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow border border-gray-100">
                  <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">{item.title}</h3>
                  <p className="text-gray-800 font-medium text-sm">{item.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-5">
                <h2 className="text-3xl font-bold text-brand-blue font-heading">Visit Our Centre</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Address", val: SITE_CONFIG.address },
                    { icon: Phone, label: "Phone", val: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}` },
                    { icon: Clock, label: "Working Hours", val: "Mon–Sat: 7:00 AM – 9:00 PM\nSunday: 8:00 AM – 2:00 PM" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-brand-blue flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">{item.label}</h4>
                        {item.href ? (
                          <a href={item.href} className="text-gray-700 hover:text-brand-blue text-sm">{item.val}</a>
                        ) : (
                          <p className="text-gray-700 text-sm whitespace-pre-line">{item.val}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded font-semibold">
                    <a href={SITE_CONFIG.directionsUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin className="w-4 h-4 mr-2" />Get Directions
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded font-semibold">
                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>
                      <Phone className="w-4 h-4 mr-2" />Call Now
                    </a>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-card border border-gray-100 h-[380px] lg:h-auto">
                <a href={SITE_CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer" className="block h-full group">
                  <div className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 h-full flex flex-col items-center justify-center gap-5 overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#1a56db 1px,transparent 1px),linear-gradient(90deg,#1a56db 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
                    <div className="relative w-16 h-16 rounded-full bg-brand-blue shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center relative z-10 px-6">
                      <p className="font-extrabold text-brand-blue text-lg font-heading">Dr. Lal PathLabs</p>
                      <p className="text-gray-600 text-sm font-medium">Patient Service Centre, Gomti Nagar</p>
                      <p className="text-gray-500 text-xs mt-1">{SITE_CONFIG.address}</p>
                      <span className="inline-flex items-center gap-2 mt-4 bg-brand-blue text-white text-sm font-semibold px-4 py-2 rounded-full group-hover:bg-brand-blue-dark transition-colors shadow">
                        <MapPin className="w-4 h-4" /> Open in Google Maps
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <CTABanner title="Ready to Book a Test?" subtitle="Contact us today to schedule your diagnostic test or home collection." />
      </main>
      <Footer />
    </>
  );
}
