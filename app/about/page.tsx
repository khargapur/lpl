import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTABanner from "@/components/cta-banner";
import { Button } from "@/components/ui/button";
import { Award, Users, FlaskConical, Clock, MapPin, Phone, Heart, Shield, Target } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Dr. Lal PathLabs Gomti Nagar Lucknow | NABL Accredited Lab",
  description:
    "Dr. Lal PathLabs Patient Service Centre in Khargapur, Gomti Nagar, Lucknow. NABL accredited lab with state-of-the-art equipment, accurate results delivered in 24 hours. Free home sample collection. Call +91 9451155402.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Dr. Lal PathLabs Gomti Nagar Lucknow | NABL Accredited Diagnostic Centre",
    description: "NABL accredited lab in Khargapur, Gomti Nagar, Lucknow. Accurate results, affordable prices, free home sample collection across Lucknow.",
    url: "https://lallabslucknow.com/about",
  },
};

const VALUES = [
  { icon: Shield, title: "Quality", description: "We maintain the highest standards in testing accuracy and lab procedures." },
  { icon: Heart, title: "Patient Care", description: "Every decision we make puts patient comfort and wellbeing first." },
  { icon: Target, title: "Accuracy", description: "State-of-the-art equipment ensures precise and reliable results." },
];

const STATS = [
  { icon: Users, value: "50,000+", label: "Happy Patients" },
  { icon: FlaskConical, value: "3000+", label: "Tests Available" },
  { icon: Award, value: "NABL", label: "Accredited Lab" },
  { icon: Clock, value: "24–48h", label: "Report Time" },
];

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lallabslucknow.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://lallabslucknow.com/about" },
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
        {/* Hero */}
        <section className="bg-brand-blue text-white py-14 md:py-20">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">About Us</h1>
            <p className="text-white/85 text-lg">Your trusted partner for accurate and reliable diagnostic services in Lucknow</p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-heading">
                  Welcome to Dr. Lal PathLabs Patient Service Centre
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  We are an authorized Patient Service Centre of Dr. Lal PathLabs, one of India&apos;s
                  most trusted diagnostic chains. Serving the people
                  of Lucknow with quality pathology services, we are committed to providing accurate
                  test results with quick turnaround times.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Our centre is equipped with modern facilities and staffed by experienced professionals
                  who ensure every sample is handled with care. With NABL accreditation, we follow
                  stringent quality protocols to deliver results you can trust.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded font-semibold">
                    <Link href="/book-test">Book a Test</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded font-semibold">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-3 bg-brand-yellow/15 rounded-2xl" />
                <img
                  src="https://images.pexels.com/photos/4226114/pexels-photo-4226114.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Dr. Lal PathLabs diagnostic laboratory in Gomti Nagar, Lucknow"
                  className="relative rounded-xl shadow-card w-full h-[380px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 bg-light-bg">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-5 text-center shadow-card hover:shadow-card-hover transition-shadow border border-gray-100">
                  <stat.icon className="w-9 h-9 text-brand-yellow mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-brand-blue">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-brand-blue mb-2 font-heading">Our Values</h2>
              <p className="text-gray-500 text-sm">The principles that guide everything we do</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {VALUES.map((v, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-8 text-center shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-brand-blue flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />

        {/* Location */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-5">
                <h2 className="text-3xl font-bold text-brand-blue font-heading">Visit Our Centre</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Address", val: SITE_CONFIG.address },
                    { icon: Phone, label: "Phone", val: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}` },
                    { icon: Clock, label: "Timings", val: "Mon–Sat: 7AM–9PM | Sun: 8AM–2PM" },
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
                          <p className="text-gray-700 text-sm">{item.val}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded font-semibold">
                  <a href={SITE_CONFIG.directionsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-4 h-4 mr-2" />Get Directions
                  </a>
                </Button>
              </div>
              <div className="rounded-xl overflow-hidden shadow-card h-[380px] border border-gray-100">
                <iframe src={SITE_CONFIG.mapsEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Dr. Lal PathLabs Location" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
