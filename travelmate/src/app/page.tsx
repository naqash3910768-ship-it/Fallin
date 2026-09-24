import type { Metadata } from "next";
import { CtaBanner } from "@/components/shared/cta-banner";
import { FaqSection } from "@/components/shared/faq-section";
import { generalFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { BlogTeaser } from "@/sections/home/blog-teaser";
import { FeaturedPackages } from "@/sections/home/featured-packages";
import { Hero } from "@/sections/home/hero";
import { PilgrimageHighlight } from "@/sections/home/pilgrimage-highlight";
import { PopularDestinations } from "@/sections/home/popular-destinations";
import { ServicesOverview } from "@/sections/home/services-overview";
import { StatsStrip } from "@/sections/home/stats-strip";
import { Testimonials } from "@/sections/home/testimonials";
import { TravelCategories } from "@/sections/home/travel-categories";
import { TravelGallery } from "@/sections/home/travel-gallery";
import { WhyChooseUs } from "@/sections/home/why-choose-us";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Travel & Tour Packages from Karachi, Hajj & Umrah, Visa & Cruise Services",
    description:
      "Book international and Pakistan tour packages, Umrah and Hajj packages, visa services, cruises, hotels and flights with Travel Mate, Karachi's trusted travel agency since 2007.",
    path: "/",
  }),
  title: { absolute: "Travel Mate | Tour Packages from Karachi, Hajj & Umrah, Visa & Cruise Services" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <TravelCategories />
      <ServicesOverview />
      <PilgrimageHighlight />
      <Testimonials />
      <TravelGallery />
      <BlogTeaser />
      <FaqSection faqs={generalFaqs} />
      <CtaBanner />
    </>
  );
}
