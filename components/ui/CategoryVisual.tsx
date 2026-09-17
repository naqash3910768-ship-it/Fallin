import Image from "next/image";
import { Art } from "@/components/ui/Art";
import type { Category } from "@/lib/products";

export function CategoryVisual({ category, sizes = "50vw" }: { category: Category; sizes?: string }) {
  if (category.image) {
    return (
      <Image
        src={category.image}
        alt={`Fello ${category.name.toLowerCase()}`}
        fill
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  return <Art icon={category.icon} tone={category.tone} label={`${category.name} — illustrative artwork`} />;
}
