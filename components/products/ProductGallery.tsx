"use client";

import { useState } from "react";
import { Art, type ArtIcon, type ArtTone } from "@/components/ui/Art";

interface GalleryView {
  tone: ArtTone;
  label: string;
}

export function ProductGallery({ icon, name }: { icon: ArtIcon; name: string }) {
  const views: GalleryView[] = [
    { tone: "sand", label: "Front view" },
    { tone: "ink", label: "Detail view" },
    { tone: "yellow", label: "Lifestyle view" },
  ];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-2xl">
        <Art icon={icon} tone={views[active].tone} label={`${name} — ${views[active].label} (illustrative artwork)`} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {views.map((view, i) => (
          <button
            key={view.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${view.label}`}
            aria-pressed={active === i}
            className={`aspect-square overflow-hidden rounded-lg ring-2 transition-all ${
              active === i ? "ring-brand-red" : "ring-transparent hover:ring-black/10"
            }`}
          >
            <Art icon={icon} tone={view.tone} pattern={false} label={`${name} — ${view.label} thumbnail`} />
          </button>
        ))}
      </div>
    </div>
  );
}
