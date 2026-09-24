import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <Badge variant="glass" className="absolute left-4 top-4">
          {post.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink group-hover:text-primary">
          <Link href={`/travel-tips/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      </div>
    </article>
  );
}
