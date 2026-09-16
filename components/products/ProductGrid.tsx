import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/products";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-black/10 py-20 text-center text-neutral-500">
        No products match your filters right now. Try clearing the search or category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
