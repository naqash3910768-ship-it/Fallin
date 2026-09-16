import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Art } from "@/components/ui/Art";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
            Fello Moulded Furniture
          </p>
          <h1 className="mt-4 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
            Furniture Built for Everyday Life.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600">
            Premium moulded furniture designed with quality, durability and modern living in
            mind — manufactured in Pakistan by Polycraft Industries since 1993.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/products" size="lg">
              Explore Collection
            </Button>
            <Button href="/brochure" size="lg" variant="ghost">
              Download Brochure
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[5/6]">
            <Art icon="chair" tone="sand" label="Fello moulded chair — illustrative artwork" className="rounded-2xl" />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl bg-brand-ink px-5 py-4 text-white shadow-xl sm:block">
            <p className="text-2xl font-extrabold leading-none">1993</p>
            <p className="mt-1 text-xs text-white/60">Manufacturing since</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
