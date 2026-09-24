import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Terms & Conditions", description: "Booking terms and conditions for Travel Mate tour packages, Umrah, Hajj, visas and travel services.", path: "/terms-and-conditions" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms-and-conditions"
      updated="September 2026"
      sections={[
        { heading: "Prices", body: ["All prices shown on this website are indicative 'starting from' prices per person and are subject to availability, travel dates, exchange rates and airfare at the time of booking. A booking is confirmed only after written confirmation and receipt of the required advance payment."] },
        { heading: "Payments", body: ["Payment schedules are shared with your quotation. Airline tickets, visas and certain hotel bookings may require full payment at the time of issuance."] },
        { heading: "Visas", body: ["Visa approval is at the sole discretion of the relevant embassy or authority. Visa fees and service charges are non-refundable once an application is submitted."] },
        { heading: "Cancellations & changes", body: ["Cancellation and amendment charges depend on the policies of airlines, hotels and suppliers and are communicated at the time of booking. Please review them before confirming."] },
        { heading: "Travel documents", body: ["Travellers are responsible for holding a passport valid for at least six months and any documents required for their journey."] },
        { heading: "Liability", body: ["Travel Mate acts as an agent for airlines, hotels, cruise lines and other suppliers and is not liable for their acts, omissions or force majeure events, but we will always do our best to assist you."] },
      ]}
    />
  );
}
