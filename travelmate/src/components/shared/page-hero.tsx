import Image from "next/image";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

interface PageHeroProps {
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

/** Full-bleed image hero used at the top of every inner page. */
export function PageHero({ title, description, image, imageAlt, eyebrow, breadcrumbs, children, size = "md" }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-hidden bg-ink",
        size === "sm" && "min-h-[380px] sm:min-h-[420px]",
        size === "md" && "min-h-[460px] sm:min-h-[520px]",
        size === "lg" && "min-h-[560px] sm:min-h-[640px]",
      )}
    >
      <Image src={image} alt={imageAlt ?? title} fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="bg-hero-fade absolute inset-0 -z-10" aria-hidden />
      <div className="container-page pb-12 pt-32 sm:pb-16">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>}
        <h1 className={cn("max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl", eyebrow ? "mt-3" : "mt-6")}>{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
