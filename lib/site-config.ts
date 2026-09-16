// Central, factual site configuration.
// Sourced from https://www.fello.pk/, https://www.fello.pk/about, https://www.fello.pk/contact
// and https://www.fello.pk/brochure. Anything not confirmed by those sources is explicitly
// marked PLACEHOLDER below so it can be swapped for verified detail later.

export const siteConfig = {
  brand: "FELLO",
  company: "Polycraft Industries",
  tagline: "Quality You Can Rely On",
  domain: "fello.pk",
  url: "https://www.fello.pk",
  description:
    "Fello Moulded Furniture by Polycraft Industries — premium moulded plastic chairs, tables and stools made in Pakistan from 100% virgin furniture-grade polypropylene resin since 1993.",
  foundedYear: 1993,
  email: "support@fello.pk", // confirmed public contact address
  // PLACEHOLDER: phone number and street address are not published on the
  // pages that were available to us — replace with verified details.
  phone: "PLACEHOLDER — add verified phone number",
  address: "PLACEHOLDER — add verified factory / office address, Pakistan",
  social: {
    // Public profile handles found in search results; verify URLs before publishing.
    facebook: "https://www.facebook.com/fellomouldedfurniture/",
    instagram: "https://www.instagram.com/fello.pk/",
  },
};

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Quality", href: "/quality" },
  { label: "Brochure", href: "/brochure" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const ctaPrimary: NavItem = { label: "Explore Products", href: "/products" };
export const ctaSecondary: NavItem = { label: "Download Brochure", href: "/brochure" };

// Facts used across About / Quality / Manufacturing sections.
// Source: https://www.fello.pk/about
export const companyFacts = {
  founded:
    "Polycraft Industries was established in 1993 to manufacture large-size injection moulded articles.",
  origin:
    "The company began with one chair mould and a 1000-ton injection moulding machine imported from Taiwan.",
  material: "Fello furniture is made using 100% virgin furniture-grade polypropylene resin.",
  capacity:
    "Today Polycraft Industries operates more than ten chair and table moulds, supported by several large and medium tonnage injection moulding machines.",
  quality: "Every product passes through strict quality control before it reaches a showroom floor.",
};

export const trustPoints = [
  { label: "Established 1993", detail: "Manufacturing moulded furniture in Pakistan for over three decades." },
  { label: "100% Virgin Polypropylene", detail: "Furniture-grade resin, not recycled or reprocessed plastic." },
  { label: "Strict Quality Control", detail: "Every batch is checked before it leaves the factory." },
  { label: "Built for Everyday Use", detail: "Designed to withstand daily home, office and outdoor use." },
];
