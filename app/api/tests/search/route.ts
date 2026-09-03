import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const category = searchParams.get("category")?.trim() ?? "All";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
  const offset = (page - 1) * limit;

  const supabase = createSupabaseServerClient();

  let baseQuery = supabase
    .from("lab_tests")
    .select("test_code, test_name, slug, specimen, report, category, method, price", { count: "exact" });

  if (category && category !== "All") {
    baseQuery = baseQuery.eq("category", category);
  }

  if (q) {
    // Try ilike on name + code first — works for any query including partial
    baseQuery = baseQuery.or(`test_name.ilike.%${q}%,test_code.ilike.%${q}%`);
  }

  const { data, count, error } = await baseQuery
    .order("test_name")
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: "Failed to fetch tests" }, { status: 500 });
  }

  return NextResponse.json({
    tests: data ?? [],
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  });
}
