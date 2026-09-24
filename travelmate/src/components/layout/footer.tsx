import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from "@/components/shared/social-icons";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { footerNav } from "@/data/navigation";
import { siteConfig, telHref, whatsappLink } from "@/lib/site-config";
import { Logo } from "./logo";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[15px] text-white/65 transition hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-ink text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="container-page flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-white">Get exclusive deals in your inbox</p>
            <p className="mt-1 text-white/60">Early-bird offers, Umrah departures and new destinations — no spam, ever.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/65">
            Karachi&apos;s trusted travel house since {siteConfig.foundedYear} — tour packages, Hajj &amp; Umrah, visa services, cruises, hotels and air ticketing.
          </p>
          <ul className="mt-6 space-y-3 text-[15px] text-white/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <address className="not-italic">{contact.address.full}</address>
            </li>
            <li>
              <a href={contact.phoneHref} className="flex gap-3 hover:text-white">
                <Phone className="size-5 shrink-0 text-accent" aria-hidden /> {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex gap-3 hover:text-white">
                <Mail className="size-5 shrink-0 text-accent" aria-hidden /> {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="size-5 shrink-0 text-accent" aria-hidden /> {contact.hours[0].days}, {contact.hours[0].time}
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Travel Mate on Facebook" className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
              <FacebookIcon className="size-4" />
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Travel Mate on LinkedIn" className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
              <LinkedInIcon className="size-4" />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Travel Mate on WhatsApp" className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-whatsapp">
              <WhatsAppIcon className="size-4" />
            </a>
          </div>
        </div>

        <FooterColumn title="Tour Packages" links={footerNav.packages} />
        <FooterColumn title="Services" links={footerNav.services} />
        <FooterColumn title="Company" links={footerNav.company} />
      </div>

      {/* Department contacts */}
      <div className="border-t border-white/10">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2">
          {siteConfig.departments.map((d) => (
            <div key={d.name} className="text-sm">
              <p className="font-semibold text-white">
                {d.name} ·{" "}
                <a href={`mailto:${d.email}`} className="font-normal text-white/60 hover:text-white">
                  {d.email}
                </a>
              </p>
              <p className="mt-1 text-white/55">
                {d.people.map((p, i) => (
                  <span key={p.phone}>
                    {p.name}:{" "}
                    <a href={telHref(p.phone)} className="hover:text-white">
                      {p.phone}
                    </a>
                    {i < d.people.length - 1 && " · "}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Prices are indicative and subject to availability at the time of booking.</p>
        </div>
      </div>
    </footer>
  );
}
