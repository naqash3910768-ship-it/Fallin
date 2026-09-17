import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Collections } from "@/components/home/Collections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { QualitySection } from "@/components/home/QualitySection";
import { ManufacturingStory } from "@/components/home/ManufacturingStory";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { BrochureCTA } from "@/components/home/BrochureCTA";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Collections />
      <FeaturedProducts />
      <QualitySection />
      <ManufacturingStory />
      <AboutTeaser />
      <BrochureCTA />
      <ContactCTA />
    </>
  );
}
