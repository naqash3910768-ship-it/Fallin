"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "packages", label: "Tour packages" },
  { id: "destinations", label: "Destinations" },
  { id: "umrah", label: "Umrah & Hajj" },
] as const;

type Tab = (typeof tabs)[number]["id"];

/** Hero search: routes to the filtered listing pages with query params. */
export function HeroSearch() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("packages");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (tab === "packages") {
      if (category) params.set("category", category);
      if (duration) params.set("duration", duration);
      router.push(`/travel-packages${params.size ? `?${params}` : ""}`);
    } else if (tab === "destinations") {
      router.push(`/destinations${params.size ? `?${params}` : ""}`);
    } else {
      router.push(q.toLowerCase().includes("hajj") ? "/hajj" : "/umrah");
    }
  }

  const fieldWrap = "flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-secondary/70 focus-within:bg-secondary/70";
  const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground";
  const inputCls = "w-full bg-transparent text-[15px] font-medium text-ink placeholder:text-muted-foreground/80 focus:outline-none";

  return (
    <div className="w-full max-w-4xl">
      <div role="tablist" aria-label="Search type" className="mb-3 flex gap-1.5 overflow-x-auto scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
              tab === t.id ? "bg-white text-ink shadow-soft" : "bg-white/15 text-white backdrop-blur hover:bg-white/25",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} role="search" className="grid gap-1 rounded-3xl bg-white p-2 shadow-lift md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-center">
        <label className={fieldWrap}>
          <MapPin className="size-5 shrink-0 text-primary" aria-hidden />
          <span className="flex-1">
            <span className={labelCls}>{tab === "umrah" ? "Looking for" : "Where to?"}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tab === "umrah" ? "Umrah or Hajj" : "Dubai, Turkey, Hunza…"}
              className={inputCls}
              aria-label="Destination or keyword"
            />
          </span>
        </label>

        {tab === "packages" ? (
          <>
            <label className={cn(fieldWrap, "md:border-l md:border-border md:rounded-none")}>
              <Tag className="size-5 shrink-0 text-primary" aria-hidden />
              <span className="flex-1">
                <span className={labelCls}>Trip type</span>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={cn(inputCls, "appearance-none")} aria-label="Trip type">
                  <option value="">Any type</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>
            <label className={cn(fieldWrap, "md:border-l md:border-border md:rounded-none")}>
              <CalendarDays className="size-5 shrink-0 text-primary" aria-hidden />
              <span className="flex-1">
                <span className={labelCls}>Duration</span>
                <select value={duration} onChange={(e) => setDuration(e.target.value)} className={cn(inputCls, "appearance-none")} aria-label="Duration">
                  <option value="">Any length</option>
                  <option value="short">Up to 5 days</option>
                  <option value="medium">6 – 8 days</option>
                  <option value="long">9+ days</option>
                </select>
              </span>
            </label>
          </>
        ) : (
          <p className="hidden px-4 text-sm text-muted-foreground md:col-span-2 md:block">
            {tab === "destinations" ? "Browse destinations across Pakistan and the world." : "Ramadan, group & premium Umrah · TMG private Hajj packages."}
          </p>
        )}

        <Button type="submit" variant="accent" size="lg" className="h-14 rounded-2xl md:w-auto">
          <Search className="size-5" /> Search
        </Button>
      </form>
    </div>
  );
}
