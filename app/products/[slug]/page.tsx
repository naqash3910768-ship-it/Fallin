import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ColorSwatches } from "@/components/ui/ColorSwatches";
import { ProductGallery } from "@/components/products/ProductGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { JsonLd } from "@/components/JsonLd";
import { getCategory, getProduct, getRelatedProducts, products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const title = product.itemNumber ? `${product.name} (${product.itemNumber})` : product.name;
  return {
    title,
    description: product.description[0],
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${title} | Fello Moulded Furniture`, description: product.description[0] },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <Container className="py-12 lg:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          sku: product.itemNumber,
          category: category?.name,
          description: product.description.join(" "),
          brand: { "@type": "Brand", name: "Fello" },
          manufacturer: siteConfig.company,
          url: `${siteConfig.url}/products/${product.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Products", item: `${siteConfig.url}/products` },
            { "@type": "ListItem", position: 3, name: product.name, item: `${siteConfig.url}/products/${product.slug}` },
          ],
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery icon={product.icon} name={product.name} image={product.image} />

        <div>
          {category && (
            <span className="rounded-full bg-brand-sand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-ink">
              {category.name}
            </span>
          )}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-ink sm:text-4xl">{product.name}</h1>
          {product.itemNumber && <p className="mt-1 text-sm text-neutral-500">Item # {product.itemNumber}</p>}
          <p className="mt-4 text-lg text-neutral-600">{product.tagline}</p>

          <div className="mt-8 space-y-4 border-t border-black/[0.06] pt-8">
            {product.description.map((para, i) => (
              <p key={i} className="leading-relaxed text-neutral-600">
                {para}
              </p>
            ))}
          </div>

          {product.colors && (
            <div className="mt-8 border-t border-black/[0.06] pt-8">
              <p className="text-sm font-semibold text-brand-ink">Available Colours</p>
              <div className="mt-3">
                <ColorSwatches colors={product.colors} size="md" showNames />
              </div>
              {product.colorSource && <p className="mt-3 text-xs text-neutral-400">{product.colorSource}</p>}
            </div>
          )}

          {product.specifications && (
            <div className="mt-8 border-t border-black/[0.06] pt-8">
              <p className="text-sm font-semibold text-brand-ink">Specifications</p>
              <dl className="mt-3 space-y-2">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 text-sm">
                    <dt className="text-neutral-500">{spec.label}</dt>
                    <dd className="text-right font-medium text-brand-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              {product.specSource && <p className="mt-3 text-xs text-neutral-400">{product.specSource}</p>}
            </div>
          )}

          <div className="mt-10 flex flex-col gap-3 border-t border-black/[0.06] pt-8 sm:flex-row">
            <Button href="/contact" size="lg">
              Request Information
            </Button>
            <Button href="/brochure" size="lg" variant="ghost">
              Download Brochure
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <RelatedProducts products={related} />
      </div>
    </Container>
  );
}
