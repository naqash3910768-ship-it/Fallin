import type { Metadata } from "next";
import { Check } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { HajjCard } from "@/components/packages/hajj-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { hajjAddOns, hajjFaqs, hajjPackages, hajjSeason, hajjTiers } from "@/data/hajj";
import { buildMetadata, itemListSchema } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";
import type { HajjTier } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: `Luxury & Private Hajj Packages from Pakistan – ${hajjSeason}`,
  description:
    "TMG private Hajj packages from Pakistan in Signature, Executive and Deluxe categories: Sapphire, Diamond, Pearl Plus and Gold. Premium Azizia hotels, Mina camps, scholar guidance and VIP add-ons.",
  path: "/hajj",
  image: "/images/hajj/hajj-hero.jpg",
  keywords: ["Hajj packages from Pakistan", "private Hajj packages", "luxury Hajj packages", "VIP Hajj 2027", "TMG Hajj packages"],
});

const pricedPackages = hajjPackages.filter((p) => p.pricing.length);

export default function HajjPage() {
  return (
    <>
      <JsonLd data={itemListSchema("TMG Hajj packages", hajjPackages.map((h) => ({ name: `${h.name} Hajj Package`, href: `/hajj/${h.slug}`, image: h.image })))} />
      <PageHero
        size="lg"
        image="/images/hajj/hajj-hero.jpg"
        imageAlt="Pilgrims at Mount Arafat"
        eyebrow={hajjSeason}
        title="Private Hajj packages, with nothing left to chance"
        description="TMG Hajj packages are built around top-tier accommodation and smooth transport. Choose Signature, Executive or Deluxe, lasting 8 to 25 days."
        breadcrumbs={[{ name: "Hajj Packages", href: "/hajj" }]}
      />

      {/* Tiers */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Three categories" title="Signature, Executive & Deluxe" align="center" description="All categories include complete Hajj logistics and scholar guidance. The difference is in Azizia accommodation and Mina services." />
          <div className="grid gap-5 md:grid-cols-3">
            {(Object.keys(hajjTiers) as HajjTier[]).map((t, i) => (
              <Reveal key={t} delay={i * 0.08} className={`rounded-3xl p-8 ${t === "signature" ? "bg-ink text-white" : "bg-sand"}`}>
                <p className={`text-xs font-bold uppercase tracking-[0.2em] ${t === "signature" ? "text-accent" : "text-primary"}`}>{hajjTiers[t].name}</p>
                <p className={`mt-3 text-lg ${t === "signature" ? "text-white/85" : "text-ink"}`}>{hajjTiers[t].description}</p>
                <p className={`mt-4 text-sm ${t === "signature" ? "text-white/60" : "text-muted-foreground"}`}>
                  Packages: {hajjPackages.filter((p) => p.tier === t).map((p) => p.name).join(", ")}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeading eyebrow="Packages" title="TMG Hajj packages" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hajjPackages.map((h) => (
              <HajjCard key={h.slug} pkg={h} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing table */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Pricing" title="Compare package pricing" description="Per person in USD, excluding airfare. Reference rates from the most recently published TMG season. Current-season rates are confirmed at registration." />
          <div className="overflow-x-auto rounded-3xl border border-border bg-white shadow-soft">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Hajj package pricing by room occupancy</caption>
              <thead className="bg-secondary text-ink">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Occupancy
                  </th>
                  {pricedPackages.map((p) => (
                    <th key={p.slug} scope="col" className="px-6 py-4 font-bold">
                      {hajjTiers[p.tier].name} {p.name.replace(" (Deluxe)", "")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricedPackages[0].pricing.map((row, r) => (
                  <tr key={row.occupancy} className="border-t border-border">
                    <th scope="row" className="px-6 py-4 font-semibold text-ink">
                      {row.occupancy}
                    </th>
                    {pricedPackages.map((p) => (
                      <td key={p.slug} className="px-6 py-4 tabular-nums">
                        {formatPrice(p.pricing[r].price, "USD")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Airfare supplements typically range between $1,000 and $1,500 depending on departure city.</p>
        </div>
      </section>

      <section className="section bg-ink">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading tone="dark" eyebrow="Upgrades" title="Premium add-on services" description="Make your Hajj more comfortable with these optional services, available on request." />
            <ul className="grid gap-3 sm:grid-cols-2">
              {hajjAddOns.map((a) => (
                <li key={a} className="flex gap-3 rounded-2xl bg-white/5 p-4 text-white">
                  <Check className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Register your interest for {hajjSeason}</h2>
            <p className="mb-6 mt-2 text-sm text-muted-foreground">Private Hajj places are limited. Our Hajj desk will contact you with availability and next steps.</p>
            <EnquiryForm compact defaultValues={{ service: "hajj", destination: hajjSeason }} submitLabel="Register interest" />
          </div>
        </div>
      </section>

      <FaqSection faqs={hajjFaqs} title="TMG Hajj packages FAQs" />
      <CtaBanner title="Questions about Hajj?" image="/images/hajj/hajj-cta.jpg" description="Speak to our experienced Hajj & Umrah desk for honest guidance on packages, documents and preparation." whatsappMessage="Assalam o Alaikum, I'd like information about Hajj packages." />
    </>
  );
}
