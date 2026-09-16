import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={`mx-auto w-full max-w-[1320px] px-6 sm:px-8 lg:px-10 ${className}`}>{children}</Tag>;
}
