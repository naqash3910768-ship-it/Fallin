import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDestination } from "@/data/destinations";
import { formatPrice } from "@/lib/utils";
import type { TourPackage } from "@/types";

export function PackageCard({ pkg, priority }: { pkg: TourPackage; priority?: boolean }) {
  const destination = getDestination(pkg.destination);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.image}
          alt={`${pkg.title} — ${destination?.name ?? ""} tour package`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {pkg.badge ? <Badge variant="accent">{pkg.badge}</Badge> : <span />}
          <Badge variant="glass">
            <Clock className="size-3.5" aria-hidden /> {pkg.days}D / {pkg.nights}N
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {destination && (
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <MapPin className="size-3.5" aria-hidden /> {destination.name}
          </p>
        )}
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
          <Link href={`/travel-packages/${pkg.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {pkg.title}
          </Link>
        </h3>
        <ul className="mb-6 mt-4 space-y-2">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between border-t border-border pt-5">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-xl font-bold text-ink">
              {formatPrice(pkg.priceFrom)}
              <span className="ml-1 text-xs font-medium text-muted-foreground">/ person</span>
            </p>
          </div>
          <span className="grid size-11 place-items-center rounded-full bg-secondary text-ink transition group-hover:bg-accent group-hover:text-accent-foreground" aria-hidden>
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </article>
  );
}
