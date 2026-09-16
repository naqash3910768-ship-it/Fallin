import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${
            tone === "light" ? "text-brand-yellow" : "text-brand-red"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={`text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          tone === "light" ? "text-white" : "text-brand-ink"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${tone === "light" ? "text-white/70" : "text-neutral-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
