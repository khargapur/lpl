import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

interface ContactCardProps {
  type: "phone" | "email" | "address" | "timing" | "whatsapp";
  title: string;
  value: string;
  href?: string;
}

const iconMap = { phone: Phone, email: Mail, address: MapPin, timing: Clock, whatsapp: MessageCircle };
const colorMap = {
  phone: "bg-brand-blue text-white",
  email: "bg-green-100 text-green-700",
  address: "bg-orange-100 text-orange-700",
  timing: "bg-brand-yellow/20 text-brand-blue",
  whatsapp: "bg-green-100 text-green-700",
};

export default function ContactCard({ type, title, value, href }: ContactCardProps) {
  const Icon = iconMap[type];
  const colorClass = colorMap[type];

  const content = (
    <Card className="group hover:shadow-card-hover transition-all duration-300 border border-gray-100 bg-white rounded-xl">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">{title}</h4>
            <p className={`text-gray-800 font-medium mt-0.5 text-sm ${href ? "group-hover:text-brand-blue transition-colors" : ""}`}>
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <a href={href} target={type === "address" ? "_blank" : undefined} rel={type === "address" ? "noopener noreferrer" : undefined} className="block">
        {content}
      </a>
    );
  }
  return content;
}
