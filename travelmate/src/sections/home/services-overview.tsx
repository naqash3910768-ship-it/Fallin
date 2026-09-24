import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/data/services";

export function ServicesOverview() {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our services"
          title="One travel partner for everything"
          description="Beyond holidays, we handle the details that make travel smooth: visas, flights, hotels and pilgrimages."
          action={{ label: "All services", href: "/services" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.05}>
              <Link href={s.href} className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary transition group-hover:bg-primary group-hover:text-white">
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:text-primary" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
