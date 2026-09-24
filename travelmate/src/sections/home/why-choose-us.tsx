import Image from "next/image";
import { Award, BadgeCheck, Headset, Layers, ShieldCheck, Wallet } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/site-config";

const years = new Date().getFullYear() - siteConfig.foundedYear;

const reasons = [
  { icon: Award, title: `${years}+ years of experience`, text: `Started in ${siteConfig.foundedYear} with Umrah, now a full-service travel house trusted by families, couples and companies.` },
  { icon: Layers, title: "Everything under one roof", text: "Tours, Hajj & Umrah, visas, cruises, hotels and flights — one team, one point of contact." },
  { icon: Headset, title: "Real, named experts", text: "Dedicated Tours & Visa and Hajj & Umrah desks you can call or WhatsApp directly." },
  { icon: Wallet, title: "Honest, transparent pricing", text: "Clear inclusions and exclusions on every quote. No hidden surprises after you pay." },
  { icon: BadgeCheck, title: "Easy booking", text: "Enquire online or on WhatsApp, approve your itinerary and we handle the rest — even the visa file." },
  { icon: ShieldCheck, title: "Support while you travel", text: "Local partners at every destination and our team on WhatsApp throughout your trip." },
];

export function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/images/about/why-choose-us.jpg" alt="Travel Mate consultant planning a family holiday" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-white p-5 shadow-lift sm:left-auto sm:right-[-1.5rem] sm:w-72">
            <p className="font-display text-4xl font-semibold text-primary">{siteConfig.foundedYear}</p>
            <p className="mt-1 text-sm text-muted-foreground">The year we started, with one Umrah desk. We&apos;ve grown into a full-service travel house since then.</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Why Travel Mate"
            title="Travel with a team that has your back"
            description="Since 2007 we've planned every kind of journey, from first family holidays to once-in-a-lifetime Hajj. This is how we make it easy."
            className="mb-10"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {reasons.map(({ icon: I, title, text }, i) => (
              <Reveal key={title} delay={i * 0.05} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <I className="size-6" aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
