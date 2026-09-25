import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export default function BlogCard({ slug, title, excerpt, category, date, readTime, image }: BlogCardProps) {
  return (
    <Card className="group overflow-hidden bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-brand-blue text-white text-xs font-semibold px-2.5 py-1 rounded">
          {category}
        </span>
      </div>

      <CardContent className="pt-4 pb-2 space-y-2">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{new Date(date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug text-sm">
          {title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">{excerpt}</p>
      </CardContent>

      <CardFooter className="pt-0 pb-4">
        <Link
          href={`/blog/${slug}`}
          aria-label={`Read more about ${title}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:gap-2 transition-all"
        >
          Read More
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
