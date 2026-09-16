import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the full range of Fello moulded chairs, tables, stools and the Junior Collection — durable furniture made in Pakistan since 1993.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-ink sm:text-4xl">All Products</h1>
      <p className="mt-3 max-w-xl text-neutral-600">
        Every chair, table and stool currently in the Fello catalogue. Use the filters below to
        browse by category or search by name.
      </p>

      <div className="mt-10">
        <Suspense>
          <ProductsExplorer products={products} />
        </Suspense>
      </div>
    </Container>
  );
}
