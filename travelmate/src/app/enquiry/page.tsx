import type { Metadata } from "next";
import { Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/shared/page-hero";
import { serviceOptions } from "@/lib/validations";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Plan My Trip – Free Travel Quote",
  description: "Tell us where you'd like to go and get a free, personalised travel quote from Travel Mate for tour packages, Umrah, Hajj, visas, cruises, flights and hotels.",
  path: "/enquiry",
  image: "/images/hero/enquiry-hero.jpg",
});

const steps = [
  { icon: MessageCircle, title: "Share your plans", text: "Destination, dates, travellers and budget. Rough ideas are fine." },
  { icon: Clock, title: "Get a tailored quote", text: "An expert sends you options and prices, usually within a few working hours." },
  { icon: ShieldCheck, title: "Book with confidence", text: "Approve your itinerary; we handle hotels, visas and transfers." },
];

type Props = { searchParams: Promise<{ service?: string; destination?: string; package?: string }> };

export default async function EnquiryPage({ searchParams }: Props) {
  const sp = await searchParams;
  const service = serviceOptions.some((o) => o.value === sp.service) ? sp.service : undefined;

  return (
    <>
      <PageHero
        size="sm"
        image="/images/hero/enquiry-hero.jpg"
        imageAlt="Traveller planning a trip with a map"
        eyebrow="Plan my trip"
        title="Get your free, personalised travel quote"
        breadcrumbs={[{ name: "Plan My Trip", href: "/enquiry" }]}
      />
      <section className="section pt-12">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold">How it works</h2>
            <ol className="mt-8 space-y-8">
              {steps.map(({ icon: I, title, text }, i) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-white">
                    <I className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Step {i + 1}</p>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="mt-1 text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-lift sm:p-10">
            <EnquiryForm defaultValues={{ service: service ?? "tour-package", destination: sp.destination ?? "", packageSlug: sp.package ?? "" }} />
          </div>
        </div>
      </section>
    </>
  );
}
