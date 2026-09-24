import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarDays, Check, Stamp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/destinations/destination-card";
import { PackageGrid } from "@/components/packages/package-grid";
import { CtaBanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { destinations, getDestination } from "@/data/destinations";
import { getPackagesByDestination } from "@/data/packages";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDestination((await params).slug);
  if (!d) return {};
  return buildMetadata({
    title: d.domestic ? `${d.name} Tour Packages from Karachi` : `${d.name} Tour Packages from Karachi, Pakistan`,
    description: `${d.description.slice(0, 150)}… Explore ${d.name} tour packages, highlights and travel tips with Travel Mate.`,
    path: `/destinations/${d.slug}`,
    image: d.image,
    keywords: [`${d.name} tour packages`, `${d.name} tour from Karachi`, `${d.name} holiday packages from Pakistan`, `${d.name} honeymoon package`],
  });
}

export default async function DestinationPage({ params }: Props) {
  const d = getDestination((await params).slug);
  if (!d) notFound();
  const destPackages = getPackagesByDestination(d.slug);
  const others = destinations.filter((o) => o.slug !== d.slug && o.region === d.region).slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: d.name,
          description: d.description,
          image: absoluteUrl(d.image),
          url: absoluteUrl(`/destinations/${d.slug}`),
          touristType: ["Families", "Couples", "Groups"],
          includesAttraction: d.highlights.map((h) => ({ "@type": "TouristAttraction", name: h })),
        }}
      />
      <PageHero
        size="lg"
        image={d.image}
        imageAlt={`${d.name}, ${d.country}`}
        eyebrow={d.domestic ? "Pakistan" : d.country}
        title={d.name}
        description={d.tagline}
        breadcrumbs={[
          { name: "Destinations", href: "/destinations" },
          { name: d.name, href: `/destinations/${d.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <a href="#packages">View {destPackages.length ? `${destPackages.length} ` : ""}packages</a>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link href={`/enquiry?destination=${encodeURIComponent(d.name)}`}>Plan a custom trip</Link>
          </Button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Why visit {d.name}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{d.description}</p>
            <h3 className="mt-10 text-lg font-bold">Top experiences</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <span className="font-medium text-ink">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-4">
            <div className="rounded-3xl bg-sand p-6">
              <CalendarDays className="size-6 text-primary" aria-hidden />
              <h3 className="mt-3 font-bold">Best time to visit</h3>
              <p className="mt-1 text-muted-foreground">{d.bestTime}</p>
            </div>
            <div className="rounded-3xl bg-sand p-6">
              <Stamp className="size-6 text-primary" aria-hidden />
              <h3 className="mt-3 font-bold">Visa &amp; entry</h3>
              <p className="mt-1 text-muted-foreground">{d.visaNote}</p>
              {!d.domestic && (
                <Link href="/visa-services" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                  Our visa services →
                </Link>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section id="packages" className="section scroll-mt-20 bg-sand">
        <div className="container-page">
          <SectionHeading eyebrow="Packages" title={`${d.name} tour packages`} description="Every package can be customised — add nights, upgrade hotels or combine destinations." />
          {destPackages.length ? (
            <PackageGrid packages={destPackages} />
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center shadow-soft">
              <p className="font-display text-2xl font-semibold">Custom {d.name} itineraries available</p>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">Tell us your dates and budget, and we&apos;ll design a {d.name} trip around you.</p>
              <Button asChild variant="accent" className="mt-6">
                <Link href={`/enquiry?destination=${encodeURIComponent(d.name)}`}>Request a quote</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section">
          <div className="container-page">
            <SectionHeading eyebrow="Keep exploring" title="Nearby & similar destinations" action={{ label: "All destinations", href: "/destinations" }} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => (
                <DestinationCard key={o.slug} destination={o} className="aspect-[3/4] min-h-0" />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner title={`Ready for ${d.name}?`} whatsappMessage={`Hi Travel Mate, I'd like to plan a trip to ${d.name}.`} />
    </>
  );
}
