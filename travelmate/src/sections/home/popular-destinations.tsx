import { DestinationCard } from "@/components/destinations/destination-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";

const count = (slug: string) => packages.filter((p) => p.destination === slug).length;

export function PopularDestinations() {
  const featured = destinations.filter((d) => d.featured).slice(0, 7);
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Popular destinations"
          title="Where will you go next?"
          description="From Dubai's skyline to the peaks of Hunza — our most-loved destinations, hand-picked by our travel experts."
          action={{ label: "View all destinations", href: "/destinations" }}
        />
        <div className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 sm:auto-rows-[280px] lg:grid-cols-4 lg:gap-5">
          {featured.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.05} className={i === 0 ? "sm:col-span-2 sm:row-span-2" : i === 3 || i === 6 ? "lg:col-span-2" : ""}>
              <DestinationCard destination={d} packageCount={count(d.slug)} className="h-full min-h-0" sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
