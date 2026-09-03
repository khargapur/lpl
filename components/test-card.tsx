import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, IndianRupee, ChevronRight } from "lucide-react";

interface TestCardProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  fasting: boolean;
  duration: string;
  parameters: string;
  popular?: boolean;
}

export default function TestCard({
  name,
  slug,
  description,
  price,
  originalPrice,
  category,
  fasting,
  duration,
  popular,
}: TestCardProps) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <Link href={`/tests/${slug}`} className="block group">
      <Card className="relative overflow-hidden bg-white rounded-xl shadow-card group-hover:shadow-card-hover transition-all duration-300 border border-gray-100 h-full">
        {popular && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow" />
        )}

        <CardContent className="pt-5 pb-3 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="outline"
              className="text-brand-blue border-brand-blue/25 bg-blue-50 rounded text-xs"
            >
              {category}
            </Badge>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
              {discount}% OFF
            </span>
          </div>

          <h3 className="font-semibold text-base text-gray-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
            {name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2">{description}</p>

          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration}
            </span>
            {fasting && (
              <span className="text-orange-500 bg-orange-50 px-2 py-0.5 rounded">
                Fasting Required
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-4 flex items-center justify-between border-t border-gray-50 mt-2 pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-brand-blue flex items-center">
              <IndianRupee className="w-4 h-4" />
              {price}
            </span>
            <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue bg-blue-50 border border-brand-blue/20 rounded px-2.5 py-1 group-hover:bg-brand-blue group-hover:text-white transition-colors">
            View & Book
            <ChevronRight className="w-3 h-3" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
