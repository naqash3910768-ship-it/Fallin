import type { Metadata } from "next";
import { Anchor, Ship, Sun, Utensils } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PackageGrid } from "@/components/packages/package-grid";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getPackagesByCategory } from "@/data/packages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cruise Tour Deals & Packages for Families",
  description:
    "Cost-effective cruise deals from Pakistan: Royal Caribbean Mediterranean cruises, Arabian Gulf cruises from Dubai and more. One or two-week cruise adventures or weekend getaways with Travel Mate.",
  path: "/cruise-tours",
  image: "/images/services/cruise-tours.jpg",
});

const perks = [
  { icon: Ship, title: "Leading cruise lines", text: "Royal Caribbean and other trusted lines" },
  { icon: Utensils, title: "Full-board dining", text: "Meals and entertainment included onboard" },
  { icon: Anchor, title: "Many ports, one unpack", text: "See several countries in one trip" },
  { icon: Sun, title: "Weekend to 2 weeks", text: "Short getaways or grand voyages" },
];

export default function CruisePage() {
  const cruises = getPackagesByCategory("cruise-holidays");
  return (
    <>
      <PageHero
        size="lg"
        image="/images/services/cruise-tours.jpg"
        imageAlt="Cruise ship sailing on the Mediterranean"
        eyebrow="Cruise holidays"
        title="Cruise tour deals for families & couples"
        description="Search one or two-week cruise adventures or book a weekend getaway. Our cruise specialists help you compare destinations, ports, itineraries and ships."
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: "Cruise Tours", href: "/cruise-tours" },
        ]}
      />
      <section className="section">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: I, title, text }, i) => (
            <Reveal key={title} delay={i * 0.05} className="rounded-3xl bg-sand p-6">
              <I className="size-7 text-primary" aria-hidden />
              <h2 className="mt-4 text-lg font-bold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-page">
          <SectionHeading eyebrow="Featured cruises" title="Cruise packages" />
          <PackageGrid packages={cruises} />
        </div>
      </section>
      <section className="section bg-sand">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="Find your cruise" title="Tell us your dream voyage" description="Preferred region, dates, cabin type and number of guests — we'll compare the best cruise deals for you, including flights and visas." />
          <div className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <EnquiryForm defaultValues={{ service: "cruise" }} submitLabel="Find my cruise" />
          </div>
        </div>
      </section>
      <CtaBanner image="/images/cta/cruise-cta.jpg" />
    </>
  );
}
