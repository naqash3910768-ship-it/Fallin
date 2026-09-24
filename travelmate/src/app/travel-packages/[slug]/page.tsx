import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarDays, Check, Clock, MapPin, Phone, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PackageCard } from "@/components/packages/package-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { getCategory } from "@/data/categories";
import { getDestination } from "@/data/destinations";
import { getPackage, packages } from "@/data/packages";
import { buildMetadata, tourSchema } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { durationLabel, formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = getPackage((await params).slug);
  if (!pkg) return {};
  const dest = getDestination(pkg.destination);
  return buildMetadata({
    title: `${pkg.title} – ${durationLabel(pkg.days, pkg.nights)}`,
    description: `${pkg.summary} From ${formatPrice(pkg.priceFrom)} per person. Book with Travel Mate, Karachi.`,
    path: `/travel-packages/${pkg.slug}`,
    image: pkg.image,
    keywords: [`${dest?.name} tour package`, `${dest?.name} tour from Karachi`, `${dest?.name} holiday package Pakistan`, pkg.title],
  });
}

export default async function PackageDetailPage({ params }: Props) {
  const pkg = getPackage((await params).slug);
  if (!pkg) notFound();
  const dest = getDestination(pkg.destination);
  const related = packages.filter((p) => p.slug !== pkg.slug && (p.destination === pkg.destination || p.categories[0] === pkg.categories[0])).slice(0, 3);
  const waMessage = `Hi Travel Mate, I'm interested in the "${pkg.title}" package. Please share availability and price.`;

  return (
    <>
      <JsonLd data={tourSchema(pkg, dest?.name ?? "")} />

      {/* Hero */}
      <section className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-ink sm:min-h-[600px]">
        <Image src={pkg.image} alt={`${pkg.title} in ${dest?.name}`} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="bg-hero-fade absolute inset-0 -z-10" aria-hidden />
        <div className="container-page pb-12 pt-32">
          <Breadcrumbs
            items={[
              { name: "Tour Packages", href: "/travel-packages" },
              ...(dest ? [{ name: dest.name, href: `/destinations/${dest.slug}` }] : []),
              { name: pkg.title, href: `/travel-packages/${pkg.slug}` },
            ]}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {pkg.badge && <Badge variant="accent">{pkg.badge}</Badge>}
            {pkg.categories.slice(0, 3).map((c) => (
              <Badge key={c} variant="dark">
                {getCategory(c)?.name}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">{pkg.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-white/85">
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-accent" aria-hidden /> {durationLabel(pkg.days, pkg.nights)}
            </span>
            {dest && (
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-accent" aria-hidden /> {dest.name}, {dest.country}
              </span>
            )}
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4 text-accent" aria-hidden /> Best time: {dest?.bestTime}
            </span>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_400px] lg:gap-16 lg:py-16">
        <div className="min-w-0 space-y-14">
          {/* Overview */}
          <section aria-labelledby="overview">
            <h2 id="overview" className="font-display text-3xl font-semibold">
              Trip overview
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{pkg.summary}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {pkg.highlights.map((h) => (
                <div key={h} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-4" aria-hidden />
                  </span>
                  <span className="pt-1 font-medium text-ink">{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Itinerary */}
          <section aria-labelledby="itinerary">
            <h2 id="itinerary" className="font-display text-3xl font-semibold">
              Day-by-day itinerary
            </h2>
            <ol className="relative mt-8 space-y-8 border-l-2 border-dashed border-primary/25 pl-8">
              {pkg.itinerary.map((d) => (
                <li key={d.day} className="relative">
                  <span className="absolute -left-[3.05rem] grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-white ring-4 ring-background">{d.day}</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Day {d.day}</p>
                  <h3 className="mt-1 text-lg font-bold text-ink">{d.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{d.description}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Inclusions */}
          <section aria-labelledby="inclusions" className="grid gap-6 sm:grid-cols-2">
            <h2 id="inclusions" className="sr-only">
              Inclusions and exclusions
            </h2>
            <div className="rounded-3xl bg-primary/5 p-6">
              <h3 className="text-lg font-bold text-ink">What&apos;s included</h3>
              <ul className="mt-4 space-y-3">
                {pkg.inclusions.map((i) => (
                  <li key={i} className="flex gap-3 text-[15px]">
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-muted p-6">
              <h3 className="text-lg font-bold text-ink">Not included</h3>
              <ul className="mt-4 space-y-3">
                {pkg.exclusions.map((i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-muted-foreground">
                    <X className="mt-0.5 size-5 shrink-0" aria-hidden /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {dest && (
            <section className="flex flex-col gap-6 rounded-3xl border border-border bg-white p-6 sm:flex-row sm:items-center">
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl sm:w-48">
                <Image src={dest.image} alt={dest.name} fill sizes="200px" className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">About the destination</p>
                <h2 className="mt-1 text-xl font-bold">{dest.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dest.visaNote}</p>
                <Link href={`/destinations/${dest.slug}`} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                  Explore {dest.name} →
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* Booking sidebar */}
        <aside id="book" className="scroll-mt-24">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-lift">
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="font-display text-4xl font-semibold text-ink">{formatPrice(pkg.priceFrom)}</p>
              <p className="mt-1 text-xs text-muted-foreground">Per person, twin sharing · excl. airfare · subject to availability</p>
              <div className="my-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-secondary p-3">
                  <Clock className="mb-1 size-4 text-primary" aria-hidden />
                  {pkg.days} days / {pkg.nights} nights
                </div>
                <div className="rounded-xl bg-secondary p-3">
                  <Users className="mb-1 size-4 text-primary" aria-hidden />
                  Private or group
                </div>
              </div>
              <h2 className="mb-4 text-lg font-bold">Request this package</h2>
              <EnquiryForm compact submitLabel="Get my quote" defaultValues={{ service: "tour-package", destination: pkg.title, packageSlug: pkg.slug }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="whatsapp">
                <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={siteConfig.contact.phoneHref}>
                  <Phone /> Call us
                </a>
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section bg-sand">
          <div className="container-page">
            <SectionHeading eyebrow="You may also like" title="Similar packages" action={{ label: "All packages", href: "/travel-packages" }} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-white/95 px-4 py-3 pr-20 backdrop-blur lg:hidden">
        <div>
          <p className="text-[11px] text-muted-foreground">From / person</p>
          <p className="text-lg font-bold text-ink">{formatPrice(pkg.priceFrom)}</p>
        </div>
        <Button asChild variant="accent">
          <a href="#book">Enquire now</a>
        </Button>
      </div>
    </>
  );
}
