import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", description: "How Travel Mate collects, uses and protects your personal information.", path: "/privacy-policy" });

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="September 2026"
      sections={[
        { heading: "Information we collect", body: ["When you submit an enquiry, contact form or newsletter sign-up we collect the details you provide, such as your name, email, phone number, travel preferences and message.", "For bookings we may also collect passport, CNIC and other documents required by airlines, hotels, embassies and Saudi authorities."] },
        { heading: "How we use your information", body: ["To respond to enquiries, prepare quotations, make bookings, process visas and provide customer support.", "With your consent, to send you offers and travel updates. You can unsubscribe at any time."] },
        { heading: "Sharing", body: ["We share only what is necessary with airlines, hotels, ground handlers, embassies and visa service providers to fulfil your booking. We never sell your personal data."] },
        { heading: "Security & retention", body: ["We take reasonable technical and organisational measures to protect your data and keep it only as long as needed for the purposes above or as required by law."] },
        { heading: "Contact", body: [`For any privacy question or to request access or deletion of your data, email ${siteConfig.contact.email} or call ${siteConfig.contact.phone}.`] },
      ]}
    />
  );
}
