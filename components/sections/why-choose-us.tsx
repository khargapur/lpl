"use client";

import { Award, Clock, Home, Shield, Wallet, Headset } from "lucide-react";

const REASONS = [
  {
    icon: Award,
    title: "NABL Accredited Lab",
    description: "Certified for quality and accuracy following international standards.",
  },
  {
    icon: Clock,
    title: "Quick Reports",
    description: "Get most test results within 24–48 hours via email and WhatsApp.",
  },
  {
    icon: Home,
    title: "Home Collection",
    description: "Free sample collection from your doorstep across Lucknow.",
  },
  {
    icon: Shield,
    title: "Accurate Results",
    description: "State-of-the-art equipment with stringent quality control.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description: "Competitive prices with special discounts on health packages.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Dedicated customer support for all your queries.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 md:py-20 bg-light-bg">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-3 font-heading">
            Why Choose Dr Lal PathLabs?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            We are committed to providing the highest quality diagnostic services
            with patient comfort and convenience as our priority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 group flex gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center flex-shrink-0 group-hover:bg-brand-yellow transition-colors">
                <reason.icon className="w-6 h-6 text-white group-hover:text-brand-blue transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
