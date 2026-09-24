import type { FAQ, UmrahCategory, UmrahPackage } from "@/types";

export const umrahCategories: Record<UmrahCategory, string> = {
  ramadan: "Ramadan Umrah",
  group: "Group Umrah",
  "rajab-shaban": "Rajab & Shaban",
  premium: "Premium / 5-Star",
  economy: "Economy",
};

const baseInclusions = ["Umrah visa & insurance", "Return airport transfers", "Makkah – Madinah transport", "Ziyarat in Makkah & Madinah", "Travel Mate guidance throughout"];

// Prices are indicative per person on quad sharing (PKR), excluding airfare unless stated.
export const umrahPackages: UmrahPackage[] = [
  {
    slug: "15-days-ramadan-umrah",
    title: "15 Days Ramadan Umrah Package",
    category: "ramadan",
    days: 15,
    makkahHotel: "4★ hotel, walking distance to Haram",
    madinahHotel: "4★ hotel near Masjid an-Nabawi",
    makkahNights: 9,
    madinahNights: 5,
    priceFrom: 395000,
    image: "/images/umrah/ramadan-umrah.jpg",
    inclusions: [...baseInclusions, "Sehri & iftar arrangements"],
    featured: true,
  },
  {
    slug: "ramadan-group-umrah",
    title: "Ramadan Group Umrah Package",
    category: "group",
    days: 21,
    makkahHotel: "3★ hotel with shuttle to Haram",
    madinahHotel: "3★ hotel near Masjid an-Nabawi",
    makkahNights: 13,
    madinahNights: 7,
    priceFrom: 345000,
    image: "/images/umrah/group-umrah.jpg",
    inclusions: [...baseInclusions, "Group leader / scholar", "Last Ashra in Makkah"],
    featured: true,
  },
  {
    slug: "rajab-shaban-umrah",
    title: "Rajab & Shaban Umrah (14 Days)",
    category: "rajab-shaban",
    days: 14,
    makkahHotel: "4★ hotel, 400–600m from Haram",
    madinahHotel: "4★ hotel near Masjid an-Nabawi",
    makkahNights: 8,
    madinahNights: 5,
    priceFrom: 285000,
    image: "/images/umrah/rajab-shaban-umrah.jpg",
    inclusions: baseInclusions,
  },
  {
    slug: "premium-5-star-umrah",
    title: "Premium 5-Star Umrah (10 Days)",
    category: "premium",
    days: 10,
    makkahHotel: "5★ Haram-front hotel (Clock Tower area)",
    madinahHotel: "5★ hotel, Markazia area",
    makkahNights: 5,
    madinahNights: 4,
    priceFrom: 525000,
    image: "/images/umrah/premium-umrah.jpg",
    inclusions: [...baseInclusions, "Private GMC transport", "Daily breakfast"],
    featured: true,
  },
  {
    slug: "family-umrah-21-days",
    title: "Family Umrah Package (21 Days)",
    category: "group",
    days: 21,
    makkahHotel: "4★ hotel with family rooms",
    madinahHotel: "4★ hotel near Masjid an-Nabawi",
    makkahNights: 14,
    madinahNights: 6,
    priceFrom: 325000,
    image: "/images/umrah/family-umrah.jpg",
    inclusions: [...baseInclusions, "Family-room options", "Wheelchair assistance on request"],
  },
  {
    slug: "economy-umrah-7-days",
    title: "Economy Express Umrah (7 Days)",
    category: "economy",
    days: 7,
    makkahHotel: "3★ hotel with shuttle to Haram",
    madinahHotel: "3★ hotel near Masjid an-Nabawi",
    makkahNights: 4,
    madinahNights: 2,
    priceFrom: 195000,
    image: "/images/umrah/economy-umrah.jpg",
    inclusions: baseInclusions,
  },
];

export const umrahFaqs: FAQ[] = [
  {
    question: "What documents do I need for an Umrah visa from Pakistan?",
    answer:
      "A passport valid for at least six months, recent photographs with a white background, CNIC copy and — for women under 45 travelling without a mahram — the required relationship documents. Our Umrah desk shares an exact checklist when you book.",
  },
  {
    question: "Can I customise my hotels and number of nights?",
    answer: "Yes. Every package can be customised: choose hotels by distance to the Haram, change the Makkah/Madinah split, or add Taif and other ziyarat.",
  },
  {
    question: "Are flights included in the package price?",
    answer: "Package prices shown are land packages. We quote airfare separately so you always get the best available fare from Karachi, Lahore or Islamabad.",
  },
  {
    question: "Do you offer group Umrah with a scholar?",
    answer: "Yes — our group Umrah departures, especially in Ramadan, travel with an experienced group leader who assists with rituals and ziyarat.",
  },
];
