import type { TourPackage } from "@/types";
import { PackageCard } from "./package-card";

export function PackageGrid({ packages }: { packages: TourPackage[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((p, i) => (
        <PackageCard key={p.slug} pkg={p} priority={i < 3} />
      ))}
    </div>
  );
}
