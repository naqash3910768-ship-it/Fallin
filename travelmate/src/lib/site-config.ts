/**
 * Single source of truth for business information.
 * Contact details are taken from the live travelmate.com.pk contact page.
 */
export const siteConfig = {
  name: "Travel Mate",
  legalName: "Travel Mate (Pvt.) Ltd.",
  shortName: "Travel Mate",
  tagline: "Your trusted travel companion since 2007",
  description:
    "Travel Mate is a Karachi-based travel house offering international & Pakistan tour packages, Hajj and Umrah packages, visa services, cruise holidays, hotel bookings and air ticketing — trusted by travellers since 2007.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.travelmate.com.pk",
  foundedYear: 2007,
  locale: "en_PK",
  ogImage: "/images/og/travelmate-og.jpg",
  keywords: [
    "travel agency in Karachi",
    "tour packages from Karachi",
    "tour packages from Pakistan",
    "Dubai tour packages",
    "Pakistan tour packages",
    "Umrah packages from Pakistan",
    "Hajj packages from Pakistan",
    "visa services Karachi",
    "cruise packages",
    "honeymoon packages",
  ],
  contact: {
    phone: "(021) 111 800 500",
    phoneHref: "tel:+92111800500",
    email: "info@travelmate.com.pk",
    // Main WhatsApp line (Tours & Visa desk). Replace with the official WhatsApp Business number if different.
    whatsapp: "923000800527",
    address: {
      street: "Suite # M-10, Mezzanine Floor, Park Towers, Shahr-e-Firdousi, Block 5, Clifton",
      city: "Karachi",
      region: "Sindh",
      postalCode: "75600",
      country: "PK",
      full: "Suite # M-10, Mezzanine Floor, Park Towers, Shahr-e-Firdousi, Block 5, Clifton, Karachi 75600",
    },
    geo: { lat: 24.8138, lng: 67.0336 },
    mapEmbed:
      "https://www.google.com/maps?q=Park+Towers+Clifton+Karachi&output=embed",
    hours: [
      { days: "Monday – Saturday", time: "10:00 AM – 7:00 PM" },
      { days: "Sunday", time: "Closed (WhatsApp enquiries answered)" },
    ],
  },
  departments: [
    {
      name: "Tours & Visa",
      email: "visa@travelmate.com.pk",
      people: [
        { name: "Syed Ayaz Hussain", phone: "0300 0800 531" },
        { name: "Furqan Ahmed Qureshi", phone: "0300 0800 527" },
        { name: "Adeel Ali Khan", phone: "0300 0800 530" },
      ],
    },
    {
      name: "Hajj & Umrah",
      email: "umrah3@travelmate.com.pk",
      people: [
        { name: "Mohsin Ali Zuberi", phone: "0300 0800 512" },
        { name: "Saad Abdul Malik", phone: "0300 0802 434" },
        { name: "Abdul Wahab", phone: "0300 0800 526" },
      ],
    },
  ],
  social: {
    facebook: "https://www.facebook.com/TravelMate/",
    linkedin: "https://pk.linkedin.com/company/travel-mate-pk",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function whatsappLink(message = "Hi Travel Mate, I'd like to enquire about a trip.", number: string = siteConfig.contact.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+92${digits.replace(/^0/, "")}`;
}
