import Image from "next/image";
import { FacebookIcon } from "@/components/shared/social-icons";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { galleryImages } from "@/data/gallery";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function TravelGallery() {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="#TravelWithTravelMate"
          title="Moments from the road"
          description="Real journeys, real smiles. Follow us for travel inspiration, new departures and exclusive deals."
          action={{ label: "Follow on Facebook", href: siteConfig.social.facebook }}
        />
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4">
          {galleryImages.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.04} className={cn("group relative overflow-hidden rounded-2xl", img.span)}>
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-110" />
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-end bg-ink/0 p-4 text-sm font-medium text-white opacity-0 transition group-hover:bg-ink/40 group-hover:opacity-100 focus-visible:opacity-100"
              >
                <span className="flex items-center gap-2">
                  <FacebookIcon className="size-4" /> {img.alt}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
