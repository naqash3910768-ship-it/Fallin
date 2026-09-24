import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "holiday-packages",
    name: "Holiday & Tour Packages",
    short: "International and Pakistan tours for every budget.",
    description:
      "Family and leisure holiday packages, honeymoon and anniversary packages and group tours to Dubai, Turkey, Malaysia, Thailand, Maldives, Europe and the north of Pakistan.",
    icon: "globe",
    href: "/travel-packages",
    image: "/images/services/holiday-packages.jpg",
    features: ["Tailor-made itineraries", "Hotels, transfers & sightseeing", "Family, honeymoon & group options"],
  },
  {
    slug: "umrah",
    name: "Umrah Packages",
    short: "Hassle-free Umrah with guided assistance.",
    description:
      "Customised Umrah packages throughout the year, including Ramadan and group Umrah, with visa, hotels near the Haram, transport and guided assistance throughout the journey.",
    icon: "moon",
    href: "/umrah",
    image: "/images/services/umrah.jpg",
    features: ["Umrah visa processing", "Hotels close to Haram", "Ziyarat & guided assistance"],
  },
  {
    slug: "hajj",
    name: "Hajj Packages",
    short: "Private Hajj with premium Azizia & Mina services.",
    description:
      "TMG private Hajj packages in Signature, Executive and Deluxe categories with top-tier accommodation, seamless transport and experienced scholars.",
    icon: "landmark",
    href: "/hajj",
    image: "/images/services/hajj.jpg",
    features: ["Signature, Executive & Deluxe tiers", "Private Mina camps", "Scholar guidance"],
  },
  {
    slug: "visa-services",
    name: "Visa Services",
    short: "Tourist, business & student visas from Karachi.",
    description:
      "All types of visa services from Karachi — tourist visa, student visa and business visa — with document checklists, form filling, appointments and follow-up.",
    icon: "stamp",
    href: "/visa-services",
    image: "/images/services/visa-services.jpg",
    features: ["Dubai & GCC visas", "Schengen, UK, USA & Canada", "Student & business visas"],
  },
  {
    slug: "cruise-tours",
    name: "Cruise Tours",
    short: "Cost-effective cruise deals worldwide.",
    description:
      "Search one or two-week cruise adventures or a weekend getaway cruise. Discover destinations, ports, cruise tours and cruise ships with our cruise specialists.",
    icon: "ship",
    href: "/cruise-tours",
    image: "/images/services/cruise-tours.jpg",
    features: ["Royal Caribbean & more", "Mediterranean & Gulf cruises", "Flights + cruise bundles"],
  },
  {
    slug: "air-ticketing",
    name: "Air Ticketing",
    short: "Domestic & international flights at the best fares.",
    description:
      "Airfare for domestic and international flights, group bookings and multi-city itineraries with all major airlines.",
    icon: "plane",
    href: "/enquiry?service=air-ticketing",
    image: "/images/services/air-ticketing.jpg",
    features: ["All major airlines", "Group & corporate fares", "Date-change support"],
  },
  {
    slug: "hotel-bookings",
    name: "Hotel Bookings",
    short: "Boarding & lodging worldwide.",
    description: "Hotel bookings in every price range, from city business hotels to beach resorts, with confirmed vouchers.",
    icon: "hotel",
    href: "/enquiry?service=hotel-booking",
    image: "/images/services/hotel-bookings.jpg",
    features: ["Negotiated rates", "Instant vouchers", "Haram-view & resort options"],
  },
  {
    slug: "corporate-travel",
    name: "Corporate Travel",
    short: "Business trips, conferences & incentives.",
    description: "Corporate travel management for business trips, conferences, exhibitions and incentive tours with one point of contact.",
    icon: "briefcase",
    href: "/tours/corporate-travel",
    image: "/images/services/corporate-travel.jpg",
    features: ["Dedicated account manager", "Business visas", "MICE & incentive trips"],
  },
];
