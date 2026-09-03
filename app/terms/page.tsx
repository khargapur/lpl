import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions | Dr. Lal PathLabs Lucknow",
  description: "Terms and conditions for using the services of Dr. Lal PathLabs Patient Service Centre, Lucknow.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms & Conditions | Dr. Lal PathLabs Lucknow",
    description: "Terms and conditions for using the services of Dr. Lal PathLabs Patient Service Centre, Lucknow.",
    url: "https://lallabslucknow.com/terms",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-brand-blue text-white py-10 md:py-14">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold font-heading">Terms &amp; Conditions</h1>
          </div>
        </section>
        <section className="py-10 md:py-14 bg-white">
          <div className="container-custom max-w-3xl mx-auto space-y-6 text-sm text-gray-600 leading-relaxed">
            <p className="text-xs text-gray-400">Last updated: January 2024</p>
            {[
              { h: "Acceptance of Terms", p: `By using the services of ${SITE_CONFIG.name}, you agree to be bound by these Terms and Conditions.` },
              { h: "Appointments and Bookings", p: "Appointments can be booked online, by phone, or by visiting our centre. Please arrive on time. Cancellations should be communicated at least 2 hours before the scheduled time." },
              { h: "Test Preparation", p: "Certain tests require 10–12 hours of fasting. Please inform us about any medications or medical conditions. Failure to follow preparation guidelines may affect test results." },
              { h: "Payment Terms", p: "Payment is required at the time of booking or sample collection. We accept cash, UPI, credit/debit cards, and net banking." },
              { h: "Reports", p: "Report delivery times vary by test type (most within 24–48 hours). Reports are delivered via email, WhatsApp, and our online portal." },
              { h: "Contact Information", p: `${SITE_CONFIG.name}, Phone: ${SITE_CONFIG.phone}.` },
            ].map((s, i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-brand-blue mb-2 font-heading">{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
