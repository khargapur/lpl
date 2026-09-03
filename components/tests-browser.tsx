"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import LabTestCard from "@/components/lab-test-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, X, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

interface TestItem {
  test_code: string;
  test_name: string;
  slug: string;
  specimen?: string;
  report?: string;
  category: string;
  method?: string;
  price?: number | null;
}

interface TestsBrowserProps {
  initialTests: TestItem[];
  totalCount: number;
  categories: { name: string; count: number }[];
}

const PAGE_SIZE = 12;

export default function TestsBrowser({
  initialTests,
  totalCount,
  categories,
}: TestsBrowserProps) {
  const [tests, setTests] = useState<TestItem[]>(initialTests);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / PAGE_SIZE));
  const [filteredTotal, setFilteredTotal] = useState(totalCount);
  const [showFilters, setShowFilters] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const fetchTests = useCallback(async (q: string, category: string, pageNum: number) => {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(PAGE_SIZE), page: String(pageNum) });
    if (q) params.set("q", q);
    if (category && category !== "All") params.set("category", category);

    try {
      const res = await fetch(`/api/tests/search?${params}`);
      const data = await res.json();
      setTests(data.tests as TestItem[]);
      setTotalPages(data.totalPages ?? 1);
      setFilteredTotal(data.total ?? 0);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search — resets to page 1
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchTests(query, activeCategory, 1);
    }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, activeCategory, fetchTests]);

  function goTo(pageNum: number) {
    setPage(pageNum);
    fetchTests(query, activeCategory, pageNum);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, filteredTotal);

  // Build page number list with ellipsis
  function buildPages(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  return (
    <section ref={topRef} className="py-8 md:py-12 bg-light-bg min-h-screen scroll-mt-4">
      <div className="container-custom">
        {/* Search + filter bar */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by test name, code, or keyword (e.g. CBC, PSA, Vitamin D)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 h-12 rounded-lg border-gray-200 bg-white"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-4 rounded-lg border-gray-200 bg-white lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Category pills */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === "All"
                    ? "bg-brand-blue text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-brand-blue/30 hover:text-brand-blue"
                }`}
              >
                All Tests ({totalCount})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeCategory === cat.name
                      ? "bg-brand-blue text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-brand-blue/30 hover:text-brand-blue"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {loading
              ? "Searching..."
              : filteredTotal > 0
              ? `Showing ${start}–${end} of ${filteredTotal} tests`
              : "No tests found"}
          </p>
          {(query || activeCategory !== "All") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setQuery(""); setActiveCategory("All"); }}
              className="text-xs text-gray-500 hover:text-brand-blue"
            >
              <X className="w-3 h-3 mr-1" /> Clear filters
            </Button>
          )}
        </div>

        {/* Test grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-36 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : tests.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-1">No tests found</p>
            <p className="text-gray-400 text-sm">Try a different search term or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tests.map((test) => (
              <LabTestCard key={test.test_code} {...test} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && tests.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-1 flex-wrap">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {buildPages().map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goTo(p as number)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors border ${
                    page === p
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "bg-white text-gray-600 border-gray-200 hover:border-brand-blue hover:text-brand-blue"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {totalPages > 1 && !loading && tests.length > 0 && (
          <p className="text-center text-xs text-gray-400 mt-3">
            Page {page} of {totalPages}
          </p>
        )}
      </div>
    </section>
  );
}
