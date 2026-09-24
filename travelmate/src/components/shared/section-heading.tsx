import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
  as?: "h1" | "h2";
  className?: string;
  tone?: "light" | "dark";
}

export function SectionHeading({ eyebrow, title, description, align = "left", action, as: Tag = "h2", className, tone = "light" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between", align === "center" && "items-center text-center md:flex-col md:items-center", className)}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("mb-3 text-xs font-bold uppercase tracking-[0.2em]", dark ? "text-accent" : "text-primary")}>{eyebrow}</p>}
        <Tag className={cn("font-display text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]", dark && "text-white")}>{title}</Tag>
        {description && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-muted-foreground")}>{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className={cn("group inline-flex shrink-0 items-center gap-2 text-sm font-semibold", dark ? "text-white" : "text-primary")}
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
