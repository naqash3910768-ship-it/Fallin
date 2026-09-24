import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { hajjTiers } from "@/data/hajj";
import { formatPrice } from "@/lib/utils";
import type { HajjPackage } from "@/types";

export function HajjCard({ pkg }: { pkg: HajjPackage }) {
  const from = pkg.pricing.length ? Math.min(...pkg.pricing.map((p) => p.price)) : null;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={pkg.image} alt={`${pkg.name} Hajj package`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <Badge variant={pkg.tier === "signature" ? "accent" : "glass"} className="absolute left-4 top-4">
          {hajjTiers[pkg.tier].name}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-semibold text-ink">
          <Link href={`/hajj/${pkg.slug}`} className="after:absolute after:inset-0">
            {pkg.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {pkg.duration} · {pkg.azizia}
        </p>
        <ul className="mb-6 mt-4 space-y-2">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between border-t border-border pt-5">
          <div>
            <p className="text-xs text-muted-foreground">{from ? "From (reference)" : "Pricing"}</p>
            <p className="text-xl font-bold">{from ? formatPrice(from, "USD") : "On request"}</p>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-primary">
            Details <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );
}
