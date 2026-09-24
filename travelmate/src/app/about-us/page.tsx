import Image from "next/image";
import type { Metadata } from "next";
import { Eye, HeartHandshake, Target } from "lucide-react";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TrustBar } from "@/components/shared/trust-bar";
import { WhyChooseUs } from "@/sections/home/why-choose-us";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "About Us – Karachi's Trusted Travel House since 2007",
  description:
    "Travel Mate started in 2007 with one Umrah department and has grown into a full travel house offering holiday packages, Hajj and Umrah, visas, cruises, hotels and air ticketing from Karachi.",
  path: "/about-us",
  image: "/images/about/about-hero.jpg",
});

const milestones = [
  { year: "2007", text: "Travel Mate founded in Karachi with a dedicated Umrah department." },
  { year: "Growth", text: "Expanded into international holiday packages, group tours and honeymoon packages." },
  { year: "Services", text: "Added visa services, air ticketing, hotel bookings and cruise deals, becoming a full-service travel house." },
  { year: "Today", text: "TMG private Hajj packages, domestic Pakistan tours and worldwide holidays, all from one trusted team." },
];

const values = [
  { icon: Target, title: "Our mission", text: "Make every journey easy, safe and memorable by handling the details, so travellers can focus on the experience." },
  { icon: Eye, title: "Our vision", text: "To be Pakistan's most trusted travel companion for holidays, pilgrimages and business travel." },
  { icon: HeartHandshake, title: "Our promise", text: "Honest advice, transparent pricing and real people who stay with you from enquiry to homecoming." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/about/about-hero.jpg"
        imageAlt="Travel Mate team helping travellers"
        eyebrow="About Travel Mate"
        title={`The best companion for many travellers since ${siteConfig.foundedYear}`}
        description="A complete, tourist-friendly travel advisory helping individuals and families find the best holiday destinations, cruise and travel deals, along with hotel bookings, ticketing and visa facilities."
        breadcrumbs={[{ name: "About Us", href: "/about-us" }]}
      />

      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our story" title="From one Umrah desk to a full travel house" className="mb-6" />
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Travel Mate was started in {siteConfig.foundedYear} with just one department, for Umrah packages. Since then it has steadily expanded and is now a fully dedicated
                travel house.
              </p>
              <p>
                Today we help travellers find the best family and leisure holiday packages, Umrah and Hajj packages, group tours, honeymoon and anniversary packages, cost-effective
                cruise deals, and airfare for domestic and international flights, along with boarding, lodging and entertainment at every destination.
              </p>
              <p>
                We offer packages for the Maldives, Thailand, Turkey, Dubai, Singapore, Malaysia and many countries around the globe, and comfortable Pakistan tour packages for
                different regions and sites.
              </p>
            </div>
          </div>
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/images/about/our-story.jpg" alt="Travellers enjoying a mountain view" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
        <div className="container-page mt-16">
          <TrustBar />
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeading eyebrow="What drives us" title="Mission, vision & promise" align="center" />
          <div className="grid gap-5 md:grid-cols-3">
            {values.map(({ icon: I, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className="rounded-3xl bg-white p-8 shadow-soft">
                <I className="size-8 text-primary" aria-hidden />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Our journey" title="How we've grown" />
          <ol className="grid gap-5 md:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.08} className="border-t-2 border-primary pt-5">
                <p className="font-display text-2xl font-semibold text-primary">{m.year}</p>
                <p className="mt-2 text-muted-foreground">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ink">
        <div className="container-page">
          <SectionHeading tone="dark" eyebrow="Our team" title="Talk to the right person, directly" description="Dedicated desks mean you always reach someone who knows your trip." />
          <div className="grid gap-5 md:grid-cols-2">
            {siteConfig.departments.map((d) => (
              <div key={d.name} className="rounded-3xl bg-white/5 p-8">
                <h3 className="text-xl font-bold text-white">{d.name}</h3>
                <a href={`mailto:${d.email}`} className="text-sm text-accent hover:underline">
                  {d.email}
                </a>
                <ul className="mt-5 space-y-3">
                  {d.people.map((p) => (
                    <li key={p.phone} className="flex items-center justify-between border-b border-white/10 pb-3 text-white/85">
                      <span>{p.name}</span>
                      <span className="tabular-nums text-white/60">{p.phone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
