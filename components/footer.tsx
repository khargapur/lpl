import Link from "next/link";
import { Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

const quickLinks = [
  { href: "/tests", label: "Our Tests" },
  { href: "/health-packages", label: "Health Packages" },
  { href: "/home-collection", label: "Home Collection" },
  { href: "/book-test", label: "Book a Test" },
  { href: "https://www.lalpathlabs.com/download-report", label: "Download Report" },
  { href: "/faq", label: "FAQs" },
];

const aboutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const areaLinks = [
  { href: "/areas/khargapur", label: "Blood Test in Khargapur" },
  { href: "/areas/gomti-nagar", label: "Blood Test in Gomti Nagar" },
  { href: "/areas/gomti-nagar-extension", label: "Blood Test in Gomti Nagar Ext." },
  { href: "/areas/hazratganj", label: "Blood Test in Hazratganj" },
  { href: "/areas/indira-nagar", label: "Blood Test in Indira Nagar" },
  { href: "/areas/aliganj", label: "Blood Test in Aliganj" },
  { href: "/areas/jankipuram", label: "Blood Test in Jankipuram" },
  { href: "/areas/alambagh", label: "Blood Test in Alambagh" },
  { href: "/areas/aashiana", label: "Blood Test in Aashiana" },
  { href: "/areas/chinhat", label: "Blood Test in Chinhat" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white">
      {/* Main footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand column */}
          <div className="space-y-5">
            <div>
              <p className="text-xl font-extrabold tracking-tight text-white leading-tight">
                <span className="text-brand-yellow">Dr. Lal</span> PathLabs
              </p>
              <p className="text-xs text-white/60 font-medium tracking-widest uppercase mt-0.5">Patient Service Centre</p>
            </div>

            <p className="text-white/75 text-sm leading-relaxed">
              Authorized Patient Service Centre of Dr Lal PathLabs serving Khargapur and nearby
              areas of Lucknow.
            </p>
            <p className="text-white/45 text-xs leading-relaxed border-t border-white/10 pt-3">
              This is <span className="font-semibold text-white/60">not</span> the official website of Dr. Lal PathLabs Ltd. This site belongs to an authorized Patient Service Centre franchise operating in Lucknow.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-blue flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-brand-yellow mb-4 uppercase tracking-wide text-sm">
              Services
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-white/75 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold text-brand-yellow mb-4 uppercase tracking-wide text-sm">
              Company
            </h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas We Serve */}
          <div>
            <h4 className="font-semibold text-brand-yellow mb-4 uppercase tracking-wide text-sm">
              Areas We Serve
            </h4>
            <ul className="space-y-2.5">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-brand-yellow mb-4 uppercase tracking-wide text-sm">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-white/75 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/75 hover:text-white text-sm transition-colors"
                >
                  <MapPin className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" />
                  {SITE_CONFIG.address}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white/60">
          <p>© 2026 Authorized Patient Service Centre, Khargapur, Lucknow. All rights reserved.</p>
          <p>Authorized Patient Service Centre, Lucknow</p>
        </div>
      </div>
    </footer>
  );
}
