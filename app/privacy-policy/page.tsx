import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Lal PathLabs Lucknow",
  description: "Learn how Dr. Lal PathLabs Patient Service Centre collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Dr. Lal PathLabs Lucknow",
    description: "Learn how Dr. Lal PathLabs Patient Service Centre collects, uses, and protects your personal information.",
    url: "https://lallabslucknow.com/privacy-policy",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-brand-blue text-white py-10 md:py-14">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold font-heading">Privacy Policy</h1>
          </div>
        </section>
        <section className="py-10 md:py-14 bg-white">
          <div className="container-custom max-w-3xl mx-auto space-y-6 text-sm text-gray-600 leading-relaxed">
            <p className="text-xs text-gray-400">Last updated: January 2024</p>
            {[
              { h: "Introduction", p: `${SITE_CONFIG.name} ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our centre or use our services.` },
              { h: "Information We Collect", p: "We collect personal information (name, age, gender, contact, email, address), health information (medical history, test results), and payment details." },
              { h: "How We Use Your Information", p: "We use your information to provide accurate diagnostic services, communicate test results, process payments, send appointment reminders, improve our services, and comply with legal requirements." },
              { h: "Data Security", p: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction." },
              { h: "Information Sharing", p: "We do not sell or rent your personal information to third parties. We may share it with your consent, with your referring doctor, or to comply with legal obligations." },
              { h: "Contact Us", p: `For any privacy-related queries: ${SITE_CONFIG.name}, Phone: ${SITE_CONFIG.phone}.` },
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
