import { Suspense } from "react";
import type { Metadata } from "next";
import { PackageExplorer } from "@/components/packages/package-explorer";
import { PackageGrid } from "@/components/packages/package-grid";
import { CtaBanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { packages } from "@/data/packages";
import { buildMetadata, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Travel & Tour Packages from Pakistan",
  description:
    "Compare international and Pakistan tour packages from Karachi: Dubai, Turkey, Malaysia, Thailand, Maldives, Azerbaijan, Europe, Hunza, Skardu and more. Filter by trip type, destination and duration.",
  path: "/travel-packages",
  image: "/images/hero/packages-hero.jpg",
});

export default function PackagesPage() {
  return (
    <>
      <JsonLd data={itemListSchema("Travel Mate tour packages", packages.map((p) => ({ name: p.title, href: `/travel-packages/${p.slug}`, image: p.image })))} />
      <PageHero
        image="/images/hero/packages-hero.jpg"
        imageAlt="Aerial view of a tropical beach"
        eyebrow="Tour packages"
        title="Travel & tour packages from Pakistan"
        description="Hand-crafted holidays with hotels, sightseeing, transfers and visa support. Filter by trip type, destination or duration, and every itinerary can be tailored."
        breadcrumbs={[{ name: "Tour Packages", href: "/travel-packages" }]}
      />
      <section className="section pt-10 sm:pt-12">
        <div className="container-page">
          <Suspense fallback={<PackageGrid packages={packages} />}>
            <PackageExplorer packages={packages} />
          </Suspense>
        </div>
      </section>
      <CtaBanner title="Can't find the perfect package?" description="We design custom itineraries for any destination and budget. Tell us your plans and we'll send a tailor-made quote." />
    </>
  );
}
