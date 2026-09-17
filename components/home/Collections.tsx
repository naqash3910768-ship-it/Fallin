import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryVisual } from "@/components/ui/CategoryVisual";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/lib/products";

export function Collections() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="The Range" title="Explore Our Collections" />

        <div className="mt-12 space-y-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.05}>
              <Link
                href={`/products?category=${cat.slug}`}
                className={`group grid items-stretch gap-0 overflow-hidden rounded-2xl border border-black/[0.06] lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] lg:aspect-auto">
                  <CategoryVisual category={cat} sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
                <div className="flex flex-col justify-center bg-white p-8 lg:p-14">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-brand-ink lg:text-3xl">{cat.name}</h3>
                  <p className="mt-3 max-w-sm text-neutral-600">{cat.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
                    Explore Collection
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
