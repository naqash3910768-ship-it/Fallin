import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { hajjSeason } from "@/data/hajj";

const points = ["Umrah visa, hotels near the Haram & transport", "Ramadan, group, family & premium Umrah", `TMG private Hajj packages for ${hajjSeason}`, "Scholar guidance and dedicated Hajj & Umrah desk"];

export function PilgrimageHighlight() {
  return (
    <section className="section pt-0">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-[2rem] bg-sand lg:grid-cols-2">
          <Reveal className="relative min-h-[320px]">
            <Image src="/images/umrah/umrah-hero.jpg" alt="Masjid al-Haram in Makkah at dusk" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Hajj &amp; Umrah</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">Where it all began: sacred journeys, handled with care</h2>
            <p className="mt-4 text-muted-foreground">
              Travel Mate started in 2007 as an Umrah department. Our Hajj &amp; Umrah team still looks after every pilgrim personally, so you can focus on worship.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-ink">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/umrah">Umrah packages</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/hajj">Hajj packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
