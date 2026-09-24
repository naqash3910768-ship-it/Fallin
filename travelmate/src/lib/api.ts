/**
 * Backend-ready API layer.
 *
 * Today the site reads from typed local data in `src/data`. To connect a CMS or
 * booking engine later, replace the bodies of these functions with fetch calls —
 * every page imports data through here or through `src/data`, so the UI stays unchanged.
 */
import { destinations, getDestination } from "@/data/destinations";
import { getPackage, packages } from "@/data/packages";
import type { ContactInput, EnquiryInput, NewsletterInput } from "@/lib/validations";

export async function listPackages() {
  return packages;
}

export async function findPackage(slug: string) {
  return getPackage(slug) ?? null;
}

export async function listDestinations() {
  return destinations;
}

export async function findDestination(slug: string) {
  return getDestination(slug) ?? null;
}

export type LeadType = "enquiry" | "contact" | "newsletter";

/**
 * Forwards a validated lead to an external webhook (CRM, email service, Google Sheet…)
 * configured through ENQUIRY_WEBHOOK_URL. Falls back to server logging.
 */
export async function submitLead(type: LeadType, data: EnquiryInput | ContactInput | NewsletterInput) {
  const payload = { type, data, receivedAt: new Date().toISOString(), source: "website" };
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (!webhook) {
    console.info("[lead]", JSON.stringify(payload));
    return { ok: true as const };
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
  return { ok: true as const };
}
