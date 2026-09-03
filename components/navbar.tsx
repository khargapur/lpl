"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-brand-blue text-white py-2 hidden md:block text-sm">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                Contact Us
              </Link>
              <span className="text-white/40">|</span>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 text-white hover:text-brand-yellow transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center h-16 gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex flex-col items-center">
              <img
                src="https://media.lalpathlabs.com/media/logo.webp"
                alt="Dr Lal PathLabs logo – Gomti Nagar, Lucknow"
                className="h-10 w-auto object-contain"
              />
              <span className="text-[10px] font-semibold text-brand-blue tracking-wide mt-0.5">
                Gomti Nagar, Lucknow
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0 flex-1">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-xs font-semibold text-gray-700 uppercase tracking-wide hover:text-brand-blue transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <Button
                asChild
                size="sm"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded font-semibold"
              >
                <Link href="/book-test">Book Test</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden ml-auto p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="container-custom py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 px-3 text-gray-700 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                {link.label}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t border-gray-100 mt-3">
              <Button
                asChild
                className="bg-brand-blue hover:bg-brand-blue-dark text-white w-full rounded"
              >
                <Link href="/book-test" onClick={() => setIsOpen(false)}>
                  Book a Test
                </Link>
              </Button>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 py-2.5 text-sm text-brand-blue font-medium"
              >
                <Phone className="w-4 h-4" />
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
