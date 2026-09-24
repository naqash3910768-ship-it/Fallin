import type { Metadata } from "next";
import { BookOpenCheck, Bus, Hotel, Stamp } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { UmrahCard } from "@/components/packages/umrah-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { umrahCategories, umrahFaqs, umrahPackages } from "@/data/umrah";
import { buildMetadata, itemListSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { UmrahCategory } from "@/types";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Umrah Packages from Pakistan – Ramadan, Group & Premium",
  description:
    "Hassle-free Umrah packages from Karachi and across Pakistan: 15-day Ramadan Umrah, group Umrah, Rajab & Shaban, family and 5-star Umrah with visa, hotels near the Haram, transport and guided assistance.",
  path: "/umrah",
  image: "/images/umrah/umrah-hero.jpg",
  keywords: ["Umrah packages from Pakistan", "Umrah packages from Karachi", "Ramadan Umrah package", "group Umrah package", "Umrah deals"],
});

const features = [
  { icon: Stamp, title: "Umrah visa", text: "Processed through authorised channels" },
  { icon: Hotel, title: "Hotels near Haram", text: "From economy to Haram-front 5★" },
  { icon: Bus, title: "All transport", text: "Airport, inter-city & ziyarat" },
  { icon: BookOpenCheck, title: "Guided assistance", text: "Help with rituals throughout" },
];

type Props = { searchParams: Promise<{ category?: string }> };

export default async function UmrahPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const active = category && category in umrahCategories ? (category as UmrahCategory) : null;
  const list = active ? umrahPackages.filter((p) => p.category === active) : umrahPackages;

  return (
    <>
      <JsonLd data={itemListSchema("Umrah packages", umrahPackages.map((u) => ({ name: u.title, href: `/umrah/${u.slug}`, image: u.image })))} />
      <PageHero
        size="lg"
        image="/images/umrah/umrah-hero.jpg"
        imageAlt="Pilgrims at Masjid al-Haram, Makkah"
        eyebrow="Umrah packages"
        title="Umrah packages from Pakistan, with guidance at every step"
        description="Our Umrah department has served pilgrims since 2007. Choose from Ramadan, group, family and premium packages, or let us customise one for you."
        breadcrumbs={[{ name: "Umrah Packages", href: "/umrah" }]}
      />

      <div className="relative z-10 -mt-10">
        <div className="container-page grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-soft lg:grid-cols-4">
          {features.map(({ icon: I, title, text }) => (
            <div key={title} className="flex items-center gap-3 bg-white p-4 sm:p-5">
              <I className="size-6 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="text-xs text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Choose your package" title="Umrah packages" description="Land-package prices per person on quad sharing. Airfare is quoted separately at the best available fare." />
          <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[{ key: "", label: "All packages" }, ...Object.entries(umrahCategories).map(([key, label]) => ({ key, label }))].map((c) => (
              <Link
                key={c.key}
                href={c.key ? `/umrah?category=${c.key}` : "/umrah"}
                scroll={false}
                aria-current={(active ?? "") === c.key ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                  (active ?? "") === c.key ? "bg-ink text-white" : "border border-border bg-white hover:bg-secondary",
                )}
              >
                {c.label}
              </Link>
            ))}
          </div>
          {list.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <UmrahCard key={p.slug} pkg={p} />
              ))}
            </div>
          ) : (
            <p className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">No packages in this category right now. Ask us for a custom Umrah.</p>
          )}
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Custom Umrah"
            title="Build your own Umrah package"
            description="Travelling with elderly parents, a large family or on specific dates? Share your requirements and our Hajj & Umrah desk will send you options within hours."
          />
          <div className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <EnquiryForm defaultValues={{ service: "umrah", destination: "Umrah" }} submitLabel="Get Umrah options" />
          </div>
        </div>
      </section>

      <FaqSection faqs={umrahFaqs} title="Umrah FAQs" />
      <CtaBanner title="Speak to our Hajj & Umrah desk" image="/images/umrah/umrah-cta.jpg" whatsappMessage="Assalam o Alaikum, I'd like information about Umrah packages." />
    </>
  );
}
