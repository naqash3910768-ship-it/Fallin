import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Art } from "@/components/ui/Art";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { companyFacts, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: "Polycraft Industries has manufactured Fello moulded furniture in Pakistan since 1993, using 100% virgin furniture-grade polypropylene resin.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { year: "1993", title: "Polycraft Industries founded", body: companyFacts.founded },
  { year: "Early years", title: "One mould, one machine", body: companyFacts.origin },
  { year: "Ongoing", title: "Material philosophy", body: companyFacts.material },
  { year: "Today", title: "A broader mould range", body: companyFacts.capacity },
];

export default function AboutPage() {
  return (
    <>
      <Container className="py-12 lg:py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">
              Since {siteConfig.foundedYear}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-5xl">
              Built on Experience. Designed for Today.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              {siteConfig.company} has spent more than three decades manufacturing moulded
              furniture in Pakistan under the Fello brand — starting with a single chair mould
              and growing into one of the country&rsquo;s established moulded furniture makers.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/about-factory.jpg"
              alt="Injection moulding machine and finished Fello chair on the Polycraft Industries factory floor"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Container>

      <section className="border-y border-black/[0.06] bg-brand-sand py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Our Story" title="From One Mould to a Full Range" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="relative border-l-2 border-brand-red/20 pl-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">{item.year}</p>
                <p className="mt-2 font-bold text-brand-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-square overflow-hidden rounded-2xl">
            <Art icon="resin" tone="sand" label="Virgin polypropylene resin — illustrative artwork" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Material Philosophy" title="Why the Resin Matters" />
            <p className="mt-6 leading-relaxed text-neutral-600">{companyFacts.material}</p>
            <p className="mt-4 leading-relaxed text-neutral-600">{companyFacts.quality}</p>
            <Button href="/quality" variant="ghost" className="mt-8">
              Our Quality Standards
            </Button>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
