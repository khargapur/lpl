import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Phone, Clock, Shield, CheckCircle2, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const FEATURES = [
  "Free sample collection across Lucknow",
  "Trained and experienced technicians",
  "Safe and hygienic sample collection",
  "On-time arrival at your doorstep",
  "Online payment options available",
  "Same-day report delivery for most tests",
];

export default function HomeCollectionSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue rounded-full px-4 py-1.5 text-sm font-semibold">
              <Home className="w-4 h-4" />
              Home Sample Collection
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-heading">
              Free Sample Collection at Your Doorstep
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Don&apos;t want to visit the lab? Our trained technicians come to your
              home to collect samples — convenient, safe, and completely free
              within Lucknow.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {FEATURES.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded font-semibold">
                <Link href="/book-test">
                  Book Home Collection
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded font-semibold"
              >
                <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call to Schedule
                </a>
              </Button>
            </div>
          </div>

          {/* Steps card */}
          <div className="bg-brand-blue rounded-2xl p-7 md:p-8 text-white">
            <h3 className="text-xl font-bold mb-6 font-heading">How It Works</h3>
            <div className="space-y-5">
              {[
                { step: 1, title: "Book Online or Call", desc: "Schedule a convenient time slot" },
                { step: 2, title: "Technician Arrives", desc: "Verified technician at your doorstep" },
                { step: 3, title: "Sample Collected", desc: "Safe and hygienic procedure" },
                { step: 4, title: "Reports Delivered", desc: "Via email, WhatsApp & portal" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-brand-yellow text-brand-blue flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/20 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-white/80">
                <Clock className="w-4 h-4 text-brand-yellow" />
                7 AM – 9 PM
              </span>
              <span className="flex items-center gap-2 text-white/80">
                <Shield className="w-4 h-4 text-brand-yellow" />
                100% Safe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
