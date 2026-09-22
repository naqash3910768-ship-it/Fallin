import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps: { title: string; body: string; image: string }[] = [
  { title: "Raw Material", body: "100% virgin furniture-grade polypropylene resin, sourced ahead of every production run.", image: "/images/icon-raw-material.png" },
  { title: "Injection Moulding", body: "Resin is shaped under heat and pressure across Polycraft's chair and table moulds.", image: "/images/icon-injection-moulding.png" },
  { title: "Quality Control", body: "Each piece is checked for finish and structural integrity before approval.", image: "/images/icon-quality-control.png" },
  { title: "Finished Furniture", body: "Ready to stack, ship and use — in homes, offices and institutions across Pakistan.", image: "/images/icon-finished-furniture.png" },
];

export function ManufacturingStory() {
  return (
    <section className="bg-brand-ink py-20 text-white lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It's Made"
          title="From Polymer to Product"
          tone="light"
          description="A straightforward manufacturing path Polycraft Industries has refined since 1993."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={step.image}
                    alt={`${step.title} — manufacturing step icon`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">
                  Step {i + 1}
                </p>
                <p className="mt-2 text-lg font-bold">{step.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{step.body}</p>
                {i < steps.length - 1 && (
                  <span className="absolute -right-3 top-[18%] hidden text-white/20 lg:block" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
