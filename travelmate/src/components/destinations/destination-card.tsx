import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
  packageCount?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function DestinationCard({ destination, packageCount, className, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw", priority }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={cn("group relative block min-h-[320px] overflow-hidden rounded-3xl bg-ink shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30", className)}
    >
      <Image
        src={destination.image}
        alt={`${destination.name}, ${destination.country}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-700 ease-out group-hover:scale-110"
      />
      <div className="bg-card-fade absolute inset-0" aria-hidden />
      <div className="absolute right-4 top-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="size-5" aria-hidden />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{destination.domestic ? "Pakistan" : destination.country}</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-white sm:text-[1.75rem]">{destination.name}</h3>
        <p className="mt-1 text-sm text-white/80">{destination.tagline}</p>
        {packageCount !== undefined && packageCount > 0 && (
          <span className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {packageCount} {packageCount === 1 ? "package" : "packages"}
          </span>
        )}
      </div>
    </Link>
  );
}
