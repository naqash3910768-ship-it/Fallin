import type { FAQ } from "@/types";

export const visaTypes = [
  { name: "Tourist / Visit Visa", description: "Holiday and family-visit visas with complete file preparation and hotel/flight reservations." },
  { name: "Business Visa", description: "Invitation-letter guidance, company documents and appointment booking for business travellers." },
  { name: "Student Visa", description: "Document review and application support for study abroad visas." },
  { name: "Umrah Visa", description: "Fast Umrah visa processing through authorised channels, bundled with your Umrah package." },
];

export const visaCountries = [
  { name: "United Arab Emirates (Dubai)", group: "Middle East", popular: true },
  { name: "Saudi Arabia (Umrah & Visit)", group: "Middle East", popular: true },
  { name: "Qatar", group: "Middle East" },
  { name: "Oman", group: "Middle East" },
  { name: "Turkey", group: "Europe", popular: true },
  { name: "Schengen (Europe)", group: "Europe", popular: true },
  { name: "United Kingdom", group: "Europe", popular: true },
  { name: "Azerbaijan", group: "Asia", popular: true },
  { name: "Malaysia", group: "Asia", popular: true },
  { name: "Thailand", group: "Asia", popular: true },
  { name: "Singapore", group: "Asia" },
  { name: "Sri Lanka", group: "Asia" },
  { name: "Hong Kong", group: "Asia" },
  { name: "Philippines", group: "Asia" },
  { name: "China", group: "Asia" },
  { name: "USA", group: "Americas" },
  { name: "Canada", group: "Americas" },
  { name: "Australia", group: "Oceania" },
];

export const visaSteps = [
  { title: "Free consultation", description: "Tell us your destination and travel dates. We confirm eligibility and share an exact document checklist." },
  { title: "Document preparation", description: "Our visa desk reviews your documents, fills the forms and prepares bookings and cover letters." },
  { title: "Submission & appointment", description: "We submit online or book your embassy / VFS appointment and brief you before biometrics." },
  { title: "Tracking & delivery", description: "We track your application and keep you updated on WhatsApp until your passport or e-visa is ready." },
];

export const visaDocuments = [
  "Passport valid for at least 6 months with blank pages",
  "Recent photographs as per embassy specification",
  "CNIC / family registration certificate copy",
  "Bank statement and account maintenance letter",
  "Employment letter / business registration documents",
  "Flight and hotel reservations (arranged by Travel Mate)",
];

export const visaFaqs: FAQ[] = [
  {
    question: "Which visas does Travel Mate process?",
    answer: "We deal in all types of visa services from Karachi — tourist visa, business visa, student visa and Umrah visa — for the UAE, Schengen countries, the UK, Turkey, Azerbaijan, Malaysia, Thailand, Singapore and many more.",
  },
  {
    question: "How long does visa processing take?",
    answer: "Timelines depend on the embassy and season. E-visas can be quick, while sticker visas and Schengen appointments take longer. We advise realistic timelines during your consultation.",
  },
  {
    question: "Can you guarantee visa approval?",
    answer: "No agency can guarantee a visa — the decision is always the embassy's. What we guarantee is a complete, well-prepared file that gives you the best possible chance.",
  },
  {
    question: "Do I need to visit your office?",
    answer: "Not necessarily. Many visas can be handled by sharing scanned documents over email or WhatsApp. Original documents can be dropped at our Clifton office.",
  },
];
