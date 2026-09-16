import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCTA() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-brand-red px-8 py-14 text-center text-white sm:px-16 lg:flex-row lg:text-left">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Let&rsquo;s Talk</h2>
          <p className="mt-3 max-w-md text-white/80">
            Whether you&rsquo;re a homeowner, a retailer or an institutional buyer — we&rsquo;re
            happy to help you find the right Fello furniture.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href="/contact" variant="light" size="lg">
            Contact Us
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
