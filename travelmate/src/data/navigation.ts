import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "Dubai", href: "/destinations/dubai", description: "Desert safari & city tours" },
      { label: "Turkey", href: "/destinations/turkey", description: "Istanbul & Cappadocia" },
      { label: "Malaysia", href: "/destinations/malaysia", description: "KL, Genting & Langkawi" },
      { label: "Maldives", href: "/destinations/maldives", description: "Overwater villas" },
      { label: "Azerbaijan", href: "/destinations/azerbaijan", description: "Baku & Gabala" },
      { label: "Europe", href: "/destinations/europe", description: "Italy, Switzerland & France" },
      { label: "Hunza Valley", href: "/destinations/hunza-valley", description: "Gilgit-Baltistan" },
      { label: "Skardu", href: "/destinations/skardu", description: "Lakes & Deosai" },
      { label: "All destinations", href: "/destinations" },
    ],
  },
  {
    label: "Packages",
    href: "/travel-packages",
    children: [
      { label: "International Tours", href: "/tours/international-tours", description: "Worldwide holidays" },
      { label: "Pakistan Tours", href: "/tours/pakistan-tours", description: "Northern areas & more" },
      { label: "Honeymoon Packages", href: "/tours/honeymoon-packages", description: "Romantic escapes" },
      { label: "Family Tours", href: "/tours/family-tours", description: "Kid-friendly trips" },
      { label: "Group Tours", href: "/tours/group-tours", description: "Special group rates" },
      { label: "Cruise Holidays", href: "/cruise-tours", description: "Ocean & sea cruises" },
      { label: "All packages", href: "/travel-packages" },
    ],
  },
  {
    label: "Hajj & Umrah",
    href: "/umrah",
    children: [
      { label: "Umrah Packages", href: "/umrah", description: "Ramadan, group & premium" },
      { label: "Hajj Packages", href: "/hajj", description: "TMG private Hajj" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Visa Services", href: "/visa-services", description: "Tourist, business & student" },
      { label: "Cruise Tours", href: "/cruise-tours", description: "Cruise deals" },
      { label: "Corporate Travel", href: "/tours/corporate-travel", description: "Business & MICE" },
      { label: "Air Ticketing & Hotels", href: "/services", description: "Flights & stays" },
    ],
  },
  { label: "Travel Tips", href: "/travel-tips" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

export const footerNav = {
  packages: [
    { label: "International Tours", href: "/tours/international-tours" },
    { label: "Pakistan Tours", href: "/tours/pakistan-tours" },
    { label: "Honeymoon Packages", href: "/tours/honeymoon-packages" },
    { label: "Family Tours", href: "/tours/family-tours" },
    { label: "Group Tours", href: "/tours/group-tours" },
    { label: "Cruise Holidays", href: "/cruise-tours" },
  ],
  services: [
    { label: "Umrah Packages", href: "/umrah" },
    { label: "Hajj Packages", href: "/hajj" },
    { label: "Visa Services", href: "/visa-services" },
    { label: "Corporate Travel", href: "/tours/corporate-travel" },
    { label: "All Services", href: "/services" },
  ],
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Travel Tips", href: "/travel-tips" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Plan My Trip", href: "/enquiry" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};
