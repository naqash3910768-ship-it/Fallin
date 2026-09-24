import { Suspense } from "react";
import type { Metadata } from "next";
import { DestinationCard } from "@/components/destinations/destination-card";
import { DestinationExplorer } from "@/components/destinations/destination-explorer";
import { CtaBanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { buildMetadata, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Destinations – International & Pakistan",
  description: "Explore Travel Mate destinations: Dubai, Turkey, Malaysia, Thailand, Maldives, Azerbaijan, Europe, Hunza, Skardu, Naran and more. Find tour packages, best time to visit and visa tips.",
  path: "/destinations",
  image: "/images/hero/destinations-hero.jpg",
});

const counts = Object.fromEntries(destinations.map((d) => [d.slug, packages.filter((p) => p.destination === d.slug).length]));

export default function DestinationsPage() {
  return (
    <>
      <JsonLd data={itemListSchema("Travel Mate destinations", destinations.map((d) => ({ name: d.name, href: `/destinations/${d.slug}`, image: d.image })))} />
      <PageHero
        image="/images/hero/destinations-hero.jpg"
        imageAlt="Snow-capped mountains above a turquoise lake"
        eyebrow="Destinations"
        title="Discover the world, and Pakistan's own wonders"
        description="From Middle-East city breaks and Asian beaches to European classics and Pakistan's northern valleys. Pick a destination to see packages, highlights and visa tips."
        breadcrumbs={[{ name: "Destinations", href: "/destinations" }]}
      />
      <section className="section pt-10 sm:pt-12">
        <div className="container-page">
          <Suspense
            fallback={
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {destinations.map((d) => (
                  <DestinationCard key={d.slug} destination={d} className="aspect-[3/4] min-h-0" />
                ))}
              </div>
            }
          >
            <DestinationExplorer destinations={destinations} counts={counts} />
          </Suspense>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
