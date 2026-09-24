import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqSchema } from "@/lib/seo";
import type { FAQ } from "@/types";
import { JsonLd } from "./json-ld";
import { SectionHeading } from "./section-heading";

export function FaqSection({ faqs, title = "Frequently asked questions", description, id = "faqs" }: { faqs: FAQ[]; title?: string; description?: string; id?: string }) {
  return (
    <section id={id} className="section scroll-mt-24">
      <JsonLd data={faqSchema(faqs)} />
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeading eyebrow="Good to know" title={title} description={description ?? "Can't find your answer? Call or WhatsApp our team — we're happy to help."} />
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-white px-6 shadow-soft">
          {faqs.map((f, i) => (
            <AccordionItem key={f.question} value={`faq-${i}`}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
