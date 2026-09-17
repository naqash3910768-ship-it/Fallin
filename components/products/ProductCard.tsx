import Image from "next/image";
import Link from "next/link";
import { Art } from "@/components/ui/Art";
import { ColorSwatches } from "@/components/ui/ColorSwatches";
import { getCategory, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.06]">
          {product.image ? (
            <Image
              src={product.image}
              alt={`Fello ${product.name}${product.itemNumber ? ` (${product.itemNumber})` : ""} moulded chair`}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-contain p-6"
            />
          ) : (
            <Art icon={product.icon} tone={product.tone} label={`${product.name} moulded chair — illustrative artwork`} />
          )}
        </div>
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-ink">
            {category.short}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-bold text-brand-ink transition-colors group-hover:text-brand-red">{product.name}</h3>
          {product.itemNumber && <span className="text-xs text-neutral-400">{product.itemNumber}</span>}
        </div>
        <p className="line-clamp-2 text-sm text-neutral-600">{product.tagline}</p>
        {product.colors && <ColorSwatches colors={product.colors} />}
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
          View Product
          <svg
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
