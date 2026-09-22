import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const points = [
  { n: "01", title: "Virgin Furniture-Grade Polymer", body: "Every piece is moulded from 100% virgin furniture-grade polypropylene resin — not recycled or reprocessed plastic." },
  { n: "02", title: "Strict Quality Control", body: "Each batch runs through Polycraft Industries' quality control process before it is approved for sale." },
  { n: "03", title: "Modern Injection Moulding", body: "Production runs on large and medium tonnage injection moulding machines across more than ten chair and table moulds." },
  { n: "04", title: "Consistent Finish", body: "A single-piece moulded shell means no upholstery, joints or fixings to wear loose over time." },
];

export function QualitySection() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow="Our Standard" title="Quality You Can Rely On" />
          <dl className="mt-10 space-y-8">
            {points.map((p) => (
              <div key={p.n} className="flex gap-5">
                <dt className="shrink-0 text-2xl font-extrabold text-brand-red/30">{p.n}</dt>
                <dd>
                  <p className="font-bold text-brand-ink">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{p.body}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.15} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/images/quality-shield.jpg"
            alt="Quality assurance and reliability"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </Container>
    </section>
  );
}
