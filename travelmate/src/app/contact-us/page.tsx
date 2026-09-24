import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/shared/page-hero";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us – Travel Mate, Clifton, Karachi",
  description:
    "Contact Travel Mate: (021) 111 800 500, info@travelmate.com.pk. Visit us at Park Towers, Clifton, Karachi. Direct numbers for our Tours & Visa and Hajj & Umrah desks.",
  path: "/contact-us",
  image: "/images/hero/contact-hero.jpg",
});

export default function ContactPage() {
  const { contact } = siteConfig;
  const cards = [
    { icon: Phone, title: "Call us", value: contact.phone, href: contact.phoneHref },
    { icon: Mail, title: "Email us", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, title: "Visit us", value: contact.address.full, href: `https://maps.google.com/?q=${encodeURIComponent(contact.address.full)}` },
    { icon: Clock, title: "Office hours", value: contact.hours.map((h) => `${h.days}: ${h.time}`).join(" · ") },
  ];

  return (
    <>
      <PageHero
        size="sm"
        image="/images/hero/contact-hero.jpg"
        imageAlt="Karachi skyline at dusk"
        eyebrow="Contact us"
        title="We're here to help you travel"
        description="Call, email, WhatsApp or visit our Clifton office. The right desk will get back to you quickly."
        breadcrumbs={[{ name: "Contact Us", href: "/contact-us" }]}
      />

      <section className="section pt-12">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: I, title, value, href }) => {
              const content = (
                <>
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <I className="size-6" aria-hidden />
                  </span>
                  <p className="mt-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
                  <p className="mt-1 font-semibold text-ink">{value}</p>
                </>
              );
              return href ? (
                <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-3xl border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                  {content}
                </a>
              ) : (
                <div key={title} className="rounded-3xl border border-border bg-white p-6 shadow-soft">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-10">
              <h2 className="font-display text-3xl font-semibold">Send us a message</h2>
              <p className="mb-8 mt-2 text-muted-foreground">
                Planning a trip? Our <Link href="/enquiry" className="font-semibold text-primary hover:underline">trip enquiry form</Link> gets you a quote faster.
              </p>
              <ContactForm />
            </div>

            <div className="space-y-5">
              {siteConfig.departments.map((d) => (
                <div key={d.name} className="rounded-3xl bg-sand p-6">
                  <h3 className="text-lg font-bold">{d.name}</h3>
                  <a href={`mailto:${d.email}`} className="text-sm text-primary hover:underline">
                    {d.email}
                  </a>
                  <ul className="mt-4 space-y-2.5">
                    {d.people.map((p) => (
                      <li key={p.phone} className="flex items-center justify-between gap-3 text-[15px]">
                        <span className="text-ink">{p.name}</span>
                        <span className="flex items-center gap-2">
                          <a href={telHref(p.phone)} className="tabular-nums font-semibold text-ink hover:text-primary">
                            {p.phone}
                          </a>
                          <a
                            href={whatsappLink("Hi, I'm contacting you from the Travel Mate website.", p.phone.replace(/\s/g, "").replace(/^0/, "92"))}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp ${p.name}`}
                            className="grid size-8 place-items-center rounded-full bg-whatsapp text-white"
                          >
                            <WhatsAppIcon className="size-4" />
                          </a>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Button asChild variant="whatsapp" size="lg" className="w-full">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" /> Start a WhatsApp chat
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe
              title="Travel Mate office location on Google Maps"
              src={contact.mapEmbed}
              className="h-[380px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
