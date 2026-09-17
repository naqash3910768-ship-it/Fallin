import type { ArtIcon, ArtTone } from "@/components/ui/Art";

export type CategorySlug = "chairs" | "tables-stools" | "junior";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  icon: ArtIcon;
  tone: ArtTone;
  image?: string;
}

export const categories: Category[] = [
  {
    slug: "chairs",
    name: "Chairs",
    short: "Chairs",
    description: "Designed for comfort, durability and everyday use — for the home, the office and everywhere in between.",
    icon: "chair",
    tone: "sand",
    image: "/images/category-chairs.png",
  },
  {
    slug: "tables-stools",
    name: "Tables & Stools",
    short: "Tables & Stools",
    description: "Practical, sturdy tables and stools built on the same moulded quality as the rest of the Fello range.",
    icon: "table",
    tone: "ink",
    image: "/images/category-tables-stools.jpg",
  },
  {
    slug: "junior",
    name: "Junior Collection",
    short: "Junior",
    description: "Right-sized moulded furniture for children — light, colourful and durable enough for everyday play.",
    icon: "kids-chair",
    image: "/images/category-junior.jpg",
    tone: "yellow",
  },
];

export interface ColorSwatch {
  name: string;
  hex: string;
}

// Colour names below are drawn from retailer listings of the specific Fello
// SKU noted in `colorSource`. Where no reliable colour list was available,
// `colors` is left undefined rather than guessed — per the "don't invent
// colours" rule.
export interface Product {
  slug: string;
  name: string;
  itemNumber?: string;
  category: CategorySlug;
  tagline: string;
  description: string[];
  icon: ArtIcon;
  tone: ArtTone;
  image?: string;
  colors?: ColorSwatch[];
  colorSource?: string;
  specifications?: { label: string; value: string }[];
  specSource?: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    slug: "premier",
    name: "Premier",
    itemNumber: "F-201",
    category: "chairs",
    tagline: "Fello's flagship moulded chair.",
    description: [
      "Premier is one of the core chairs in the Fello catalogue, listed in the official brochure under item number F-201.",
      "Like the rest of the Fello range, it is moulded in a single piece from 100% virgin furniture-grade polypropylene resin and finished under Polycraft Industries' quality control process.",
    ],
    icon: "chair",
    tone: "sand",
    image: "/images/product-premier.jpg",
    featured: true,
  },
  {
    slug: "classic",
    name: "Classic",
    itemNumber: "F-801",
    category: "chairs",
    tagline: "A long-standing favourite across Pakistani homes.",
    description: [
      "Classic (F-801) is one of Fello's best-known chairs, commonly sold as part of a six-chair and one-table dining set.",
      "It is moulded as a single, unbreakable polypropylene shell with a matte finish designed to be easy to clean and stack.",
    ],
    icon: "chair",
    tone: "sand",
    image: "/images/product-classic.jpg",
    colors: [
      { name: "Red", hex: "#c31f26" },
      { name: "Blue", hex: "#2c5aa0" },
      { name: "White", hex: "#f5f2ec" },
      { name: "Chocolate", hex: "#4a2f22" },
      { name: "Beige", hex: "#d8c7a8" },
      { name: "Brown", hex: "#6b3f2a" },
    ],
    colorSource: "Colours as listed by authorised retailers of the Fello F-801 set — confirm current availability with Fello.",
    specifications: [
      { label: "Typical set", value: "6 chairs + 1 folding table" },
    ],
    specSource: "Reported by retailer listings of the F-801 dining set — request Fello's current spec sheet to confirm.",
    featured: true,
  },
  {
    slug: "restita",
    name: "Restita",
    category: "chairs",
    tagline: "A colourful, stackable everyday chair.",
    description: [
      "Restita is sold as a fully moulded polypropylene chair, also offered as part of a six-chair and folding-table set.",
      "Finished in a broad colour range, it is built for daily use across dining, outdoor and casual seating.",
    ],
    icon: "chair",
    tone: "sand",
    image: "/images/product-restita.jpg",
    colors: [
      { name: "Red", hex: "#c31f26" },
      { name: "Orange", hex: "#d9691e" },
      { name: "Blue", hex: "#2c5aa0" },
      { name: "Brown", hex: "#6b3f2a" },
      { name: "Beige", hex: "#d8c7a8" },
      { name: "Grey", hex: "#8a857c" },
      { name: "Chocolate", hex: "#4a2f22" },
    ],
    colorSource: "Colours as listed by authorised retailers of the Fello Restita set — confirm current availability with Fello.",
    featured: true,
  },
  {
    slug: "chair-f103",
    name: "Chair 103",
    itemNumber: "F-103",
    category: "chairs",
    tagline: "A compact, single-piece moulded chair.",
    description: [
      "Chair 103 (F-103) is part of the Fello moulded chair line-up, built as a single-shell polypropylene chair suited to both home and institutional use.",
    ],
    icon: "chair",
    tone: "sand",
  },
  {
    slug: "premium-metal-legs-chair",
    name: "Premium Metal Legs Chair",
    category: "chairs",
    tagline: "A moulded seat shell on a sturdier metal frame.",
    description: [
      "This chair pairs a Fello moulded polypropylene seat shell with metal legs for extra load-bearing strength, aimed at dining and everyday indoor seating.",
    ],
    icon: "chair",
    tone: "sand",
  },
  {
    slug: "junior-chair",
    name: "Junior Chair",
    category: "junior",
    tagline: "Right-sized seating for young children.",
    description: [
      "Part of Fello's Junior Collection, this smaller-scale moulded chair on a steel-leg frame is designed to help toddlers and young children sit comfortably at their own height — for home, nursery and classroom use.",
    ],
    icon: "kids-chair",
    tone: "yellow",
    image: "/images/product-junior-chair.jpg",
    featured: true,
  },
  {
    slug: "baby-chair",
    name: "Baby Chair",
    category: "junior",
    tagline: "A compact moulded chair for the youngest sitters.",
    description: [
      "A smaller moulded chair from the Junior Collection, built from the same furniture-grade polypropylene as the rest of the Fello range and scaled down for babies and toddlers.",
    ],
    icon: "kids-chair",
    tone: "yellow",
  },
  {
    slug: "folding-table",
    name: "Folding Table",
    category: "tables-stools",
    tagline: "The companion table to Fello's chair sets.",
    description: [
      "Sold alongside chairs such as Classic (F-801) and Restita, this folding table is built for dining and multi-purpose use, with a leg mechanism that folds flat for storage.",
    ],
    icon: "table",
    tone: "ink",
    image: "/images/product-folding-table.jpg",
    specifications: [
      { label: "Adjustability", value: "Multiple leg-height settings, as sold with folding chair sets" },
    ],
    specSource: "Reported by retailer listings of Fello folding-table sets — request Fello's current spec sheet to confirm.",
    featured: true,
  },
];

export function getProductsByCategory(category: CategorySlug) {
  return products.filter((p) => p.category === category);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 3) {
  return products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, count);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
