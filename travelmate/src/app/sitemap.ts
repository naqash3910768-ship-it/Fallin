import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { categories } from "@/data/categories";
import { destinations } from "@/data/destinations";
import { hajjPackages } from "@/data/hajj";
import { packages } from "@/data/packages";
import { umrahPackages } from "@/data/umrah";
import { siteConfig } from "@/lib/site-config";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "weekly", lastModified: Date = now): Entry => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    url("", 1, "daily"),
    url("/travel-packages", 0.9, "daily"),
    url("/destinations", 0.9),
    url("/umrah", 0.9),
    url("/hajj", 0.9),
    url("/visa-services", 0.8),
    url("/cruise-tours", 0.8),
    url("/services", 0.7, "monthly"),
    url("/about-us", 0.6, "monthly"),
    url("/contact-us", 0.7, "monthly"),
    url("/enquiry", 0.7, "monthly"),
    url("/travel-tips", 0.6),
    url("/privacy-policy", 0.2, "yearly"),
    url("/terms-and-conditions", 0.2, "yearly"),
    ...categories.filter((c) => c.slug !== "cruise-holidays").map((c) => url(`/tours/${c.slug}`, 0.8)),
    ...destinations.map((d) => url(`/destinations/${d.slug}`, 0.8)),
    ...packages.map((p) => url(`/travel-packages/${p.slug}`, 0.8)),
    ...umrahPackages.map((u) => url(`/umrah/${u.slug}`, 0.7)),
    ...hajjPackages.map((h) => url(`/hajj/${h.slug}`, 0.7)),
    ...blogPosts.map((b) => url(`/travel-tips/${b.slug}`, 0.5, "monthly", new Date(b.date))),
  ];
}
