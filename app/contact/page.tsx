import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Fello Moulded Furniture for general, product or business inquiries.",
  alternates: { canonical: "/contact" },
};

const tracks = [
  { title: "General Inquiries", body: "Questions about Fello, our products or where to buy them." },
  { title: "Product Inquiries", body: "Ask about a specific chair, table or stool, including colours and availability." },
  { title: "Business Inquiries", body: "Retail, institutional or bulk-order inquiries." },
];

export default function ContactPage() {
  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-brand-ink sm:text-5xl">Let&rsquo;s Talk</h1>
      <p className="mt-4 max-w-xl text-lg text-neutral-600">
        Whether you&rsquo;re a homeowner, a retailer or an institutional buyer, we&rsquo;re happy
        to help.
      </p>

      <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="space-y-8">
            {tracks.map((t) => (
              <div key={t.title}>
                <p className="font-bold text-brand-ink">{t.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{t.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-black/[0.06] pt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Email</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-lg font-bold text-brand-ink hover:text-brand-red">
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
