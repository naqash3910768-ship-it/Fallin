import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Building2, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { UmrahCard } from "@/components/packages/umrah-card";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { umrahCategories, umrahPackages } from "@/data/umrah";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref, whatsappLink } from "@/lib/site-config";
import { absoluteUrl, formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };
const find = (slug: string) => umrahPackages.find((u) => u.slug === slug);

export function generateStaticParams() {
  return umrahPackages.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = find((await params).slug);
  if (!u) return {};
  return buildMetadata({
    title: u.title,
    description: `${u.title}: ${u.makkahNights} nights Makkah (${u.makkahHotel}) and ${u.madinahNights} nights Madinah. From ${formatPrice(u.priceFrom)} per person. Book with Travel Mate.`,
    path: `/umrah/${u.slug}`,
    image: u.image,
  });
}

export default async function UmrahDetailPage({ params }: Props) {
  const u = find((await params).slug);
  if (!u) notFound();
  const umrahDesk = siteConfig.departments.find((d) => d.name === "Hajj & Umrah")!;
  const others = umrahPackages.filter((o) => o.slug !== u.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: u.title,
          image: absoluteUrl(u.image),
          description: `${u.days}-day Umrah package with ${u.makkahNights} nights in Makkah and ${u.madinahNights} nights in Madinah.`,
          brand: { "@type": "Brand", name: siteConfig.name },
          offers: { "@type": "Offer", price: u.priceFrom, priceCurrency: "PKR", availability: "https://schema.org/InStock", url: absoluteUrl(`/umrah/${u.slug}`) },
        }}
      />
      <PageHero
        image={u.image}
        imageAlt={u.title}
        eyebrow={umrahCategories[u.category]}
        title={u.title}
        breadcrumbs={[
          { name: "Umrah Packages", href: "/umrah" },
          { name: u.title, href: `/umrah/${u.slug}` },
        ]}
      >
        <p className="flex items-center gap-2 text-white/85">
          <Clock className="size-4 text-accent" aria-hidden /> {u.days} days · {u.makkahNights} nights Makkah · {u.madinahNights} nights Madinah
        </p>
      </PageHero>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_400px] lg:py-16">
        <div className="space-y-10">
          <section className="grid gap-4 sm:grid-cols-2">
            {[
              { city: "Makkah", nights: u.makkahNights, hotel: u.makkahHotel },
              { city: "Madinah", nights: u.madinahNights, hotel: u.madinahHotel },
            ].map((s) => (
              <div key={s.city} className="rounded-3xl border border-border bg-white p-6">
                <Building2 className="size-6 text-primary" aria-hidden />
                <h2 className="mt-3 text-xl font-bold">
                  {s.city} · {s.nights} nights
                </h2>
                <p className="mt-1 text-muted-foreground">{s.hotel}</p>
              </div>
            ))}
          </section>
          <section>
            <h2 className="font-display text-3xl font-semibold">What&apos;s included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {u.inclusions.map((i) => (
                <li key={i} className="flex gap-3 rounded-2xl bg-primary/5 p-4">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden /> {i}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Hotel names are confirmed at booking, subject to availability. Airfare is quoted separately. Packages can be customised: change the number of nights, upgrade hotels or add Taif ziyarat.
            </p>
          </section>
          <section className="rounded-3xl bg-sand p-6">
            <h2 className="text-lg font-bold">Talk to our Hajj &amp; Umrah desk</h2>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              {umrahDesk.people.map((p) => (
                <li key={p.phone}>
                  <span className="block font-semibold">{p.name}</span>
                  <a href={telHref(p.phone)} className="text-primary hover:underline">
                    {p.phone}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside id="book" className="scroll-mt-24">
          <div className="sticky top-24 rounded-3xl border border-border bg-white p-6 shadow-lift">
            <p className="text-sm text-muted-foreground">From, per person (quad sharing)</p>
            <p className="font-display text-4xl font-semibold">{formatPrice(u.priceFrom)}</p>
            <Button asChild variant="whatsapp" className="mt-5 w-full">
              <a href={whatsappLink(`Assalam o Alaikum, I'm interested in the ${u.title}.`, umrahDesk.people[0].phone.replace(/\s/g, "").replace(/^0/, "92"))} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" /> WhatsApp the Umrah desk
              </a>
            </Button>
            <div className="my-6 h-px bg-border" />
            <EnquiryForm compact submitLabel="Request this package" defaultValues={{ service: "umrah", destination: u.title, packageSlug: u.slug }} />
          </div>
        </aside>
      </div>

      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeading title="Other Umrah packages" action={{ label: "All Umrah packages", href: "/umrah" }} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <UmrahCard key={o.slug} pkg={o} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
