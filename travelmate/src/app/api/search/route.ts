import { NextResponse, type NextRequest } from "next/server";
import { searchSite } from "@/lib/search";

export function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  return NextResponse.json({ query: q, results: searchSite(q) });
}
