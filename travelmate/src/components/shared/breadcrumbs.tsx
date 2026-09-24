import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./json-ld";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-white">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.name}
                    </Link>
                    <ChevronRight className="size-3.5 opacity-60" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
