import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, Clock, Hotel } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { HajjCard } from "@/components/packages/hajj-card";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { hajjAddOns, hajjPackages, hajjSeason, hajjTiers } from "@/data/hajj";
import { buildMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };
const find = (slug: string) => hajjPackages.find((h) => h.slug === slug);

export function generateStaticParams() {
  return hajjPackages.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const h = find((await params).slug);
  if (!h) return {};
  return buildMetadata({
    title: `TMG ${h.name} Hajj Package – ${hajjSeason}`,
    description: `${h.summary} ${hajjTiers[h.tier].name} category, ${h.duration}, ${h.azizia}.`,
    path: `/hajj/${h.slug}`,
    image: h.image,
  });
}

export default async function HajjDetailPage({ params }: Props) {
  const h = find((await params).slug);
  if (!h) notFound();
  const others = hajjPackages.filter((o) => o.slug !== h.slug).slice(0, 3);

  return (
    <>
      <PageHero
        image={h.image}
        imageAlt={`${h.name} Hajj package`}
        eyebrow={`${hajjTiers[h.tier].name} category · ${hajjSeason}`}
        title={`TMG ${h.name} Hajj Package`}
        description={h.summary}
        breadcrumbs={[
          { name: "Hajj Packages", href: "/hajj" },
          { name: h.name, href: `/hajj/${h.slug}` },
        ]}
      />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_400px] lg:py-16">
        <div className="space-y-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-sand p-6">
              <Clock className="size-6 text-primary" aria-hidden />
              <p className="mt-3 font-bold">Duration</p>
              <p className="text-muted-foreground">{h.duration}</p>
            </div>
            <div className="rounded-3xl bg-sand p-6">
              <Hotel className="size-6 text-primary" aria-hidden />
              <p className="mt-3 font-bold">Azizia</p>
              <p className="text-muted-foreground">{h.azizia}</p>
            </div>
          </div>
          <section>
            <h2 className="font-display text-3xl font-semibold">Package highlights</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {h.highlights.map((x) => (
                <li key={x} className="flex gap-3 rounded-2xl border border-border bg-white p-4">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl font-semibold">Pricing</h2>
            {h.pricing.length ? (
              <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-white">
                <table className="w-full text-left">
                  <caption className="sr-only">{h.name} pricing</caption>
                  <tbody>
                    {h.pricing.map((p) => (
                      <tr key={p.occupancy} className="border-b border-border last:border-0">
                        <th scope="row" className="px-6 py-4 font-medium">
                          {p.occupancy}
                        </th>
                        <td className="px-6 py-4 text-right text-lg font-bold tabular-nums">{formatPrice(p.price, "USD")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-muted-foreground">Pricing for this package is shared on request. Please contact our Hajj desk.</p>
            )}
            <p className="mt-3 text-sm text-muted-foreground">Per person, excluding airfare (typically a $1,000 – $1,500 supplement). Reference rates; current-season pricing is confirmed at registration.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold">Optional upgrades</h2>
            <p className="mt-2 text-muted-foreground">{hajjAddOns.join(" · ")}</p>
          </section>
        </div>
        <aside>
          <div className="sticky top-24 rounded-3xl border border-border bg-white p-6 shadow-lift">
            <h2 className="text-lg font-bold">Enquire about {h.name}</h2>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">Our Hajj desk will call you back with availability.</p>
            <EnquiryForm compact defaultValues={{ service: "hajj", destination: `${h.name} Hajj ${hajjSeason}` }} submitLabel="Request details" />
          </div>
        </aside>
      </div>
      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeading title="Compare other Hajj packages" action={{ label: "All Hajj packages", href: "/hajj" }} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <HajjCard key={o.slug} pkg={o} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
