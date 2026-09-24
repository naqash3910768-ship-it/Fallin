import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const pkr = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function formatPrice(amount: number, currency: "PKR" | "USD" = "PKR") {
  return currency === "USD" ? usd.format(amount) : pkr.format(amount).replace("PKR", "Rs").replace(/ /g, " ");
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function durationLabel(days: number, nights?: number) {
  const n = nights ?? days - 1;
  return `${days} Days / ${n} Night${n === 1 ? "" : "s"}`;
}

/** Normalises free text for forgiving, accent/case-insensitive search. */
export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

export function absoluteUrl(path = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.travelmate.com.pk";
  return new URL(path, base).toString();
}
