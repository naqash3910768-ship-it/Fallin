import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { umrahCategories } from "@/data/umrah";
import { formatPrice } from "@/lib/utils";
import type { UmrahPackage } from "@/types";

export function UmrahCard({ pkg }: { pkg: UmrahPackage }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={pkg.image} alt={pkg.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <Badge variant="glass" className="absolute left-4 top-4">
          {umrahCategories[pkg.category]}
        </Badge>
        <Badge variant="dark" className="absolute right-4 top-4">
          <Clock className="size-3.5" aria-hidden /> {pkg.days} days
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-ink">
          <Link href={`/umrah/${pkg.slug}`} className="after:absolute after:inset-0">
            {pkg.title}
          </Link>
        </h3>
        <dl className="mb-6 mt-4 space-y-2.5 text-sm">
          <div className="flex gap-2">
            <Building2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <dt className="sr-only">Makkah</dt>
            <dd>
              <span className="font-semibold text-ink">Makkah · {pkg.makkahNights} nights</span>
              <span className="block text-muted-foreground">{pkg.makkahHotel}</span>
            </dd>
          </div>
          <div className="flex gap-2">
            <Building2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <dt className="sr-only">Madinah</dt>
            <dd>
              <span className="font-semibold text-ink">Madinah · {pkg.madinahNights} nights</span>
              <span className="block text-muted-foreground">{pkg.madinahHotel}</span>
            </dd>
          </div>
        </dl>
        <div className="mt-auto flex items-end justify-between border-t border-border pt-5">
          <div>
            <p className="text-xs text-muted-foreground">From (quad sharing)</p>
            <p className="text-xl font-bold text-ink">{formatPrice(pkg.priceFrom)}</p>
          </div>
          <span className="grid size-11 place-items-center rounded-full bg-secondary transition group-hover:bg-accent" aria-hidden>
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </article>
  );
}
