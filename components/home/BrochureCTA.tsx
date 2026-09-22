import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BrochureCTA() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid items-center gap-10 overflow-hidden rounded-2xl bg-brand-sand p-8 lg:grid-cols-2 lg:gap-16 lg:p-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Catalogue</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-brand-ink sm:text-4xl">
            Explore the Fello Collection
          </h2>
          <p className="mt-4 max-w-md text-neutral-600">
            View our complete product catalogue — every chair, table and stool in the current
            Fello range, in one download.
          </p>
          <Button href="/brochure" size="lg" className="mt-8">
            Download Brochure
          </Button>
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl shadow-2xl shadow-black/10 lg:max-w-sm">
          <Image
            src="/images/brochure-collection.jpg"
            alt="The Fello chair collection"
            fill
            sizes="(min-width: 1024px) 24rem, 20rem"
            className="object-cover"
          />
        </Reveal>
      </Container>
    </section>
  );
}
