import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";
import type { BlogPost, FAQ, TourPackage } from "@/types";

interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
}

/** Builds consistent metadata (canonical, Open Graph, Twitter) for every page. */
export function buildMetadata({ title, description, path, image, keywords, type = "website", noIndex }: PageSeo): Metadata {
  const ogImage = image ?? siteConfig.ogImage;
  return {
    title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

const { contact } = siteConfig;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl("/images/brand/travelmate-logo.png"),
    image: absoluteUrl(siteConfig.ogImage),
    foundingDate: String(siteConfig.foundedYear),
    telephone: "+92-21-111-800-500",
    email: contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    sameAs: Object.values(siteConfig.social),
    contactPoint: siteConfig.departments.map((d) => ({
      "@type": "ContactPoint",
      contactType: d.name,
      email: d.email,
      telephone: `+92-${d.people[0].phone.replace(/^0/, "").replace(/\s/g, "")}`,
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function tourSchema(pkg: TourPackage, destinationName: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: pkg.title,
    description: pkg.summary,
    image: absoluteUrl(pkg.image),
    url: absoluteUrl(`/travel-packages/${pkg.slug}`),
    touristType: pkg.categories,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: pkg.itinerary.length,
      itemListElement: pkg.itinerary.map((d) => ({ "@type": "ListItem", position: d.day, name: d.title, description: d.description })),
    },
    subjectOf: { "@type": "Place", name: destinationName },
    provider: { "@id": `${siteConfig.url}/#organization` },
    offers: {
      "@type": "Offer",
      price: pkg.priceFrom,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/travel-packages/${pkg.slug}`),
      seller: { "@id": `${siteConfig.url}/#organization` },
    },
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/travel-tips/${post.slug}`),
  };
}

export function itemListSchema(name: string, items: { name: string; href: string; image?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.href),
      ...(item.image ? { image: absoluteUrl(item.image) } : {}),
    })),
  };
}
