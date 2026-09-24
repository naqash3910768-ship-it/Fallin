export type Region = "pakistan" | "middle-east" | "asia" | "europe" | "americas" | "africa";

export type CategorySlug =
  | "international-tours"
  | "pakistan-tours"
  | "honeymoon-packages"
  | "family-tours"
  | "group-tours"
  | "cruise-holidays"
  | "corporate-travel";

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: Region;
  domestic: boolean;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  bestTime: string;
  visaNote: string;
  featured?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPackage {
  slug: string;
  title: string;
  destination: string; // Destination slug
  categories: CategorySlug[];
  days: number;
  nights: number;
  /** Indicative starting price per person in PKR (twin sharing). */
  priceFrom: number;
  image: string;
  summary: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  featured?: boolean;
  badge?: string;
  /** Legacy URL on the old website (used for 301 redirects). */
  legacyPath?: string;
}

export interface TravelCategory {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  image: string;
  icon: IconName;
}

export type IconName =
  | "plane"
  | "mountain"
  | "heart"
  | "users"
  | "ship"
  | "briefcase"
  | "globe"
  | "stamp"
  | "hotel"
  | "moon"
  | "landmark"
  | "compass"
  | "shield"
  | "headset"
  | "wallet"
  | "award";

export interface Service {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: IconName;
  href: string;
  image: string;
  features: string[];
}

export type UmrahCategory = "ramadan" | "group" | "rajab-shaban" | "premium" | "economy";

export interface UmrahPackage {
  slug: string;
  title: string;
  category: UmrahCategory;
  days: number;
  makkahHotel: string;
  madinahHotel: string;
  makkahNights: number;
  madinahNights: number;
  priceFrom: number;
  image: string;
  inclusions: string[];
  featured?: boolean;
}

export type HajjTier = "signature" | "executive" | "deluxe";

export interface HajjPackage {
  slug: string;
  name: string;
  tier: HajjTier;
  azizia: string;
  duration: string;
  summary: string;
  image: string;
  pricing: { occupancy: string; price: number }[];
  highlights: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  trip: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readingMinutes: number;
  content: BlogBlock[];
  legacyPath?: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}
