"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { categories } from "@/data/categories";
import { destinations } from "@/data/destinations";
import { cn, normalize } from "@/lib/utils";
import type { TourPackage } from "@/types";
import { PackageCard } from "./package-card";

const durations = [
  { value: "short", label: "Up to 5 days", test: (d: number) => d <= 5 },
  { value: "medium", label: "6 – 8 days", test: (d: number) => d >= 6 && d <= 8 },
  { value: "long", label: "9+ days", test: (d: number) => d >= 9 },
];

const sorts = [
  { value: "featured", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration", label: "Duration" },
];

/** Client-side filtering with state kept in the URL (shareable & SEO-friendly). */
export function PackageExplorer({ packages }: { packages: TourPackage[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const destination = params.get("destination") ?? "";
  const duration = params.get("duration") ?? "";
  const scope = params.get("scope") ?? "";
  const sort = params.get("sort") ?? "featured";

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  }

  const results = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean);
    const list = packages.filter((p) => {
      const dest = destinations.find((d) => d.slug === p.destination);
      if (category && !p.categories.includes(category as TourPackage["categories"][number])) return false;
      if (destination && p.destination !== destination) return false;
      if (scope === "pakistan" && !dest?.domestic) return false;
      if (scope === "international" && dest?.domestic) return false;
      if (duration && !durations.find((d) => d.value === duration)?.test(p.days)) return false;
      if (terms.length) {
        const hay = normalize(`${p.title} ${p.summary} ${dest?.name} ${dest?.country} ${p.highlights.join(" ")}`);
        if (!terms.every((t) => hay.includes(t))) return false;
      }
      return true;
    });
    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.priceFrom - b.priceFrom;
      if (sort === "price-desc") return b.priceFrom - a.priceFrom;
      if (sort === "duration") return a.days - b.days;
      return Number(!!b.featured) - Number(!!a.featured);
    });
  }, [packages, q, category, destination, duration, scope, sort]);

  const usedDestinations = destinations.filter((d) => packages.some((p) => p.destination === d.slug));
  const activeCount = [q, category, destination, duration, scope].filter(Boolean).length;

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 -mx-4 mb-8 border-b border-border bg-background/90 px-4 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:bg-white sm:p-4 sm:shadow-soft">
        <div className="flex flex-wrap items-center gap-2 pb-3">
          {[
            { value: "", label: "All" },
            { value: "international", label: "International" },
            { value: "pakistan", label: "Pakistan" },
          ].map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => update("scope", s.value)}
              aria-pressed={scope === s.value}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                scope === s.value ? "bg-ink text-white" : "bg-secondary text-ink hover:bg-secondary/70",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <label className="relative">
            <span className="sr-only">Search packages</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => update("q", e.target.value)}
              placeholder="Search packages…"
              className="h-12 w-full rounded-xl border border-input bg-white pl-11 pr-4 text-[15px] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
            />
          </label>
          <NativeSelect aria-label="Trip type" value={category} onChange={(e) => update("category", e.target.value)}>
            <option value="">All trip types</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </NativeSelect>
          <NativeSelect aria-label="Destination" value={destination} onChange={(e) => update("destination", e.target.value)}>
            <option value="">All destinations</option>
            {usedDestinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </NativeSelect>
          <NativeSelect aria-label="Duration" value={duration} onChange={(e) => update("duration", e.target.value)}>
            <option value="">Any duration</option>
            {durations.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </NativeSelect>
          <NativeSelect aria-label="Sort by" value={sort} onChange={(e) => update("sort", e.target.value === "featured" ? "" : e.target.value)}>
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          <SlidersHorizontal className="mr-1.5 inline size-4" aria-hidden />
          Showing <strong className="text-ink">{results.length}</strong> of {packages.length} packages
        </p>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={() => router.replace(pathname, { scroll: false })}>
            <X /> Clear filters ({activeCount})
          </Button>
        )}
      </div>

      {results.length ? (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((p, i) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}>
                <PackageCard pkg={p} priority={i < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border bg-white px-6 py-16 text-center">
          <p className="font-display text-2xl font-semibold text-ink">No packages match these filters</p>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">Try removing a filter — or tell us what you&apos;re looking for and we&apos;ll build a custom itinerary for you.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => router.replace(pathname, { scroll: false })}>
              Clear filters
            </Button>
            <Button asChild variant="accent">
              <Link href="/enquiry">Request a custom trip</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
