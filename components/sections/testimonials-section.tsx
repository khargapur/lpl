"use client";

import { TESTIMONIALS } from "@/lib/constants";

interface TestimonialsSectionProps {
  testimonails: typeof TESTIMONIALS;
}

export default function TestimonialsSection({ testimonails }: TestimonialsSectionProps) {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-3 font-heading">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Hear from patients who have experienced our quality diagnostic services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonails.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-brand-yellow fill-brand-yellow" : "text-gray-200 fill-gray-200"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
