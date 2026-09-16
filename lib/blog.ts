import type { ArtIcon, ArtTone } from "@/components/ui/Art";

/**
 * PLACEHOLDER BLOG CONTENT.
 * No public Fello blog content was available to source from while building
 * this project. These posts exist to demonstrate the blog structure/design
 * and are written from general, non-brand-specific furniture-care knowledge —
 * they should be reviewed and replaced with real Fello editorial content
 * before publishing.
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Furniture" | "Design" | "Quality" | "Manufacturing" | "Home & Office" | "Tips";
  date: string;
  readingTime: string;
  icon: ArtIcon;
  tone: ArtTone;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "caring-for-moulded-polypropylene-furniture",
    title: "How to Care for Moulded Polypropylene Furniture",
    excerpt: "A few simple habits keep moulded plastic chairs and tables looking new for years — here's what actually matters.",
    category: "Tips",
    date: "2026-01-12",
    readingTime: "4 min read",
    icon: "finish",
    tone: "sand",
    body: [
      "[Placeholder editorial content — replace with Fello's own guidance.]",
      "Moulded polypropylene furniture is prized for being low-maintenance, but a little care goes a long way toward keeping it looking new. Wipe down surfaces with a damp cloth and mild soap rather than harsh solvents, which can dull the surface finish over time.",
      "Avoid dragging chairs across abrasive flooring — lifting them slightly when moving reduces wear on the base and legs. For outdoor use, occasional shade helps colour stay vibrant for longer, even though the resin itself is built to handle everyday exposure.",
      "Stackable chairs should be stacked on a flat, dry surface to avoid uneven pressure on the shell during storage.",
    ],
  },
  {
    slug: "why-material-choice-matters-in-moulded-furniture",
    title: "Why Material Choice Matters in Moulded Furniture",
    excerpt: "Not all plastic furniture is made from the same material. Here's why the resin behind the mould matters.",
    category: "Manufacturing",
    date: "2025-11-03",
    readingTime: "5 min read",
    icon: "resin",
    tone: "ink",
    body: [
      "[Placeholder editorial content — replace with Fello's own guidance.]",
      "Moulded furniture starts life as raw polymer resin. The grade and purity of that resin has a direct impact on how the finished piece performs — its strength, its finish, and how it ages under daily use and sunlight.",
      "Fello uses 100% virgin furniture-grade polypropylene resin rather than recycled or reprocessed material, a distinction that matters for long-term durability and consistency between batches.",
      "This is also why quality control at the manufacturing stage — checking wall thickness, finish and structural integrity — is as important as the material itself.",
    ],
  },
  {
    slug: "choosing-furniture-for-busy-households",
    title: "Choosing Furniture for Busy Households and Offices",
    excerpt: "Durability, stackability and easy cleaning matter more than most buyers realise. A short guide to picking practical furniture.",
    category: "Home & Office",
    date: "2025-09-21",
    readingTime: "3 min read",
    icon: "stack",
    tone: "yellow",
    body: [
      "[Placeholder editorial content — replace with Fello's own guidance.]",
      "Whether you're furnishing a home, an office or an institution, the same practical questions apply: will it hold up to daily use, is it easy to clean, and does it store efficiently when not in use?",
      "Stackable moulded chairs solve the storage problem well, and a single-piece polypropylene shell has no joints or upholstery to wear out. For high-traffic spaces, this often outperforms furniture that looks more premium on day one but degrades faster under regular use.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
