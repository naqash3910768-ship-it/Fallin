import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Art } from "@/components/ui/Art";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Furniture care, design and manufacturing notes from the Fello journal.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-ink sm:text-4xl">The Fello Journal</h1>
      <p className="mt-3 max-w-xl text-neutral-600">
        Notes on furniture care, materials and manufacturing.{" "}
        <span className="text-neutral-400">
          (Sample articles shown below — placeholder editorial content pending real posts.)
        </span>
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-xl border border-black/[0.06] bg-white">
            <div className="aspect-[16/10] overflow-hidden">
              <Art icon={post.icon} tone={post.tone} label={post.title} />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="font-semibold uppercase tracking-wide text-brand-red">{post.category}</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-2 font-bold leading-snug text-brand-ink group-hover:text-brand-red">{post.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
