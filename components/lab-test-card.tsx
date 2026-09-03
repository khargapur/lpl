import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronRight, FlaskConical, IndianRupee } from "lucide-react";

interface LabTestCardProps {
  test_code: string;
  test_name: string;
  slug: string;
  specimen?: string;
  report?: string;
  category: string;
  method?: string;
  price?: number | null;
}

export default function LabTestCard({
  test_code,
  test_name,
  slug,
  specimen,
  report,
  category,
  price,
}: LabTestCardProps) {
  const shortSpecimen = specimen
    ? specimen.split(".")[0].trim().slice(0, 60)
    : "";

  return (
    <Link href={`/tests/${slug}`} className="block group">
      <Card className="relative overflow-hidden bg-white rounded-xl shadow-card group-hover:shadow-card-hover transition-all duration-300 border border-gray-100 h-full">
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />

        <CardContent className="pt-5 pb-3 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="outline"
              className="text-brand-blue border-brand-blue/25 bg-blue-50 rounded text-xs"
            >
              {category}
            </Badge>
            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
              {test_code}
            </span>
          </div>

          <h3 className="font-semibold text-base text-gray-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
            {test_name}
          </h3>

          {shortSpecimen && (
            <p className="text-xs text-gray-500 line-clamp-2 flex items-start gap-1.5">
              <FlaskConical className="w-3 h-3 mt-0.5 flex-shrink-0 text-gray-400" />
              {shortSpecimen}
            </p>
          )}

          {report && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span className="line-clamp-1">{report}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 pb-4 flex items-center justify-between border-t border-gray-50 mt-2 pt-3">
          <div className="flex items-center gap-2">
            {price ? (
              <span className="text-lg font-bold text-brand-blue flex items-center">
                <IndianRupee className="w-3.5 h-3.5" />{price}
              </span>
            ) : (
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">
                Home Collection
              </span>
            )}
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
