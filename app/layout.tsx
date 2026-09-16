import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Fello Moulded Furniture | Quality Furniture in Pakistan",
    template: "%s | Fello Moulded Furniture",
  },
  description: siteConfig.description,
  openGraph: {
    title: "Fello Moulded Furniture | Quality Furniture in Pakistan",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Fello Moulded Furniture",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fello Moulded Furniture | Quality Furniture in Pakistan",
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="flex min-h-screen flex-col bg-white text-brand-ink antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Fello Moulded Furniture",
            alternateName: siteConfig.company,
            url: siteConfig.url,
            email: siteConfig.email,
            foundingDate: String(siteConfig.foundedYear),
            description: siteConfig.description,
            sameAs: Object.values(siteConfig.social).filter(Boolean),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
