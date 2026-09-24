"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { regions } from "@/data/destinations";
import { cn, normalize } from "@/lib/utils";
import type { Destination, Region } from "@/types";
import { DestinationCard } from "./destination-card";

export function DestinationExplorer({ destinations, counts }: { destinations: Destination[]; counts: Record<string, number> }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const region = (params.get("region") ?? "") as Region | "";

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  }

  const usedRegions = (Object.keys(regions) as Region[]).filter((r) => destinations.some((d) => d.region === r));

  const results = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean);
    return destinations.filter((d) => {
      if (region && d.region !== region) return false;
      if (!terms.length) return true;
      const hay = normalize(`${d.name} ${d.country} ${d.tagline} ${d.highlights.join(" ")}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [destinations, q, region]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by region">
          {[{ key: "", label: "All regions" }, ...usedRegions.map((r) => ({ key: r, label: regions[r] }))].map((r) => (
            <button
              key={r.key}
              type="button"
              aria-pressed={region === r.key}
              onClick={() => update("region", r.key)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                region === r.key ? "bg-ink text-white" : "border border-border bg-white text-ink hover:bg-secondary",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
        <label className="relative w-full lg:w-80">
          <span className="sr-only">Search destinations</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Search destinations…"
            className="h-12 w-full rounded-full border border-input bg-white pl-11 pr-4 text-[15px] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {results.length} destinations found
      </p>

      {results.length ? (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {results.map((d, i) => (
              <motion.div key={d.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DestinationCard destination={d} packageCount={counts[d.slug]} priority={i < 4} className="aspect-[3/4] min-h-0" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="rounded-3xl border border-dashed border-border bg-white py-16 text-center text-muted-foreground">No destinations match your search.</p>
      )}
    </div>
  );
}
