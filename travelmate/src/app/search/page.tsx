import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/seo";
import { searchSite } from "@/lib/search";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search Travel Mate tour packages, destinations, Umrah & Hajj packages, services and travel tips.",
  path: "/search",
  noIndex: true,
});

const suggestions = ["Dubai", "Honeymoon", "Umrah", "Hunza", "Europe", "Visa", "Cruise"];

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const q = ((await searchParams).q ?? "").slice(0, 100);
  const results = q ? searchSite(q) : [];

  return (
    <>
      <PageHero size="sm" image="/images/hero/search-hero.jpg" imageAlt="" title={q ? `Results for “${q}”` : "Search Travel Mate"} breadcrumbs={[{ name: "Search", href: "/search" }]}>
        <form action="/search" role="search" className="flex max-w-2xl gap-2 rounded-full bg-white p-1.5 shadow-lift">
          <label htmlFor="site-search" className="sr-only">
            Search
          </label>
          <input id="site-search" name="q" defaultValue={q} placeholder="Try Dubai, Umrah, honeymoon…" className="min-w-0 flex-1 bg-transparent px-5 text-ink focus:outline-none" />
          <Button type="submit" variant="accent">
            <Search /> Search
          </Button>
        </form>
      </PageHero>
      <section className="section pt-12">
        <div className="container-page max-w-4xl">
          {q && (
            <p className="mb-6 text-muted-foreground" aria-live="polite">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
          )}
          {results.length > 0 ? (
            <ul className="space-y-4">
              {results.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="flex gap-4 rounded-2xl border border-border bg-white p-3 shadow-soft transition hover:border-primary/30 hover:shadow-lift sm:gap-5 sm:p-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24">
                      <Image src={r.image} alt="" fill sizes="96px" className="object-cover" />
                    </div>
                    <div className="min-w-0 py-1">
                      <Badge variant="outline">{r.type}</Badge>
                      <p className="mt-1.5 font-bold text-ink">{r.title}</p>
                      <p className="line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-3xl bg-sand p-10 text-center">
              <p className="font-display text-2xl font-semibold">{q ? "No results found" : "What are you looking for?"}</p>
              <p className="mt-2 text-muted-foreground">Try one of these popular searches:</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-soft hover:bg-secondary">
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
