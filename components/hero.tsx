"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, MessageCircle, Download, Search, ChevronRight, ChevronLeft, Loader2, FlaskConical } from "lucide-react";
import { SITE_CONFIG, HEALTH_PACKAGES } from "@/lib/constants";
import { Input } from "@/components/ui/input";

const SLIDES = [
  {
    src: "/images/maxresdefault.jpg",
    alt: "Dr Lal PathLabs Khargapur, Gomti Nagar Lucknow – diagnostic lab services",
  },
  {
    src: "/images/fever-panel-advance.jpg",
    alt: "Fever panel test at Dr Lal PathLabs Lucknow",
  },
  {
    src: "/images/fever-panel-test.jpg",
    alt: "Fever panel advance test at Dr Lal PathLabs Gomti Nagar Lucknow",
  },
];

interface TestResult {
  test_code: string;
  test_name: string;
  slug: string;
  category: string;
}

interface SearchOption {
  label: string;
  sublabel: string;
  href: string;
}

function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const packageOptions: SearchOption[] = HEALTH_PACKAGES.map((p) => ({
    label: `${p.name} – ₹${p.price}`,
    sublabel: "Health Package",
    href: `/health-packages#${p.slug}`,
  }));

  const search = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "20" });
      if (q) params.set("q", q);
      const res = await fetch(`/api/tests/search?${params}`);
      const data = await res.json();
      const dbOpts: SearchOption[] = (data.tests || []).map((t: TestResult) => ({
        label: t.test_name,
        sublabel: t.category,
        href: `/tests/${t.slug}`,
      }));
      const filtered = q
        ? packageOptions.filter((p) => p.label.toLowerCase().includes(q.toLowerCase()))
        : packageOptions;
      setResults([...filtered, ...dbOpts]);
    } catch {
      setResults(packageOptions);
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => { if (open) search(query); }, 300);
    return () => { if (debounce.current) clearTimeout(debounce.current); };
  }, [query, open, search]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleFocus() {
    setOpen(true);
    search(query);
  }

  function handleSelect(opt: SearchOption) {
    setOpen(false);
    setQuery(opt.label);
    router.push(opt.href);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tests?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search Test and Packages"
          className="pr-12 h-11 border-gray-300 rounded text-sm"
          autoComplete="off"
        />
        <button type="submit" className="absolute right-0 top-0 h-11 px-3 bg-brand-yellow rounded-r flex items-center justify-center">
          {loading ? <Loader2 className="w-4 h-4 text-brand-blue animate-spin" /> : <Search className="w-4 h-4 text-brand-blue" />}
        </button>
      </form>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
          {loading && results.length === 0 ? (
            <div className="flex items-center justify-center py-5 text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="py-5 text-center text-sm text-gray-400">No tests found</div>
          ) : (
            results.map((opt, i) => (
              <button
                key={i}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleSelect(opt); }}
                className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 flex items-start gap-3"
              >
                <FlaskConical className="w-3.5 h-3.5 text-gray-300 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 font-medium line-clamp-1">{opt.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{opt.sublabel}</p>
                </div>
              </button>
            ))
          )}
          {query && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); router.push(`/tests?q=${encodeURIComponent(query)}`); setOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm text-brand-blue font-semibold hover:bg-blue-50 border-t border-gray-100 flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              Search all results for &ldquo;{query}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section className="bg-white">
      <div className="container-custom py-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* LEFT — Auto-sliding banner */}
          <div
            className="relative rounded-xl overflow-hidden min-h-[320px] md:min-h-[380px] bg-gray-100 select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Slides */}
            {SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}

            {/* Prev button */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next button */}
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-white scale-110 shadow"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Book a Test panel */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-card overflow-hidden">
            <div className="bg-white px-6 py-4 border-b border-gray-100">
              <h2 className="text-brand-blue font-bold text-lg text-center tracking-wide uppercase">
                BOOK A TEST ONLINE
              </h2>
            </div>

            <div className="p-5 space-y-4">
              <div className="relative">
                <HeroSearch />
              </div>

              <div className="text-center text-sm text-gray-500 font-medium">OR</div>

              <Link
                href="/tests"
                className="flex items-center justify-between bg-brand-blue text-white px-5 py-3.5 rounded-lg hover:bg-brand-blue-dark transition-colors"
              >
                <span className="font-semibold text-sm">Choose Popular Tests / Packages</span>
                <div className="w-7 h-7 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-4 h-4 text-brand-blue font-bold" />
                </div>
              </Link>

              <Link
                href="/home-collection"
                className="flex items-center justify-between bg-brand-blue text-white px-5 py-3.5 rounded-lg hover:bg-brand-blue-dark transition-colors"
              >
                <span className="font-semibold text-sm">Book Home Collection</span>
                <div className="w-7 h-7 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-4 h-4 text-brand-blue font-bold" />
                </div>
              </Link>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <Link
                  href="/download-report"
                  className="flex flex-col items-center gap-2 bg-brand-blue text-white rounded-xl p-4 hover:bg-brand-blue-dark transition-colors text-center"
                >
                  <Download className="w-6 h-6" />
                  <span className="text-xs font-medium leading-tight">Download Report</span>
                </Link>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=Hi, I want to book a test`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 bg-brand-blue text-white rounded-xl p-4 hover:bg-brand-blue-dark transition-colors text-center"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-xs font-medium leading-tight">WhatsApp Us</span>
                </a>

                <a
                  href={SITE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 bg-brand-blue text-white rounded-xl p-4 hover:bg-brand-blue-dark transition-colors text-center"
                >
                  <MapPin className="w-6 h-6" />
                  <span className="text-xs font-medium leading-tight">Find Nearest Centre</span>
                </a>
              </div>

              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-blue font-bold py-3 rounded-lg hover:bg-brand-yellow-dark transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Call: {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
