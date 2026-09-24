import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogCard } from "@/components/shared/blog-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { blogPosts, getPost } from "@/data/blog";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/travel-tips/${post.slug}`, image: post.image, type: "article" });
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <PageHero
        image={post.image}
        imageAlt={post.title}
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { name: "Travel Tips", href: "/travel-tips" },
          { name: post.title, href: `/travel-tips/${post.slug}` },
        ]}
      >
        <p className="text-sm text-white/75">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
        </p>
      </PageHero>
      <article className="container-page max-w-3xl py-14 sm:py-20">
        <p className="text-xl leading-relaxed text-ink/80">{post.excerpt}</p>
        <div className="mt-8 space-y-5 text-[17px] leading-[1.8] text-ink/85">
          {post.content.map((block, i) => {
            if (block.type === "h2")
              return (
                <h2 key={i} className="pt-6 font-display text-2xl font-semibold sm:text-3xl">
                  {block.text}
                </h2>
              );
            if (block.type === "ul")
              return (
                <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
                  {block.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{block.text}</p>;
          })}
        </div>
        <div className="mt-12 rounded-3xl bg-sand p-6 sm:p-8">
          <p className="font-display text-xl font-semibold">Ready to put these tips to use?</p>
          <p className="mt-1 text-muted-foreground">
            Browse our <Link href="/travel-packages" className="font-semibold text-primary hover:underline">tour packages</Link> or{" "}
            <Link href="/enquiry" className="font-semibold text-primary hover:underline">request a custom quote</Link>.
          </p>
        </div>
      </article>
      <section className="section bg-sand">
        <div className="container-page">
          <h2 className="mb-8 font-display text-3xl font-semibold">More travel tips</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {more.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
