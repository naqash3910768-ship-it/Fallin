import { BlogCard } from "@/components/shared/blog-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { blogPosts } from "@/data/blog";

export function BlogTeaser() {
  return (
    <section className="section bg-sand">
      <div className="container-page">
        <SectionHeading eyebrow="Travel tips" title="Guides & inspiration" action={{ label: "All travel tips", href: "/travel-tips" }} />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
