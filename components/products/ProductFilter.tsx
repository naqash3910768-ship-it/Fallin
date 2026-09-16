"use client";

import type { CategorySlug } from "@/lib/products";
import { categories } from "@/lib/products";

interface ProductFilterProps {
  active: CategorySlug | "all";
  onChange: (value: CategorySlug | "all") => void;
  query: string;
  onQueryChange: (value: string) => void;
}

const tabs: { slug: CategorySlug | "all"; label: string }[] = [
  { slug: "all", label: "All" },
  ...categories.map((c) => ({ slug: c.slug, label: c.name })),
];

export function ProductFilter({ active, onChange, query, onQueryChange }: ProductFilterProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter products by category">
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            role="tab"
            aria-selected={active === tab.slug}
            onClick={() => onChange(tab.slug)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === tab.slug
                ? "bg-brand-ink text-white"
                : "bg-brand-sand text-neutral-600 hover:bg-brand-sand-dark"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <label className="relative block w-full sm:w-64">
        <span className="sr-only">Search products</span>
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-full border border-black/10 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-brand-ink"
        />
      </label>
    </div>
  );
}
