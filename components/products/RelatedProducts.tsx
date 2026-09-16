import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/products";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-ink">You Might Also Like</h2>
      <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
