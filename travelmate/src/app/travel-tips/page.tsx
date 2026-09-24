import type { Metadata } from "next";
import { BlogCard } from "@/components/shared/blog-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Travel Tips, Guides & Inspiration",
  description: "Travel tips for Pakistani travellers: Hajj booking guide, first-time travel tips, Azerbaijan and France guides, winter holiday ideas and more from Travel Mate.",
  path: "/travel-tips",
  image: "/images/hero/travel-tips-hero.jpg",
});

export default function TravelTipsPage() {
  const [featured, ...rest] = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        size="sm"
        image="/images/hero/travel-tips-hero.jpg"
        imageAlt="Open travel journal with a camera"
        eyebrow="Travel tips"
        title="Guides & inspiration for your next trip"
        breadcrumbs={[{ name: "Travel Tips", href: "/travel-tips" }]}
      />
      <section className="section pt-12">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-3 lg:[&_article]:grid lg:[&_article]:grid-cols-2 lg:[&_article>div:first-child]:aspect-auto lg:[&_article>div:first-child]:min-h-[380px]">
              <BlogCard post={featured} />
            </div>
            {rest.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
