import type { Metadata } from "next";
import { Check, FileText } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { CtaBanner } from "@/components/shared/cta-banner";
import { FaqSection } from "@/components/shared/faq-section";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig, telHref } from "@/lib/site-config";
import { visaCountries, visaDocuments, visaFaqs, visaSteps, visaTypes } from "@/data/visas";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Visa Services from Karachi, Pakistan | Dubai, Schengen, UK & More",
  description:
    "Travel Mate handles all types of visa services from Karachi: tourist, business, student and Umrah visas for Dubai/UAE, Schengen, UK, Turkey, Azerbaijan, Malaysia, Thailand and more.",
  path: "/visa-services",
  image: "/images/services/visa-services.jpg",
  keywords: ["visa services Karachi", "Dubai visa from Karachi", "Schengen visa Pakistan", "UK visa assistance Karachi", "visa agent Karachi"],
});

export default function VisaPage() {
  const desk = siteConfig.departments[0];
  const groups = [...new Set(visaCountries.map((c) => c.group))];
  return (
    <>
      <PageHero
        image="/images/services/visa-services.jpg"
        imageAlt="Passport with visa stamps"
        eyebrow="Visa services"
        title="Visa services from Karachi, done right the first time"
        description="We deal in all types of visa services from Karachi, including tourist, business and student visas. Our visa desk prepares complete, well-organised files and keeps you updated until your visa arrives."
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: "Visa Services", href: "/visa-services" },
        ]}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Visa types" title="Every kind of visa, one expert team" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visaTypes.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.05} className="rounded-3xl border border-border bg-white p-6 shadow-soft">
                <FileText className="size-7 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-bold">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeading eyebrow="Countries" title="Popular visa destinations" description="Don't see your country? We handle many more. Just ask." />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <div key={g}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">{g}</h3>
                <ul className="mt-3 space-y-2">
                  {visaCountries
                    .filter((c) => c.group === g)
                    .map((c) => (
                      <li key={c.name} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-[15px] font-medium shadow-soft">
                        {c.name}
                        {c.popular && <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-bold text-accent-foreground">Popular</span>}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="Four simple steps" align="center" />
          <ol className="grid gap-5 md:grid-cols-4">
            {visaSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="relative rounded-3xl bg-white p-6 shadow-soft">
                <span className="font-display text-5xl font-semibold text-primary/20">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ink">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading tone="dark" eyebrow="Checklist" title="Common documents" description="Exact requirements vary by country. We'll send you a precise checklist during your consultation." />
            <ul className="space-y-3">
              {visaDocuments.map((d) => (
                <li key={d} className="flex gap-3 text-white/85">
                  <Check className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> {d}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl bg-white/5 p-5 text-white">
              <p className="font-bold">
                {desk.name} desk · <a href={`mailto:${desk.email}`} className="font-normal text-accent hover:underline">{desk.email}</a>
              </p>
              <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                {desk.people.map((p) => (
                  <li key={p.phone}>
                    <span className="block text-white/70">{p.name}</span>
                    <a href={telHref(p.phone)} className="font-semibold hover:text-accent">
                      {p.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Free visa consultation</h2>
            <p className="mb-6 mt-2 text-sm text-muted-foreground">Tell us where you&apos;re going and we&apos;ll confirm the requirements.</p>
            <EnquiryForm compact defaultValues={{ service: "visa" }} submitLabel="Request consultation" />
          </div>
        </div>
      </section>

      <FaqSection faqs={visaFaqs} title="Visa FAQs" />
      <CtaBanner />
    </>
  );
}
