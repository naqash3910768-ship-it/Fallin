import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Art } from "@/components/ui/Art";
import { Reveal } from "@/components/ui/Reveal";
import { ManufacturingStory } from "@/components/home/ManufacturingStory";
import { companyFacts } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Quality",
  description: "Fello moulded furniture is built from 100% virgin furniture-grade polypropylene resin and checked under strict quality control before it reaches customers.",
  alternates: { canonical: "/quality" },
};

const pillars = [
  { n: "01", title: "Virgin Furniture-Grade Polymer", body: "Every piece is moulded from 100% virgin furniture-grade polypropylene resin — not recycled or reprocessed plastic. This is a deliberate material choice, not a cost-driven one." },
  { n: "02", title: "Strict Quality Control", body: "Each production batch is checked before approval, covering finish, wall thickness and structural integrity across the moulded shell." },
  { n: "03", title: "Modern Injection Moulding", body: "Production runs on large and medium tonnage injection moulding machines across more than ten chair and table moulds, built up gradually since the company's first Taiwanese machine in 1993." },
  { n: "04", title: "Consistent Finish", body: "A single-piece moulded shell has no joints, fixings or upholstery to loosen or wear out over years of daily use." },
];

export default function QualityPage() {
  return (
    <>
      <Container className="py-12 lg:py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Quality" }]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Our Standard</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-5xl">
              Quality You Can Rely On
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">{companyFacts.founded}</p>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Art icon="quality" tone="charcoal" label="Fello quality control — illustrative artwork" />
          </Reveal>
        </div>
      </Container>

      <section className="border-y border-black/[0.06] bg-brand-sand py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Four Pillars" title="What Quality Means at Fello" />
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06} className="flex gap-5">
                <span className="shrink-0 text-3xl font-extrabold text-brand-red/25">{p.n}</span>
                <div>
                  <p className="font-bold text-brand-ink">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ManufacturingStory />
    </>
  );
}
