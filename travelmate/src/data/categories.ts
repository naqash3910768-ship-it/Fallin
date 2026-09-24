import type { TravelCategory } from "@/types";

export const categories: TravelCategory[] = [
  {
    slug: "international-tours",
    name: "International Tours",
    short: "Dubai, Turkey, Europe & beyond",
    description:
      "Hand-crafted international tour packages from Karachi and across Pakistan — hotels, sightseeing, transfers and visa support bundled into one easy booking.",
    image: "/images/categories/international-tours.jpg",
    icon: "plane",
  },
  {
    slug: "pakistan-tours",
    name: "Pakistan Tours",
    short: "Hunza, Skardu, Naran & Kashmir",
    description:
      "Discover the north of Pakistan with comfortable private transport, trusted hotels and experienced driver-guides. Our Pakistan tour planners design trips for families, couples and groups.",
    image: "/images/categories/pakistan-tours.jpg",
    icon: "mountain",
  },
  {
    slug: "honeymoon-packages",
    name: "Honeymoon Packages",
    short: "Maldives, Seychelles & Europe",
    description:
      "Romantic honeymoon and anniversary packages with private transfers, special room set-ups and hand-picked resorts — so you can focus on each other.",
    image: "/images/categories/honeymoon-packages.jpg",
    icon: "heart",
  },
  {
    slug: "family-tours",
    name: "Family Tours",
    short: "Kid-friendly, stress-free holidays",
    description:
      "Family holiday packages with connecting rooms, theme parks and relaxed itineraries. We handle the visas and logistics for the whole family.",
    image: "/images/categories/family-tours.jpg",
    icon: "users",
  },
  {
    slug: "group-tours",
    name: "Group Tours",
    short: "Friends, clubs, schools & communities",
    description:
      "Fixed-departure and private group tours with special group rates, a dedicated coordinator and customised itineraries.",
    image: "/images/categories/group-tours.jpg",
    icon: "compass",
  },
  {
    slug: "cruise-holidays",
    name: "Cruise Holidays",
    short: "Mediterranean, Arabian Gulf & Asia",
    description:
      "Cost-effective cruise deals with leading cruise lines. Choose a one or two-week cruise adventure or a rejuvenating weekend getaway.",
    image: "/images/categories/cruise-holidays.jpg",
    icon: "ship",
  },
  {
    slug: "corporate-travel",
    name: "Corporate Travel",
    short: "Business trips, MICE & incentives",
    description:
      "Air ticketing, business visas, hotel bookings, conferences and incentive trips managed by one dedicated account team.",
    image: "/images/categories/corporate-travel.jpg",
    icon: "briefcase",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
