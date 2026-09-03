import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, IndianRupee, ChevronRight, Beaker, User } from "lucide-react";

interface PackageCardProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  tests: readonly string[];
  testsCount: number;
  idealFor: string;
  fasting: boolean;
  reportsIn: string;
  popular?: boolean;
}

export default function PackageCard({
  name,
  slug,
  description,
  price,
  originalPrice,
  testsCount,
  idealFor,
  fasting,
  reportsIn,
  popular,
}: PackageCardProps) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <Card className="group relative overflow-hidden bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Yellow top accent if popular */}
      <div className={`h-1 w-full ${popular ? "bg-brand-yellow" : "bg-brand-blue/10"}`} />

      {popular && (
        <div className="bg-brand-blue text-white text-xs text-center py-1.5 font-semibold tracking-wide">
          MOST POPULAR
        </div>
      )}

      <CardContent className="pt-4 pb-3 space-y-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-blue bg-blue-50 border border-brand-blue/20 px-2 py-0.5 rounded">
            {testsCount} Tests
          </span>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
            Save ₹{originalPrice - price}
          </span>
        </div>

        <h3 className="font-bold text-base text-gray-900 group-hover:text-brand-blue transition-colors leading-snug">
          {name}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">{description}</p>

        <div className="space-y-1.5 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-brand-blue" />
            <span>{idealFor}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-blue" />
            <span>Reports in {reportsIn}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Beaker className="w-3.5 h-3.5 text-brand-blue" />
            <span>{testsCount} parameters</span>
          </div>
          {fasting && (
            <span className="inline-block text-orange-500 bg-orange-50 px-2 py-0.5 rounded text-xs">
              Fasting Required
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 border-t border-gray-50 pt-3 pb-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-brand-blue flex items-center">
              <IndianRupee className="w-4 h-4" />
              {price}
            </span>
            <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
          </div>
          <span className="text-xs font-bold text-green-600">{discount}% OFF</span>
        </div>

        <div className="w-full flex gap-2">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded font-semibold text-sm"
          >
            <Link href={`/health-packages/${slug}`}>
              View Details
            </Link>
          </Button>
          <Button
            asChild
            className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white rounded font-semibold text-sm"
          >
            <Link href={`/book-test?package=${slug}`}>
              Book
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
