import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Art } from "@/components/ui/Art";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <Container className="py-12 lg:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Organization", name: "Fello Moulded Furniture" },
          publisher: { "@type": "Organization", name: siteConfig.company },
          mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />

      <article className="mx-auto mt-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">{post.category}</p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} ·{" "}
          {post.readingTime}
        </p>

        <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Art icon={post.icon} tone={post.tone} label={post.title} />
        </div>

        <div className="mt-10 space-y-5 text-neutral-700">
          {post.body.map((para, i) => (
            <p key={i} className={i === 0 ? "italic text-neutral-400" : "leading-relaxed"}>
              {para}
            </p>
          ))}
        </div>
      </article>
    </Container>
  );
}
