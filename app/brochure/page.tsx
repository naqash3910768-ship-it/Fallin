import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Art } from "@/components/ui/Art";
import { Reveal } from "@/components/ui/Reveal";
import { categories, products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Brochure",
  description: "Download the official Fello product catalogue, or browse a summary of the current chair, table and Junior Collection range on this page.",
  alternates: { canonical: "/brochure" },
};

export default function BrochurePage() {
  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Brochure" }]} />

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Catalogue</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-5xl">
            Explore the Fello Collection
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            View our complete product catalogue — every chair, table and stool in the current
            Fello range.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={`${siteConfig.url}/brochure`} external size="lg">
              Download Official Brochure
            </Button>
            <Button href="/products" size="lg" variant="ghost">
              Browse Products Online
            </Button>
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            Opens the official brochure page on {siteConfig.domain} in a new tab.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl shadow-2xl shadow-black/10">
          <Art icon="stack" tone="ink" pattern={false} label="Fello product brochure cover — illustrative artwork" />
        </Reveal>
      </div>

      <div className="mt-24">
        <h2 className="text-2xl font-bold text-brand-ink">What&rsquo;s Inside</h2>
        <p className="mt-2 max-w-xl text-neutral-600">
          A quick summary of the collections covered in the catalogue — see the full brochure for
          complete product listings.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <div key={cat.slug} className="overflow-hidden rounded-xl border border-black/[0.06]">
                <div className="aspect-[16/10]">
                  <Art icon={cat.icon} tone={cat.tone} label={cat.name} />
                </div>
                <div className="p-5">
                  <p className="font-bold text-brand-ink">{cat.name}</p>
                  <p className="mt-1 text-sm text-neutral-500">{count} products online</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
