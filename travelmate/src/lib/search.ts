import { blogPosts } from "@/data/blog";
import { categories } from "@/data/categories";
import { destinations } from "@/data/destinations";
import { hajjPackages } from "@/data/hajj";
import { packages } from "@/data/packages";
import { services } from "@/data/services";
import { umrahPackages } from "@/data/umrah";
import { normalize } from "@/lib/utils";

export type SearchResultType = "Package" | "Destination" | "Umrah" | "Hajj" | "Service" | "Category" | "Travel Tip";

export interface SearchResult {
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  image: string;
  keywords: string;
}

const index: SearchResult[] = [
  ...packages.map((p) => ({
    type: "Package" as const,
    title: p.title,
    description: p.summary,
    href: `/travel-packages/${p.slug}`,
    image: p.image,
    keywords: [p.destination, ...p.categories, ...p.highlights].join(" "),
  })),
  ...destinations.map((d) => ({
    type: "Destination" as const,
    title: d.name,
    description: d.tagline,
    href: `/destinations/${d.slug}`,
    image: d.image,
    keywords: [d.country, d.region, ...d.highlights].join(" "),
  })),
  ...umrahPackages.map((u) => ({
    type: "Umrah" as const,
    title: u.title,
    description: `${u.days} days · Makkah ${u.makkahNights} nights · Madinah ${u.madinahNights} nights`,
    href: `/umrah/${u.slug}`,
    image: u.image,
    keywords: `umrah ${u.category} makkah madinah`,
  })),
  ...hajjPackages.map((h) => ({
    type: "Hajj" as const,
    title: `${h.name} Hajj Package`,
    description: h.summary,
    href: `/hajj/${h.slug}`,
    image: h.image,
    keywords: `hajj ${h.tier} tmg ${h.azizia}`,
  })),
  ...services.map((s) => ({ type: "Service" as const, title: s.name, description: s.short, href: s.href, image: s.image, keywords: s.features.join(" ") })),
  ...categories.map((c) => ({ type: "Category" as const, title: c.name, description: c.short, href: `/tours/${c.slug}`, image: c.image, keywords: c.description })),
  ...blogPosts.map((b) => ({ type: "Travel Tip" as const, title: b.title, description: b.excerpt, href: `/travel-tips/${b.slug}`, image: b.image, keywords: b.category })),
];

/** Simple weighted full-text search over all site content. Swap for Algolia/Meilisearch later. */
export function searchSite(query: string, limit = 30): SearchResult[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return index
    .map((item) => {
      const title = normalize(item.title);
      const body = normalize(`${item.description} ${item.keywords}`);
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += title.startsWith(t) ? 6 : 4;
        else if (body.includes(t)) score += 1;
        else return { item, score: 0 };
      }
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
