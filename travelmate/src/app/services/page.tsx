import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/shared/cta-banner";
import { Icon } from "@/components/shared/icon";
import { PageHero } from "@/components/shared/page-hero";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Travel Services – Tours, Hajj & Umrah, Visas, Cruises, Flights & Hotels",
  description:
    "Travel Mate is a complete travel advisory: holiday packages, Umrah and Hajj, visa services, cruise deals, air ticketing, hotel bookings and corporate travel from Karachi.",
  path: "/services",
  image: "/images/hero/services-hero.jpg",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="/images/hero/services-hero.jpg"
        imageAlt="Airplane wing above the clouds"
        eyebrow="Our services"
        title="Complete travel services under one roof"
        description="Travel Mate helps individuals, families and companies find the best holiday destinations, cruise and travel deals, along with hotel bookings, ticketing and visa facilities."
        breadcrumbs={[{ name: "Services", href: "/services" }]}
      />
      <section className="section">
        <div className="container-page space-y-6">
          {services.map((s, i) => (
            <article key={s.slug} id={s.slug} className="grid scroll-mt-24 overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft md:grid-cols-2">
              <div className={`relative min-h-[260px] ${i % 2 ? "md:order-2" : ""}`}>
                <Image src={s.image} alt={s.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <h2 className="mt-5 font-display text-3xl font-semibold">{s.name}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.description}</p>
                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-2 text-[15px]">
                      <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="mt-7 self-start">
                  <Link href={s.href}>
                    {s.href.startsWith("/enquiry") ? "Request a quote" : "Learn more"} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
