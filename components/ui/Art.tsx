/**
 * Placeholder art system.
 *
 * Real Fello product/lifestyle photography could not be retrieved while building
 * this project (the dev sandbox has no network access to fello.pk, its socials, or
 * stock-photo libraries). Rather than hotlink guessed/unverifiable image URLs and
 * risk broken or fabricated imagery, every visual in the site is rendered as
 * original line-art in the brand palette.
 *
 * TO REPLACE WITH REAL PHOTOGRAPHY: swap the <Art /> usage for a Next.js
 * <Image src="/images/..." /> pointing at the corresponding official product or
 * lifestyle photo, then remove the icon prop. The `icon` prop below documents
 * exactly what each slot should depict.
 */
import type { HTMLAttributes } from "react";

export type ArtIcon =
  | "chair"
  | "armchair"
  | "stool"
  | "table"
  | "kids-chair"
  | "factory"
  | "resin"
  | "mould"
  | "quality"
  | "finish"
  | "stack";

export type ArtTone = "sand" | "ink" | "red" | "yellow" | "charcoal";

const toneMap: Record<ArtTone, { bg: string; fg: string; accent: string }> = {
  sand: { bg: "#f5f2ec", fg: "#221d18", accent: "#c31f26" },
  ink: { bg: "#171310", fg: "#f5f2ec", accent: "#f2b705" },
  red: { bg: "#c31f26", fg: "#ffffff", accent: "#f2b705" },
  yellow: { bg: "#f2b705", fg: "#171310", accent: "#171310" },
  charcoal: { bg: "#221d18", fg: "#f5f2ec", accent: "#c31f26" },
};

function IconPath({ icon, fg, accent }: { icon: ArtIcon; fg: string; accent: string }) {
  const stroke = fg;
  switch (icon) {
    case "chair":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 20 L30 62 Q30 68 36 68 L64 68 Q70 68 70 62 L70 46" />
          <path d="M30 46 L70 46" />
          <path d="M30 20 Q30 14 36 14 L58 14 Q64 14 64 20 L64 46" />
          <path d="M34 68 L30 84 M66 68 L70 84" />
          <circle cx="76" cy="34" r="4" fill={accent} stroke="none" />
        </g>
      );
    case "armchair":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 50 L24 66 Q24 70 28 70 L72 70 Q76 70 76 66 L76 50" />
          <path d="M24 50 Q24 30 30 26 L30 44" />
          <path d="M76 50 Q76 30 70 26 L70 44" />
          <path d="M30 26 Q30 16 40 16 L60 16 Q70 16 70 26 L70 44 L30 44 Z" />
          <path d="M28 70 L26 84 M72 70 L74 84" />
          <circle cx="50" cy="30" r="3.5" fill={accent} stroke="none" />
        </g>
      );
    case "stool":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="50" cy="26" rx="26" ry="8" />
          <path d="M26 26 L34 78 M74 26 L66 78 M50 34 L50 78" />
          <path d="M30 52 L70 52" />
          <circle cx="50" cy="26" r="3.5" fill={accent} stroke="none" />
        </g>
      );
    case "table":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="50" cy="30" rx="34" ry="9" />
          <path d="M20 30 L28 80 M80 30 L72 80 M50 39 L50 80" />
          <path d="M24 58 L76 58" />
          <circle cx="50" cy="30" r="3.5" fill={accent} stroke="none" />
        </g>
      );
    case "kids-chair":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M36 30 L36 60 Q36 64 40 64 L60 64 Q64 64 64 60 L64 50" />
          <path d="M36 50 L64 50" />
          <path d="M36 30 Q36 26 40 26 L56 26 Q60 26 60 30 L60 50" />
          <path d="M40 64 L37 80 M60 64 L63 80" />
          <circle cx="50" cy="18" r="6" fill={accent} stroke="none" />
        </g>
      );
    case "factory":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 78 L18 46 L34 56 L34 42 L50 52 L50 34 L82 34 L82 78 Z" />
          <path d="M18 78 L82 78" />
          <path d="M62 34 L62 22 L70 22 L70 34" />
          <circle cx="66" cy="16" r="3" fill={accent} stroke="none" />
        </g>
      );
    case "resin":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 16 L50 34" />
          <path d="M38 34 L62 34 L72 78 L28 78 Z" />
          <path d="M34 58 L66 58" />
          <circle cx="50" cy="66" r="4" fill={accent} stroke="none" />
        </g>
      );
    case "mould":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="20" y="24" width="26" height="52" rx="2" />
          <rect x="54" y="24" width="26" height="52" rx="2" />
          <path d="M46 40 L54 40 M46 60 L54 60" />
          <circle cx="50" cy="50" r="3" fill={accent} stroke="none" />
        </g>
      );
    case "quality":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 16 L78 26 L78 50 Q78 72 50 84 Q22 72 22 50 L22 26 Z" />
          <path d="M38 50 L48 60 L64 40" />
        </g>
      );
    case "finish":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="30" />
          <path d="M50 26 L50 50 L66 60" />
          <circle cx="50" cy="50" r="3" fill={accent} stroke="none" />
        </g>
      );
    case "stack":
      return (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28 30 L28 58 Q28 62 32 62 L68 62 Q72 62 72 58 L72 30" />
          <path d="M28 42 Q50 50 72 42" />
          <path d="M28 30 Q50 38 72 30 Q50 22 28 30 Z" />
          <path d="M32 62 L30 78 M68 62 L70 78" />
        </g>
      );
    default:
      return null;
  }
}

interface ArtProps extends HTMLAttributes<HTMLDivElement> {
  icon: ArtIcon;
  tone?: ArtTone;
  label?: string;
  pattern?: boolean;
}

export function Art({ icon, tone = "sand", label, pattern = true, className = "", ...rest }: ArtProps) {
  const { bg, fg, accent } = toneMap[tone];
  const patternId = `art-grid-${icon}-${tone}`;

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: bg }}
      role="img"
      aria-label={label ?? "Fello moulded furniture — illustrative artwork"}
      {...rest}
    >
      {pattern && (
        <svg className="absolute inset-0 h-full w-full opacity-[0.08]" preserveAspectRatio="none">
          <defs>
            <pattern id={patternId} width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill={fg} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      )}
      <svg viewBox="0 0 100 100" className="h-[46%] w-[46%]" aria-hidden="true">
        <IconPath icon={icon} fg={fg} accent={accent} />
      </svg>
    </div>
  );
}
