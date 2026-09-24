import type { FAQ, HajjPackage, HajjTier } from "@/types";

export const hajjSeason = "Hajj 2027 (1448 AH)";

export const hajjTiers: Record<HajjTier, { name: string; description: string }> = {
  signature: { name: "Signature", description: "Our most exclusive category — Haram-front hotels with no Azizia stay." },
  executive: { name: "Executive", description: "Five-star Park Inn by Radisson in Azizia with premium Mina services." },
  deluxe: { name: "Deluxe", description: "Comfortable 3-star Snaf Inn in Azizia with TMG's full service." },
};

/*
 * Reference pricing (USD, per person, excluding airfare) from the most recently published TMG season.
 * Airfare supplements range between $1,000 and $1,500 depending on departure city.
 */
export const hajjPackages: HajjPackage[] = [
  {
    slug: "sapphire",
    name: "Sapphire",
    tier: "signature",
    azizia: "Without Azizia — Haram-front hotels throughout",
    duration: "8 – 14 days",
    summary: "Short-duration VIP Hajj with Haram-front accommodation, VIP Mina camps and private transport.",
    image: "/images/hajj/sapphire-hajj.jpg",
    pricing: [],
    highlights: ["No Azizia stay", "VIP Mina & Arafat camps", "Private vehicle transfers", "Kaaba-view room upgrades", "Business-class upgrade options"],
  },
  {
    slug: "diamond",
    name: "Diamond",
    tier: "deluxe",
    azizia: "3★ Snaf Inn, Azizia",
    duration: "Approx. 15 days",
    summary: "The TMG Diamond package with a comfortable Azizia stay and complete Hajj logistics.",
    image: "/images/hajj/diamond-hajj.jpg",
    pricing: [
      { occupancy: "Double family room", price: 11800 },
      { occupancy: "Triple family room", price: 11000 },
      { occupancy: "Quad family room", price: 10500 },
      { occupancy: "Quint sharing", price: 9700 },
    ],
    highlights: ["Makkah & Madinah hotels", "Azizia apartments (Snaf Inn)", "Air-conditioned Mina tents", "Scholar-led guidance", "Wheelchair assistance on request"],
  },
  {
    slug: "pearl-plus",
    name: "Pearl Plus",
    tier: "executive",
    azizia: "5★ Park Inn by Radisson, Azizia",
    duration: "18 – 25 days",
    summary: "Executive Pearl Plus with a five-star Azizia hotel and upgraded Mina services.",
    image: "/images/hajj/pearl-plus-hajj.jpg",
    pricing: [
      { occupancy: "Double family room", price: 11800 },
      { occupancy: "Triple family room", price: 11000 },
      { occupancy: "Quad family room", price: 10200 },
      { occupancy: "Quint sharing", price: 9700 },
    ],
    highlights: ["5★ Park Inn by Radisson Azizia", "Premium Mina camps", "Full-board meals in Azizia", "Private Madinah ziyarat", "Dedicated TMG staff"],
  },
  {
    slug: "pearl-plus-deluxe",
    name: "Pearl Plus (Deluxe)",
    tier: "deluxe",
    azizia: "3★ Snaf Inn, Azizia",
    duration: "18 – 25 days",
    summary: "The popular Pearl Plus itinerary at Deluxe value with a 3-star Azizia stay.",
    image: "/images/hajj/pearl-plus-deluxe-hajj.jpg",
    pricing: [
      { occupancy: "Double family room", price: 10500 },
      { occupancy: "Triple family room", price: 10100 },
      { occupancy: "Quad family room", price: 9700 },
      { occupancy: "Quint sharing", price: 9000 },
    ],
    highlights: ["Snaf Inn Azizia", "Makkah & Madinah hotels", "Mina & Arafat camps", "Group scholar", "All ground transport"],
  },
  {
    slug: "gold",
    name: "Gold",
    tier: "executive",
    azizia: "5★ Park Inn by Radisson, Azizia",
    duration: "Approx. 20 days",
    summary: "Executive Gold combines five-star comfort with a longer stay in the holy cities.",
    image: "/images/hajj/gold-hajj.jpg",
    pricing: [],
    highlights: ["5★ Azizia hotel", "Premium Mina camps", "Madinah before or after Hajj", "Ziyarat tours", "Dedicated TMG staff"],
  },
];

export const hajjAddOns = [
  "Private vehicle transfers",
  "Wheelchair assistance",
  "Business-class flight upgrades",
  "Haram-view & Kaaba-view room upgrades",
  "Private Mina camps",
];

export const hajjFaqs: FAQ[] = [
  {
    question: "What is the difference between Signature, Executive and Deluxe?",
    answer:
      "The categories differ mainly in the Azizia stay and Mina services. Signature has no Azizia stay (Haram-front hotels throughout); Executive uses the five-star Park Inn by Radisson in Azizia; Deluxe uses the three-star Snaf Inn in Azizia. All categories include TMG's complete Hajj logistics and guidance.",
  },
  {
    question: "Are flights included in the Hajj package price?",
    answer: "Package prices exclude airfare. Airfare supplements typically range between $1,000 and $1,500 depending on your departure city.",
  },
  {
    question: "How long are TMG Hajj packages?",
    answer: "Durations range from about 8 days (short VIP packages) up to 25 days depending on the package you choose.",
  },
  {
    question: "Which extra services can I add?",
    answer: "Private vehicle transfers, wheelchair assistance, business-class upgrades, room upgrades including Haram-view and Kaaba-view, and private Mina camps.",
  },
  {
    question: "How do I register for Hajj with Travel Mate?",
    answer:
      "Send an enquiry or call our Hajj & Umrah desk. We'll confirm availability in your preferred package, share the document checklist and guide you through registration and payment milestones.",
  },
];
