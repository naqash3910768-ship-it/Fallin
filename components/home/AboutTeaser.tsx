import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Art } from "@/components/ui/Art";
import { Reveal } from "@/components/ui/Reveal";
import { companyFacts } from "@/lib/site-config";

export function AboutTeaser() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="relative order-2 aspect-[4/5] overflow-hidden rounded-2xl lg:order-1">
          <Art icon="factory" tone="sand" label="Polycraft Industries factory — illustrative artwork" />
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <SectionHeading eyebrow="Since 1993" title="Built on Experience. Designed for Today." />
          <p className="mt-6 leading-relaxed text-neutral-600">{companyFacts.founded}</p>
          <p className="mt-4 leading-relaxed text-neutral-600">{companyFacts.origin}</p>
          <p className="mt-4 leading-relaxed text-neutral-600">{companyFacts.capacity}</p>
          <Button href="/about" variant="ghost" className="mt-8">
            Our Story
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
