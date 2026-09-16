import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Art } from "@/components/ui/Art";
import { Reveal } from "@/components/ui/Reveal";
import { blogPosts } from "@/lib/blog";

export function BlogTeaser() {
  return (
    <section className="bg-brand-sand py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="From the Journal" title="Furniture, Design & Quality" />
          <Button href="/blog" variant="ghost">
            Visit the Blog
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-xl border border-black/[0.06] bg-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <Art icon={post.icon} tone={post.tone} label={post.title} />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">{post.category}</p>
                  <h3 className="mt-2 font-bold leading-snug text-brand-ink group-hover:text-brand-red">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{post.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
