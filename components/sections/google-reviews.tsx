import { Star, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function GoogleReviews() {
  return (
    <section className="py-14 md:py-20 bg-light-bg">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-3 font-heading">
            Patient Reviews
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            See what our patients say about us on Google
          </p>
        </div>

        <div className="max-w-sm mx-auto bg-white rounded-xl border border-gray-100 shadow-card p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-1">Read our patient reviews on Google</p>
          <a
            href={SITE_CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-blue font-semibold hover:underline"
          >
            View on Google Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
