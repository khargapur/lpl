import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  variant?: "blue" | "red" | "yellow";
}

export default function CTABanner({
  title = "Need Help Booking a Test?",
  subtitle = "Our team is ready to assist you. Free home sample collection available across Lucknow.",
  variant = "blue",
}: CTABannerProps) {
  const bg =
    variant === "red"
      ? "bg-brand-red"
      : variant === "yellow"
      ? "bg-brand-yellow"
      : "bg-brand-blue";

  const textColor = variant === "yellow" ? "text-brand-blue" : "text-white";
  const subtitleColor = variant === "yellow" ? "text-brand-blue/70" : "text-white/85";

  return (
    <section className={`${bg} py-12 md:py-16`}>
      <div className="container-custom">
        <div className={`text-center ${textColor} space-y-5`}>
          <h2 className="text-2xl md:text-3xl font-bold font-heading">{title}</h2>
          <p className={`${subtitleColor} max-w-xl mx-auto`}>{subtitle}</p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className={`rounded font-bold ${
                variant === "yellow"
                  ? "bg-brand-blue text-white hover:bg-brand-blue-dark"
                  : "bg-brand-yellow text-brand-blue hover:bg-brand-yellow-dark"
              }`}
            >
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>
                <Phone className="w-5 h-5 mr-2" />
                {SITE_CONFIG.phone}
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className={`rounded font-bold border-2 ${
                variant === "yellow"
                  ? "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-brand-blue"
              }`}
            >
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=Hi, I need help booking a test`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className={`rounded font-bold ${
                variant === "yellow"
                  ? "bg-brand-red text-white hover:bg-brand-red-dark"
                  : "bg-white/20 border border-white/40 text-white hover:bg-white/30"
              }`}
            >
              <Link href="/book-test">
                Book Online
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
