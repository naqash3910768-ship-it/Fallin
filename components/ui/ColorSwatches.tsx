import type { ColorSwatch } from "@/lib/products";

export function ColorSwatches({
  colors,
  size = "sm",
  showNames = false,
}: {
  colors: ColorSwatch[];
  size?: "sm" | "md";
  showNames?: boolean;
}) {
  const dim = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  return (
    <div className="flex items-center gap-1.5" aria-label={`Available colours: ${colors.map((c) => c.name).join(", ")}`}>
      {colors.map((c) => (
        <span key={c.name} className="group relative">
          <span
            className={`block rounded-full ring-1 ring-black/10 ${dim}`}
            style={{ backgroundColor: c.hex }}
            title={c.name}
          />
          {showNames && (
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-brand-ink px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {c.name}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
