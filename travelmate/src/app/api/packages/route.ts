import { NextResponse, type NextRequest } from "next/server";
import { listPackages } from "@/lib/api";

/** GET /api/packages?category=honeymoon-packages&destination=maldives */
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const destination = request.nextUrl.searchParams.get("destination");
  const all = await listPackages();
  const results = all.filter(
    (p) => (!category || p.categories.includes(category as (typeof p.categories)[number])) && (!destination || p.destination === destination),
  );
  return NextResponse.json({ count: results.length, results });
}
