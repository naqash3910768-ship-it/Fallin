import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PackageGrid } from "@/components/packages/package-grid";
import { CtaBanner } from "@/components/shared/cta-banner";
import { Icon } from "@/components/shared/icon";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { categories, getCategory } from "@/data/categories";
import { getPackagesByCategory } from "@/data/packages";
import { buildMetadata, itemListSchema } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.filter((c) => c.slug !== "cruise-holidays").map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return buildMetadata({
    title: c.slug === "pakistan-tours" ? "Pakistan Tour Packages from Karachi | Pakistan Tour Planners" : `${c.name} from Karachi, Pakistan`,
    description: c.description,
    path: `/tours/${c.slug}`,
    image: c.image,
  });
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const list = getPackagesByCategory(c.slug);

  return (
    <>
      <JsonLd data={itemListSchema(c.name, list.map((p) => ({ name: p.title, href: `/travel-packages/${p.slug}`, image: p.image })))} />
      <PageHero
        image={c.image}
        imageAlt={c.name}
        eyebrow="Travel style"
        title={c.name}
        description={c.description}
        breadcrumbs={[
          { name: "Tour Packages", href: "/travel-packages" },
          { name: c.name, href: `/tours/${c.slug}` },
        ]}
      />

      <nav aria-label="Travel styles" className="border-b border-border bg-white">
        <div className="container-page flex gap-2 overflow-x-auto py-4 scrollbar-none">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "cruise-holidays" ? "/cruise-tours" : `/tours/${cat.slug}`}
              aria-current={cat.slug === c.slug ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${cat.slug === c.slug ? "bg-ink text-white" : "bg-secondary text-ink hover:bg-secondary/70"}`}
            >
              <Icon name={cat.icon} className="size-4" /> {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      <section className="section">
        <div className="container-page">
          {list.length ? (
            <>
              <p className="mb-8 text-muted-foreground">
                <strong className="text-ink">{list.length}</strong> {c.name.toLowerCase()} available ·{" "}
                <Link href={`/travel-packages?category=${c.slug}`} className="font-semibold text-primary hover:underline">
                  Filter &amp; sort
                </Link>
              </p>
              <PackageGrid packages={list} />
            </>
          ) : (
            <div className="grid gap-10 rounded-3xl bg-sand p-8 sm:p-12 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-semibold">Tailor-made {c.name.toLowerCase()}</h2>
                <p className="mt-3 text-muted-foreground">Tell us about your requirements and we&apos;ll put together a proposal.</p>
                <Button asChild variant="outline" className="mt-6">
                  <Link href="/contact-us">Contact our team</Link>
                </Button>
              </div>
              <EnquiryForm compact defaultValues={{ service: c.slug === "corporate-travel" ? "corporate" : "tour-package" }} />
            </div>
          )}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
