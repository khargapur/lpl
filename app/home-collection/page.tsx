import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTABanner from "@/components/cta-banner";
import { Button } from "@/components/ui/button";
import { Home, Phone, Clock, Shield, CheckCircle2, Calendar, MapPin, Users, BadgeCheck, Truck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free Home Sample Collection Lucknow | Dr. Lal PathLabs Gomti Nagar",
  description:
    "Book free home blood sample collection in Gomti Nagar, Hazratganj, Aliganj & all areas of Lucknow. Trained phlebotomists at your door. Same-day pickup available. Call +91 9451155402.",
  keywords: [
    "home sample collection Lucknow",
    "blood test home collection Lucknow",
    "doorstep collection Gomti Nagar",
    "free home collection Lucknow",
    "phlebotomist home visit Lucknow",
    "home blood test Lucknow",
  ],
  alternates: { canonical: "/home-collection" },
  openGraph: {
    title: "Free Home Blood Sample Collection in Lucknow | Dr. Lal PathLabs",
    description: "Free home sample collection across all areas of Lucknow. Book online or call +91 9451155402.",
    url: "https://lallabslucknow.com/home-collection",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Home Sample Collection Lucknow | Dr. Lal PathLabs",
    description: "Free home blood sample collection across Lucknow. Book online or call +91 9451155402.",
  },
};

export default function HomeCollectionPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lallabslucknow.com" },
      { "@type": "ListItem", position: 2, name: "Home Collection", item: "https://lallabslucknow.com/home-collection" },
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
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="inline-block bg-brand-yellow text-brand-blue text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide">Free Service</span>
                <h1 className="text-4xl md:text-5xl font-bold font-heading">Home Sample Collection</h1>
                <p className="text-white/85 text-lg">Our trained technicians collect samples from your doorstep — safe, convenient, and completely free.</p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-blue font-bold rounded">
                    <Link href="/book-test">Book Home Collection <ChevronRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue rounded font-semibold">
                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}><Phone className="w-4 h-4 mr-2" />Call to Schedule</a>
                  </Button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-white">
                <h3 className="font-semibold text-center mb-4">Available 7 Days a Week</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/10 rounded-lg p-3 text-center"><div className="font-semibold">Mon – Sat</div><div className="text-white/70">7:00 AM – 9:00 PM</div></div>
                  <div className="bg-white/10 rounded-lg p-3 text-center"><div className="font-semibold">Sunday</div><div className="text-white/70">8:00 AM – 2:00 PM</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-brand-blue mb-2 font-heading">How It Works</h2>
              <p className="text-gray-500 text-sm">Simple 6-step process for home sample collection</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { step: 1, icon: Calendar, title: "Book Online or Call", desc: "Schedule a convenient time slot" },
                { step: 2, icon: Clock, title: "Confirm Time Slot", desc: "Choose preferred collection time" },
                { step: 3, icon: Users, title: "Technician Arrives", desc: "Verified technician at your doorstep" },
                { step: 4, icon: BadgeCheck, title: "Sample Collected", desc: "Safe and hygienic procedure" },
                { step: 5, icon: Truck, title: "Sample Transported", desc: "Safely transported to NABL lab" },
                { step: 6, icon: CheckCircle2, title: "Reports Delivered", desc: "Via email, WhatsApp & portal" },
              ].map((s) => (
                <div key={s.step} className="bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow border border-gray-100 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">Step {s.step}</div>
                    <h3 className="font-semibold text-gray-900 text-sm">{s.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-light-bg">
          <div className="container-custom">
            <div className="text-center mb-10">
              <span className="inline-block bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide mb-3">We Come to You</span>
              <h2 className="text-3xl font-bold text-brand-blue mb-2 font-heading">Coverage Areas in Lucknow</h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">Free home sample collection available across all major localities in Lucknow — if your area isn&apos;t listed, call us and we&apos;ll try to accommodate.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
              {[
                "Gomti Nagar","Khargapur","Gomti Nagar Extension","Hazratganj","Indira Nagar","Aliganj",
                "Mahanagar","Alambagh","Ashiyana","Jankipuram","Vibhuti Khand","Viraj Khand",
                "Sushant Golf City","Shaheed Path","Chinhat","Faizabad Road","Sultanpur Road",
                "Kursi Road","Rajajipuram","Charbagh","Chowk","MI Rustle Court","Shalimar OneWorld",
                "Amar Shaheed Path","Kathauta Lake","Patrakarpuram","Nishatganj","Kapoorthala",
                "Munshipulia","Transport Nagar","Golf City","Lulu Mall Lucknow","Phoenix Palassio",
                "Ansal API","Eldeco City","CG City","Butler Palace","Kaiserbagh","Aminabad",
                "BBD University","Sitapur Road","Kanpur Road","IIM Road","Engineering College Road",
              ].map((area) => (
                <span key={area} className="bg-white border border-gray-200 hover:border-brand-blue/40 hover:bg-brand-blue/5 text-gray-700 hover:text-brand-blue text-sm px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors shadow-sm">
                  <MapPin className="w-3 h-3 text-brand-blue flex-shrink-0" />{area}
                </span>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-8">
              Don&apos;t see your area?{" "}
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="text-brand-blue font-semibold hover:underline">
                Call us — we cover all of Lucknow
              </a>
            </p>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
