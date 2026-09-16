import { Container } from "@/components/ui/Container";
import { trustPoints } from "@/lib/site-config";

export function TrustStrip() {
  return (
    <section className="border-y border-black/[0.06] bg-brand-sand">
      <Container className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
        {trustPoints.map((point) => (
          <div key={point.label}>
            <p className="text-sm font-bold text-brand-ink sm:text-base">{point.label}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 sm:text-sm">{point.detail}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
