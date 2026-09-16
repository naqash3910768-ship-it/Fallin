"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { CategorySlug, Product } from "@/lib/products";

export function ProductsExplorer({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as CategorySlug | null) ?? "all";

  const [category, setCategory] = useState<CategorySlug | "all">(initialCategory);
  const [query, setQuery] = useState("");

  const handleCategoryChange = (value: CategorySlug | "all") => {
    setCategory(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.replace(params.size ? `/products?${params.toString()}` : "/products", { scroll: false });
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.itemNumber?.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  return (
    <div>
      <ProductFilter active={category} onChange={handleCategoryChange} query={query} onQueryChange={setQuery} />
      <p className="mt-6 text-sm text-neutral-500">
        Showing {filtered.length} of {products.length} products
      </p>
      <div className="mt-6">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
