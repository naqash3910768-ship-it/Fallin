import { PackageCard } from "@/components/packages/package-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { featuredPackages } from "@/data/packages";

export function FeaturedPackages() {
  return (
    <section className="section bg-sand">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured packages"
          title="Hand-crafted holidays, ready to book"
          description="Hotels, sightseeing, transfers and visa support bundled into one clear price. Every package can be tailored to you."
          action={{ label: "Browse all packages", href: "/travel-packages" }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.slice(0, 6).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full">
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
