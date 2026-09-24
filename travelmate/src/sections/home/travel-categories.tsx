import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/data/categories";

export function TravelCategories() {
  return (
    <section className="section bg-ink">
      <div className="container-page">
        <SectionHeading
          tone="dark"
          eyebrow="Travel your way"
          title="Find the perfect trip for every traveller"
          description="Whether it's a honeymoon, a family holiday or a corporate retreat, start with the style of travel that suits you."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : i >= 5 ? "lg:col-span-2" : ""}>
              <Link
                href={c.slug === "cruise-holidays" ? "/cruise-tours" : `/tours/${c.slug}`}
                className="group relative isolate flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-3xl p-6 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
              >
                <Image src={c.image} alt={c.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
                <div className="bg-card-fade absolute inset-0 -z-10" aria-hidden />
                <span className="mb-auto grid size-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-white">{c.name}</h3>
                <p className="mt-1 text-sm text-white/75">{c.short}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
