"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 6000, stopOnInteraction: true })]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => embla && setSelected(embla.selectedScrollSnap()), [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <section className="section overflow-hidden bg-sand" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Traveller stories" title="Loved by travellers across Pakistan" className="mb-0 sm:mb-0" />
          <div className="flex gap-2">
            <button type="button" onClick={() => embla?.scrollPrev()} aria-label="Previous review" className="grid size-12 place-items-center rounded-full border border-border bg-white text-ink transition hover:bg-ink hover:text-white">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => embla?.scrollNext()} aria-label="Next review" className="grid size-12 place-items-center rounded-full border border-border bg-white text-ink transition hover:bg-ink hover:text-white">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden sm:mt-12" ref={emblaRef}>
          <div className="-ml-5 flex">
            {testimonials.map((t, i) => (
              <div key={t.name} className="min-w-0 shrink-0 grow-0 basis-full pl-5 md:basis-1/2 lg:basis-1/3" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${testimonials.length}`}>
                <figure className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex text-accent" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} className="size-4 fill-current" aria-hidden />
                      ))}
                    </div>
                    <Quote className="size-8 text-primary/15" aria-hidden />
                  </div>
                  <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/85">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <Image src={t.avatar} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-ink">{t.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.trip} · {t.location}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              aria-current={selected === i}
              onClick={() => embla?.scrollTo(i)}
              className={cn("h-2 rounded-full transition-all", selected === i ? "w-8 bg-primary" : "w-2 bg-ink/20")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
